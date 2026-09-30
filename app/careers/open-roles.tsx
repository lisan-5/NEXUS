"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const roles = [
  { title: "Senior Distributed Systems Engineer", team: "Engineering", location: "Stockholm / Remote EU", type: "Full-time" },
  { title: "Staff Engineer, Stream Processing", team: "Engineering", location: "New York", type: "Full-time" },
  { title: "Developer Experience Engineer", team: "Engineering", location: "Remote", type: "Full-time" },
  { title: "Site Reliability Engineer", team: "Infrastructure", location: "Singapore", type: "Full-time" },
  { title: "Network Engineer, Edge", team: "Infrastructure", location: "Stockholm", type: "Full-time" },
  { title: "Product Designer, Observability", team: "Design", location: "Remote EU", type: "Full-time" },
  { title: "Product Manager, Connectors", team: "Product", location: "New York", type: "Full-time" },
  { title: "Solutions Architect", team: "Go-to-market", location: "London", type: "Full-time" },
  { title: "Developer Advocate", team: "Go-to-market", location: "Remote", type: "Full-time" },
];

const teams = ["All", ...Array.from(new Set(roles.map((r) => r.team)))];

export function OpenRoles() {
  const [team, setTeam] = useState("All");
  const visible = team === "All" ? roles : roles.filter((r) => r.team === team);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter by team">
        {teams.map((t) => {
          const count = t === "All" ? roles.length : roles.filter((r) => r.team === t).length;
          const active = t === team;
          return (
            <button
              key={t}
              role="tab"
              aria-selected={active}
              onClick={() => setTeam(t)}
              className={`px-4 py-2 text-sm border transition-colors ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/15 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {t}
              <span className={`ml-2 font-mono text-xs ${active ? "text-background/60" : "text-foreground/30"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="border-t border-foreground/10">
        {visible.map((role, i) => (
          <li key={role.title} className="animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
            <Link
              href={`/contact?topic=careers&role=${encodeURIComponent(role.title)}`}
              className="group relative grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-center py-7 border-b border-foreground/10 transition-colors hover:bg-foreground/[0.02]"
            >
              <span className="absolute left-0 top-0 bottom-0 w-px bg-[#eca8d6] scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
              <span className="md:col-span-6 text-2xl lg:text-3xl font-display md:pl-6 transition-transform duration-300 group-hover:translate-x-2">
                {role.title}
              </span>
              <span className="md:col-span-2 text-sm text-muted-foreground font-mono">{role.team}</span>
              <span className="md:col-span-3 text-sm text-muted-foreground">{role.location}</span>
              <span className="hidden md:flex md:col-span-1 justify-end pr-4">
                <ArrowUpRight className="w-5 h-5 text-muted-foreground transition-all group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
