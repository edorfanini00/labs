import Link from "next/link";
import { site } from "@/lib/site";

export function Mark({
  className = "",
  tone = "currentColor",
}: {
  className?: string;
  tone?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24 9.5 L38.5 35 H9.5 Z"
        stroke={tone}
        strokeWidth="2.2"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <circle cx="24" cy="9.5" r="5" fill={tone} />
      <circle cx="38.5" cy="35" r="4" fill={tone} opacity="0.85" />
      <circle cx="9.5" cy="35" r="4" fill={tone} opacity="0.85" />
      <circle cx="24" cy="26.5" r="2.6" fill={tone} opacity="0.6" />
    </svg>
  );
}

export function Logo({
  className = "",
  tone = "currentColor",
}: {
  className?: string;
  tone?: string;
}) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${site.name} home`}
    >
      <Mark className="h-7 w-7 transition-transform duration-500 group-hover:rotate-[12deg]" tone={tone} />
      <span className="font-serif text-[1.35rem] leading-none tracking-tight">
        {site.shortName}
        <span className="opacity-50"> Assay</span>
      </span>
    </Link>
  );
}
