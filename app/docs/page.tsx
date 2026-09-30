import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Database, GitBranch, Radio, Shuffle } from "lucide-react";
import { Container, Eyebrow, PageShell } from "@/components/site/page-shell";
import { CodeBlock, DocsSidebar } from "./docs-client";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Guides, SDK reference, and REST API for building real-time pipelines with NEXUS.",
};

const groups = [
  {
    title: "Getting started",
    items: [
      { id: "quickstart", label: "Quickstart" },
      { id: "concepts", label: "Core concepts" },
    ],
  },
  {
    title: "Build",
    items: [
      { id: "sdk", label: "TypeScript SDK" },
      { id: "transforms", label: "Transforms" },
      { id: "routing", label: "Routing & delivery" },
    ],
  },
  {
    title: "Reference",
    items: [
      { id: "api", label: "REST API" },
      { id: "connectors", label: "Connectors" },
      { id: "limits", label: "Limits" },
    ],
  },
];

const concepts = [
  { icon: Radio, title: "Sources", description: "Where events come from: SDKs, webhooks, databases, and queues." },
  { icon: Shuffle, title: "Transforms", description: "TypeScript functions that validate, enrich, and redact at the edge." },
  { icon: GitBranch, title: "Routes", description: "Declarative rules that decide which destinations receive each event." },
  { icon: Database, title: "Destinations", description: "Warehouses, APIs, and queues, with retries and replay built in." },
];

const endpoints = [
  { method: "POST", path: "/v1/events", description: "Ingest one or many events into a source." },
  { method: "GET", path: "/v1/sources", description: "List sources in the current workspace." },
  { method: "POST", path: "/v1/sources", description: "Create a new source with a schema." },
  { method: "GET", path: "/v1/pipelines/:id", description: "Fetch a pipeline and its live metrics." },
  { method: "POST", path: "/v1/pipelines/:id/replay", description: "Replay a time range to one or more destinations." },
  { method: "DELETE", path: "/v1/destinations/:id", description: "Remove a destination and drain in-flight events." },
];

const connectors = {
  Sources: ["PostgreSQL", "MySQL", "MongoDB", "Kafka", "Segment", "Stripe", "GitHub", "Webhooks"],
  Destinations: ["Snowflake", "BigQuery", "Redshift", "Databricks", "ClickHouse", "S3", "Kafka", "Slack"],
};

const limits = [
  { name: "Max event size", value: "1 MB" },
  { name: "Batch size", value: "500 events" },
  { name: "Ingest rate (Builder)", value: "10k events/s" },
  { name: "Retention (Explorer)", value: "7 days" },
  { name: "Retention (Builder)", value: "30 days" },
  { name: "Transform timeout", value: "50 ms" },
];

const methodColor: Record<string, string> = {
  GET: "text-[#67e8f9] border-[#67e8f9]/30",
  POST: "text-[#eca8d6] border-[#eca8d6]/30",
  DELETE: "text-[#f87171] border-[#f87171]/30",
};

function DocSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 py-14 border-b border-foreground/10 last:border-b-0">
      <h2 className="text-4xl lg:text-5xl font-display tracking-tight">
        <a href={`#${id}`} className="group inline-flex items-baseline gap-3">
          {title}
          <span className="text-2xl text-foreground/0 group-hover:text-foreground/30 transition-colors">#</span>
        </a>
      </h2>
      <div className="mt-6 text-foreground/75 leading-relaxed space-y-4">{children}</div>
    </section>
  );
}

const Code = ({ children }: { children: ReactNode }) => (
  <code className="px-1.5 py-0.5 font-mono text-[0.85em] bg-foreground/[0.06] border border-foreground/10 text-[#eca8d6]">{children}</code>
);

