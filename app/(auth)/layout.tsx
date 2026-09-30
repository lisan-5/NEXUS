import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AuthShowcase } from "@/components/auth/auth-showcase";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] bg-background">
      <div className="relative flex min-h-screen flex-col px-6 sm:px-12 lg:px-16 xl:px-24 py-8 overflow-hidden">
        {/* Faint grid, fading toward the form */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-lines pointer-events-none"
          style={{ maskImage: "radial-gradient(ellipse 70% 50% at 0% 0%, black, transparent 70%)" }}
        />

        <header className="relative flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#eca8d6] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#eca8d6]" />
            </span>
            <span className="font-display text-2xl tracking-tight">NEXUS</span>
            <span className="font-mono text-xs mt-1 text-muted-foreground">TM</span>
          </Link>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to site
          </Link>
        </header>

        <div className="relative flex flex-1 items-center py-16">
          <div className="w-full max-w-[420px] mx-auto lg:mx-0">{children}</div>
        </div>

        <footer className="relative flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>&copy; 2026 NEXUS</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/status" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#eca8d6]" />
              Status
            </Link>
          </div>
        </footer>
      </div>

      <aside className="hidden lg:block p-3 h-screen sticky top-0">
        <AuthShowcase />
      </aside>
    </div>
  );
}
