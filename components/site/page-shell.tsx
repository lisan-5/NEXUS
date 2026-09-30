import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { cn } from "@/lib/utils";

export function PageShell({ children, footerBanner = true }: { children: ReactNode; footerBanner?: boolean }) {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Navigation />
      {children}
      <FooterSection showBanner={footerBanner} />
    </main>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("max-w-[1400px] mx-auto px-6 lg:px-12", className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-sm font-mono text-muted-foreground", className)}>
      <span className="w-12 h-px bg-foreground/30" />
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  size = "lg",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  accent?: ReactNode;
  description?: ReactNode;
  size?: "lg" | "md";
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 lg:pt-48 lg:pb-24">
      {/* Grid backdrop fading out from the top */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-lines pointer-events-none"
        style={{ maskImage: "radial-gradient(ellipse 80% 70% at 30% 0%, black 20%, transparent 75%)" }}
      />
      {/* Soft accent glow */}
      <div
        aria-hidden="true"
        className="absolute -top-64 right-[-15%] w-[900px] h-[900px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(236,168,214,0.10), rgba(167,139,250,0.05) 35%, transparent 65%)" }}
      />

      <Container className="relative">
        <Eyebrow className="animate-fade-up">{eyebrow}</Eyebrow>
        <h1
          className={cn(
            "mt-8 font-display tracking-tight leading-[0.9] animate-fade-up",
            size === "lg" ? "text-6xl md:text-7xl lg:text-[128px]" : "text-5xl md:text-6xl lg:text-8xl"
          )}
          style={{ animationDelay: "80ms" }}
        >
          {title}
          {accent && (
            <>
              <br />
              <span className="text-muted-foreground">{accent}</span>
            </>
          )}
        </h1>
        {description && (
          <p
            className="mt-8 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            {description}
          </p>
        )}
        {children && (
          <div className="animate-fade-up" style={{ animationDelay: "240ms" }}>
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}

type CtaLink = { label: string; href: string };

export function CtaBand({
  title = "Ready to connect your data?",
  description = "Launch your first pipeline in minutes. 1 million events free, no card required.",
  primary = { label: "Start building", href: "/signup" },
  secondary = { label: "Book a demo", href: "/contact?topic=demo" },
}: {
  title?: string;
  description?: string;
  primary?: CtaLink;
  secondary?: CtaLink;
}) {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="relative overflow-hidden border border-foreground/15 px-8 py-14 lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="absolute -right-40 -bottom-40 w-[600px] h-[600px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(236,168,214,0.12), transparent 60%)" }}
          />
          <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-foreground/10" />
          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <h2 className="text-5xl lg:text-7xl font-display tracking-tight leading-[0.95]">{title}</h2>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">{description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                href={primary.href}
                className="group inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-foreground text-background text-base font-medium hover:bg-foreground/90 transition-colors"
              >
                {primary.label}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={secondary.href}
                className="inline-flex items-center justify-center h-14 px-8 rounded-full border border-foreground/20 text-base hover:bg-foreground/5 transition-colors"
              >
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
