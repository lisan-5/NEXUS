"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { isEmail, simulateRequest } from "@/components/auth/auth-ui";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setState("error");
      return;
    }
    setState("loading");
    await simulateRequest(900);
    setState("done");
  };

  if (state === "done") {
    return (
      <p className="flex items-center gap-3 text-muted-foreground animate-fade-up">
        <span className="w-8 h-8 rounded-full border border-[#eca8d6]/50 bg-[#eca8d6]/10 text-[#eca8d6] flex items-center justify-center">
          <Check className="w-4 h-4" />
        </span>
        You&apos;re subscribed. See you in your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div
        className={`flex items-center border transition-colors focus-within:border-foreground/60 ${
          state === "error" ? "border-[#f87171]/60" : "border-foreground/15"
        }`}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder="you@company.com"
          aria-label="Email address"
          className="flex-1 min-w-0 h-14 px-5 bg-transparent outline-none placeholder:text-foreground/25"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="group h-14 px-6 bg-foreground text-background text-sm font-medium inline-flex items-center gap-2 hover:bg-foreground/90 transition-colors"
        >
          {state === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Subscribe
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
      <p className={`mt-3 text-xs ${state === "error" ? "text-[#f87171]" : "text-muted-foreground"}`}>
        {state === "error" ? "Enter a valid email address." : "Unsubscribe anytime. We never share your address."}
      </p>
    </form>
  );
}
