import type { Metadata } from "next";
import { Container, Button } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = {
  title: "Vendor Services",
  description:
    "Registered vendors earn verifiable certificates and a place in the public rankings. Lead with transparency.",
};

const steps = [
  { n: "01", t: "Register", d: "Tell us which compounds you sell and how you source them." },
  { n: "02", t: "We test blind", d: "We buy your products through normal channels with no special handling." },
  { n: "03", t: "You get listed", d: "Your results join the public rankings and your certificates become verifiable." },
];

export default function VendorServicesPage() {
  return (
    <>
      <PageHero
        label="Vendor services"
        title="Lead with transparency."
        intro="Do you retail research compounds? Welcome scrutiny instead of avoiding it. Registered vendors turn independent testing into a competitive advantage."
      >
        <Button href="#register">Get registered</Button>
      </PageHero>

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-[var(--radius-card)] bg-white p-7 hairline">
                <div className="font-mono text-sm text-cobalt">{s.n}</div>
                <h3 className="mt-4 font-serif text-xl">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="grain relative overflow-hidden rounded-[var(--radius-card)] surface-ink p-9 text-white">
              <h2 className="font-serif text-3xl tracking-tight">
                The rules are simple.
              </h2>
              <ul className="mt-6 space-y-4 text-sm text-white/75">
                <li className="flex gap-3">
                  <span className="text-peri">&#10003;</span> No vendor pays for a grade. Ever.
                </li>
                <li className="flex gap-3">
                  <span className="text-peri">&#10003;</span> We choose which lots to buy, not you.
                </li>
                <li className="flex gap-3">
                  <span className="text-peri">&#10003;</span> Results publish whether they flatter you or not.
                </li>
                <li className="flex gap-3">
                  <span className="text-peri">&#10003;</span> Certificates carry no logo to fake, only a verifiable link.
                </li>
              </ul>
            </div>

            <div id="register">
              <LeadForm
                submitLabel="Register my brand"
                successTitle="Registration started"
                successBody="Our vendor team will reach out within three business days to confirm your catalog and begin sourcing."
                fields={[
                  { name: "brand", label: "Brand name", required: true, placeholder: "Your storefront" },
                  { name: "contact", label: "Contact name", required: true, placeholder: "Who we talk to" },
                  { name: "email", label: "Email", type: "email", required: true, placeholder: "you@brand.com" },
                  { name: "site", label: "Website", placeholder: "https://" },
                  {
                    name: "catalog",
                    label: "Compounds you sell",
                    type: "textarea",
                    placeholder: "List the compounds you want tested and listed",
                  },
                ]}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
