import type { Metadata } from "next";
import { Fragment } from "react";
import { Check, Minus } from "lucide-react";
import { PricingSection } from "@/components/landing/pricing-section";
import { Container, CtaBand, Eyebrow, PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Start free with 1 million events. Scale to billions with predictable pricing.",
};

type Cell = boolean | string;

const plans = ["Explorer", "Builder", "Scale"];

const comparison: { group: string; rows: { feature: string; values: [Cell, Cell, Cell] }[] }[] = [
  {
    group: "Usage",
    rows: [
      { feature: "Events per month", values: ["1M", "25M", "Custom"] },
      { feature: "Active pipelines", values: ["3", "Unlimited", "Unlimited"] },
      { feature: "Event history", values: ["7 days", "30 days", "Up to 1 year"] },
      { feature: "Regions", values: ["1", "All 29", "All 29 + dedicated"] },
    ],
  },
  {
    group: "Platform",
    rows: [
      { feature: "Core connectors", values: [true, true, true] },
      { feature: "Edge transforms", values: [true, true, true] },
      { feature: "Schema registry", values: [false, true, true] },
      { feature: "Replay & backfill", values: [false, true, true] },
      { feature: "Private integrations", values: [false, true, true] },
      { feature: "Dedicated throughput", values: [false, false, true] },
      { feature: "On-premise deployment", values: [false, false, true] },
    ],
  },
  {
    group: "Security & compliance",
    rows: [
      { feature: "Encryption at rest & in transit", values: [true, true, true] },
      { feature: "Full audit trails", values: [false, true, true] },
      { feature: "SSO / SAML", values: [false, "Add-on", true] },
      { feature: "Private networking", values: [false, false, true] },
      { feature: "HIPAA BAA", values: [false, false, true] },
    ],
  },
  {
    group: "Support",
    rows: [
      { feature: "Support channel", values: ["Community", "Priority email", "24/7 dedicated"] },
      { feature: "Uptime SLA", values: [false, "99.9%", "99.99%"] },
      { feature: "Solutions architect", values: [false, false, true] },
    ],
  },
];

const faqs = [
  {
    q: "What counts as an event?",
    a: "Any single message ingested into a source, up to 1 MB. Transforms and fan-out to multiple destinations don't count as extra events.",
  },
  {
    q: "What happens if I go over my monthly events?",
    a: "Nothing breaks. We never drop data. On Builder, overage is billed at $2 per additional million events; on Explorer we'll ask you to upgrade.",
  },
  {
    q: "Can I switch plans at any time?",
    a: "Yes. Upgrades take effect immediately and are prorated. Downgrades apply at the end of your current billing period.",
  },
  {
    q: "Do you offer discounts for startups or non-profits?",
    a: "We do. Eligible startups get Builder free for 12 months, and non-profits get 50% off. Contact sales to apply.",
  },
  {
    q: "Is there a free trial of Builder?",
    a: "Every new workspace gets a 14-day Builder trial with no credit card required. You'll drop to Explorer automatically if you don't upgrade.",
  },
];

function CellValue({ value, highlight }: { value: Cell; highlight?: boolean }) {
  if (value === true) return <Check className={`w-4 h-4 ${highlight ? "text-[#eca8d6]" : "text-foreground/70"}`} aria-label="Included" />;
  if (value === false) return <Minus className="w-4 h-4 text-foreground/20" aria-label="Not included" />;
  return <span className={`text-sm ${highlight ? "text-foreground" : "text-muted-foreground"}`}>{value}</span>;
}

export default function PricingPage() {
  return (
    <PageShell>
      <div className="pt-12">
        <PricingSection />
      </div>

      {/* Comparison */}
      <section className="pb-24 lg:pb-32">
        <Container>
          <Reveal className="mb-12">
            <Eyebrow>Compare plans</Eyebrow>
            <h2 className="mt-8 text-5xl lg:text-7xl font-display tracking-tight leading-[0.95]">
              Every detail,
              <span className="text-muted-foreground"> side by side.</span>
            </h2>
          </Reveal>

          <Reveal>
            <div className="overflow-x-auto border border-foreground/10">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead className="sticky top-0">
                  <tr className="border-b border-foreground/10 bg-background">
                    <th className="w-2/5 p-6 font-normal text-sm text-muted-foreground">Features</th>
                    {plans.map((plan, i) => (
                      <th key={plan} className={`p-6 font-normal ${i === 1 ? "bg-foreground/[0.03]" : ""}`}>
                        <span className="block text-2xl font-display">{plan}</span>
                        {i === 1 && <span className="block mt-1 text-[10px] font-mono uppercase tracking-widest text-[#eca8d6]">Most popular</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((section) => (
                    <Fragment key={section.group}>
                      <tr className="border-b border-foreground/10">
                        <td colSpan={4} className="px-6 pt-10 pb-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                          {section.group}
                        </td>
                      </tr>
                      {section.rows.map((row) => (
                        <tr key={row.feature} className="border-b border-foreground/[0.06] hover:bg-foreground/[0.02] transition-colors">
                          <td className="px-6 py-4 text-sm">{row.feature}</td>
                          {row.values.map((value, i) => (
                            <td key={i} className={`px-6 py-4 ${i === 1 ? "bg-foreground/[0.03]" : ""}`}>
                              <CellValue value={value} highlight={i === 1} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 border-t border-foreground/10">
        <Container className="grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-8 text-5xl lg:text-7xl font-display tracking-tight leading-[0.95]">
              Questions,
              <br />
              <span className="text-muted-foreground">answered.</span>
            </h2>
          </Reveal>
          <div className="lg:col-span-7 border-t border-foreground/10">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 60}>
                <details className="group border-b border-foreground/10">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 [&::-webkit-details-marker]:hidden">
                    <span className="text-xl lg:text-2xl font-display">{faq.q}</span>
                    <span className="flex w-9 h-9 shrink-0 items-center justify-center border border-foreground/15 text-lg text-muted-foreground transition-all group-open:rotate-45 group-open:border-foreground group-open:text-foreground">
                      +
                    </span>
                  </summary>
                  <p className="pb-8 pr-16 text-muted-foreground leading-relaxed">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Not sure which plan fits?"
        description="Tell us about your volume and we'll recommend the right setup, usually in a single call."
        primary={{ label: "Start free", href: "/signup" }}
        secondary={{ label: "Talk to sales", href: "/contact?topic=sales" }}
      />
    </PageShell>
  );
}
