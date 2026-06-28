"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Grade, gradeMeta } from "@/lib/compounds";
import { scoreColor, type VendorSummary } from "@/lib/vendors";

function Vial() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist text-muted">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M9 3h6M10 3v8.5L6.5 18a3 3 0 0 0 2.6 4.5h5.8A3 3 0 0 0 17.5 18L14 11.5V3"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M8 14h8" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </span>
  );
}

function Medal() {
  return (
    <span title="Verified vendor" className="text-cobalt">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <circle cx="12" cy="10" r="6" opacity="0.9" />
        <path d="M9 14l-1.5 6L12 18l4.5 2L15 14" fill="currentColor" opacity="0.6" />
      </svg>
    </span>
  );
}

function Caution() {
  return (
    <span title="Caution flagged" className="text-grade-d">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
        <path d="M12 3 22 20H2L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 10v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="currentColor" />
      </svg>
    </span>
  );
}

function GradeChip({ grade, className = "" }: { grade: Grade; className?: string }) {
  return (
    <span
      className={`flex h-7 w-7 items-center justify-center rounded-full bg-white/25 text-sm font-semibold text-white ring-1 ring-white/40 ${className}`}
    >
      {grade}
    </span>
  );
}

function RatingsRange({ best, worst }: { best: Grade; worst: Grade }) {
  const single = best === worst;
  const bg = single
    ? gradeMeta[best].color
    : `linear-gradient(90deg, ${gradeMeta[best].color}, ${gradeMeta[worst].color})`;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-1.5 py-1"
      style={{ background: bg }}
    >
      <GradeChip grade={best} />
      {single ? (
        <GradeChip grade={best} className="-ml-4" />
      ) : (
        <>
          <span className="px-0.5 text-[0.7rem] text-white/90">to</span>
          <GradeChip grade={worst} />
        </>
      )}
    </span>
  );
}

function ScorePill({ value }: { value: number }) {
  return (
    <span
      className="inline-block min-w-[2.6rem] rounded-full px-2 py-0.5 text-center text-xs font-semibold tabular-nums text-white"
      style={{ backgroundColor: scoreColor(value) }}
    >
      {value.toFixed(1)}
    </span>
  );
}

export function VendorTable({ rows }: { rows: VendorSummary[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.vendor.name.toLowerCase().includes(q) ||
        r.vendor.region.toLowerCase().includes(q)
    );
  }, [query, rows]);

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className="text-sm font-medium text-ink/70">Search</span>
        <div className="flex w-full max-w-xs items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5">
          <svg viewBox="0 0 20 20" className="h-4 w-4 text-muted" fill="none">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
            <path d="m14 14 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vendors"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-[var(--radius-card)] bg-white hairline">
        <table className="w-full min-w-[860px] border-collapse text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-muted">
              <th className="px-6 pt-5 pb-1 text-left font-medium" />
              <th className="px-3 pt-5 pb-1 font-medium" />
              <th className="px-3 pt-5 pb-1 font-medium" />
              <th
                colSpan={6}
                className="border-b border-line px-3 pt-5 pb-2 text-center font-medium tracking-[0.2em]"
              >
                Tests
              </th>
            </tr>
            <tr className="text-xs uppercase tracking-wide text-muted">
              <th className="px-6 py-3 text-left font-medium">Vendor name</th>
              <th className="px-3 py-3 text-left font-medium">Ratings range</th>
              <th className="px-3 py-3 text-center font-medium">Products</th>
              <th className="px-3 py-3 text-center font-medium">Count</th>
              <th className="px-3 py-3 text-center font-medium">Avg</th>
              <th className="px-3 py-3 text-center font-medium">Min</th>
              <th className="px-3 py-3 text-center font-medium">Max</th>
              <th className="px-3 py-3 text-left font-medium">Oldest</th>
              <th className="px-3 py-3 text-left font-medium">Most Recent</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.vendor.slug}
                className="border-t border-line transition-colors hover:bg-mist/60"
              >
                <td className="px-6 py-4">
                  <Link
                    href={`/vendors/${r.vendor.slug}`}
                    className="flex items-center gap-3"
                  >
                    <Vial />
                    <span className="flex items-center gap-1.5">
                      <span className="font-semibold text-cobalt hover:underline">
                        {r.vendor.name}
                      </span>
                      {r.vendor.verified && <Medal />}
                      {r.vendor.caution && <Caution />}
                    </span>
                  </Link>
                </td>
                <td className="px-3 py-4">
                  <RatingsRange best={r.bestGrade} worst={r.worstGrade} />
                </td>
                <td className="px-3 py-4 text-center tabular-nums text-ink/70">
                  {r.products}
                </td>
                <td className="px-3 py-4 text-center tabular-nums text-ink/70">
                  {r.count}
                </td>
                <td className="px-3 py-4 text-center">
                  <ScorePill value={r.avg} />
                </td>
                <td className="px-3 py-4 text-center">
                  <ScorePill value={r.min} />
                </td>
                <td className="px-3 py-4 text-center">
                  <ScorePill value={r.max} />
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-muted">{r.oldest}</td>
                <td className="px-3 py-4 whitespace-nowrap text-muted">
                  {r.mostRecent}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-center text-muted">No vendors match that search.</p>
      )}
    </div>
  );
}
