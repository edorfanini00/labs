import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, GradeBadge, GradePill } from "@/components/ui";
import {
  vendors,
  getVendor,
  getVendorSummary,
  getVendorProducts,
  gradeFromScore,
  scoreColor,
} from "@/lib/vendors";
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
    title: `${vendor.name} Test Results and Score`,
    description: `Independent test results for ${vendor.name} across the compounds they sell.`,
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

  const summary = getVendorSummary(vendor.slug);
  const products = getVendorProducts(vendor.slug);
  const overallGrade = gradeFromScore(summary.avg);

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
              <div className="flex items-center gap-3">
                <h1 className="font-serif text-5xl tracking-tight sm:text-6xl">
                  {vendor.name}
                </h1>
                {vendor.verified && (
                  <span className="rounded-full bg-cobalt/10 px-3 py-1 text-xs font-medium text-cobalt">
                    Verified
                  </span>
                )}
                {vendor.caution && (
                  <span className="rounded-full bg-grade-d/10 px-3 py-1 text-xs font-medium text-grade-d">
                    Caution
                  </span>
                )}
              </div>
              <p className="mt-3 max-w-xl text-lg text-muted">{vendor.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                <span>{vendor.region}</span>
                <span>Established {vendor.established}</span>
                <span>{summary.products} products tested</span>
              </div>
            </div>
            <div className="flex items-center gap-5 rounded-[var(--radius-card)] bg-white p-6 hairline">
              <GradeBadge grade={overallGrade} size="lg" />
              <div>
                <div className="font-serif text-lg">{gradeMeta[overallGrade].word}</div>
                <p className="max-w-[12rem] text-xs text-muted">
                  Average score {summary.avg.toFixed(1)} across {summary.count} tests
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] bg-line sm:grid-cols-4">
            {[
              { v: summary.avg.toFixed(1), l: "Average score" },
              { v: summary.min.toFixed(1), l: "Lowest score" },
              { v: summary.max.toFixed(1), l: "Highest score" },
              { v: `${summary.count}`, l: "Tests run" },
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
            Results by product
          </h2>
          <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] bg-white hairline">
            <div className="hidden grid-cols-[1fr_7rem_7rem_7rem_6rem] gap-4 border-b border-line bg-mist px-6 py-4 text-xs uppercase tracking-wide text-muted sm:grid">
              <span>Compound</span>
              <span className="text-center">Score</span>
              <span className="text-right">Purity</span>
              <span className="text-right">Of label</span>
              <span className="text-right">Grade</span>
            </div>
            {products.map((p) => (
              <Link
                key={p.compound.slug}
                href={`/compounds/${p.compound.slug}`}
                className="grid grid-cols-2 items-center gap-3 border-b border-line px-6 py-4 transition-colors last:border-0 hover:bg-mist sm:grid-cols-[1fr_7rem_7rem_7rem_6rem] sm:gap-4"
              >
                <span className="font-medium">{p.compound.name}</span>
                <span className="flex justify-center">
                  <span
                    className="inline-block min-w-[2.6rem] rounded-full px-2 py-0.5 text-center text-xs font-semibold tabular-nums text-white"
                    style={{ backgroundColor: scoreColor(p.score) }}
                  >
                    {p.score.toFixed(1)}
                  </span>
                </span>
                <span className="hidden text-right text-sm tabular-nums sm:block">
                  {p.purity}%
                </span>
                <span className="hidden text-right text-sm tabular-nums sm:block">
                  {p.dose}%
                </span>
                <span className="flex justify-end">
                  <GradePill grade={p.grade} />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
