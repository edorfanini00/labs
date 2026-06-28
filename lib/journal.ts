export type Post = {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  excerpt: string;
  category: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "what-a-coa-actually-proves",
    title: "What a COA Actually Proves, and What It Does Not",
    date: "12 Jun 2026",
    readingTime: "6 min read",
    category: "Testing",
    excerpt:
      "A certificate is one data point from one moment in time. Here is how to read it without being misled by it.",
    body: [
      "A certificate of analysis tells you what a lab measured for one sample on one day. It does not promise that the next vial in the same box matches, and it certainly does not promise that a different batch behaves the same way.",
      "When you read a COA, start with identity. Before purity or dose mean anything, the lab has to confirm the molecule is what the label claims. Mass spectrometry answers that question. If a report skips identity and jumps straight to a purity number, treat the number with suspicion.",
      "Next comes purity. A reverse phase HPLC trace separates the main compound from related impurities and shows each as a share of total area. A clean single peak is what you want. A cluster of smaller peaks beside the main one means the synthesis or storage left something behind.",
      "Last is quantity. A vial labeled ten milligrams should contain close to ten milligrams. Underfilling is the most common and least discussed failure in this market, because it is invisible without a scale and a method. We publish measured content against label claim on every report so the gap is impossible to hide.",
    ],
  },
  {
    slug: "underdosing-is-the-quiet-failure",
    title: "Underdosing Is the Quiet Failure of the Peptide Market",
    date: "04 Jun 2026",
    readingTime: "5 min read",
    category: "Data",
    excerpt:
      "Purity gets the attention, but our data shows quantity is where buyers lose the most value.",
    body: [
      "Across thousands of samples, the headline most people chase is purity. It photographs well and it fits on a label. But when we line up measured content against label claim, the larger and more consistent problem is quantity.",
      "A vendor can hit ninety nine percent purity and still ship a vial that holds eighty five percent of the stated milligrams. The buyer sees a clean certificate and never learns that one in seven doses simply is not there.",
      "We treat dose accuracy as a first class metric for this reason. Every published result shows the measured fill so the gap between promise and product is visible at a glance.",
    ],
  },
  {
    slug: "how-we-source-blind-samples",
    title: "How We Source Blind Samples to Keep Vendors Honest",
    date: "21 May 2026",
    readingTime: "7 min read",
    category: "Methodology",
    excerpt:
      "When a vendor knows a sample is headed to a lab, the sample stops being representative. So we buy like a normal customer.",
    body: [
      "The fastest way to ruin a testing program is to let the vendor pick the sample. A hand selected vial is a marketing asset, not a measurement.",
      "We buy a large share of what we test the same way any customer would, through ordinary retail channels, with no notice to the seller. The vial that arrives is the vial we test.",
      "This is also why our certificates carry no vendor name or batch identifier on the document itself. The result lives at a web address we control, and that address is the only authoritative version.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
