import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container, CtaBand, PageShell } from "@/components/site/page-shell";
import { formatDate, getPost, posts } from "@/lib/blog";
import { PostCard } from "../post-grid";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

// Renders `inline code` spans inside plain paragraphs
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/).map((part, i) =>
        part.startsWith("`") ? (
          <code key={i} className="px-1.5 py-0.5 font-mono text-[0.85em] bg-foreground/[0.06] border border-foreground/10 text-[#eca8d6]">
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        )
      )}
    </>
  );
}

export default async function PostPage({ params }: Params) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const more = related.length ? related : posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PageShell>
      <article>
        <header className="relative pt-36 lg:pt-44 pb-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-grid-lines pointer-events-none"
            style={{ maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 75%)" }}
          />
          <Container className="relative max-w-[960px]">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors animate-fade-up"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              All posts
            </Link>
            <div className="mt-10 flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-muted-foreground animate-fade-up">
              <span className="text-[#eca8d6]">{post.category}</span>
              <span className="w-6 h-px bg-foreground/20" />
              <span>{formatDate(post.date)}</span>
              <span className="w-6 h-px bg-foreground/20" />
              <span>{post.readingTime}</span>
            </div>
            <h1
              className="mt-6 text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.95] animate-fade-up"
              style={{ animationDelay: "80ms" }}
            >
              {post.title}
            </h1>
            <p className="mt-8 text-xl text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: "160ms" }}>
              {post.excerpt}
            </p>
            <div className="mt-10 flex items-center gap-4 animate-fade-up" style={{ animationDelay: "220ms" }}>
              <span className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center font-display text-xl">
                {post.author.charAt(0)}
              </span>
              <span>
                <span className="block">{post.author}</span>
                <span className="block text-sm text-muted-foreground">{post.role}</span>
              </span>
            </div>
          </Container>
        </header>

        {post.image && (
          <Container className="max-w-[1200px]">
            <div className="relative aspect-[21/9] overflow-hidden border border-foreground/10 bg-black animate-fade-up" style={{ animationDelay: "280ms" }}>
              <img src={post.image} alt="" aria-hidden="true" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </Container>
        )}

        <Container className="max-w-[760px] py-16 lg:py-24">
          <div className="space-y-8 text-lg leading-[1.8] text-foreground/80">
            {post.body.map((block, i) => (
              <section key={i}>
                {block.heading && <h2 className="mt-8 mb-4 text-3xl lg:text-4xl font-display text-foreground leading-tight">{block.heading}</h2>}
                <p className={i === 0 ? "first-letter:font-display first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:leading-[0.8] first-letter:text-foreground" : ""}>
                  <RichText text={block.text} />
                </p>
              </section>
            ))}
          </div>
        </Container>
      </article>

      <section className="border-t border-foreground/10 py-20 lg:py-28">
        <Container>
          <h2 className="text-4xl lg:text-5xl font-display tracking-tight mb-12">Keep reading</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </PageShell>
  );
}
