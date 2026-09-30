"use client";

import { useEffect, useState } from "react";

const REFRESH_EVERY = 30;

export function RefreshIndicator() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => (s + 1) % REFRESH_EVERY), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center gap-3 text-xs font-mono text-muted-foreground">
      <span className="relative w-24 h-px bg-foreground/10 overflow-hidden">
        <span
          className="absolute inset-y-0 left-0 bg-[#eca8d6] transition-[width] duration-1000 ease-linear"
          style={{ width: `${(seconds / (REFRESH_EVERY - 1)) * 100}%` }}
        />
      </span>
      {seconds === 0 ? "Updated just now" : `Updated ${seconds}s ago`}
    </span>
  );
}
