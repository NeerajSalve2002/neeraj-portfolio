export type BrandIconName = "github" | "linkedin" | "gmail";

type BrandIconProps = {
  name: BrandIconName;
  className?: string;
};

const profilePaths = {
  github: "M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.17c-3.2.69-3.88-1.36-3.88-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.3 1.18-3.11-.12-.3-.51-1.48.11-3.08 0 0 .96-.31 3.15 1.19a10.9 10.9 0 0 1 5.73 0c2.19-1.5 3.15-1.19 3.15-1.19.62 1.6.23 2.78.11 3.08.74.81 1.18 1.85 1.18 3.11 0 4.43-2.69 5.4-5.26 5.69.41.35.78 1.04.78 2.1v3.11c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 .001-4.123 2.062 2.062 0 0 1-.001 4.123ZM3.555 9h3.564v11.452H3.555V9Zm18.674-9H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.229 0Z",
} satisfies Record<Exclude<BrandIconName, "gmail">, string>;

export default function BrandIcon({ name, className }: BrandIconProps) {
  if (name === "gmail") {
    return (
      <svg className={className} width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="#4285f4" d="M3.5 6.2v13.3h3V8.5z" />
        <path fill="#34a853" d="M17.5 8.5v11h3V6.2z" />
        <path fill="#fbbc04" d="M17.5 6.1v2.4l3-2.3V5.1c0-1.2-1.4-1.8-2.3-1.1l-.7.5z" />
        <path fill="#ea4335" d="M6.5 8.5 12 12.7l5.5-4.2V4.8L12 9 6.5 4.8z" />
        <path fill="#c5221f" d="M3.5 5.1v1.1l3 2.3V6.1l-.7-.5c-.9-.7-2.3-.1-2.3 1.1Z" />
      </svg>
    );
  }

  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={profilePaths[name]} />
    </svg>
  );
}
