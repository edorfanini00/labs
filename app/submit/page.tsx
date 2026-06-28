import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { LeadForm } from "@/components/lead-form";
import { compounds } from "@/lib/compounds";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Submit a Sample or Request a Test",
  description:
    "Ship your research compound to our lab for free testing, or request that we source and test a specific vendor.",
};

export default function SubmitPage() {
  const compoundNames = compounds.map((c) => c.name);

  return (
    <>
      <PageHero
        label="Free testing"
        title="Send a sample, or order a test."
        intro="Ship us a vial and we will test it for purity and quantity at no cost. Prefer we buy it blind? Name a compound and a vendor and we will source it ourselves."
      />

      <section className="py-14 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <LeadForm
            submitLabel="Send my request"
            successTitle="Request received"
            successBody="We will email you a shipping address and a tracking identifier. Once your sample arrives, testing begins within five business days."
            fields={[
              { name: "name", label: "Your name", required: true, placeholder: "First and last" },
              { name: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
              {
                name: "type",
                label: "Request type",
                type: "select",
                required: true,
                placeholder: "Choose one",
                options: ["I will ship my own sample", "Source and test a vendor for me"],
              },
              {
                name: "compound",
                label: "Compound",
                type: "select",
                required: true,
                placeholder: "Select a compound",
                options: [...compoundNames, "Other, not listed"],
              },
              { name: "vendor", label: "Vendor (if known)", placeholder: "Where it came from" },
              {
                name: "notes",
                label: "Anything we should know",
                type: "textarea",
                placeholder: "Lot details, label claim in milligrams, storage conditions",
              },
            ]}
          />

          <aside className="space-y-5">
            <div className="rounded-[var(--radius-card)] bg-white p-7 hairline">
              <h3 className="font-serif text-xl">What we measure</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li className="flex gap-3">
                  <span className="text-cobalt">01</span> Identity by mass spectrometry
                </li>
                <li className="flex gap-3">
                  <span className="text-cobalt">02</span> Purity by reverse phase HPLC
                </li>
                <li className="flex gap-3">
                  <span className="text-cobalt">03</span> Real fill against the label claim
                </li>
              </ul>
            </div>
            <div className="grain relative overflow-hidden rounded-[var(--radius-card)] surface-cobalt p-7 text-white">
              <h3 className="font-serif text-xl">Why free</h3>
              <p className="mt-3 text-sm text-white/80">
                Every sample you send becomes a public result. The more we test,
                the harder it gets to sell something the label cannot back up.
              </p>
              <p className="mt-4 text-sm text-white/60">
                Ship to {site.name}, {site.location}.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
