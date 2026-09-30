export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Engineering" | "Product" | "Company" | "Guides";
  author: string;
  role: string;
  date: string;
  readingTime: string;
  image?: string;
  body: { heading?: string; text: string }[];
};

export const posts: Post[] = [
  {
    slug: "exactly-once-at-18-billion-events",
    title: "Exactly-once delivery at 18 billion events a day",
    excerpt: "How we rebuilt our delivery layer around idempotent sinks and replayable logs, and what broke along the way.",
    category: "Engineering",
    author: "Tomás Herrera",
    role: "Co-founder & CTO",
    date: "2026-09-18",
    readingTime: "12 min read",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/connection-KeJwWPQvn6l0a7C48tCARYtNEdC92H.png",
    body: [
      { text: "When we crossed ten billion events a day, our at-least-once guarantees stopped being good enough. Duplicates that were a rounding error at small scale became millions of extra rows in customer warehouses." },
      { heading: "Idempotency at the edge", text: "Every event now carries a deterministic key derived from its source offset and schema version. Sinks deduplicate against a rolling window stored alongside the partition, so retries become free rather than dangerous." },
      { heading: "Replay without fear", text: "Because delivery is idempotent end to end, replaying a stream is now a routine operation. Teams use it to backfill new destinations, recover from downstream outages, and test transformations against production traffic." },
      { heading: "What broke", text: "Clock skew between regions, a surprising number of sinks that silently truncate keys, and one memorable incident involving a leap second. We'll cover each in a follow-up post." },
    ],
  },
  {
    slug: "introducing-edge-transforms-v2",
    title: "Introducing Edge Transforms v2",
    excerpt: "Write transforms in TypeScript, test them locally, and deploy to 29 regions with a single command.",
    category: "Product",
    author: "Priya Raman",
    role: "Head of Product",
    date: "2026-09-02",
    readingTime: "5 min read",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2812%29-ng3RrNnsPMJ5CrtOjcPTmhHg01W11q.png",
    body: [
      { text: "Edge Transforms v2 is our biggest release this year. Transforms are now plain TypeScript functions with full type inference from your schemas." },
      { heading: "Local first", text: "Run `nexus dev` to replay a sample of production traffic through your transform on your laptop, with the same runtime that runs at the edge." },
      { heading: "Deploy everywhere", text: "`nexus deploy` ships your transform to every region in under 30 seconds, with automatic rollback if error rates climb." },
    ],
  },
  {
    slug: "schema-evolution-without-downtime",
    title: "A practical guide to schema evolution without downtime",
    excerpt: "Adding, renaming, and removing fields on live streams, and how the schema registry keeps every consumer happy.",
    category: "Guides",
    author: "Aiko Tanaka",
    role: "VP Engineering",
    date: "2026-08-21",
    readingTime: "9 min read",
    body: [
      { text: "Schemas change. The question is whether your consumers find out from a migration plan or from a pager alert at 3am." },
      { heading: "Additive by default", text: "New optional fields are always safe. The registry marks them as backward-compatible and every consumer keeps working unchanged." },
      { heading: "Renames are two releases", text: "Add the new field, dual-write for a release, then deprecate the old one. The registry tracks which consumers still read the old name so you know when it's safe to remove." },
    ],
  },
  {
    slug: "series-b-and-whats-next",
    title: "Our Series B, and what comes next",
    excerpt: "We raised $60M to make real-time data infrastructure the default for every product team.",
    category: "Company",
    author: "Maya Lindqvist",
    role: "Co-founder & CEO",
    date: "2026-07-30",
    readingTime: "4 min read",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world-3i68QNWJwmO7W19ztZWbevAwJQHzYL.png",
    body: [
      { text: "Three years ago, three of us were debugging a broken pipeline at 2am and wondering why moving data was still so hard. Today, more than 4,200 teams run on NEXUS." },
      { heading: "Where the money goes", text: "More regions, deeper observability, and a much bigger connector library. We're also doubling our infrastructure team." },
    ],
  },
  {
    slug: "observability-for-event-pipelines",
    title: "What good observability looks like for event pipelines",
    excerpt: "Throughput and error rates aren't enough. Here's the dashboard we wish we'd had from day one.",
    category: "Engineering",
    author: "Daniel Osei",
    role: "Head of Infrastructure",
    date: "2026-07-12",
    readingTime: "7 min read",
    body: [
      { text: "Most pipeline dashboards answer 'is it up?' The useful questions are 'is it late?', 'is it complete?', and 'is it correct?'" },
      { heading: "Freshness over throughput", text: "End-to-end lag, measured from event creation to sink acknowledgement, is the single most important number we track." },
    ],
  },
  {
    slug: "postgres-cdc-in-five-minutes",
    title: "Postgres CDC to Snowflake in five minutes",
    excerpt: "A step-by-step walkthrough: logical replication, schema mapping, and your first real-time table.",
    category: "Guides",
    author: "Sam Whitfield",
    role: "VP Customer Success",
    date: "2026-06-28",
    readingTime: "6 min read",
    body: [
      { text: "Change data capture is the fastest way to get operational data into your warehouse, and with NEXUS it takes one source and one destination." },
      { heading: "Enable logical replication", text: "Set `wal_level = logical`, create a publication for the tables you care about, and give NEXUS a replication role." },
      { heading: "Connect Snowflake", text: "Add Snowflake as a destination, pick a warehouse, and NEXUS will create and evolve tables to match your source schema." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
