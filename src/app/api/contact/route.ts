import { createHash } from "node:crypto";
import { Resend } from "resend";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

type ContactField = "name" | "email" | "subject" | "message";

const recipient = "neerajsalve01@gmail.com";
const sender = "Portfolio Contact <onboarding@resend.dev>";
const windowMs = 10 * 60 * 1000;
const maxRequests = 5;
const developmentAttempts = new Map<string, { count: number; resetAt: number }>();
const distributedRateLimitScript = `
local count = redis.call("INCR", KEYS[1])
if count == 1 then
  redis.call("PEXPIRE", KEYS[1], ARGV[1])
end
return { count, redis.call("PTTL", KEYS[1]) }
`;

function json(body: object, status = 200, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}

async function readBodyWithLimit(request: Request, maxBytes: number) {
  if (!request.body) return { tooLarge: false as const, text: "" };

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        return { tooLarge: true as const, text: "" };
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return { tooLarge: false as const, text: new TextDecoder("utf-8", { fatal: true }).decode(body) };
}

function getClientIp(request: Request) {
  // Production hosting must provide a client IP via its trusted reverse proxy.
  return request.headers.get("x-real-ip")?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || null;
}

function checkDevelopmentRateLimit(key: string) {
  const now = Date.now();
  for (const [entryKey, entry] of developmentAttempts) {
    if (entry.resetAt <= now) developmentAttempts.delete(entryKey);
  }

  const current = developmentAttempts.get(key);
  if (current && current.resetAt > now && current.count >= maxRequests) {
    return { limited: true, retryAfter: Math.ceil((current.resetAt - now) / 1000) };
  }

  if (developmentAttempts.size > 5000) {
    const oldestKey = developmentAttempts.keys().next().value;
    if (oldestKey) developmentAttempts.delete(oldestKey);
  }

  if (!current || current.resetAt <= now) {
    developmentAttempts.set(key, { count: 1, resetAt: now + windowMs });
  } else {
    current.count += 1;
  }
  return { limited: false, retryAfter: 0 };
}

function hasDistributedRateLimitConfig() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL?.trim() && process.env.UPSTASH_REDIS_REST_TOKEN?.trim());
}

function isContactServiceReady() {
  return Boolean(process.env.RESEND_API_KEY?.trim())
    && (process.env.NODE_ENV !== "production" || hasDistributedRateLimitConfig());
}

async function checkDistributedRateLimit(request: Request) {
  const clientIp = getClientIp(request);
  const restUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const restToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!clientIp || !restUrl || !restToken) return { unavailable: true as const };

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(restUrl);
  } catch {
    return { unavailable: true as const };
  }
  if (parsedUrl.protocol !== "https:") return { unavailable: true as const };

  const clientHash = createHash("sha256").update(clientIp).digest("hex");
  try {
    const response = await fetch(parsedUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${restToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        "EVAL",
        distributedRateLimitScript,
        "1",
        `portfolio:contact:${clientHash}`,
        String(windowMs),
      ]),
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    });
    if (!response.ok) return { unavailable: true as const };

    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object" || !("result" in payload) || !Array.isArray(payload.result)) {
      return { unavailable: true as const };
    }

    const count = Number(payload.result[0]);
    const remainingMs = Number(payload.result[1]);
    if (!Number.isFinite(count) || !Number.isFinite(remainingMs) || remainingMs < 0) {
      return { unavailable: true as const };
    }

    return {
      unavailable: false as const,
      limited: count > maxRequests,
      retryAfter: Math.max(1, Math.ceil(remainingMs / 1000)),
    };
  } catch {
    return { unavailable: true as const };
  }
}

function validate(payload: ContactPayload) {
  const values = {
    name: typeof payload.name === "string" ? payload.name.trim() : "",
    email: typeof payload.email === "string" ? payload.email.trim() : "",
    subject: typeof payload.subject === "string" ? payload.subject.trim() : "",
    message: typeof payload.message === "string" ? payload.message.trim() : "",
  };
  const errors: Partial<Record<ContactField, string>> = {};

  if (values.name.length < 2 || values.name.length > 100) errors.name = "Enter a name between 2 and 100 characters.";
  if (values.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || /[\r\n]/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (values.subject.length < 2 || values.subject.length > 160 || /[\r\n]/.test(values.subject)) {
    errors.subject = "Enter a subject between 2 and 160 characters.";
  }
  if (values.message.length < 10 || values.message.length > 5000) {
    errors.message = "Enter a message between 10 and 5,000 characters.";
  }

  return { values, errors };
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY?.trim()) {
    return json({ message: "The contact form is not configured yet. Please email neerajsalve01@gmail.com directly for now." }, 503);
  }

  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction && !hasDistributedRateLimitConfig()) {
    return json({ message: "The contact form is temporarily unavailable. Please email me directly instead." }, 503);
  }

  const rateLimit = isProduction
    ? await checkDistributedRateLimit(request)
    : { unavailable: false as const, ...checkDevelopmentRateLimit(getClientIp(request) ?? "local-development") };
  if (rateLimit.unavailable) {
    return json({ message: "The contact form is temporarily unavailable. Please email me directly instead." }, 503);
  }
  if (rateLimit.limited) {
    return json(
      { message: "Too many messages were submitted. Please wait a few minutes and try again." },
      429,
      { "Retry-After": String(rateLimit.retryAfter) },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 12_000) return json({ message: "The submitted message is too large." }, 413);
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return json({ message: "The submitted form is invalid." }, 415);
  }

  let payload: ContactPayload;
  try {
    const body = await readBodyWithLimit(request, 12_000);
    if (body.tooLarge) return json({ message: "The submitted message is too large." }, 413);
    const parsed: unknown = JSON.parse(body.text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return json({ message: "The submitted form is invalid." }, 400);
    }
    payload = parsed as ContactPayload;
  } catch {
    return json({ message: "The submitted form is invalid." }, 400);
  }

  // Bots that fill the hidden field receive a generic response; no email is sent.
  if (typeof payload.website === "string" && payload.website.trim()) {
    return json({ message: "Unable to submit this message. Please email me directly if you need assistance." }, 400);
  }

  const { values, errors } = validate(payload);
  if (Object.keys(errors).length) {
    return json({ message: "Please correct the highlighted fields and try again.", fieldErrors: errors }, 400);
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY!.trim());
    const { data, error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: values.email,
      subject: `Portfolio contact: ${values.subject}`,
      text: [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Subject: ${values.subject}`,
        "",
        values.message,
      ].join("\n"),
    });

    if (error || !data?.id) {
      return json({ message: "The email provider could not accept your message. Please try again or email me directly." }, 502);
    }
  } catch {
    return json({ message: "The email service could not be reached. Please try again or email me directly." }, 502);
  }

  return json({ ok: true, message: "Your message was accepted for delivery." });
}

export async function GET() {
  return json(
    { configured: isContactServiceReady() },
    200,
    { "Cache-Control": "no-store" },
  );
}
