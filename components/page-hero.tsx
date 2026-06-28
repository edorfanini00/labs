import { Container, Label } from "./ui";

export function PageHero({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="grid-faint absolute inset-0" />
      <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-peri/30 blur-[110px]" />
      <Container className="relative py-16 sm:py-20">
        <Label>{label}</Label>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {intro}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
