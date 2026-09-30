"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AuthHeader, Field, SubmitButton, SuccessState, isEmail, simulateRequest } from "@/components/auth/auth-ui";

const RESEND_SECONDS = 30;

export function ForgotForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const send = async () => {
    setLoading(true);
    await simulateRequest();
    setLoading(false);
    setSent(true);
    setCooldown(RESEND_SECONDS);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setError("Enter the email you signed up with.");
      return;
    }
    setError(undefined);
    await send();
  };

  if (sent) {
    return (
      <SuccessState
        title="Link on its way."
        description={
          <>
            If an account exists for <span className="text-foreground">{email}</span>, you&apos;ll get a reset link in the
            next minute. It expires in 30 minutes.
          </>
        }
      >
        <button
          type="button"
          onClick={send}
          disabled={cooldown > 0 || loading}
          className="flex h-12 w-full items-center justify-center rounded-full border border-foreground/15 text-sm transition-colors hover:bg-foreground/[0.04] disabled:text-muted-foreground disabled:hover:bg-transparent"
        >
          {loading ? "Sending…" : cooldown > 0 ? `Resend in ${cooldown}s` : "Resend link"}
        </button>
        <Link
          href="/login"
          className="flex h-12 w-full items-center justify-center rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          Back to sign in
        </Link>
      </SuccessState>
    );
  }

  return (
    <>
      <AuthHeader
        title="Reset"
        accent="your password."
        description="Enter your email and we'll send you a secure link to choose a new one."
      />

      <form onSubmit={onSubmit} noValidate className="space-y-6 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <Field
          label="Work email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          autoFocus
        />
        <SubmitButton loading={loading}>Send reset link</SubmitButton>
      </form>

      <Link
        href="/login"
        className="group mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to sign in
      </Link>
    </>
  );
}
