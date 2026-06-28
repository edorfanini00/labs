export const site = {
  name: "Veridian Diagnostics",
  shortName: "Veridian",
  tagline: "Independent Compound Testing",
  description:
    "We test research compounds for purity and quantity, then publish every result so buyers can verify before they trust.",
  email: "lab@veridiandiagnostics.com",
  location: "Austin, Texas",
  stats: {
    samples: 9124,
    vendors: 271,
    compounds: 32,
    accuracy: "0.4%",
  },
};

export const primaryNav = [
  { label: "Compounds", href: "/compounds" },
  { label: "Vendors", href: "/vendors" },
  { label: "Verify a COA", href: "/verify" },
  { label: "Methodology", href: "/methodology" },
  { label: "Journal", href: "/journal" },
];

export const footerNav = [
  {
    title: "Testing",
    links: [
      { label: "Browse Compounds", href: "/compounds" },
      { label: "Vendor Rankings", href: "/vendors" },
      { label: "Submit a Sample", href: "/submit" },
      { label: "Request a Test", href: "/submit" },
    ],
  },
  {
    title: "Verify",
    links: [
      { label: "Verify a COA", href: "/verify" },
      { label: "How to Read a COA", href: "/methodology#read-coa" },
      { label: "Methodology", href: "/methodology" },
    ],
  },
  {
    title: "Access",
    links: [
      { label: "Researcher Access", href: "/researchers" },
      { label: "Vendor Services", href: "/vendor-services" },
      { label: "The Journal", href: "/journal" },
    ],
  },
  {
    title: "Lab",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Methodology", href: "/methodology" },
      { label: "Contact", href: "/about#contact" },
    ],
  },
];