export default function DocsPage() {
  return (
    <PageShell footerBanner={false}>
      <div className="relative pt-32 lg:pt-40">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[480px] bg-grid-lines pointer-events-none"
          style={{ maskImage: "radial-gradient(ellipse 80% 80% at 30% 0%, black 20%, transparent 75%)" }}
        />
        <Container className="relative grid lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_200px] gap-12 xl:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-10">
              <DocsSidebar groups={groups} />
            </div>
          </aside>

          <div className="min-w-0 pb-24">
            <header className="pb-10 border-b border-foreground/10 animate-fade-up">
              <Eyebrow>Documentation</Eyebrow>
              <h1 className="mt-8 text-6xl lg:text-8xl font-display tracking-tight leading-[0.9]">
                Build with
                <br />
                <span className="text-muted-foreground">NEXUS.</span>
              </h1>
              <p className="mt-8 text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Everything you need to capture, shape, and route real-time data, from your first event to billions a day.
              </p>
              <div className="lg:hidden mt-8 flex flex-wrap gap-2">
                {groups.flatMap((g) => g.items).map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="px-3 py-1.5 text-xs border border-foreground/15 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </header>

            <DocSection id="quickstart" title="Quickstart">
              <p>Install the SDK and authenticate with your workspace. You&apos;ll be sending events in under five minutes.</p>
              <CodeBlock language="bash" filename="terminal" code={`npm install @nexus/sdk\nnpx nexus login`} />
              <p>Create a source and send your first event:</p>
              <CodeBlock
                filename="index.ts"
                code={`import { Nexus } from '@nexus/sdk'

const nexus = new Nexus({ apiKey: process.env.NEXUS_API_KEY })

const stream = nexus.source({ name: 'product-events', region: 'auto' })

await stream.send({ type: 'signup', userId: 'u_42', plan: 'builder' })
// ✓ delivered in 31ms`}
              />
            </DocSection>

            <DocSection id="concepts" title="Core concepts">
              <p>Every pipeline in NEXUS is built from four primitives that compose together.</p>
              <div className="grid sm:grid-cols-2 gap-3 pt-4">
                {concepts.map((c) => (
                  <div key={c.title} className="border border-foreground/10 p-6 transition-colors hover:border-foreground/30">
                    <c.icon className="w-5 h-5 text-[#eca8d6]" />
                    <h3 className="mt-4 text-xl font-display text-foreground">{c.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                  </div>
                ))}
              </div>
            </DocSection>

            <DocSection id="sdk" title="TypeScript SDK">
              <p>
                The SDK is fully typed. Pass a schema to a source and every <Code>send</Code>, transform, and route is
                type-checked end to end.
              </p>
              <CodeBlock
                filename="schema.ts"
                code={`import { z } from 'zod'

export const ProductEvent = z.object({
  type: z.enum(['signup', 'purchase', 'churn']),
  userId: z.string(),
  amount: z.number().optional(),
})

const stream = nexus.source({ name: 'product-events', schema: ProductEvent })`}
              />
            </DocSection>

            <DocSection id="transforms" title="Transforms">
              <p>
                Transforms run at the edge, close to where events are produced. Use them to validate, enrich, and strip
                sensitive fields before data leaves the region.
              </p>
              <CodeBlock
                filename="transform.ts"
                code={`stream.transform({
  validate: true,
  redact: ['user.email'],
  enrich: ['geo', 'device'],
})`}
              />
            </DocSection>

            <DocSection id="routing" title="Routing & delivery">
              <p>
                Routes send each event to one or more destinations. Failed deliveries are retried with exponential backoff
                and can be replayed at any time with <Code>nexus replay</Code>.
              </p>
              <CodeBlock
                filename="route.ts"
                code={`stream.route({
  destinations: ['snowflake', 'kafka'],
  where: (e) => e.type !== 'churn',
  retry: 'exponential',
  replay: true,
})`}
              />
            </DocSection>

            <DocSection id="api" title="REST API">
              <p>
                All endpoints live under <Code>https://api.nexus.dev</Code> and authenticate with a bearer token.
              </p>
              <CodeBlock
                language="bash"
                filename="curl"
                code={`curl https://api.nexus.dev/v1/events \\
  -H "Authorization: Bearer $NEXUS_API_KEY" \\
  -d '{"source":"product-events","type":"signup"}'`}
              />
              <div className="border border-foreground/10 divide-y divide-foreground/10 mt-6">
                {endpoints.map((e) => (
                  <div key={e.method + e.path} className="grid sm:grid-cols-[80px_minmax(0,1fr)_minmax(0,1.2fr)] gap-2 sm:gap-6 items-center px-5 py-4 hover:bg-foreground/[0.02] transition-colors">
                    <span className={`justify-self-start px-2 py-0.5 border text-[11px] font-mono ${methodColor[e.method]}`}>{e.method}</span>
                    <span className="font-mono text-sm text-foreground truncate">{e.path}</span>
                    <span className="text-sm text-muted-foreground">{e.description}</span>
                  </div>
                ))}
              </div>
            </DocSection>

            <DocSection id="connectors" title="Connectors">
              <p>100+ managed connectors, versioned and maintained by the NEXUS team. A selection of the most used:</p>
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                {Object.entries(connectors).map(([kind, list]) => (
                  <div key={kind}>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">{kind}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {list.map((name) => (
                        <span key={name} className="flex items-center gap-2 border border-foreground/10 px-4 py-3 text-sm text-foreground/85">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#eca8d6]/70" />
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </DocSection>

            <DocSection id="limits" title="Limits">
              <div className="border border-foreground/10 divide-y divide-foreground/10">
                {limits.map((l) => (
                  <div key={l.name} className="flex items-center justify-between px-5 py-4 text-sm">
                    <span className="text-muted-foreground">{l.name}</span>
                    <span className="font-mono text-foreground">{l.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Need more?{" "}
                <Link href="/contact?topic=sales" className="text-foreground underline underline-offset-4 decoration-foreground/30">
                  Talk to us about Scale
                </Link>
                .
              </p>
            </DocSection>
          </div>

          {/* Right rail */}
          <aside className="hidden xl:block">
            <div className="sticky top-28 space-y-4">
              <div className="border border-foreground/10 p-5">
                <p className="text-xs font-mono text-muted-foreground">SDK version</p>
                <p className="mt-2 text-2xl font-display">v4.2.0</p>
                <p className="mt-1 text-xs text-muted-foreground">Released Sep 18, 2026</p>
              </div>
              <Link
                href="/signup"
                className="group block border border-foreground/10 p-5 transition-colors hover:border-[#eca8d6]/40 hover:bg-[#eca8d6]/[0.04]"
              >
                <p className="text-sm">Get an API key</p>
                <p className="mt-1 text-xs text-muted-foreground">1M events free</p>
                <ArrowRight className="mt-4 w-4 h-4 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-1" />
              </Link>
              <Link href="/status" className="flex items-center gap-2 px-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-[#eca8d6]" />
                All systems operational
              </Link>
            </div>
          </aside>
        </Container>
      </div>
    </PageShell>
  );
}
