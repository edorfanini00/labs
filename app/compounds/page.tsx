"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { GradeBadge } from "@/components/ui";
import { compounds, categories, gradeFromScores } from "@/lib/compounds";

export default function CompoundsPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(() => {
    return compounds.filter((c) => {
      const matchCat = active === "All" || c.category === active;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.formal.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [query, active]);

  return (
    <>
      <PageHero
        label="The catalog"
        title="Every compound we test, open to order."
        intro="Search the catalog, open a compound to see how each vendor ranks, or request a test for one we have not covered yet."
      >
        <div className="flex max-w-md items-center gap-3 rounded-full border border-line bg-white px-4 py-2.5">
          <svg viewBox="0 0 20 20" className="h-4 w-4 text-muted" fill="none">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
            <path d="m14 14 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search compounds, for example tirzepatide"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </div>
      </PageHero>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active === cat
                    ? "bg-cobalt text-white"
                    : "border border-line bg-white text-ink/70 hover:border-cobalt/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted">
            Showing {filtered.length} of {compounds.length} compounds
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => {
              const grade = gradeFromScores(c.avgPurity, c.avgDose);
              return (
                <Link
                  key={c.slug}
                  href={`/compounds/${c.slug}`}
                  className="group flex flex-col rounded-[var(--radius-card)] bg-white p-6 hairline transition-all duration-300 hover:-translate-y-1 hover:border-cobalt/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-2xl tracking-tight">{c.name}</h3>
                      <p className="mt-1 text-xs uppercase tracking-wide text-cobalt">
                        {c.category}
                      </p>
                    </div>
                    <GradeBadge grade={grade} />
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                    {c.summary}
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center">
                    <div>
                      <div className="font-serif text-lg">{c.avgPurity}%</div>
                      <div className="text-[0.65rem] uppercase tracking-wide text-muted">Purity</div>
                    </div>
                    <div>
                      <div className="font-serif text-lg">{c.samples}</div>
                      <div className="text-[0.65rem] uppercase tracking-wide text-muted">Samples</div>
                    </div>
                    <div>
                      <div className="font-serif text-lg">{c.vendors}</div>
                      <div className="text-[0.65rem] uppercase tracking-wide text-muted">Vendors</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-[var(--radius-card)] bg-white p-10 text-center hairline">
              <p className="font-serif text-2xl">No match in the catalog yet.</p>
              <p className="mt-2 text-muted">
                We can still source and test it for you.
              </p>
              <Link
                href="/submit"
                className="mt-5 inline-flex h-11 items-center rounded-full bg-cobalt px-6 text-sm font-medium text-white"
              >
                Request this test
              </Link>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
