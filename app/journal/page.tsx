import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { posts } from "@/lib/journal";

export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Notes from the lab on testing, data, and what the numbers reveal about the research compound market.",
};

export default function JournalPage() {
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero
        label="The journal"
        title="Notes from the lab."
        intro="What we learn from thousands of samples, written plainly for the people making decisions with it."
      />

      <section className="py-14 sm:py-16">
        <Container>
          <Link
            href={`/journal/${lead.slug}`}
            className="group grid gap-8 rounded-[28px] bg-white p-8 hairline transition-all hover:-translate-y-1 sm:p-10 lg:grid-cols-2"
          >
            <div className="grain relative min-h-48 overflow-hidden rounded-[var(--radius-card)] surface-cobalt" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="text-cobalt">{lead.category}</span>
                <span>{lead.readingTime}</span>
                <span>{lead.date}</span>
              </div>
              <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight">
                {lead.title}
              </h2>
              <p className="mt-4 text-muted">{lead.excerpt}</p>
              <span className="mt-6 text-sm font-medium text-cobalt">
                Read the piece &rarr;
              </span>
            </div>
          </Link>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className="group flex flex-col rounded-[var(--radius-card)] bg-white p-8 hairline transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="text-cobalt">{post.category}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="mt-4 font-serif text-2xl leading-snug">{post.title}</h3>
                <p className="mt-3 flex-1 text-muted">{post.excerpt}</p>
                <span className="mt-5 text-xs text-muted">{post.date}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
