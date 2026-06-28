import Link from "next/link";
import type { Metadata } from "next";
import { Container, GradeBadge, GradePill } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { vendors, getVendorOverall } from "@/lib/vendors";
import { Grade } from "@/lib/compounds";

export const metadata: Metadata = {
  title: "Vendor Rankings",
  description:
    "Independent rankings of research compound vendors based on measured purity and quantity across every tested compound.",
};

export default function VendorsPage() {
  const order: Record<Grade, number> = { A: 0, B: 1, C: 2, D: 3, E: 4 };
  const ranked = vendors
    .map((v) => ({ vendor: v, overall: getVendorOverall(v.slug) }))
    .sort((a, b) => {
      if (order[a.overall.grade] !== order[b.overall.grade])
        return order[a.overall.grade] - order[b.overall.grade];
      return b.overall.avgPurity - a.overall.avgPurity;
    });

  return (
    <>
      <PageHero
        label="Vendor rankings"
        title="The vendors, graded on what we measured."
        intro="Rankings come from blind retail purchases and submitted samples. No vendor can pay to move up this list."
      />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="overflow-hidden rounded-[var(--radius-card)] bg-white hairline">
            <div className="hidden grid-cols-[3rem_1fr_8rem_8rem_8rem_6rem] gap-4 border-b border-line bg-mist px-6 py-4 text-xs uppercase tracking-wide text-muted md:grid">
              <span>Rank</span>
              <span>Vendor</span>
              <span className="text-right">Avg purity</span>
              <span className="text-right">Avg of label</span>
              <span className="text-right">Samples</span>
              <span className="text-right">Grade</span>
            </div>
            {ranked.map((row, i) => (
              <Link
                key={row.vendor.slug}
                href={`/vendors/${row.vendor.slug}`}
                className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-line px-6 py-4 transition-colors last:border-0 hover:bg-mist md:grid-cols-[3rem_1fr_8rem_8rem_8rem_6rem] md:gap-4"
              >
                <span className="font-mono text-sm text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="font-medium">{row.vendor.name}</span>
                  <span className="block text-xs text-muted">{row.vendor.region}</span>
                </span>
                <span className="hidden text-right text-sm tabular-nums md:block">
                  {row.overall.avgPurity}%
                </span>
                <span className="hidden text-right text-sm tabular-nums md:block">
                  {row.overall.avgDose}%
                </span>
                <span className="hidden text-right text-sm tabular-nums md:block">
                  {row.overall.samples}
                </span>
                <span className="flex justify-end">
                  <span className="md:hidden">
                    <GradePill grade={row.overall.grade} />
                  </span>
                  <span className="hidden md:block">
                    <GradeBadge grade={row.overall.grade} size="sm" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
