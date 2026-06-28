import type { Metadata } from "next";
import { Container, Stat, Button } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Veridian Assay tests research compounds independently and publishes everything, because a safer market starts with an honest number.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About the lab"
        title="We test compounds so buyers do not have to take a label on faith."
        intro="More people are sourcing research compounds directly, and the market that serves them is chaotic. We exist to add one thing it lacks: independent, published proof."
      />

      <section className="py-14 sm:py-16">
        <Container className="max-w-3xl space-y-6 text-lg leading-relaxed text-ink/80">
          <p>
            Buying compounds online carries real risk. Mislabeling, contamination,
            wrong dosages, and zero accountability are common, and a single
            certificate handed over by a seller does little to fix that.
          </p>
          <p>
            {site.name} works the problem from the supply side. We buy products
            the way a normal customer would, test them with the same fixed method
            every time, and publish the results in full. No vendor pays us for a
            grade, and no result is hidden because it is unflattering.
          </p>
          <p>
            Over time those published numbers add up to something the market has
            never had: a real dataset of who delivers what they promise. That
            record belongs to everyone, and it is the most useful thing we can
            build.
          </p>
        </Container>

        <Container className="mt-14">
          <div className="grain relative overflow-hidden rounded-[28px] surface-cobalt px-8 py-12 text-white sm:px-12">
            <div className="grid gap-8 sm:grid-cols-4">
              <Stat tone="light" value={`${site.stats.samples.toLocaleString()}`} label="Samples tested" />
              <Stat tone="light" value={`${site.stats.vendors}`} label="Vendors ranked" />
              <Stat tone="light" value={`${site.stats.compounds}`} label="Compounds covered" />
              <Stat tone="light" value={site.stats.accuracy} label="Method tolerance" />
            </div>
          </div>
        </Container>

        <Container id="contact" className="mt-14 max-w-3xl scroll-mt-24">
          <div className="rounded-[var(--radius-card)] bg-white p-9 hairline">
            <h2 className="font-serif text-3xl tracking-tight">Get in touch</h2>
            <p className="mt-3 text-muted">
              Questions about a result, a vendor, or how to send us a sample? We
              read everything.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-cobalt hover:underline"
              >
                {site.email}
              </a>
              <span className="h-4 w-px bg-line" />
              <span className="text-muted">{site.location}</span>
            </div>
            <div className="mt-7">
              <Button href="/submit">Submit a sample</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
