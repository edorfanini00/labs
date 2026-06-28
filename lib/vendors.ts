import { Grade, gradeFromScores, compounds } from "./compounds";

export type Vendor = {
  slug: string;
  name: string;
  region: string;
  established: string;
  blurb: string;
};

export const vendors: Vendor[] = [
  { slug: "polaris-peptides", name: "Polaris Peptides", region: "United States", established: "2021", blurb: "Domestic vendor with consistent third party testing." },
  { slug: "aavant-research", name: "Aavant Research", region: "United States", established: "2022", blurb: "Research focused supplier with batch level documentation." },
  { slug: "skye-peptides", name: "Skye Peptides", region: "United States", established: "2020", blurb: "Long standing vendor known for tight dose accuracy." },
  { slug: "nuscience", name: "Nuscience Peptides", region: "United States", established: "2021", blurb: "Mid volume vendor with reliable purity results." },
  { slug: "paradigm", name: "Paradigm Peptide", region: "United States", established: "2019", blurb: "High volume catalog spanning most metabolic compounds." },
  { slug: "amino-amigos", name: "Amino Amigos", region: "United States", established: "2022", blurb: "Newer brand competing on transparency." },
  { slug: "planet-peptide", name: "Planet Peptide", region: "United States", established: "2021", blurb: "Broad catalog with mixed but improving results." },
  { slug: "astro-peptides", name: "Astro Peptides", region: "United States", established: "2020", blurb: "Vendor with strong showings on recovery peptides." },
  { slug: "peptide-crafters", name: "Peptide Crafters", region: "United States", established: "2021", blurb: "Small batch vendor that leans into testing." },
  { slug: "bulk-supply", name: "Bulk Peptide Supply", region: "United States", established: "2019", blurb: "Volume vendor with competitive pricing." },
  { slug: "hk-peptides", name: "HK Peptides", region: "Hong Kong", established: "2018", blurb: "International supplier with wide compound coverage." },
  { slug: "inno-peptides", name: "Inno Peptides", region: "China", established: "2019", blurb: "Manufacturer direct with variable lot quality." },
  { slug: "jeep-bio", name: "Jeep Biotechnology", region: "China", established: "2017", blurb: "Large manufacturer supplying many resellers." },
  { slug: "xht-peptides", name: "XHT Peptides", region: "China", established: "2018", blurb: "Manufacturer with strong metabolic compound data." },
  { slug: "limitless", name: "Limitless Life", region: "United States", established: "2020", blurb: "Nootropic leaning catalog with mixed results." },
  { slug: "peptide-sciences", name: "Peptide Sciences", region: "United States", established: "2016", blurb: "Established vendor with a long testing history." },
  { slug: "peptide-partners", name: "Peptide Partners", region: "United States", established: "2021", blurb: "Vendor with steady results across recovery peptides." },
  { slug: "p3-labz", name: "P3 Labz", region: "United States", established: "2022", blurb: "Boutique vendor competing on documentation." },
  { slug: "marvel-pep", name: "Marvel Pep", region: "United States", established: "2022", blurb: "Newer brand with promising early results." },
  { slug: "saiyan-med", name: "Saiyan Med", region: "United States", established: "2021", blurb: "Vendor strong on triple agonist compounds." },
  { slug: "peptime", name: "Peptime", region: "United States", established: "2022", blurb: "Emerging vendor with clean recent batches." },
  { slug: "zlz-peptide", name: "ZLZ Peptide", region: "China", established: "2019", blurb: "Manufacturer with inconsistent lot quality." },
  { slug: "uther", name: "Uther", region: "China", established: "2020", blurb: "Reseller with variable sourcing." },
  { slug: "yimei", name: "Yimei", region: "China", established: "2019", blurb: "Manufacturer flagged on several growth peptides." },
  { slug: "pure-peps", name: "PurePEPS", region: "United States", established: "2021", blurb: "Vendor focused on recovery and healing peptides." },
  { slug: "eternal", name: "Eternal Peptides", region: "United States", established: "2022", blurb: "Longevity leaning catalog with mixed data." },
];

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

export type VendorResult = {
  vendor: Vendor;
  purity: number;
  dose: number;
  grade: Grade;
  samples: number;
};

function scoreFor(compoundSlug: string, vendorSlug: string) {
  const seed = hash(compoundSlug + "::" + vendorSlug);
  const seed2 = hash(vendorSlug + "::" + compoundSlug);
  return {
    purity: +(90 + seed * 9.6).toFixed(1),
    dose: +(86 + seed2 * 13).toFixed(1),
    samples: 1 + Math.floor(seed * 9),
  };
}

const gradeOrder: Record<Grade, number> = { A: 0, B: 1, C: 2, D: 3, E: 4 };

export function getVendorResults(compoundSlug: string): VendorResult[] {
  const results = vendors.map((vendor) => {
    const s = scoreFor(compoundSlug, vendor.slug);
    return {
      vendor,
      purity: s.purity,
      dose: s.dose,
      samples: s.samples,
      grade: gradeFromScores(s.purity, s.dose),
    };
  });
  return results.sort((a, b) => {
    if (gradeOrder[a.grade] !== gradeOrder[b.grade]) return gradeOrder[a.grade] - gradeOrder[b.grade];
    return b.purity + b.dose - (a.purity + a.dose);
  });
}

export type VendorCompoundScore = {
  compoundSlug: string;
  compoundName: string;
  purity: number;
  dose: number;
  grade: Grade;
  samples: number;
};

export function getVendorScores(vendorSlug: string): VendorCompoundScore[] {
  return compounds
    .map((c) => {
      const s = scoreFor(c.slug, vendorSlug);
      return {
        compoundSlug: c.slug,
        compoundName: c.name,
        purity: s.purity,
        dose: s.dose,
        samples: s.samples,
        grade: gradeFromScores(s.purity, s.dose),
      };
    })
    .sort((a, b) => gradeOrder[a.grade] - gradeOrder[b.grade]);
}

export function getVendorOverall(vendorSlug: string) {
  const scores = getVendorScores(vendorSlug);
  const avgPurity = +(scores.reduce((a, b) => a + b.purity, 0) / scores.length).toFixed(1);
  const avgDose = +(scores.reduce((a, b) => a + b.dose, 0) / scores.length).toFixed(1);
  const samples = scores.reduce((a, b) => a + b.samples, 0);
  return {
    avgPurity,
    avgDose,
    samples,
    grade: gradeFromScores(avgPurity, avgDose),
    compoundsCovered: scores.length,
  };
}

export function getVendor(slug: string) {
  return vendors.find((v) => v.slug === slug);
}
