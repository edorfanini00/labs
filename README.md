# Veridian Diagnostics

An independent compound testing website. Buyers can browse every compound in the catalog, see how vendors rank on measured purity and quantity, verify a certificate of analysis, and submit samples for free testing.

The brand uses a cobalt and periwinkle palette with soft gradients, a refined serif display face paired with a clean grotesk, a triangular molecule mark, and white and gradient cards on a light canvas.

## Stack

- Next.js 16 (App Router) with Turbopack
- React 19 and TypeScript
- Tailwind CSS v4
- Fonts: Newsreader (serif display), Hanken Grotesk (sans), JetBrains Mono (data)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
```

## What is here

- **Home** with hero, stats, how it works, top ratings, verification and submission, researcher and vendor access, and the journal.
- **Compounds** catalog with search and category filters, plus a detail page per compound showing grade distribution, the full vendor ranking, and published certificates.
- **Vendors** ranking with a detail page per vendor showing results by compound.
- **Verify a COA** lookup. Enter a certificate identifier to resolve the authoritative result. Try `VRA7K429Q`.
- **Result pages** render a full certificate with identity confirmation, an HPLC chromatogram, and a peak table.
- **Submit a sample**, **Researcher access**, and **Vendor services** lead forms.
- **Methodology**, **About**, and the **Journal**.

## Data

All content lives in `lib/`:

- `compounds.ts` the catalog and grading logic
- `vendors.ts` vendors and deterministic per compound scoring
- `certificates.ts` published certificates for the verification flow
- `journal.ts` articles
- `site.ts` brand constants and navigation

The data is illustrative and self contained. Swap these files for a real data source to go live.

For research use only. Results describe tested samples and are not medical advice.
