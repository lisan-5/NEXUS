"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const TOKEN = /(\/\/.*$|#.*$)|('[^']*'|"[^"]*"|`[^`]*`)|\b(const|let|await|async|import|from|export|return|new|true|false|curl)\b|\b(\d+[a-z]*)\b/gm;

function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of code.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) out.push(code.slice(last, index));
    const [text, comment, string, keyword] = match;
    const className = comment
      ? "text-foreground/35 italic"
      : string
        ? "text-[#eca8d6]"
        : keyword
          ? "text-[#a78bfa]"
          : "text-[#67e8f9]";
    out.push(
      <span key={index} className={className}>
        {text}
      </span>
    );
    last = index + text.length;
  }
  out.push(code.slice(last));
  return out;
}

export function CodeBlock({ code, filename, language = "ts" }: { code: string; filename?: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be unavailable (e.g. insecure context); fail quietly
    }
  };

  return (
    <div className="group my-6 border border-foreground/10 bg-black/60 overflow-hidden">
      <div className="flex items-center justify-between px-4 h-10 border-b border-foreground/10 text-xs font-mono text-muted-foreground">
        <span className="flex items-center gap-3">
          <span className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-foreground/15" />
            <span className="w-2 h-2 rounded-full bg-foreground/15" />
            <span className="w-2 h-2 rounded-full bg-foreground/15" />
          </span>
          {filename ?? language}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 px-2 py-1 hover:text-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#eca8d6]" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-5 overflow-x-auto text-[13px] leading-relaxed font-mono text-foreground/85">
        <code>{highlight(code)}</code>
      </pre>
    </div>
  );
}

export function DocsSidebar({ groups }: { groups: { title: string; items: { id: string; label: string }[] }[] }) {
  const [active, setActive] = useState(groups[0]?.items[0]?.id);

  useEffect(() => {
    const ids = groups.flatMap((g) => g.items.map((i) => i.id));
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [groups]);

  return (
    <nav aria-label="Documentation" className="space-y-8">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-3">{group.title}</p>
          <ul className="border-l border-foreground/10">
            {group.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    "relative block pl-4 py-1.5 text-sm transition-colors",
                    active === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "absolute -left-px top-1 bottom-1 w-px transition-colors",
                      active === item.id ? "bg-[#eca8d6]" : "bg-transparent"
                    )}
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
