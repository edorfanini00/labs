import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Button, GradeBadge, GradePill } from "@/components/ui";
import { compounds, getCompound, gradeFromScores, gradeMeta } from "@/lib/compounds";
import { getVendorResults } from "@/lib/vendors";
import { certificates, certificateGrade, certificateDose } from "@/lib/certificates";

export function generateStaticParams() {
  return compounds.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const compound = getCompound(slug);
  if (!compound) return { title: "Compound not found" };
  return {
    title: `${compound.name} Testing and Vendor Rankings`,
    description: `${compound.name} purity, quantity, and independent vendor rankings from ${compound.samples} tested samples.`,
  };
}

export default async function CompoundDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const compound = getCompound(slug);
  if (!compound) notFound();

  const grade = gradeFromScores(compound.avgPurity, compound.avgDose);
  const results = getVendorResults(compound.slug);
  const relatedCerts = certificates.filter((c) => c.compoundSlug === compound.slug);

  const dist = (["A", "B", "C", "D", "E"] as const).map((g) => ({
    g,
    count: results.filter((r) => r.grade === g).length,
  }));
  const maxCount = Math.max(...dist.map((d) => d.count), 1);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-faint absolute inset-0" />
        <Container className="relative py-14 sm:py-16">
          <Link href="/compounds" className="text-sm text-muted hover:text-cobalt">
            &larr; All compounds
          </Link>
          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-cobalt">
                {compound.category}
              </p>
              <h1 className="mt-2 font-serif text-5xl tracking-tight sm:text-6xl">
                {compound.name}
              </h1>
              <p className="mt-2 text-muted">{compound.formal}</p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">
                {compound.summary} {compound.uses}
              </p>
            </div>
            <div className="flex items-center gap-5 rounded-[var(--radius-card)] bg-white p-6 hairline">
              <GradeBadge grade={grade} size="lg" />
              <div>
                <div className="font-serif text-lg">{gradeMeta[grade].word}</div>
                <p className="max-w-[12rem] text-xs text-muted">
                  Catalog average across {compound.samples} samples
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] bg-line sm:grid-cols-4">
            {[
              { v: `${compound.avgPurity}%`, l: "Average purity" },
              { v: `${compound.avgDose}%`, l: "Average of label dose" },
              { v: `${compound.samples}`, l: "Samples tested" },
              { v: `${compound.vendors}`, l: "Vendors ranked" },
            ].map((s) => (
              <div key={s.l} className="bg-white p-6">
                <div className="font-serif text-3xl tracking-tight">{s.v}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-muted">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Distribution + order CTA */}
      <section className="py-14">
        <Container className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-[var(--radius-card)] bg-white p-7 hairline">
            <h2 className="font-serif text-2xl">Grade distribution</h2>
            <p className="mt-1 text-sm text-muted">
              How the ranked vendors fall across the grade scale.
            </p>
            <div className="mt-7 space-y-4">
              {dist.map((d) => (
                <div key={d.g} className="flex items-center gap-4">
                  <span className="w-4 font-mono text-sm text-muted">{d.g}</span>
                  <div className="h-7 flex-1 overflow-hidden rounded-full bg-mist">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(d.count / maxCount) * 100}%`,
                        backgroundColor: gradeMeta[d.g].color,
                        minWidth: d.count ? "2.5rem" : 0,
                      }}
                    />
                  </div>
                  <span className="w-6 text-right text-sm text-muted">{d.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grain relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] surface-cobalt p-8 text-white">
            <div>
              <span className="label-caps text-peri">Order a test</span>
              <h2 className="mt-3 font-serif text-3xl tracking-tight">
                Want {compound.name} from a specific vendor tested?
              </h2>
              <p className="mt-3 text-sm text-white/75">
                Send us a sample, or ask us to source a vendor of your choice. We
                publish the result either way.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/submit" variant="light">
                Submit a sample
              </Button>
              <Button
                href="/submit"
                variant="ghost"
                className="border-white/25 bg-transparent text-white hover:border-white"
              >
                Request a test
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Vendor ranking table */}
      <section className="bg-white py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-serif text-3xl tracking-tight">
              {compound.name} vendor ranking
            </h2>
            <span className="text-sm text-muted">{results.length} vendors</span>
          </div>

          <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] hairline">
            <div className="hidden grid-cols-[3rem_1fr_8rem_8rem_7rem] gap-4 border-b border-line bg-mist px-6 py-4 text-xs uppercase tracking-wide text-muted sm:grid">
              <span>Rank</span>
              <span>Vendor</span>
              <span className="text-right">Purity</span>
              <span className="text-right">Of label</span>
              <span className="text-right">Grade</span>
            </div>
            {results.map((r, i) => (
              <Link
                key={r.vendor.slug}
                href={`/vendors/${r.vendor.slug}`}
                className="grid grid-cols-2 items-center gap-3 border-b border-line px-6 py-4 transition-colors last:border-0 hover:bg-mist sm:grid-cols-[3rem_1fr_8rem_8rem_7rem] sm:gap-4"
              >
                <span className="font-mono text-sm text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-medium">
                  {r.vendor.name}
                  <span className="ml-2 hidden text-xs font-normal text-muted sm:inline">
                    {r.vendor.region}
                  </span>
                </span>
                <span className="text-right text-sm tabular-nums">{r.purity}%</span>
                <span className="hidden text-right text-sm tabular-nums sm:block">
                  {r.dose}%
                </span>
                <span className="flex justify-end">
                  <GradePill grade={r.grade} />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Related certificates */}
      {relatedCerts.length > 0 && (
        <section className="py-16">
          <Container>
            <h2 className="font-serif text-3xl tracking-tight">
              Published certificates
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {relatedCerts.map((cert) => (
                <Link
                  key={cert.id}
                  href={`/results/${cert.id}`}
                  className="group flex items-center justify-between rounded-[var(--radius-card)] bg-white p-6 hairline transition-all hover:-translate-y-1"
                >
                  <div>
                    <div className="font-mono text-xs text-cobalt">{cert.id}</div>
                    <div className="mt-1 font-serif text-xl">{cert.compound}</div>
                    <div className="mt-1 text-sm text-muted">
                      {cert.purity}% purity, {certificateDose(cert)}% of label, {cert.date}
                    </div>
                  </div>
                  <GradeBadge grade={certificateGrade(cert)} />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
