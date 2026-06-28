import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { TestOrder } from "@/components/test-order";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order a Test or Submit a Sample",
  description:
    "Build a test for your research compound. Standard identity, purity, and quantity testing is free, with optional paid panels for endotoxins, heavy metals, and residual solvents.",
};

export default function SubmitPage() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="py-12 sm:py-16">
          <TestOrder />
        </Container>
      </section>

      {/* Disclaimer */}
      <section className="py-14">
        <Container>
          <h2 className="font-serif text-3xl tracking-tight">Just to be clear</h2>
          <div className="mt-6 grid gap-8 text-sm leading-relaxed text-muted md:grid-cols-2">
            <p>
              This web site is provided for educational and informational purposes
              only and does not constitute medical advice or professional services.
              The information provided is not intended to diagnose, treat, cure, or
              prevent any health problem or disease, and those seeking personal
              medical advice should consult a licensed physician. None of the
              statements on this site have been evaluated by any regulatory
              authority.
            </p>
            <div className="space-y-4">
              <p>
                The {site.shortName} ratings on this site reflect the analysis of
                tests conducted by or on behalf of {site.name}, and do not
                constitute an endorsement or recommendation.
              </p>
              <p>Compound testing services are available to United States residents only.</p>
              <p>
                {site.name} is not liable for any actions taken based on the
                information provided on this site. Your usage of the information is
                subject to our terms of use. For research use only.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
