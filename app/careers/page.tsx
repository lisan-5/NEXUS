import type { Metadata } from "next";
import { Globe, HeartPulse, Laptop, Plane, Sprout, Wallet } from "lucide-react";
import { Container, CtaBand, Eyebrow, PageHero, PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { OpenRoles } from "./open-roles";

export const metadata: Metadata = {
  title: "Careers",
  description: "Help us build the real-time backbone for connected products.",
};

const perks = [
  { icon: Globe, title: "Remote-friendly", description: "Work from our hubs in Stockholm, New York, and Singapore, or from anywhere in overlapping time zones." },
  { icon: Wallet, title: "Meaningful equity", description: "Everyone owns a piece of what we build, with a 10-year exercise window." },
  { icon: HeartPulse, title: "Full health cover", description: "Comprehensive medical, dental, and mental-health support for you and your family." },
  { icon: Plane, title: "Real time off", description: "30 days of paid leave plus a company-wide week off every winter." },
  { icon: Laptop, title: "Your ideal setup", description: "A generous home-office budget and the hardware you need, refreshed every two years." },
  { icon: Sprout, title: "Room to grow", description: "A yearly learning budget, conference travel, and clear paths for both ICs and managers." },
];

export default function CareersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Careers"
        title="Move the data"
        accent="that moves the world."
        description="We're a small, senior team solving hard distributed-systems problems for thousands of engineers. If you like building things that simply have to work, you'll fit right in."
      >
        <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
          {[
            { value: "9", label: "Open roles" },
            { value: "23", label: "Nationalities" },
            { value: "4.8", label: "Glassdoor rating" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-3">
              <span className="text-4xl font-display">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Open roles */}
      <section id="roles" className="py-16 lg:py-24">
        <Container>
          <Reveal className="mb-12">
            <Eyebrow>Open positions</Eyebrow>
          </Reveal>
          <OpenRoles />
        </Container>
      </section>

      {/* Perks */}
      <section className="py-24 lg:py-32 bg-[oklch(0.09_0.01_260)]">
        <Container>
          <Reveal className="mb-16">
            <Eyebrow>Benefits</Eyebrow>
            <h2 className="mt-8 text-5xl lg:text-7xl font-display tracking-tight leading-[0.95]">
              We take care
              <span className="text-muted-foreground"> of our people.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {perks.map((perk, i) => (
              <Reveal key={perk.title} delay={(i % 3) * 80}>
                <div className="group h-full border border-foreground/10 bg-black/40 p-8 transition-colors hover:border-foreground/30">
                  <div className="w-11 h-11 border border-foreground/20 flex items-center justify-center transition-colors group-hover:bg-foreground group-hover:text-background group-hover:border-foreground">
                    <perk.icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-8 text-2xl font-display">{perk.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{perk.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-24 lg:py-32">
        <Container>
          <Reveal className="mb-16">
            <Eyebrow>How we hire</Eyebrow>
            <h2 className="mt-8 text-5xl lg:text-7xl font-display tracking-tight leading-[0.95]">
              Four steps,
              <span className="text-muted-foreground"> no surprises.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Intro call", description: "30 minutes with a hiring manager about your work and what you're looking for." },
              { title: "Technical deep-dive", description: "A conversation about a system you've built. No whiteboard puzzles." },
              { title: "Paid project", description: "A small, scoped piece of real work, paid at your market rate." },
              { title: "Meet the team", description: "Chat with future teammates, then an offer within 48 hours." },
            ].map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div className="relative h-full border border-foreground/10 p-8">
                  <span className="text-4xl font-display text-[#eca8d6]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 text-2xl font-display">{step.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Don't see your role?"
        description="We're always keen to meet exceptional people. Tell us what you'd like to build."
        primary={{ label: "Get in touch", href: "/contact?topic=careers" }}
        secondary={{ label: "About NEXUS", href: "/about" }}
      />
    </PageShell>
  );
}
