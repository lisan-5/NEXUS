"use client";

import { useEffect, useState } from "react";

const quotes = [
  {
    quote: "NEXUS replaced six fragile integrations and gave us one reliable stream of customer data.",
    author: "Sarah Chen",
    role: "CTO, Meridian Labs",
  },
  {
    quote: "Our teams launch new event streams in hours instead of waiting weeks for infrastructure work.",
    author: "Elena Rodriguez",
    role: "VP Engineering, Beacon AI",
  },
  {
    quote: "The schema controls and audit history let us scale real-time data without losing governance.",
    author: "James Liu",
    role: "CISO, Prism Analytics",
  },
];

function LiveCounter() {
  const [count, setCount] = useState(12_847_392);

  useEffect(() => {
    const interval = setInterval(() => setCount((c) => c + 37 + Math.floor(Math.random() * 90)), 250);
    return () => clearInterval(interval);
  }, []);

  return <span className="tabular-nums">{count.toLocaleString("en-US")}</span>;
}

export function AuthShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % quotes.length), 7000);
    return () => clearInterval(interval);
  }, []);

  const active = quotes[index];

  return (
    <div className="relative h-full overflow-hidden border border-foreground/10 bg-black">
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2810%29-UnDKstODkIENp5xqTYUEpt0Sm8tNOw.png"
        alt=""
        aria-hidden="true"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-lines opacity-60" />

      <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
        {/* Live metric */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#eca8d6]/10 text-[#eca8d6] text-xs font-mono backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#eca8d6] animate-pulse" />
              LIVE
            </span>
            <p className="mt-5 text-4xl xl:text-5xl font-display text-white">
              <LiveCounter />
            </p>
            <p className="mt-2 text-xs font-mono text-white/50">events delivered today</p>
          </div>
          <div className="hidden xl:flex flex-col items-end gap-2 font-mono text-xs text-white/40">
            <span>p99 &lt;40ms</span>
            <span>29 regions</span>
            <span>99.99% uptime</span>
          </div>
        </div>

        {/* Rotating quote */}
        <div>
          <blockquote key={index} className="animate-fade-up">
            <p className="text-3xl xl:text-4xl font-display leading-[1.15] text-white max-w-xl">&ldquo;{active.quote}&rdquo;</p>
            <footer className="mt-8 flex items-center gap-4">
              <span className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center font-display text-lg text-white">
                {active.author.charAt(0)}
              </span>
              <span>
                <span className="block text-sm text-white">{active.author}</span>
                <span className="block text-sm text-white/50">{active.role}</span>
              </span>
            </footer>
          </blockquote>

          <div className="mt-10 flex gap-2">
            {quotes.map((q, i) => (
              <button
                key={q.author}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show quote from ${q.author}`}
                className="h-1 flex-1 bg-white/15 overflow-hidden"
              >
                <span
                  key={i === index ? `active-${index}` : i}
                  className={`block h-full bg-white ${i === index ? "auth-progress" : i < index ? "w-full opacity-40" : "w-0"}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-progress {
          animation: auth-progress 7s linear forwards;
        }
        @keyframes auth-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
