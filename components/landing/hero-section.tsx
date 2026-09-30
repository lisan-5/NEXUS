"use client";

import { useEffect, useState } from "react";

const words = ["connect", "process", "route", "scale"];

// gradient colours cycling across letter positions
const gradientColors = ["#eca8d6", "#a78bfa", "#67e8f9", "#fbbf24", "#eca8d6"];

const hex2rgb = (hex: string) => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];

function letterColor(i: number, count: number) {
  const colorIndex = (i / Math.max(count - 1, 1)) * (gradientColors.length - 1);
  const lower = Math.floor(colorIndex);
  const upper = Math.min(lower + 1, gradientColors.length - 1);
  const t = colorIndex - lower;
  const [r1, g1, b1] = hex2rgb(gradientColors[lower]);
  const [r2, g2, b2] = hex2rgb(gradientColors[upper]);
  return `rgb(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)})`;
}

const STAGGER = 45;   // ms between each letter
const DURATION = 500; // blur+opacity fade duration per letter

// Letters fade in via a CSS animation (no per-frame React state), then settle to white
function BlurWord({ word }: { word: string }) {
  const letters = word.split("");
  const [showGradient, setShowGradient] = useState(true);

  useEffect(() => {
    setShowGradient(true);
    const t = setTimeout(() => setShowGradient(false), STAGGER * letters.length + DURATION + 200);
    return () => clearTimeout(t);
  }, [word, letters.length]);

  return (
    <>
      {letters.map((char, i) => (
        <span
          key={`${word}-${i}`}
          className="animate-blur-in"
          style={{
            display: "inline-block",
            animationDelay: `${i * STAGGER}ms`,
            animationDuration: `${DURATION}ms`,
            color: showGradient ? letterColor(i, letters.length) : "white",
            transition: "color 0.4s ease",
          }}
        >
          {char}
        </span>
      ))}
    </>
  );
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden bg-black">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-80"
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-hero-0BnFGdr81Ifnj3WbBZoNt1KE4D5DMT.mp4" type="video/mp4" />
        </video>
        {/* Subtle overlay to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-white/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-white/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        <div className="lg:max-w-[55%]">
        {/* Eyebrow */}
        <div 
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-white/60">
            <span className="w-8 h-px bg-white/30" />
            Real-time data infrastructure for modern teams
          </span>
        </div>
        
        {/* Main headline */}
        <div className="mb-12">
          <h1 
            className={`text-left text-[clamp(2rem,6vw,7rem)] font-display leading-[0.92] tracking-tight text-white transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block whitespace-nowrap">Every signal,</span>
            <span className="block whitespace-nowrap">
              ready to{" "}
              <span className="relative inline-block">
                <BlurWord word={words[wordIndex]} />
              </span>
            </span>
          </h1>
        </div>
        </div>
      </div>
      
      {/* Stats — 3 metrics static, no auto-scroll */}
      <div 
        className={`absolute bottom-12 left-0 right-0 px-6 lg:px-12 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-start gap-10 lg:gap-20">
          {[
            { value: "18B+", label: "events processed daily" },
            { value: "99.99%", label: "platform availability" },
            { value: "<40ms", label: "delivery latency" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <span className="text-3xl lg:text-4xl font-display text-white">{stat.value}</span>
              <span className="text-xs text-white/50 leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}

    </section>
  );
}
