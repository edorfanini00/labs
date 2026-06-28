"use client";

import { useState } from "react";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: string[];
  full?: boolean;
};

export function LeadForm({
  fields,
  submitLabel,
  successTitle,
  successBody,
}: {
  fields: Field[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
}) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="rounded-[var(--radius-card)] border border-grade-a/30 bg-grade-a/5 p-9 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-grade-a/15 text-xl text-grade-a">
          &#10003;
        </span>
        <h3 className="mt-5 font-serif text-2xl">{successTitle}</h3>
        <p className="mx-auto mt-3 max-w-md text-muted">{successBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="grid gap-5 rounded-[var(--radius-card)] bg-white p-7 hairline sm:grid-cols-2 sm:p-9"
    >
      {fields.map((f) => (
        <div key={f.name} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
          <label className="mb-2 block text-sm font-medium text-ink/80">
            {f.label}
            {f.required && <span className="text-cobalt"> *</span>}
          </label>
          {f.type === "textarea" ? (
            <textarea
              required={f.required}
              placeholder={f.placeholder}
              rows={4}
              className="w-full resize-none rounded-2xl bg-mist px-4 py-3 text-sm outline-none ring-cobalt/30 transition focus:ring-2 placeholder:text-muted"
            />
          ) : f.type === "select" ? (
            <select
              required={f.required}
              defaultValue=""
              className="w-full rounded-2xl bg-mist px-4 py-3 text-sm outline-none ring-cobalt/30 transition focus:ring-2"
            >
              <option value="" disabled>
                {f.placeholder || "Select one"}
              </option>
              {f.options?.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={f.type || "text"}
              required={f.required}
              placeholder={f.placeholder}
              className="w-full rounded-2xl bg-mist px-4 py-3 text-sm outline-none ring-cobalt/30 transition focus:ring-2 placeholder:text-muted"
            />
          )}
        </div>
      ))}
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-full bg-cobalt px-7 font-medium text-white transition-colors hover:bg-cobalt-deep"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
