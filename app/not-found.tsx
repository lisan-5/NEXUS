import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";

const suggestions = [
  { label: "Home", href: "/" },
  { label: "Documentation", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
  { label: "System status", href: "/status" },
];

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col">
      <Navigation />
      <div aria-hidden="true" className="absolute inset-0 bg-grid-lines pointer-events-none" style={{ maskImage: "radial-gradient(ellipse 60% 60% at 50% 45%, black, transparent 75%)" }} />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(236,168,214,0.10), rgba(103,232,249,0.04) 40%, transparent 65%)" }}
      />

      <div className="relative flex-1 flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-32">
          <p className="font-mono text-sm text-muted-foreground animate-fade-up">
            <span className="text-[#eca8d6]">ERR</span> · event not routable
          </p>
          <h1 className="mt-6 font-display tracking-tight leading-[0.85] text-[clamp(7rem,24vw,22rem)] animate-fade-up" style={{ animationDelay: "80ms" }}>
            4<span className="word-gradient">0</span>4
          </h1>
          <div className="mt-6 grid lg:grid-cols-2 gap-10 items-end animate-fade-up" style={{ animationDelay: "160ms" }}>
            <p className="text-2xl lg:text-3xl font-display text-muted-foreground leading-snug max-w-lg">
              This page dropped out of the stream. Let&apos;s route you somewhere that exists.
            </p>
            <ul className="border-t border-foreground/10">
              {suggestions.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group flex items-center justify-between py-4 border-b border-foreground/10 text-lg hover:bg-foreground/[0.02] transition-colors"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-2">{s.label}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
