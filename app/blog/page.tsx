import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, PageHero, PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { formatDate, posts } from "@/lib/blog";
import { PostGrid } from "./post-grid";
import { NewsletterForm } from "./newsletter-form";

export const metadata: Metadata = {
  title: "Blog",
  description: "Engineering deep-dives, product updates, and guides from the NEXUS team.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title="Notes from"
        accent="the stream."
        description="Engineering deep-dives, product launches, and practical guides from the people building NEXUS."
      />

      {/* Featured */}
      <section className="pb-16 lg:pb-24">
        <Container>
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid lg:grid-cols-2 border border-foreground/10 transition-colors hover:border-foreground/30"
            >
              <div className="relative min-h-[280px] lg:min-h-[460px] overflow-hidden bg-black">
                {featured.image && (
                  <img
                    src={featured.image}
                    alt=""
                    aria-hidden="true"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
              </div>
              <div className="flex flex-col p-8 lg:p-14">
                <span className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-[#eca8d6]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#eca8d6]" />
                  Featured · {featured.category}
                </span>
                <h2 className="mt-6 text-4xl lg:text-5xl xl:text-6xl font-display tracking-tight leading-[1]">{featured.title}</h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                <div className="mt-auto pt-10 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <span className="w-11 h-11 rounded-full bg-foreground/10 flex items-center justify-center font-display text-lg">
                      {featured.author.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm">{featured.author}</span>
                      <span className="block text-xs font-mono text-muted-foreground">
                        {formatDate(featured.date)} · {featured.readingTime}
                      </span>
                    </span>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Read
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* All posts */}
      <section className="pb-24 lg:pb-32">
        <Container>
          <PostGrid posts={rest} />
        </Container>
      </section>

      {/* Newsletter */}
      <section className="pb-24 lg:pb-32">
        <Container>
          <Reveal className="grid lg:grid-cols-2 gap-10 items-end border-t border-foreground/10 pt-16">
            <div>
              <h2 className="text-5xl lg:text-6xl font-display tracking-tight leading-[0.95]">
                One email a month.
                <br />
                <span className="text-muted-foreground">Zero fluff.</span>
              </h2>
            </div>
            <NewsletterForm />
          </Reveal>
        </Container>
      </section>
    </PageShell>
  );
}
