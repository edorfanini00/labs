import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, GradeBadge, GradePill } from "@/components/ui";
import { vendors, getVendor, getVendorOverall, getVendorScores } from "@/lib/vendors";
import { gradeMeta } from "@/lib/compounds";

export function generateStaticParams() {
  return vendors.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vendor = getVendor(slug);
  if (!vendor) return { title: "Vendor not found" };
  return {
    title: `${vendor.name} Test Results and Grade`,
    description: `Independent test results for ${vendor.name} across the compounds we cover.`,
  };
}

export default async function VendorDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vendor = getVendor(slug);
  if (!vendor) notFound();

  const overall = getVendorOverall(vendor.slug);
  const scores = getVendorScores(vendor.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-faint absolute inset-0" />
        <Container className="relative py-14 sm:py-16">
          <Link href="/vendors" className="text-sm text-muted hover:text-cobalt">
            &larr; All vendors
          </Link>
          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-serif text-5xl tracking-tight sm:text-6xl">
                {vendor.name}
              </h1>
              <p className="mt-3 max-w-xl text-lg text-muted">{vendor.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                <span>{vendor.region}</span>
                <span>Established {vendor.established}</span>
                <span>{overall.compoundsCovered} compounds covered</span>
              </div>
            </div>
            <div className="flex items-center gap-5 rounded-[var(--radius-card)] bg-white p-6 hairline">
              <GradeBadge grade={overall.grade} size="lg" />
              <div>
                <div className="font-serif text-lg">{gradeMeta[overall.grade].word}</div>
                <p className="max-w-[12rem] text-xs text-muted">
                  Overall grade across {overall.samples} samples
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-[var(--radius-card)] bg-line">
            {[
              { v: `${overall.avgPurity}%`, l: "Average purity" },
              { v: `${overall.avgDose}%`, l: "Average of label dose" },
              { v: `${overall.samples}`, l: "Samples tested" },
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

      <section className="py-14 sm:py-16">
        <Container>
          <h2 className="font-serif text-3xl tracking-tight">
            Results by compound
          </h2>
          <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] bg-white hairline">
            <div className="hidden grid-cols-[1fr_8rem_8rem_7rem] gap-4 border-b border-line bg-mist px-6 py-4 text-xs uppercase tracking-wide text-muted sm:grid">
              <span>Compound</span>
              <span className="text-right">Purity</span>
              <span className="text-right">Of label</span>
              <span className="text-right">Grade</span>
            </div>
            {scores.map((s) => (
              <Link
                key={s.compoundSlug}
                href={`/compounds/${s.compoundSlug}`}
                className="grid grid-cols-2 items-center gap-3 border-b border-line px-6 py-4 transition-colors last:border-0 hover:bg-mist sm:grid-cols-[1fr_8rem_8rem_7rem] sm:gap-4"
              >
                <span className="font-medium">{s.compoundName}</span>
                <span className="text-right text-sm tabular-nums">{s.purity}%</span>
                <span className="hidden text-right text-sm tabular-nums sm:block">
                  {s.dose}%
                </span>
                <span className="flex justify-end">
                  <GradePill grade={s.grade} />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
