import Link from "next/link";
import { Container, PageHero, PageShell } from "@/components/site/page-shell";

export type LegalSection = { id: string; title: string; paragraphs: string[] };

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function LegalPage({
  eyebrow,
  title,
  accent,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  updated: string;
  intro: string;
  sections: Omit<LegalSection, "id">[];
}) {
  const withIds = sections.map((s) => ({ ...s, id: slug(s.title) }));

  return (
    <PageShell footerBanner={false}>
      <PageHero eyebrow={eyebrow} title={title} accent={accent} size="md" description={intro}>
        <p className="mt-8 font-mono text-xs text-muted-foreground">Last updated {updated}</p>
      </PageHero>

      <section className="pb-24 lg:pb-32">
        <Container className="grid lg:grid-cols-12 gap-12 border-t border-foreground/10 pt-12">
          <aside className="lg:col-span-3">
            <nav aria-label="On this page" className="lg:sticky lg:top-28">
              <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-4">On this page</p>
              <ol className="space-y-2.5 text-sm">
                {withIds.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="group flex gap-3 text-muted-foreground hover:text-foreground transition-colors">
                      <span className="font-mono text-xs text-foreground/30 group-hover:text-[#eca8d6] transition-colors pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5 max-w-[720px]">
            {withIds.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 pb-12 mb-12 border-b border-foreground/10 last:border-b-0">
                <span className="font-mono text-xs text-[#eca8d6]">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-3 text-3xl lg:text-4xl font-display tracking-tight">{s.title}</h2>
                <div className="mt-5 space-y-4 text-foreground/75 leading-[1.8]">
                  {s.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <div className="border border-foreground/10 p-8">
              <p className="text-2xl font-display">Questions about this policy?</p>
              <p className="mt-2 text-muted-foreground">
                Email{" "}
                <a href="mailto:legal@nexus.dev" className="text-foreground underline underline-offset-4 decoration-foreground/30">
                  legal@nexus.dev
                </a>{" "}
                or{" "}
                <Link href="/contact?topic=other" className="text-foreground underline underline-offset-4 decoration-foreground/30">
                  contact us
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
