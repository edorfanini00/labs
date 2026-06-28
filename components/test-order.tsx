"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { compounds } from "@/lib/compounds";
import { site } from "@/lib/site";

const freeSlugs = [
  "tirzepatide", "semaglutide", "retatrutide", "bpc157", "cjc1295",
  "melanotanii", "pt141", "ipamorelin", "mazdutide", "survodutide",
  "cagrilintide", "sermorelin", "tesamorelin", "ghkcu", "tb500",
];

const OTHER = "Other products or blends";

const addOns = [
  {
    key: "lab",
    title: "Test with a lab of your choice",
    badge: "Lab choice",
    price: 89,
    note: "Pick the commercial laboratory that runs your identity, purity, and quantity panel.",
  },
  {
    key: "endotoxins",
    title: "Endotoxins",
    price: 110,
    note: "Additional test for endotoxin contamination, run on the same sample as the identity, purity, and quantity panel. Limit of quantification 0.5 EU per mL.",
  },
  {
    key: "heavy",
    title: "Heavy metals",
    price: 120,
    note: "Additional contamination test for four heavy metals: arsenic, lead, cadmium, and mercury, run on the same sample.",
  },
  {
    key: "solvents",
    title: "Residual solvents",
    price: 175,
    note: "Additional test for residual solvent contamination, run on the same sample.",
  },
] as const;

type AddOnKey = (typeof addOns)[number]["key"];

function money(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function Mailer() {
  return (
    <svg viewBox="0 0 240 170" className="w-full" role="img" aria-label="Padded mailer with a sample vial">
      <defs>
        <linearGradient id="cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a5cf0" />
          <stop offset="1" stopColor="#1a2378" />
        </linearGradient>
      </defs>
      <rect x="24" y="58" width="150" height="100" rx="10" fill="#14182a" />
      <g opacity="0.18" fill="#ffffff">
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 9 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={38 + c * 16} cy={72 + r * 15} r="4" />
          ))
        )}
      </g>
      <rect x="44" y="132" width="64" height="18" rx="3" fill="#ffffff" opacity="0.85" />
      {/* vial tucked into the mailer */}
      <g transform="rotate(18 180 70)">
        <rect x="168" y="34" width="26" height="78" rx="7" fill="#dfe3fb" stroke="#b9c2f7" />
        <rect x="168" y="78" width="26" height="34" rx="7" fill="#aab4f5" opacity="0.7" />
        <rect x="171" y="22" width="20" height="16" rx="3" fill="url(#cap)" />
        <rect x="170" y="48" width="22" height="13" rx="2" fill="#ffffff" />
      </g>
    </svg>
  );
}

