import { Grade, compounds, Compound } from "./compounds";

export type Vendor = {
  slug: string;
  name: string;
  region: string;
  established: string;
  blurb: string;
  verified?: boolean;
  caution?: boolean;
};

export const vendors: Vendor[] = [
  { slug: "paradigm", name: "Paradigm Peptide", region: "United States", established: "2019", blurb: "High volume catalog spanning most metabolic compounds.", verified: true, caution: true },
  { slug: "aavant-research", name: "Aavant Research", region: "United States", established: "2022", blurb: "Research focused supplier with batch level documentation.", verified: true },
  { slug: "marvel-pep", name: "Marvel Pep", region: "United States", established: "2022", blurb: "Newer brand with consistently strong early results." },
  { slug: "saiyan-med", name: "Saiyan Med", region: "United States", established: "2021", blurb: "Vendor strong on triple agonist compounds.", verified: true },
  { slug: "xht-peptides", name: "Xianhong Tong XHT Peptides", region: "China", established: "2018", blurb: "Manufacturer with strong metabolic compound data." },
  { slug: "lejian-bio", name: "Lejian Biotech Peptide", region: "China", established: "2019", blurb: "Manufacturer direct with reliable recent lots." },
  { slug: "andy-peps", name: "Andy Peps Studio", region: "United States", established: "2021", blurb: "Boutique vendor with a wide catalog." },
  { slug: "polaris-peptides", name: "Polaris Peptides", region: "United States", established: "2021", blurb: "Domestic vendor with consistent third party testing.", verified: true },
  { slug: "skye-peptides", name: "Skye Peptides", region: "United States", established: "2020", blurb: "Long standing vendor with a broad catalog." },
  { slug: "peptide-sciences", name: "Peptide Sciences", region: "United States", established: "2016", blurb: "Established vendor with a long testing history." },
  { slug: "peptide-partners", name: "Peptide Partners", region: "United States", established: "2021", blurb: "Vendor with steady results across recovery peptides." },
  { slug: "nuscience", name: "Nuscience Peptides", region: "United States", established: "2021", blurb: "Mid volume vendor with reliable purity results." },
  { slug: "planet-peptide", name: "Planet Peptide", region: "United States", established: "2021", blurb: "Broad catalog with mixed but improving results." },
  { slug: "astro-peptides", name: "Astro Peptides", region: "United States", established: "2020", blurb: "Vendor strong on recovery peptides.", caution: true },
  { slug: "amino-amigos", name: "Amino Amigos", region: "United States", established: "2022", blurb: "Newer brand competing on transparency." },
  { slug: "bulk-supply", name: "Bulk Peptide Supply", region: "United States", established: "2019", blurb: "Volume vendor with competitive pricing.", verified: true },
  { slug: "hk-peptides", name: "HK Peptides", region: "Hong Kong", established: "2018", blurb: "International supplier with wide compound coverage." },
  { slug: "qing-li", name: "Qing Li Peptide", region: "China", established: "2018", blurb: "Manufacturer supplying many resellers." },
  { slug: "reta-peptide", name: "Reta-Peptide", region: "United States", established: "2022", blurb: "Vendor with a deep but uneven catalog." },
  { slug: "paramount", name: "Paramount Peptides", region: "United States", established: "2020", blurb: "Vendor with a wide range of growth peptides." },
  { slug: "lisa-bio", name: "Lisa Biopeptide", region: "China", established: "2020", blurb: "Reseller with variable sourcing." },
  { slug: "inno-peptides", name: "Inno Peptides", region: "China", established: "2019", blurb: "Manufacturer with variable lot quality." },
  { slug: "limitless", name: "Limitless Life", region: "United States", established: "2020", blurb: "Nootropic leaning catalog with mixed results." },
  { slug: "peptide-crafters", name: "Peptide Crafters", region: "United States", established: "2021", blurb: "Small batch vendor that leans into testing." },
  { slug: "zlz-peptide", name: "ZLZ Peptide", region: "China", established: "2019", blurb: "Manufacturer with inconsistent lot quality.", caution: true },
  { slug: "yimei", name: "Yimei", region: "China", established: "2019", blurb: "Manufacturer flagged on several growth peptides.", caution: true },
  { slug: "uther", name: "Uther", region: "China", established: "2020", blurb: "Reseller with variable sourcing." },
  { slug: "pure-peps", name: "PurePEPS", region: "United States", established: "2021", blurb: "Vendor focused on recovery peptides." },
];

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

const gradeOrder: Record<Grade, number> = { A: 0, B: 1, C: 2, D: 3, E: 4 };

export function gradeFromScore(score: number): Grade {
  if (score >= 8) return "A";
  if (score >= 6.5) return "B";
  if (score >= 5) return "C";
  if (score >= 3.5) return "D";
  return "E";
}

const scoreColors: { min: number; color: string }[] = [
  { min: 8, color: "var(--color-grade-a)" },
  { min: 6.5, color: "var(--color-grade-b)" },
  { min: 5, color: "var(--color-grade-c)" },
  { min: 3.5, color: "var(--color-grade-d)" },
  { min: -100, color: "var(--color-grade-e)" },
];

export function scoreColor(score: number): string {
  return scoreColors.find((c) => score >= c.min)!.color;
}

// Each vendor has a baseline quality that shifts every result up or down,
// so grades vary across the roster instead of all averaging to the middle.
function vendorQuality(slug: string): number {
  return hash(slug + "::quality");
}

export type ProductResult = {
  compound: Compound;
  score: number;
  purity: number;
  dose: number;
  grade: Grade;
  samples: number;
};

