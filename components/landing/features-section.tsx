"use client";

import { useEffect, useRef, useState } from "react";
import { useCanvasLoop } from "@/hooks/use-canvas-loop";

const features = [
  {
    number: "01",
    title: "Streaming Ingestion",
    description: "Capture events from applications, databases, and third-party tools through one durable, developer-friendly pipeline.",
    stats: { value: "18B+", label: "events every day" },
  },
  {
    number: "02",
    title: "Edge Processing",
    description: "Transform, enrich, and validate data close to its source on infrastructure spanning the globe.",
    stats: { value: "29", label: "global regions" },
  },
  {
    number: "03",
    title: "Flexible Routing",
    description: "Send every event to the right warehouse, API, queue, or operational tool with declarative routing rules.",
    stats: { value: "100+", label: "destinations" },
  },
  {
    number: "04",
    title: "Reliable Delivery",
    description: "Automatic retries, replayable streams, schema controls, and complete delivery logs keep critical data moving.",
    stats: { value: "0", label: "events lost" },
  },
];

// Stable particle positions
const particles = Array.from({ length: 70 }, (_, i) => {
  const seed = i * 1.618;
  return {
    bx: ((seed * 127.1) % 1),
    by: ((seed * 311.7) % 1),
    phase: seed * Math.PI * 2,
    speed: 0.4 + (seed % 0.4),
    radius: 1.2 + (seed % 2.2),
  };
});

// Floating dot particles visualization
function ParticleVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useCanvasLoop(canvasRef, (ctx, w, h, frame) => {
    const time = frame * 0.016;
    ctx.clearRect(0, 0, w, h);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    for (const p of particles) {
      const flowX = Math.sin(time * p.speed * 0.4 + p.phase) * 38;
      const flowY = Math.cos(time * p.speed * 0.3 + p.phase * 0.7) * 24;

      const dx = p.bx - mx;
      const dy = p.by - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist * 2.8);

      const x = p.bx * w + flowX + influence * Math.cos(time + p.phase) * 36;
      const y = p.by * h + flowY + influence * Math.sin(time + p.phase) * 36;

      const pulse = Math.sin(time * p.speed + p.phase) * 0.5 + 0.5;
      const alpha = 0.08 + pulse * 0.18 + influence * 0.3;

      ctx.beginPath();
      ctx.arc(x, y, p.radius + pulse * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      style={{ width: "100%", height: "100%" }}
      onMouseMove={(e) => {
        const canvas = e.currentTarget;
        mouseRef.current = {
          x: e.nativeEvent.offsetX / canvas.clientWidth,
          y: e.nativeEvent.offsetY / canvas.clientHeight,
        };
      }}
    />
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header - Full width with diagonal layout */}
        <div className="relative mb-24 lg:mb-32">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                <span className="w-12 h-px bg-foreground/30" />
                Capabilities
              </span>
              <h2
                className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Data that
                <br />
                <span className="text-muted-foreground">keeps moving.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
              <p className={`text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                Build dependable real-time pipelines without managing brokers, workers, or brittle point-to-point integrations.
              </p>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Large feature card */}
          <div 
            className={`lg:col-span-12 relative bg-black border border-foreground/10 min-h-[500px] overflow-hidden group transition-all duration-700 flex ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            onMouseEnter={() => setActiveFeature(0)}
          >
            {/* Left: text content */}
            <div className="relative flex-1 p-8 lg:p-12 bg-black">
              <ParticleVisualization />
              <div className="relative z-10">
                <span className="font-mono text-sm text-muted-foreground">{features[0].number}</span>
                <h3 className="text-3xl lg:text-4xl font-display mt-4 mb-6 group-hover:translate-x-2 transition-transform duration-500">
                  {features[0].title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-8">
                  {features[0].description}
                </p>
                <div>
                  <span className="text-5xl lg:text-6xl font-display">{features[0].stats.value}</span>
                  <span className="block text-sm text-muted-foreground font-mono mt-2">{features[0].stats.label}</span>
                </div>
              </div>
            </div>

            {/* Right: mirrored image, full height */}
            <div className="hidden lg:block relative w-[42%] shrink-0 overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2812%29-ng3RrNnsPMJ5CrtOjcPTmhHg01W11q.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ transform: "scaleX(-1)" }}
              />
              {/* Fade left edge into black */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
