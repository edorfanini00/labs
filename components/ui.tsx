import Link from "next/link";
import { Grade, gradeMeta } from "@/lib/compounds";

export function Container({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Label({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={`label-caps text-cobalt ${className}`}>{children}</span>;
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "light";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 h-12 text-[0.95rem] font-medium transition-all duration-300";
  const styles = {
    primary:
      "bg-cobalt text-white hover:bg-cobalt-deep shadow-[0_8px_24px_-10px_rgba(47,67,214,0.7)]",
    ghost:
      "border border-line text-ink hover:border-cobalt hover:text-cobalt bg-white/60",
    light:
      "bg-white text-cobalt hover:bg-peri-soft",
  };
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function GradeBadge({ grade, size = "md" }: { grade: Grade; size?: "sm" | "md" | "lg" }) {
  const meta = gradeMeta[grade];
  const dims = {
    sm: "h-7 w-7 text-sm",
    md: "h-10 w-10 text-lg",
    lg: "h-14 w-14 text-2xl",
  };
  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl font-serif font-medium text-white ${dims[size]}`}
      style={{ backgroundColor: meta.color }}
      title={`${grade} ${meta.word}`}
    >
      {grade}
    </span>
  );
}

export function GradePill({ grade }: { grade: Grade }) {
  const meta = gradeMeta[grade];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
      {grade} {meta.word}
    </span>
  );
}

export function Stat({
  value,
  label,
  tone = "ink",
}: {
  value: string;
  label: string;
  tone?: "ink" | "light";
}) {
  return (
    <div>
      <div
        className={`font-serif text-4xl sm:text-5xl tracking-tight ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      >
        {value}
      </div>
      <div
        className={`mt-1.5 text-sm ${
          tone === "light" ? "text-white/70" : "text-muted"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
