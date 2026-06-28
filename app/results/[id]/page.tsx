import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, GradeBadge } from "@/components/ui";
import { Mark } from "@/components/logo";
import {
  certificates,
  getCertificate,
  certificateGrade,
  certificateDose,
} from "@/lib/certificates";
import { gradeMeta } from "@/lib/compounds";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return certificates.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const cert = getCertificate(id);
  if (!cert) return { title: "Result not found" };
  return {
    title: `Result ${cert.id} for ${cert.compound}`,
    description: `Verified result for ${cert.compound}: ${cert.purity}% purity at ${certificateDose(cert)}% of label claim.`,
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cert = getCertificate(id);
  if (!cert) notFound();

  const grade = certificateGrade(cert);
  const dose = certificateDose(cert);
  const maxRt = Math.max(...cert.hplc.map((p) => p.rt)) + 1.5;

  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-4xl">
        <Link href="/verify" className="text-sm text-muted hover:text-cobalt">
          &larr; Verify another certificate
        </Link>

        <article className="mt-6 overflow-hidden rounded-[28px] bg-white hairline">
          {/* Certificate header */}
          <header className="grain relative overflow-hidden surface-cobalt px-8 py-9 text-white sm:px-11">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Mark className="h-8 w-8" tone="#dfe3fb" />
                <div>
                  <div className="font-serif text-lg leading-none">
                    {site.shortName} <span className="opacity-60">Assay</span>
                  </div>
                  <div className="label-caps mt-1 text-peri">Certificate of analysis</div>
                </div>
              </div>
              <div className="rounded-full bg-white/15 px-3 py-1.5 font-mono text-xs">
                {cert.id}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">
                  {cert.compound}
                </h1>
                <p className="mt-1 text-sm text-white/70">Tested {cert.date}</p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/12 px-4 py-3">
                <GradeBadge grade={grade} />
                <div>
                  <div className="text-sm font-medium">{gradeMeta[grade].word}</div>
                  <div className="text-xs text-white/70">Overall outcome</div>
                </div>
              </div>
            </div>
          </header>

          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
            {[
              { l: "Purity", v: `${cert.purity}%` },
              { l: "Label claim", v: `${cert.labelClaimMg} mg` },
              { l: "Measured", v: `${cert.measuredMg} mg` },
              { l: "Of label", v: `${dose}%` },
            ].map((m) => (
              <div key={m.l} className="bg-white p-6">
                <div className="text-xs uppercase tracking-wide text-muted">{m.l}</div>
                <div className="mt-1 font-serif text-2xl tracking-tight">{m.v}</div>
              </div>
            ))}
          </div>

          <div className="space-y-10 px-8 py-9 sm:px-11">
            {/* Identity */}
            <div>
              <h2 className="font-serif text-2xl">Identity confirmation</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-mist p-5">
                  <div className="text-xs uppercase tracking-wide text-muted">Status</div>
                  <div className="mt-1 flex items-center gap-2 font-medium text-grade-a">
                    <span>&#10003;</span> Confirmed
                  </div>
                </div>
                <div className="rounded-2xl bg-mist p-5">
                  <div className="text-xs uppercase tracking-wide text-muted">Expected mass</div>
                  <div className="mt-1 font-mono">{cert.massExpected} Da</div>
                </div>
                <div className="rounded-2xl bg-mist p-5">
                  <div className="text-xs uppercase tracking-wide text-muted">Observed mass</div>
                  <div className="mt-1 font-mono">{cert.massObserved} Da</div>
                </div>
              </div>
            </div>

            {/* Chromatogram */}
            <div>
              <h2 className="font-serif text-2xl">HPLC chromatogram</h2>
              <p className="mt-1 text-sm text-muted">{cert.method}</p>
              <div className="mt-5 rounded-2xl bg-ink p-6">
                <svg viewBox="0 0 600 220" className="w-full" role="img">
                  <line x1="40" y1="180" x2="580" y2="180" stroke="#3a4063" strokeWidth="1" />
                  <line x1="40" y1="20" x2="40" y2="180" stroke="#3a4063" strokeWidth="1" />
                  {cert.hplc.map((p) => {
                    const x = 40 + (p.rt / maxRt) * 540;
                    const h = (p.area / 100) * 150;
                    return (
                      <g key={p.label}>
                        <path
                          d={`M ${x - 9} 180 Q ${x} ${180 - h} ${x} ${180 - h} Q ${x} ${180 - h} ${x + 9} 180 Z`}
                          fill="#4a5cf0"
                          opacity={p.area > 50 ? 0.95 : 0.6}
                        />
                        <text x={x} y={195} fontSize="9" fill="#8b91b5" textAnchor="middle">
                          {p.rt}
                        </text>
                      </g>
                    );
                  })}
                  <text x="40" y="14" fontSize="9" fill="#8b91b5">
                    mAU
                  </text>
                  <text x="560" y="210" fontSize="9" fill="#8b91b5">
                    min
                  </text>
                </svg>
              </div>
              <div className="mt-5 overflow-hidden rounded-2xl hairline">
                <div className="grid grid-cols-[1fr_6rem_6rem] gap-3 border-b border-line bg-mist px-5 py-3 text-xs uppercase tracking-wide text-muted">
                  <span>Peak</span>
                  <span className="text-right">RT (min)</span>
                  <span className="text-right">Area %</span>
                </div>
                {cert.hplc.map((p) => (
                  <div
                    key={p.label}
                    className="grid grid-cols-[1fr_6rem_6rem] gap-3 border-b border-line px-5 py-3 text-sm last:border-0"
                  >
                    <span>{p.label}</span>
                    <span className="text-right font-mono">{p.rt}</span>
                    <span className="text-right font-mono">{p.area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer meta */}
            <div className="grid gap-4 border-t border-line pt-7 sm:grid-cols-2">
              <div className="text-sm text-muted">
                <div>Instrument: {cert.instrument}</div>
                <div className="mt-1">Analyst: {cert.analyst}</div>
                <div className="mt-1">Laboratory: {site.name}, {site.location}</div>
              </div>
              <p className="text-sm text-muted sm:text-right">
                This page is the authoritative version of certificate {cert.id}.
                Any PDF copy should match it exactly. For research use only.
              </p>
            </div>
          </div>
        </article>

        <div className="mt-6 text-center">
          <Link
            href={`/compounds/${cert.compoundSlug}`}
            className="text-sm font-medium text-cobalt hover:underline"
          >
            See all {cert.compound} results &rarr;
          </Link>
        </div>
      </Container>
    </section>
  );
}
