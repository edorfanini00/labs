import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { VendorTable } from "@/components/vendor-table";
import { getVendorTable } from "@/lib/vendors";

export const metadata: Metadata = {
  title: "Vendor Rankings",
  description:
    "Independent rankings of research compound vendors based on measured test scores across every compound they sell.",
};

export default function VendorsPage() {
  const rows = getVendorTable();

  return (
    <>
      <PageHero
        label="Vendor rankings"
        title="The vendors, scored on what we measured."
        intro="Scores run from zero to ten and come from blind retail purchases and submitted samples. The ratings range shows the spread from a vendor's best product to its worst. No vendor can pay to move up this list."
      />

      <section className="py-12 sm:py-16">
        <Container>
          <VendorTable rows={rows} />
        </Container>
      </section>
    </>
  );
}