export function TestOrder() {
  const [product, setProduct] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<AddOnKey, boolean>>({
    lab: false,
    endotoxins: false,
    heavy: false,
    solvents: false,
  });
  const [quantity, setQuantity] = useState("");
  const [done, setDone] = useState(false);

  const isOther = product === OTHER;
  const standardPrice = isOther ? 89 : 0;

  const freeProducts = freeSlugs
    .map((s) => compounds.find((c) => c.slug === s)?.name)
    .filter(Boolean) as string[];

  const subtotal = useMemo(() => {
    return (
      standardPrice +
      addOns.reduce((sum, a) => sum + (selected[a.key] ? a.price : 0), 0)
    );
  }, [selected, standardPrice]);

  const ready = !!product && quantity.trim() !== "";

  function toggle(key: AddOnKey) {
    setSelected((s) => ({ ...s, [key]: !s[key] }));
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl rounded-[var(--radius-card)] border border-grade-a/30 bg-grade-a/5 p-9 text-center sm:p-12">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-grade-a/15 text-xl text-grade-a">
          &#10003;
        </span>
        <h3 className="mt-5 font-serif text-3xl tracking-tight">Request received</h3>
        <p className="mx-auto mt-3 max-w-md text-muted">
          We emailed a shipping address and a tracking identifier for{" "}
          <span className="font-medium text-ink">{product}</span>. Pack the vials in
          a padded envelope and send them to {site.location}. Testing begins within
          five business days of arrival.
        </p>
        {subtotal > 0 && (
          <p className="mt-3 text-sm text-muted">
            Paid add ons total ${money(subtotal)}. We will collect payment before the
            extra panels run.
          </p>
        )}
        <button
          onClick={() => {
            setDone(false);
            setProduct(null);
            setSelected({ lab: false, endotoxins: false, heavy: false, solvents: false });
            setQuantity("");
          }}
          className="mt-7 inline-flex h-11 items-center rounded-full border border-line bg-white px-6 text-sm font-medium transition-colors hover:border-cobalt hover:text-cobalt"
        >
          Send another sample
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr]">
      {/* Form column */}
      <div>
        <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
          What are you sending to {site.shortName}?
        </h2>

        <div className="mt-6 flex gap-3 rounded-2xl bg-cobalt/5 p-4 text-sm text-ink/75">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cobalt text-[0.7rem] font-bold text-white">
            i
          </span>
          <p>
            <span className="font-semibold text-ink">Free testing is for individuals only.</span>{" "}
            If you source compounds for others, even in small quantities or at cost,
            please use our{" "}
            <Link href="/vendor-services" className="text-cobalt underline">
              vendor services
            </Link>{" "}
            instead. It is how we keep free testing available for everyone.
          </p>
        </div>

        {/* Product picker */}
        <div className="mt-8">
          <label className="text-sm font-medium text-ink/80">
            Product <span className="text-cobalt">*</span>
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {freeProducts.map((name) => (
              <button
                key={name}
                onClick={() => setProduct(name)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  product === name
                    ? "border-cobalt bg-cobalt text-white"
                    : "border-line bg-white text-ink/80 hover:border-cobalt/40"
                }`}
              >
                {name}
              </button>
            ))}
            <button
              onClick={() => setProduct(OTHER)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                isOther
                  ? "border-[#c43d8e] bg-[#c43d8e] text-white"
                  : "border-[#e0a6cb] bg-white text-[#c43d8e] hover:bg-[#fbeef5]"
              }`}
            >
              Other products or blends (paid)
            </button>
          </div>
        </div>

        {/* Standard testing */}
        <div className="mt-8 rounded-[var(--radius-card)] bg-white p-6 hairline">
          <div className="flex items-center gap-3">
            <h3 className="font-serif text-xl">Standard testing</h3>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ${
                isOther ? "bg-[#c43d8e]/10 text-[#c43d8e]" : "bg-grade-a/10 text-grade-a"
              }`}
            >
              {isOther ? "Paid" : "Free"}
            </span>
          </div>
          <label className="mt-4 flex items-start gap-3">
            <input type="checkbox" checked readOnly className="mt-1 h-4 w-4 accent-cobalt" />
            <span>
              <span className="flex flex-wrap items-baseline gap-2">
                <span className="font-medium">Identity, purity, and quantity</span>
                <span className="font-mono text-sm text-muted">${money(standardPrice)}</span>
              </span>
              <span className="mt-1 block text-sm text-muted">
                Standard panel. Lab: {site.shortName} choice. Method: high performance
                liquid chromatography with mass confirmation.
              </span>
            </span>
          </label>
        </div>

        {/* Paid options */}
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <h3 className="font-serif text-xl">Options</h3>
            <span className="rounded-full bg-[#c43d8e]/10 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-[#c43d8e]">
              Paid
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {addOns.map((a) => {
              const on = selected[a.key];
              const note =
                a.key === "endotoxins" && selected.lab
                  ? "Additional test for endotoxin contamination. You must send a second identical vial, same vendor, product, potency, and batch. Limit of quantification 0.5 EU per mL."
                  : a.note;
              return (
                <button
                  key={a.key}
                  onClick={() => toggle(a.key)}
                  className={`flex w-full gap-3 rounded-2xl border p-5 text-left transition-colors ${
                    on ? "border-cobalt bg-cobalt/5" : "border-line bg-white hover:border-cobalt/40"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                      on ? "border-cobalt bg-cobalt text-white" : "border-line bg-white"
                    }`}
                  >
                    {on && <span className="text-xs">&#10003;</span>}
                  </span>
                  <span className="flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      {a.badge && (
                        <span className="rounded-md bg-cobalt/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-cobalt">
                          {a.badge}
                        </span>
                      )}
                      <span className="font-medium">{a.title}</span>
                      <span className="font-mono text-sm text-muted">${money(a.price)}</span>
                    </span>
                    <span className="mt-1 block text-sm text-muted">{note}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-2xl bg-mist px-5 py-4">
            <span className="font-medium">Subtotal for this sample</span>
            <span className="font-serif text-2xl tracking-tight">
              ${money(subtotal)} <span className="text-sm text-muted">USD</span>
            </span>
          </div>
        </div>

        {/* Quantity */}
        <div className="mt-8">
          <label className="text-sm font-medium text-ink/80">
            Quantity <span className="text-cobalt">*</span>
          </label>
          <div className="mt-3 flex items-center gap-3">
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value.replace(/[^0-9.]/g, ""))}
              inputMode="decimal"
              className="w-28 rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none ring-cobalt/30 focus:ring-2"
            />
            <span className="text-sm text-muted">mg, as indicated on the label or kit box</span>
          </div>
        </div>

        <button
          onClick={() => ready && setDone(true)}
          disabled={!ready}
          className={`mt-8 inline-flex h-12 items-center rounded-full px-8 font-medium transition-colors ${
            ready
              ? "bg-cobalt text-white hover:bg-cobalt-deep"
              : "cursor-not-allowed bg-line text-muted"
          }`}
        >
          Next
        </button>

        <div className="mt-6 space-y-1 text-sm text-muted">
          <p>
            No vial available?{" "}
            <Link href="/compounds" className="text-cobalt underline">
              Suggest a product or vendor
            </Link>{" "}
            instead.
          </p>
          <p>
            Do you resell or distribute compounds? Please check out our{" "}
            <Link href="/vendor-services" className="text-cobalt underline">
              vendor support program
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="lg:border-l lg:border-line lg:pl-10">
        <h2 className="font-serif text-3xl leading-tight tracking-tight">
          Send in samples for free testing
        </h2>

        <h3 className="mt-8 font-serif text-xl">How it works</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Ship vials to our facility in {site.location}, safely packed in a padded
          envelope, and we will test them at a commercial lab.
        </p>
        <div className="mt-5 rounded-[var(--radius-card)] bg-mist p-6">
          <Mailer />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          We will <span className="font-semibold text-ink">not</span> return the
          samples, as they get consumed in the analysis.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          You will receive a copy of the certificate of analysis before it gets
          published here on the {site.shortName} web site.
        </p>

        <h3 className="mt-8 font-serif text-xl">What we test</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {site.shortName} accepts 15 popular compounds for free, in lyophilized
          powder form only.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          <span className="rounded-md bg-[#c43d8e]/10 px-2 py-0.5 text-xs font-semibold text-[#c43d8e]">
            For a fee
          </span>{" "}
          we now also test many more compounds and blends, plus other form factors.
        </p>
        <ul className="mt-3 space-y-1.5 text-sm">
          {["Tablets and capsules", "Sprays, liquids, or gels", "Raw powder"].map((x) => (
            <li key={x} className="flex items-center gap-2 text-ink/80">
              <span className="text-grade-a">&#10003;</span> {x}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">We still do not test:</p>
        <ul className="mt-1.5 text-sm">
          <li className="flex items-center gap-2 text-ink/80">
            <span className="text-grade-e">&#10007;</span> Reconstituted compounds
          </li>
        </ul>
        <p className="mt-4 text-sm text-muted">
          We currently only accept shipments from within the United States.
        </p>
      </aside>
    </div>
  );
}
