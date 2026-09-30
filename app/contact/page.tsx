import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, LifeBuoy, Mail } from "lucide-react";
import { Container, PageHero, PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the NEXUS team about sales, demos, support, or careers.",
};

const channels = [
  { icon: Mail, title: "Sales", detail: "sales@nexus.dev", href: "mailto:sales@nexus.dev" },
  { icon: LifeBuoy, title: "Support", detail: "support@nexus.dev", href: "mailto:support@nexus.dev" },
  { icon: BookOpen, title: "Documentation", detail: "Guides & API reference", href: "/docs" },
];

const offices = [
  { city: "Stockholm", address: "Sveavägen 44, 111 34" },
  { city: "New York", address: "85 Broad St, NY 10004" },
  { city: "Singapore", address: "1 Raffles Pl, 048616" },
];

export default function ContactPage() {
  return (
    <PageShell footerBanner={false}>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        accent="about your data."
        description="Whether you're evaluating NEXUS, scaling past a billion events, or just stuck on a schema, a real engineer will get back to you."
      />

      <section className="pb-24 lg:pb-32">
        <Container className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <Suspense fallback={<div className="h-[640px] border border-foreground/10" />}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="lg:col-span-5 order-1 lg:order-2 space-y-12">
            <Reveal>
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">Reach us directly</h2>
              <ul className="border-t border-foreground/10">
                {channels.map((c) => (
                  <li key={c.title}>
                    <Link
                      href={c.href}
                      className="group flex items-center gap-5 py-5 border-b border-foreground/10 transition-colors hover:bg-foreground/[0.02]"
                    >
                      <span className="w-11 h-11 shrink-0 border border-foreground/15 flex items-center justify-center transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                        <c.icon className="w-5 h-5" />
                      </span>
                      <span className="flex-1">
                        <span className="block font-medium">{c.title}</span>
                        <span className="block text-sm text-muted-foreground">{c.detail}</span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-all group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">Offices</h2>
              <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
                {offices.map((o) => (
                  <div key={o.city} className="border border-foreground/10 p-6">
                    <span className="block text-2xl font-display">{o.city}</span>
                    <span className="block mt-2 text-sm text-muted-foreground">{o.address}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="relative overflow-hidden border border-[#eca8d6]/20 bg-[#eca8d6]/[0.04] p-6">
                <span className="inline-flex items-center gap-2 text-xs font-mono text-[#eca8d6]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#eca8d6] animate-pulse" />
                  Median first response
                </span>
                <span className="block mt-3 text-5xl font-display">2h 14m</span>
                <span className="block mt-1 text-sm text-muted-foreground">across all support tiers, last 30 days</span>
              </div>
            </Reveal>
          </aside>
        </Container>
      </section>
    </PageShell>
  );
}
