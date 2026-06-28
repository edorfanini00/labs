import Link from "next/link";
import { Mark } from "./logo";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden surface-ink text-white">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <Mark className="h-7 w-7" tone="#b9c2f7" />
              <span className="font-serif text-xl">
                {site.shortName}
                <span className="opacity-50"> Assay</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {site.description}
            </p>
            <p className="mt-5 text-sm text-white/50">{site.location}</p>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-peri hover:underline"
            >
              {site.email}
            </a>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <h4 className="label-caps text-peri">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {site.name}. For research use only. Results describe tested samples and are not medical advice.
          </p>
          <p>Built for transparency in {new Date().getFullYear()}.</p>
        </div>
      </div>
    </footer>
  );
}