function productScore(vendorSlug: string, compound: Compound): ProductResult {
  const q = vendorQuality(vendorSlug);
  const noise = hash(vendorSlug + "::" + compound.slug);
  // Better vendors sit higher and vary less; weaker vendors swing widely.
  const center = 2.4 + q * 6.8;
  const spread = 2.2 + (1 - q) * 5.5;
  let score = center + (noise - 0.5) * spread;
  score = Math.max(0, Math.min(10, score));
  const norm = score / 10;
  const samples = 1 + Math.floor(hash(vendorSlug + compound.slug + "n") * 34);
  return {
    compound,
    score: +score.toFixed(1),
    purity: +(91 + norm * 9).toFixed(1),
    dose: +(85 + norm * 16).toFixed(1),
    grade: gradeFromScore(score),
    samples,
  };
}

// The subset of compounds a vendor actually sells.
function vendorProductCount(slug: string): number {
  const r = hash(slug + "::products");
  // Weighted toward small catalogs, with a few large ones, like the reference.
  if (r > 0.82) return 8 + Math.floor(hash(slug + "p2") * 7); // 8 to 14
  if (r > 0.55) return 4 + Math.floor(hash(slug + "p3") * 4); // 4 to 7
  if (r > 0.3) return 2 + Math.floor(hash(slug + "p4") * 2); // 2 to 3
  return 1;
}

const maxCompoundSamples = Math.max(...compounds.map((c) => c.samples));

// Selection weight: lower wins. Popular compounds get a boost so the catalog
// stays realistic and every popular compound keeps a healthy roster of sellers.
function selectionWeight(slug: string, c: Compound): number {
  const popularity = c.samples / maxCompoundSamples;
  return hash(slug + c.slug) - popularity * 0.5;
}

function vendorProducts(slug: string): Compound[] {
  const count = vendorProductCount(slug);
  return [...compounds]
    .sort((a, b) => selectionWeight(slug, a) - selectionWeight(slug, b))
    .slice(0, count)
    .sort((a, b) => b.samples - a.samples);
}

const oldestPool = [
  "17 Dec 2024", "14 Jan 2025", "22 Apr 2025", "06 May 2025", "09 Jun 2025",
  "11 Jun 2025", "20 Jun 2025", "29 Jun 2025", "24 Jul 2025", "11 Aug 2025",
  "01 Sep 2025", "30 Oct 2025", "04 Nov 2025", "22 Nov 2025", "16 Dec 2025",
];
const recentPool = [
  "18 Mar 2026", "30 Apr 2026", "05 May 2026", "11 May 2026", "19 May 2026",
  "20 May 2026", "28 May 2026", "02 Jun 2026", "06 Jun 2026", "08 Jun 2026",
  "16 Jun 2026", "17 Jun 2026", "20 Feb 2026", "02 Mar 2026", "02 Feb 2026",
];

export type VendorSummary = {
  vendor: Vendor;
  products: number;
  count: number;
  avg: number;
  min: number;
  max: number;
  bestGrade: Grade;
  worstGrade: Grade;
  oldest: string;
  mostRecent: string;
};

export function getVendorSummary(slug: string): VendorSummary {
  const vendor = vendors.find((v) => v.slug === slug)!;
  const products = vendorProducts(slug).map((c) => productScore(slug, c));
  const scores = products.map((p) => p.score);
  const count = products.reduce((a, p) => a + p.samples, 0);
  const avg = +(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  const min = +Math.min(...scores).toFixed(1);
  const max = +Math.max(...scores).toFixed(1);
  const grades = products.map((p) => p.grade);
  const bestGrade = grades.reduce((a, b) => (gradeOrder[a] <= gradeOrder[b] ? a : b));
  const worstGrade = grades.reduce((a, b) => (gradeOrder[a] >= gradeOrder[b] ? a : b));
  return {
    vendor,
    products: products.length,
    count,
    avg,
    min,
    max,
    bestGrade,
    worstGrade,
    oldest: oldestPool[Math.floor(hash(slug + "old") * oldestPool.length)],
    mostRecent: recentPool[Math.floor(hash(slug + "rec") * recentPool.length)],
  };
}

export function getVendorTable(): VendorSummary[] {
  return vendors
    .map((v) => getVendorSummary(v.slug))
    .sort((a, b) => {
      if (gradeOrder[a.bestGrade] !== gradeOrder[b.bestGrade])
        return gradeOrder[a.bestGrade] - gradeOrder[b.bestGrade];
      return b.avg - a.avg;
    });
}

export function getVendorProducts(slug: string): ProductResult[] {
  return vendorProducts(slug)
    .map((c) => productScore(slug, c))
    .sort((a, b) => b.score - a.score);
}

// Used by compound and home pages: every vendor that carries the compound.
export type VendorResult = {
  vendor: Vendor;
  score: number;
  purity: number;
  dose: number;
  grade: Grade;
  samples: number;
};

export function getVendorResults(compoundSlug: string): VendorResult[] {
  const compound = compounds.find((c) => c.slug === compoundSlug)!;
  return vendors
    .filter((v) => vendorProducts(v.slug).some((c) => c.slug === compoundSlug))
    .map((vendor) => {
      const p = productScore(vendor.slug, compound);
      return {
        vendor,
        score: p.score,
        purity: p.purity,
        dose: p.dose,
        grade: p.grade,
        samples: p.samples,
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function getVendor(slug: string) {
  return vendors.find((v) => v.slug === slug);
}
