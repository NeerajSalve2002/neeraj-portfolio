"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type ContactField = "name" | "email" | "subject" | "message";
type FormState = { kind: "idle" } | { kind: "sending" } | { kind: "success" } | { kind: "error"; message: string };
type ApiResponse = { ok?: boolean; message?: string; fieldErrors?: Partial<Record<ContactField, string>> };
type DeliveryState = "checking" | "ready" | "not-configured" | "unavailable";

const fields: { name: ContactField; label: string; type: "text" | "email"; placeholder: string; autoComplete?: string; maxLength: number; minLength: number }[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Your name", autoComplete: "name", minLength: 2, maxLength: 100 },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email", minLength: 5, maxLength: 254 },
  { name: "subject", label: "Subject", type: "text", placeholder: "What would you like to discuss?", minLength: 2, maxLength: 160 },
];

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const sendingRef = useRef(false);
  const [state, setState] = useState<FormState>({ kind: "idle" });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [deliveryState, setDeliveryState] = useState<DeliveryState>("checking");

  useEffect(() => {
    let active = true;

    fetch("/api/contact", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Contact service status could not be checked.");
        return (await response.json()) as { configured?: boolean };
      })
      .then((result) => {
        if (active) setDeliveryState(result.configured ? "ready" : "not-configured");
      })
      .catch(() => {
        if (active) setDeliveryState("unavailable");
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = formRef.current;
    if (!form || sendingRef.current) return;
    if (deliveryState !== "ready") {
      setState({ kind: "error", message: "The contact form is unavailable. Please email me directly at neerajsalve01@gmail.com." });
      return;
    }

    if (!form.reportValidity()) return;

    sendingRef.current = true;
    setFieldErrors({});
    setState({ kind: "sending" });

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as ApiResponse;

      if (!response.ok || !result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setState({ kind: "error", message: result.message ?? "Your message could not be sent. Please try again or email me directly." });
        return;
      }

      form.reset();
      setState({ kind: "success" });
    } catch {
      setState({ kind: "error", message: "We couldn’t reach the message service. Please try again or email me directly." });
    } finally {
      sendingRef.current = false;
    }
  }

  function clearFieldError(field: ContactField) {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (state.kind !== "idle") setState({ kind: "idle" });
  }

  function renderField(field: (typeof fields)[number]) {
    const errorId = `${field.name}-error`;
    return (
      <label key={field.name}>
        {field.label}
        <input
          name={field.name}
          type={field.type}
          autoComplete={field.autoComplete}
          placeholder={field.placeholder}
          required
          minLength={field.minLength}
          maxLength={field.maxLength}
          aria-invalid={Boolean(fieldErrors[field.name])}
          aria-describedby={fieldErrors[field.name] ? errorId : undefined}
          onChange={() => clearFieldError(field.name)}
        />
        {fieldErrors[field.name] && <span className="contact-field-error" id={errorId}>{fieldErrors[field.name]}</span>}
      </label>
    );
  }

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit} aria-describedby="contact-form-note" noValidate>
      <div className="contact-form-row">{renderField(fields[0])}{renderField(fields[1])}</div>
      {renderField(fields[2])}
      <label>
        Message
        <textarea
          name="message"
          rows={4}
          placeholder="Write your message..."
          required
          minLength={10}
          maxLength={5000}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          onChange={() => clearFieldError("message")}
        />
        {fieldErrors.message && <span className="contact-field-error" id="message-error">{fieldErrors.message}</span>}
      </label>
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <p id="contact-form-note" className="contact-form-note">
        {deliveryState === "checking"
          ? "Checking whether the contact form is available…"
          : deliveryState === "ready"
            ? "The contact form is available. Your message will be sent by email, and you can also reach me directly using the links beside it."
            : deliveryState === "not-configured"
              ? "The contact form is not connected yet. Please email me directly at neerajsalve01@gmail.com."
              : "We couldn’t verify that the contact form is available. Please email me directly at neerajsalve01@gmail.com."}
      </p>
      <button className="contact-submit" type="submit" disabled={state.kind === "sending" || deliveryState !== "ready"}>
        {state.kind === "sending"
          ? "Sending…"
          : state.kind === "success"
            ? "Send another message"
            : deliveryState === "checking"
              ? "Checking email setup…"
              : deliveryState === "ready"
                ? "Send message"
                : "Form unavailable"}
        <span aria-hidden="true">↗</span>
      </button>
      <p className="contact-form-status" role="status" aria-live="polite">
        {state.kind === "sending" ? "Sending your message…" : state.kind === "success" ? "Your message was accepted for delivery. Thanks for reaching out." : state.kind === "error" ? state.message : ""}
      </p>
    </form>
  );
}
