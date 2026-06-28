import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = {
  title: "Researcher Access",
  description:
    "Unlimited access to the full database of compound test results, analytical files, and vendor comparisons.",
};

const benefits = [
  {
    t: "The full database",
    d: "Every published result across every compound, with no rate limits and no paywalled pages.",
  },
  {
    t: "Analytical files",
    d: "Download the underlying HPLC traces and mass spectrometry data behind each certificate.",
  },
  {
    t: "Vendor comparisons",
    d: "Compare any vendors side by side across purity, dose accuracy, and consistency over time.",
  },
  {
    t: "New result alerts",
    d: "Get notified the moment a compound or vendor you follow gets a fresh result.",
  },
];

export default function ResearchersPage() {
  return (
    <>
      <PageHero
        label="Researcher access"
        title="Full data access for researchers."
        intro="Open the entire record. Registration is free for verified researchers and keeps the data flowing into the public domain."
      />

      <section className="py-14 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((b) => (
              <div key={b.t} className="rounded-[var(--radius-card)] bg-white p-6 hairline">
                <h3 className="font-serif text-lg">{b.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.d}</p>
              </div>
            ))}
          </div>

          <LeadForm
            submitLabel="Request access"
            successTitle="You are on the list"
            successBody="We review researcher requests within two business days and email a sign in link once approved."
            fields={[
              { name: "name", label: "Full name", required: true, placeholder: "First and last" },
              { name: "email", label: "Email", type: "email", required: true, placeholder: "you@institution.com" },
              { name: "org", label: "Affiliation", placeholder: "Lab, company, or independent" },
              {
                name: "focus",
                label: "Primary interest",
                type: "select",
                placeholder: "What do you study",
                options: ["Metabolic", "Recovery", "Growth", "Longevity", "Other"],
              },
              {
                name: "use",
                label: "How will you use the data",
                type: "textarea",
                placeholder: "A sentence or two helps us approve faster",
              },
            ]}
          />
        </Container>
      </section>
    </>
  );
}
