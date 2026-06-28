import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Button } from "@/components/ui";
import { posts, getPost } from "@/lib/journal";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="py-14 sm:py-20">
      <Container className="max-w-2xl">
        <Link href="/journal" className="text-sm text-muted hover:text-cobalt">
          &larr; The journal
        </Link>
        <div className="mt-6 flex items-center gap-3 text-xs text-muted">
          <span className="text-cobalt">{post.category}</span>
          <span>{post.readingTime}</span>
          <span>{post.date}</span>
        </div>
        <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink/80">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-12 rounded-[var(--radius-card)] bg-white p-8 hairline">
          <h2 className="font-serif text-2xl">Want this checked on your vial?</h2>
          <p className="mt-2 text-muted">
            Send us a sample and we will publish the result, or verify a
            certificate you already hold.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href="/submit">Submit a sample</Button>
            <Button href="/verify" variant="ghost">
              Verify a COA
            </Button>
          </div>
        </div>
      </Container>
    </article>
  );
}
