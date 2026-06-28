import Link from "next/link";
import { Container, Label, Button, GradePill, Stat } from "@/components/ui";
import { Mark } from "@/components/logo";
import { site } from "@/lib/site";
import { compounds } from "@/lib/compounds";
import { getVendorResults } from "@/lib/vendors";
import { posts } from "@/lib/journal";

export default function Home() {
  const spotlight = compounds.filter((c) => c.spotlight).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grid-faint absolute inset-0" />
        <div className="pointer-events-none absolute -right-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-peri/40 blur-[120px]" />
        <Container className="relative grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div className="animate-risein">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-grade-a" />
              <span className="text-xs text-muted">
                {site.stats.samples.toLocaleString()} samples tested and published
              </span>
            </div>
            <h1 className="mt-6 font-serif text-[2.9rem] leading-[1.05] tracking-tight sm:text-6xl">
              Proof before you trust
              <br />
              <span className="italic text-cobalt">a single vial.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              {site.name} is an independent laboratory for research compounds. We
              buy, test, and openly publish purity and quantity so you can verify
              what is really in the vial.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/compounds">Browse compounds</Button>
              <Button href="/verify" variant="ghost">
                Verify a COA
              </Button>
            </div>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-7">
              <Stat value={`${site.stats.compounds}`} label="Compounds covered" />
              <Stat value={`${site.stats.vendors}`} label="Vendors ranked" />
              <Stat value={site.stats.accuracy} label="Method tolerance" />
            </div>
          </div>

          {/* Bento collage echoing the brand moodboard */}
          <div className="animate-risein grid grid-cols-2 gap-4 [animation-delay:120ms]">
            <div className="grain relative col-span-2 flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] surface-cobalt p-7 text-white">
              <Mark className="h-10 w-10" tone="#dfe3fb" />
              <div className="mt-10">
                <div className="font-serif text-5xl tracking-tight">
                  {site.stats.samples.toLocaleString()}
                </div>
                <p className="mt-1 text-sm text-white/70">
                  Independent results in the public record
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-[var(--radius-card)] bg-white p-6 hairline">
              <span className="label-caps text-cobalt">Purity</span>
              <div>
                <div className="font-serif text-4xl">99.1%</div>
                <p className="mt-1 text-xs text-muted">
                  Verified main peak on a recent tirzepatide lot
                </p>
              </div>
            </div>

            <div className="grain relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] surface-cobalt-soft p-6 text-white">
              <span className="label-caps text-peri">Quantity</span>
              <div>
                <div className="font-serif text-4xl">9.91 mg</div>
                <p className="mt-1 text-xs text-white/70">
                  Measured against a 10 mg label claim
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust strip */}
      <section className="border-y border-line bg-white">
        <Container className="flex flex-wrap items-center justify-between gap-8 py-7">
          <p className="font-serif text-lg text-ink/80">
            No vendor pays for a passing grade.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted">
            <span>Blind retail sourcing</span>
            <span className="h-3 w-px bg-line" />
            <span>HPLC and mass spectrometry</span>
            <span className="h-3 w-px bg-line" />
            <span>Every result published</span>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <Label>How it works</Label>
            <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-[2.75rem]">
              Three steps from a sealed vial to a public result.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "We acquire the sample",
                d: "We buy compounds through ordinary retail channels with no notice to the vendor, or you ship us yours to test for free.",
              },
              {
                n: "02",
                t: "We run the analysis",
                d: "Mass spectrometry confirms identity, then reverse phase HPLC measures purity and a calibrated method measures the real fill.",
              },
              {
                n: "03",
                t: "We publish openly",
                d: "Every result lives at a verifiable address with the full trace, so a certificate can never be faked or edited.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="group rounded-[var(--radius-card)] bg-white p-7 hairline transition-all duration-300 hover:-translate-y-1 hover:border-cobalt/40"
              >
                <div className="font-mono text-sm text-cobalt">{step.n}</div>
                <h3 className="mt-5 font-serif text-xl">{step.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Top ratings */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <Label>Top ratings</Label>
              <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-[2.75rem]">
                Where the best vendors actually rank.
              </h2>
            </div>
            <Link
              href="/compounds"
              className="text-sm font-medium text-cobalt hover:underline"
            >
              See all compounds
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {spotlight.map((compound) => {
              const top = getVendorResults(compound.slug).slice(0, 3);
              return (
                <Link
                  key={compound.slug}
                  href={`/compounds/${compound.slug}`}
                  className="group rounded-[var(--radius-card)] bg-mist p-7 transition-all duration-300 hover:bg-peri-soft/50"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-2xl tracking-tight">
                      {compound.name}
                    </h3>
                    <span className="text-xs text-muted">
                      {compound.vendors} vendors
                    </span>
                  </div>
                  <ol className="mt-5 space-y-2.5">
                    {top.map((r, i) => (
                      <li
                        key={r.vendor.slug}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-xs text-muted">
                            {i + 1}
                          </span>
                          <span className="text-sm text-ink/85">
                            {r.vendor.name}
                          </span>
                        </span>
                        <GradePill grade={r.grade} />
                      </li>
                    ))}
                  </ol>
                  <div className="mt-5 flex items-center gap-1 text-sm font-medium text-cobalt">
                    View full ranking
                    <span className="transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Verify + Submit feature split */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-5 lg:grid-cols-2">
          <div className="grain relative overflow-hidden rounded-[var(--radius-card)] surface-cobalt p-9 text-white sm:p-11">
            <Label className="text-peri">Certificate verification</Label>
            <h3 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
              Verify a COA in seconds.
            </h3>
            <p className="mt-4 max-w-md text-white/75">
              Someone handed you a {site.shortName} certificate. Enter the
              certificate identifier and read the authoritative result straight
              from our records.
            </p>
            <div className="mt-8">
              <Button href="/verify" variant="light">
                Check a certificate
              </Button>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[var(--radius-card)] bg-white p-9 hairline sm:p-11">
            <div>
              <Label>Free testing</Label>
              <h3 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                Send us your sample.
              </h3>
              <p className="mt-4 max-w-md text-muted">
                Ship a compound to our lab in {site.location} and we will test it
                for purity and quantity at no cost. You can also request that we
                source and test a specific vendor.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/submit">Submit a sample</Button>
              <Button href="/submit" variant="ghost">
                Request a test
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Access cards */}
      <section className="bg-white py-20 sm:py-24">
        <Container className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[var(--radius-card)] bg-mist p-9 hairline">
            <Label>Researcher access</Label>
            <h3 className="mt-3 font-serif text-3xl tracking-tight">
              Unlimited data for researchers.
            </h3>
            <p className="mt-4 text-muted">
              Open the full database of results, download analytical files, and
              compare vendors across every compound we cover.
            </p>
            <div className="mt-7">
              <Button href="/researchers" variant="ghost">
                Register as a researcher
              </Button>
            </div>
          </div>
          <div className="rounded-[var(--radius-card)] bg-mist p-9 hairline">
            <Label>Vendor services</Label>
            <h3 className="mt-3 font-serif text-3xl tracking-tight">
              Lead with transparency.
            </h3>
            <p className="mt-4 text-muted">
              Retail compounds with confidence. Registered vendors earn
              verifiable certificates and a place in our public rankings.
            </p>
            <div className="mt-7">
              <Button href="/vendor-services" variant="ghost">
                Get registered
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Journal teaser */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Label>The journal</Label>
              <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-[2.75rem]">
                Notes from the lab.
              </h2>
            </div>
            <Link href="/journal" className="text-sm font-medium text-cobalt hover:underline">
              Read the journal
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className="group flex flex-col rounded-[var(--radius-card)] bg-white p-7 hairline transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="text-cobalt">{post.category}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="mt-4 font-serif text-xl leading-snug">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <span className="mt-5 text-xs text-muted">{post.date}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="pb-24">
        <Container>
          <div className="grain relative overflow-hidden rounded-[28px] surface-ink px-8 py-16 text-center text-white sm:py-20">
            <Mark className="mx-auto h-10 w-10" tone="#b9c2f7" />
            <h2 className="mx-auto mt-6 max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
              A safer market starts with an honest number.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/70">
              Browse the results, verify a certificate, or send us a sample. The
              record stays open to everyone.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href="/compounds" variant="light">
                Browse compounds
              </Button>
              <Button
                href="/submit"
                variant="ghost"
                className="border-white/25 bg-transparent text-white hover:border-white hover:text-white"
              >
                Submit a sample
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
