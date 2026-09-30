import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { RefreshIndicator } from "./refresh-indicator";

export const metadata: Metadata = {
  title: "Status",
  description: "Live and historical availability for every NEXUS service.",
};

type DayStatus = "up" | "degraded" | "outage";

// Deterministic pseudo-random history so the page renders identically on server and client
function history(seed: number, days = 90): DayStatus[] {
  return Array.from({ length: days }, (_, i) => {
    if (i === days - 1) return "up";
    const n = Math.sin(seed * 97.13 + i * 12.9898) * 43758.5453;
    const r = n - Math.floor(n);
    if (r > 0.993) return "outage";
    if (r > 0.965) return "degraded";
    return "up";
  });
}

const services = [
  { name: "Ingestion API", seed: 1 },
  { name: "Edge Transforms", seed: 2 },
  { name: "Routing & Delivery", seed: 3 },
  { name: "Schema Registry", seed: 4 },
  { name: "Replay Service", seed: 5 },
  { name: "Dashboard", seed: 6 },
  { name: "Webhooks", seed: 7 },
].map((s) => {
  const days = history(s.seed);
  const penalty = days.reduce((sum, d) => sum + (d === "outage" ? 0.9 : d === "degraded" ? 0.12 : 0), 0);
  return { ...s, days, uptime: (100 - penalty / days.length).toFixed(3) };
});

const regions = [
  { name: "us-east-1", city: "Virginia", latency: 18 },
  { name: "us-west-2", city: "Oregon", latency: 24 },
  { name: "eu-north-1", city: "Stockholm", latency: 14 },
  { name: "eu-west-1", city: "Dublin", latency: 16 },
  { name: "ap-southeast-1", city: "Singapore", latency: 29 },
  { name: "ap-northeast-1", city: "Tokyo", latency: 31 },
  { name: "sa-east-1", city: "São Paulo", latency: 38 },
  { name: "af-south-1", city: "Cape Town", latency: 42 },
];

const incidents = [
  {
    date: "Sep 24, 2026",
    title: "Elevated delivery latency to Snowflake destinations",
    status: "Resolved",
    duration: "42 min",
    updates: [
      { time: "14:52 UTC", text: "Latency has returned to normal levels. All queued events have been delivered." },
      { time: "14:18 UTC", text: "Identified a throttling change on the destination side; rolled out adaptive batching." },
      { time: "14:10 UTC", text: "Investigating increased p99 delivery latency for a subset of Snowflake destinations." },
    ],
  },
  {
    date: "Sep 3, 2026",
    title: "Dashboard intermittently unavailable",
    status: "Resolved",
    duration: "11 min",
    updates: [
      { time: "09:41 UTC", text: "Resolved. Pipelines were unaffected; only the dashboard UI was impacted." },
      { time: "09:30 UTC", text: "Investigating reports of 502 errors when loading the dashboard." },
    ],
  },
  {
    date: "Aug 17, 2026",
    title: "Scheduled maintenance: Schema Registry",
    status: "Completed",
    duration: "20 min",
    updates: [{ time: "03:00 UTC", text: "Zero-downtime migration of the registry storage layer completed as planned." }],
  },
];

const barColor: Record<DayStatus, string> = {
  up: "bg-[#eca8d6]/70 group-hover/bar:bg-[#eca8d6]",
  degraded: "bg-[#fbbf24]/80 group-hover/bar:bg-[#fbbf24]",
  outage: "bg-[#f87171]/80 group-hover/bar:bg-[#f87171]",
};

const statusLabel: Record<DayStatus, string> = {
  up: "No incidents",
  degraded: "Degraded performance",
  outage: "Partial outage",
};

