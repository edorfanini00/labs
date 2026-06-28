import type { Metadata } from "next";
import { Container, Label } from "@/components/ui";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How we source, test, grade, and publish research compound results, and how to read a certificate of analysis.",
};

const methods = [
  {
    n: "01",
    t: "Identity first",
    d: "Before a purity number means anything, we confirm the molecule is what the label claims. Mass spectrometry compares the observed mass to the expected mass. If identity fails, nothing else matters.",
  },
  {
    n: "02",
    t: "Purity by HPLC",
    d: "Reverse phase high performance liquid chromatography separates the main compound from related impurities. Each peak is reported as a share of total area, so a clean single peak is easy to spot and a messy synthesis is impossible to hide.",
  },
  {
    n: "03",
    t: "Quantity against the label",
    d: "We measure how much active compound the vial actually holds and compare it to the stated milligrams. Underfilling is the most common failure in this market and the one buyers notice least, so we treat it as a headline metric.",
  },
  {
    n: "04",
    t: "Blind sourcing",
    d: "A large share of what we test is bought through ordinary retail channels with no notice to the vendor. The vial that arrives is the vial we test, which keeps results representative of what a real customer receives.",
  },
];

export default function MethodologyPage() {
  return (
    <>
      <PageHero
        label="Methodology"
        title="How we turn a vial into a number you can trust."
        intro="Every result follows the same path. The method is fixed so comparisons across vendors and compounds stay honest."
      />

      <section className="py-14 sm:py-16">
        <Container className="max-w-4xl">
          <div className="space-y-5">
            {methods.map((m) => (
              <div
                key={m.n}
                className="grid gap-5 rounded-[var(--radius-card)] bg-white p-8 hairline sm:grid-cols-[5rem_1fr]"
              >
                <div className="font-serif text-4xl text-cobalt/30">{m.n}</div>
                <div>
                  <h2 className="font-serif text-2xl">{m.t}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{m.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Grade scale */}
          <div className="mt-14">
            <Label>The grade scale</Label>
            <h2 className="mt-3 font-serif text-3xl tracking-tight">
              Five grades, one combined score.
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              We weight purity and dose accuracy into a single score and map it to
              a letter. The scale is blunt on purpose, so a glance tells you
              whether a result is worth trusting.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-5">
              {[
                { g: "A", w: "Great", c: "var(--color-grade-a)" },
                { g: "B", w: "Good", c: "var(--color-grade-b)" },
                { g: "C", w: "Okay", c: "var(--color-grade-c)" },
                { g: "D", w: "Poor", c: "var(--color-grade-d)" },
                { g: "E", w: "Bad", c: "var(--color-grade-e)" },
              ].map((x) => (
                <div key={x.g} className="rounded-2xl bg-white p-5 text-center hairline">
                  <div
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl font-serif text-2xl text-white"
                    style={{ backgroundColor: x.c }}
                  >
                    {x.g}
                  </div>
                  <div className="mt-3 text-sm font-medium">{x.w}</div>
                </div>
              ))}
            </div>
          </div>

          {/* How to read a COA */}
          <div id="read-coa" className="mt-16 scroll-mt-24 rounded-[28px] bg-white p-9 hairline sm:p-11">
            <Label>For buyers</Label>
            <h2 className="mt-3 font-serif text-3xl tracking-tight">
              How to read a certificate of analysis.
            </h2>
            <ol className="mt-6 space-y-5">
              {[
                "Confirm identity is present. A report with no mass confirmation is not a complete certificate.",
                "Read purity as area percent, and look for impurity peaks beside the main one.",
                "Compare measured content to the label claim. A clean compound that is underfilled is still a bad value.",
                "Verify the certificate at its source. A PDF on its own proves nothing. Enter the identifier on our verification page.",
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cobalt/10 font-mono text-xs text-cobalt">
                    {i + 1}
                  </span>
                  <span className="text-muted">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>
    </>
  );
}
