"use client";

import { useState } from "react";
import Link from "next/link";
import { Container, GradeBadge } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import {
  getCertificate,
  certificates,
  certificateGrade,
  certificateDose,
  type Certificate,
} from "@/lib/certificates";

export default function VerifyPage() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<
    { status: "idle" } | { status: "found"; cert: Certificate } | { status: "missing"; q: string }
  >({ status: "idle" });

  function check(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    const cert = getCertificate(q);
    setResult(cert ? { status: "found", cert } : { status: "missing", q });
  }

  return (
    <>
      <PageHero
        label="Certificate verification"
        title="Verify a certificate of analysis."
        intro="Enter the certificate identifier printed on the document. Only certificates that resolve here are authentic. A file that cannot be verified should not be trusted."
      />

      <section className="py-14 sm:py-16">
        <Container className="max-w-3xl">
          <form
            onSubmit={check}
            className="flex flex-col gap-3 rounded-[var(--radius-card)] bg-white p-3 hairline sm:flex-row"
          >
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Certificate ID, for example VRA7K429Q"
              className="h-13 flex-1 rounded-2xl bg-mist px-5 py-3.5 font-mono text-sm uppercase tracking-wider outline-none placeholder:normal-case placeholder:tracking-normal placeholder:font-sans placeholder:text-muted"
            />
            <button
              type="submit"
              className="inline-flex h-13 items-center justify-center rounded-2xl bg-cobalt px-7 py-3.5 font-medium text-white transition-colors hover:bg-cobalt-deep"
            >
              Verify
            </button>
          </form>

          {result.status === "missing" && (
            <div className="mt-6 rounded-[var(--radius-card)] border border-grade-e/30 bg-grade-e/5 p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-grade-e/15 text-grade-e">
                  !
                </span>
                <h3 className="font-serif text-xl text-grade-e">
                  No certificate found
                </h3>
              </div>
              <p className="mt-3 text-sm text-muted">
                We have no record matching{" "}
                <span className="font-mono text-ink">{result.q}</span>. If this
                identifier came from a PDF, treat the document as unverified. The
                only authoritative version of any result lives on this site.
              </p>
            </div>
          )}

          {result.status === "found" && (
            <div className="mt-6 rounded-[var(--radius-card)] border border-grade-a/30 bg-grade-a/5 p-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-grade-a/15 text-grade-a">
                    &#10003;
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-grade-a">
                      Certificate verified
                    </h3>
                    <p className="font-mono text-xs text-muted">{result.cert.id}</p>
                  </div>
                </div>
                <GradeBadge grade={certificateGrade(result.cert)} />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { l: "Compound", v: result.cert.compound },
                  { l: "Purity", v: `${result.cert.purity}%` },
                  { l: "Of label", v: `${certificateDose(result.cert)}%` },
                  { l: "Date", v: result.cert.date },
                ].map((x) => (
                  <div key={x.l}>
                    <div className="text-xs uppercase tracking-wide text-muted">{x.l}</div>
                    <div className="mt-1 font-serif text-lg">{x.v}</div>
                  </div>
                ))}
              </div>
              <Link
                href={`/results/${result.cert.id}`}
                className="mt-6 inline-flex h-11 items-center rounded-full bg-cobalt px-6 text-sm font-medium text-white transition-colors hover:bg-cobalt-deep"
              >
                Open the full result
              </Link>
            </div>
          )}

          <div className="mt-12 rounded-[var(--radius-card)] bg-white p-7 hairline">
            <h3 className="font-serif text-xl">Try a sample certificate</h3>
            <p className="mt-2 text-sm text-muted">
              These identifiers resolve to real published results in this demo
              record.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {certificates.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setValue(c.id);
                    setResult({ status: "found", cert: c });
                  }}
                  className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-cobalt transition-colors hover:border-cobalt"
                >
                  {c.id}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
