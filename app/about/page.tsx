import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, CtaBand, Eyebrow, PageHero, PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "About",
  description: "We're building the real-time backbone for connected products.",
};

const stats = [
  { value: "2021", label: "Founded in Stockholm" },
  { value: "140", label: "People across 3 continents" },
  { value: "4,200+", label: "Teams in production" },
  { value: "18B+", label: "Events moved every day" },
];

const values = [
  {
    number: "01",
    title: "Data should never wait",
    description: "Every millisecond between an event and a decision is lost context. We obsess over latency so our customers don't have to.",
  },
  {
    number: "02",
    title: "Reliability is a feature",
    description: "Retries, replays, and delivery guarantees aren't add-ons. They're the foundation everything else is built on.",
  },
  {
    number: "03",
    title: "Developers first, always",
    description: "If it takes more than a few lines of code, we haven't finished designing it. Great tools disappear into the work.",
  },
  {
    number: "04",
    title: "Trust is earned in the details",
    description: "Encryption, audit trails, and least-privilege access by default, because governance shouldn't slow anyone down.",
  },
];

const timeline = [
  { year: "2021", title: "First event delivered", description: "Three engineers, one broken pipeline, and a better idea for moving data." },
  { year: "2022", title: "Seed & first 100 teams", description: "Launched the TypeScript SDK and our first 20 connectors." },
  { year: "2023", title: "Edge processing", description: "Transforms moved to 29 regions, cutting median latency by 64%." },
  { year: "2024", title: "Series B", description: "Scaled to 1B events a day and opened offices in New York and Singapore." },
  { year: "2026", title: "18B events a day", description: "Now powering real-time products at over 4,200 companies." },
];

const team = [
  { name: "Maya Lindqvist", role: "Co-founder & CEO" },
  { name: "Tomás Herrera", role: "Co-founder & CTO" },
  { name: "Aiko Tanaka", role: "VP Engineering" },
  { name: "Daniel Osei", role: "Head of Infrastructure" },
  { name: "Priya Raman", role: "Head of Product" },
  { name: "Lukas Brenner", role: "Head of Security" },
  { name: "Noor Haddad", role: "Head of Design" },
  { name: "Sam Whitfield", role: "VP Customer Success" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About NEXUS"
        title="Built for data"
        accent="that can't wait."
        description="We started NEXUS because moving live data between systems was the most fragile part of every product we'd built. Today we're the real-time backbone for thousands of engineering teams."
      />

      {/* Stats */}
      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-foreground/10">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80} className="border-r border-b border-foreground/10 p-8 lg:p-10">
                <span className="block text-5xl lg:text-6xl font-display">{stat.value}</span>
                <span className="block mt-3 text-sm text-muted-foreground">{stat.label}</span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission with image */}
      <section className="relative py-24 lg:py-32 bg-[oklch(0.09_0.01_260)] overflow-hidden">
        <Container className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <Eyebrow>Our mission</Eyebrow>
            <h2 className="mt-8 text-5xl lg:text-7xl font-display tracking-tight leading-[0.95]">
              Make every signal
              <br />
              <span className="text-muted-foreground">instantly useful.</span>
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-lg">
              Products are only as responsive as the data behind them. We&apos;re building infrastructure that lets any team
              capture, shape, and deliver events the moment they happen, without running a single broker.
            </p>
          </Reveal>
          <Reveal delay={150} className="relative h-[420px] lg:h-[560px]">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tree-uAia6REvB137CQyHFCf0za3O6h2zKO.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-contain object-bottom"
            />
          </Reveal>
        </Container>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32">
        <Container>
          <Reveal className="mb-16 lg:mb-20">
            <Eyebrow>What we believe</Eyebrow>
            <h2 className="mt-8 text-5xl lg:text-7xl font-display tracking-tight leading-[0.95]">
              Principles,
              <span className="text-muted-foreground"> not slogans.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={(i % 2) * 100}>
                <div className="group h-full border border-foreground/10 p-8 lg:p-12 transition-colors duration-300 hover:border-foreground/30 hover:bg-foreground/[0.02]">
                  <span className="font-mono text-sm text-muted-foreground group-hover:text-[#eca8d6] transition-colors">
                    {value.number}
                  </span>
                  <h3 className="mt-6 text-3xl lg:text-4xl font-display">{value.title}</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32 border-t border-foreground/10">
        <Container className="grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>Journey</Eyebrow>
              <h2 className="mt-8 text-5xl lg:text-6xl font-display tracking-tight leading-[0.95]">
                Five years,
                <br />
                <span className="text-muted-foreground">one stream.</span>
              </h2>
            </div>
          </Reveal>
          <ol className="lg:col-span-8 relative border-l border-foreground/10">
            {timeline.map((item, i) => (
              <li key={item.year} className="relative pl-10 pb-14 last:pb-0">
                <span
                  className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full ${
                    i === timeline.length - 1 ? "bg-[#eca8d6] shadow-[0_0_16px_rgba(236,168,214,0.8)]" : "bg-foreground/30"
                  }`}
                />
                <Reveal>
                  <span className="font-mono text-sm text-muted-foreground">{item.year}</span>
                  <h3 className="mt-2 text-3xl font-display">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground max-w-lg">{item.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32 border-t border-foreground/10">
        <Container>
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div>
              <Eyebrow>Leadership</Eyebrow>
              <h2 className="mt-8 text-5xl lg:text-7xl font-display tracking-tight leading-[0.95]">
                The people
                <span className="text-muted-foreground"> behind it.</span>
              </h2>
            </div>
            <Link
              href="/careers"
              className="group inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              We&apos;re hiring
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((person, i) => (
              <Reveal key={person.name} delay={(i % 4) * 70}>
                <div className="group border border-foreground/10 p-6 transition-colors hover:border-foreground/30">
                  <div className="relative aspect-square mb-6 overflow-hidden bg-foreground/[0.03] flex items-center justify-center">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(circle at 50% 120%, rgba(236,168,214,0.25), transparent 60%)" }}
                    />
                    <span className="relative font-display text-6xl text-foreground/70">{initials(person.name)}</span>
                  </div>
                  <p className="font-medium">{person.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{person.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Build what's next with us."
        description="Join 4,200+ teams streaming data with NEXUS, or come help us build it."
        secondary={{ label: "See open roles", href: "/careers" }}
      />
    </PageShell>
  );
}
