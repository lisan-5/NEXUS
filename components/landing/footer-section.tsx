import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Platform capabilities", href: "/#features" },
    { name: "How it works", href: "/#how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "Integrations", href: "/#integrations" },
  ],
  Developers: [
    { name: "Documentation", href: "/docs" },
    { name: "TypeScript SDK", href: "/docs#sdk" },
    { name: "API Reference", href: "/docs#api" },
    { name: "Status", href: "/status" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers", badge: "Hiring" },
    { name: "Contact", href: "/contact" },
  ],
  Legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Security", href: "/#security" },
  ],
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

export function FooterSection({ showBanner = true }: { showBanner?: boolean }) {
  return (
    <footer className={`relative bg-black ${showBanner ? "" : "border-t border-white/10"}`}>
      {/* Panoramic banner image */}
      {showBanner && (
        <div className="relative w-full h-[340px] md:h-[420px] overflow-hidden">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2810%29-UnDKstODkIENp5xqTYUEpt0Sm8tNOw.png"
            alt="Bioluminescent landscape"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient fade to black at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
          {/* Subtle dark vignette on sides */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </div>
      )}

      {/* Footer content — black background, white text */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <span className="text-2xl font-display text-white">NEXUS</span>
                <span className="text-xs text-white/40 font-mono">TM</span>
              </Link>

              <p className="text-white/50 leading-relaxed mb-8 max-w-xs text-sm">
                Real-time data infrastructure for teams building connected products and dependable systems.
              </p>

              {/* Social Links */}
              <a
                href="#"
                aria-label="Follow NEXUS on X"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 pl-4 pr-5 py-2.5 text-sm text-white/70 hover:text-white hover:border-[#eca8d6]/40 hover:bg-white/10 transition-all group"
              >
                <XIcon className="w-4 h-4" />
                <span>Follow on X</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium text-white mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/40 hover:text-white transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-white text-black rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            &copy; 2026 NEXUS. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-white/30">
            <Link href="/status" className="flex items-center gap-2 hover:text-white/60 transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#eca8d6]" />
              All pipelines operational
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