export default function StatusPage() {
  return (
    <PageShell footerBanner={false}>
      <section className="relative overflow-hidden pt-36 lg:pt-48 pb-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-lines pointer-events-none"
          style={{ maskImage: "radial-gradient(ellipse 80% 70% at 30% 0%, black 20%, transparent 75%)" }}
        />
        <Container className="relative">
          <Eyebrow className="animate-fade-up">System status</Eyebrow>

          <div className="mt-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 animate-fade-up" style={{ animationDelay: "80ms" }}>
            <div className="flex items-start gap-6">
              <span className="relative mt-4 lg:mt-7 flex w-4 h-4 shrink-0">
                <span className="absolute inset-0 rounded-full bg-[#eca8d6] opacity-60 animate-ping" />
                <span className="relative w-4 h-4 rounded-full bg-[#eca8d6]" />
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display tracking-tight leading-[0.95]">
                All systems
                <br />
                <span className="text-muted-foreground">operational.</span>
              </h1>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-4">
              <RefreshIndicator />
              <Link
                href="/contact?topic=support"
                className="inline-flex h-11 items-center px-6 rounded-full border border-foreground/15 text-sm hover:bg-foreground/5 transition-colors"
              >
                Report an issue
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Services with 90-day history */}
      <section className="pb-20">
        <Container>
          <div className="border border-foreground/10">
            <div className="flex items-center justify-between px-6 lg:px-8 py-4 border-b border-foreground/10 text-xs font-mono text-muted-foreground">
              <span>Services</span>
              <span className="hidden sm:inline">90-day uptime</span>
            </div>
            {services.map((service, i) => (
              <Reveal key={service.name} delay={i * 50} className="px-6 lg:px-8 py-6 border-b border-foreground/10 last:border-b-0">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#eca8d6]" />
                    <span className="font-medium">{service.name}</span>
                  </span>
                  <span className="font-mono text-sm text-muted-foreground tabular-nums">{service.uptime}%</span>
                </div>
                <div className="flex gap-[2px] h-9">
                  {service.days.map((day, d) => (
                    <span key={d} className={`group/bar relative flex-1 ${d < 45 ? "hidden md:block" : ""}`}>
                      <span className={`block h-full transition-colors ${barColor[day]}`} />
                      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 whitespace-nowrap px-3 py-2 bg-foreground text-background text-xs opacity-0 group-hover/bar:opacity-100 transition-opacity">
                        <span className="block font-mono text-[10px] opacity-60">{89 - d === 0 ? "Today" : `${89 - d} days ago`}</span>
                        {statusLabel[day]}
                      </span>
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span className="hidden md:inline">90 days ago</span>
                  <span className="md:hidden">45 days ago</span>
                  <span>Today</span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-6 text-xs font-mono text-muted-foreground">
            {(Object.keys(statusLabel) as DayStatus[]).map((s) => (
              <span key={s} className="flex items-center gap-2">
                <span className={`w-3 h-3 ${barColor[s].split(" ")[0]}`} />
                {statusLabel[s]}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Regions */}
      <section className="py-20 border-t border-foreground/10">
        <Container>
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight leading-[0.95]">
              Regional
              <span className="text-muted-foreground"> latency.</span>
            </h2>
            <span className="text-sm text-muted-foreground font-mono">p50 ingestion → delivery, last hour</span>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {regions.map((region, i) => (
              <Reveal key={region.name} delay={(i % 4) * 60}>
                <div className="border border-foreground/10 p-6 transition-colors hover:border-foreground/30">
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span>{region.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#eca8d6]" />
                  </div>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-display">{region.latency}</span>
                    <span className="text-muted-foreground">ms</span>
                  </div>
                  <span className="block mt-1 text-sm text-muted-foreground">{region.city}</span>
                  <div className="mt-5 h-px bg-foreground/10">
                    <div className="h-px bg-[#eca8d6]/70" style={{ width: `${(region.latency / 50) * 100}%` }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Incidents */}
      <section className="py-20 lg:py-28 border-t border-foreground/10">
        <Container className="grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight leading-[0.95]">
              Past
              <span className="text-muted-foreground"> incidents.</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-sm">
              Every incident gets a public write-up. Subscribe via RSS or webhook to get updates the moment we post them.
            </p>
          </Reveal>
          <div className="lg:col-span-8 space-y-4">
            {incidents.map((incident, i) => (
              <Reveal key={incident.title} delay={i * 80}>
                <details className="group border border-foreground/10 open:border-foreground/25 transition-colors" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 p-6 lg:p-8 [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="block text-xs font-mono text-muted-foreground">{incident.date}</span>
                      <span className="block mt-2 text-xl lg:text-2xl font-display">{incident.title}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <span className="hidden sm:inline px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border border-foreground/15 text-muted-foreground">
                        {incident.status} · {incident.duration}
                      </span>
                      <span className="text-2xl leading-none text-muted-foreground transition-transform group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <ol className="px-6 lg:px-8 pb-8 space-y-5 border-l border-foreground/10 ml-6 lg:ml-8">
                    {incident.updates.map((u) => (
                      <li key={u.time} className="relative pl-6">
                        <span className="absolute -left-[3.5px] top-1.5 w-1.5 h-1.5 rounded-full bg-foreground/40" />
                        <span className="block text-xs font-mono text-muted-foreground">{u.time}</span>
                        <span className="block mt-1 text-sm text-foreground/80">{u.text}</span>
                      </li>
                    ))}
                  </ol>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
