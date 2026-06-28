import { Grade, gradeFromScores } from "./compounds";

export type Certificate = {
  id: string;
  compound: string;
  compoundSlug: string;
  date: string;
  labelClaimMg: number;
  measuredMg: number;
  purity: number;
  method: string;
  instrument: string;
  identityConfirmed: boolean;
  massExpected: number;
  massObserved: number;
  analyst: string;
  hplc: { rt: number; area: number; label: string }[];
};

function dose(label: number, measured: number) {
  return +((measured / label) * 100).toFixed(1);
}

export const certificates: Certificate[] = [
  {
    id: "VRA7K429Q",
    compound: "Tirzepatide",
    compoundSlug: "tirzepatide",
    date: "24 Jun 2026",
    labelClaimMg: 10,
    measuredMg: 9.91,
    purity: 99.1,
    method: "Reverse phase HPLC with UV at 214 nm",
    instrument: "Agilent 1260 Infinity II",
    identityConfirmed: true,
    massExpected: 4813.5,
    massObserved: 4813.4,
    analyst: "K. Halvorsen",
    hplc: [
      { rt: 1.42, area: 0.4, label: "Solvent front" },
      { rt: 6.81, area: 99.1, label: "Tirzepatide main peak" },
      { rt: 7.34, area: 0.5, label: "Related impurity" },
    ],
  },
  {
    id: "VRA3M88LD",
    compound: "Semaglutide",
    compoundSlug: "semaglutide",
    date: "22 Jun 2026",
    labelClaimMg: 5,
    measuredMg: 4.62,
    purity: 97.8,
    method: "Reverse phase HPLC with UV at 214 nm",
    instrument: "Agilent 1260 Infinity II",
    identityConfirmed: true,
    massExpected: 4113.6,
    massObserved: 4113.5,
    analyst: "M. Okafor",
    hplc: [
      { rt: 1.39, area: 0.6, label: "Solvent front" },
      { rt: 6.12, area: 97.8, label: "Semaglutide main peak" },
      { rt: 6.74, area: 1.6, label: "Related impurity" },
    ],
  },
  {
    id: "VRA9XQ14T",
    compound: "BPC 157",
    compoundSlug: "bpc157",
    date: "21 Jun 2026",
    labelClaimMg: 5,
    measuredMg: 4.88,
    purity: 98.4,
    method: "Reverse phase HPLC with UV at 214 nm",
    instrument: "Waters Arc HPLC",
    identityConfirmed: true,
    massExpected: 1419.5,
    massObserved: 1419.6,
    analyst: "K. Halvorsen",
    hplc: [
      { rt: 1.31, area: 0.5, label: "Solvent front" },
      { rt: 4.92, area: 98.4, label: "BPC 157 main peak" },
      { rt: 5.41, area: 1.1, label: "Truncated sequence" },
    ],
  },
  {
    id: "VRA5RT60B",
    compound: "Retatrutide",
    compoundSlug: "retatrutide",
    date: "20 Jun 2026",
    labelClaimMg: 10,
    measuredMg: 8.91,
    purity: 95.2,
    method: "Reverse phase HPLC with UV at 214 nm",
    instrument: "Agilent 1260 Infinity II",
    identityConfirmed: true,
    massExpected: 4731.3,
    massObserved: 4731.2,
    analyst: "L. Santos",
    hplc: [
      { rt: 1.4, area: 0.8, label: "Solvent front" },
      { rt: 7.05, area: 95.2, label: "Retatrutide main peak" },
      { rt: 7.62, area: 3.4, label: "Related impurity" },
    ],
  },
  {
    id: "VRA2HE73N",
    compound: "CJC 1295",
    compoundSlug: "cjc1295",
    date: "18 Jun 2026",
    labelClaimMg: 5,
    measuredMg: 4.21,
    purity: 92.6,
    method: "Reverse phase HPLC with UV at 214 nm",
    instrument: "Waters Arc HPLC",
    identityConfirmed: true,
    massExpected: 3367.9,
    massObserved: 3367.8,
    analyst: "M. Okafor",
    hplc: [
      { rt: 1.37, area: 1.1, label: "Solvent front" },
      { rt: 5.88, area: 92.6, label: "CJC 1295 main peak" },
      { rt: 6.39, area: 5.2, label: "Related impurity" },
    ],
  },
  {
    id: "VRA8GK51F",
    compound: "NAD plus",
    compoundSlug: "nad",
    date: "23 Jun 2026",
    labelClaimMg: 500,
    measuredMg: 441,
    purity: 96.0,
    method: "Reverse phase HPLC with UV at 260 nm",
    instrument: "Agilent 1260 Infinity II",
    identityConfirmed: true,
    massExpected: 663.4,
    massObserved: 663.4,
    analyst: "L. Santos",
    hplc: [
      { rt: 1.2, area: 1.0, label: "Solvent front" },
      { rt: 3.44, area: 96.0, label: "NAD main peak" },
      { rt: 3.91, area: 2.8, label: "Degradation product" },
    ],
  },
];

export function certificateGrade(c: Certificate): Grade {
  return gradeFromScores(c.purity, dose(c.labelClaimMg, c.measuredMg));
}

export function certificateDose(c: Certificate): number {
  return dose(c.labelClaimMg, c.measuredMg);
}

export function getCertificate(id: string): Certificate | undefined {
  const norm = id.replace(/[\s-]/g, "").toUpperCase();
  return certificates.find((c) => c.id.toUpperCase() === norm);
}
