"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Zap } from "lucide-react";
import {
  AuthHeader,
  Checkbox,
  Field,
  PasswordField,
  PasswordStrength,
  SocialAuth,
  SubmitButton,
  SuccessState,
  isEmail,
  passwordScore,
  simulateRequest,
} from "@/components/auth/auth-ui";

const plans: Record<string, string> = {
  builder: "Builder — 14-day free trial",
  explorer: "Explorer — free forever",
};

export function SignupForm() {
  const plan = plans[useSearchParams().get("plan") ?? ""] ?? plans.explorer;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; agreed?: string }>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Tell us what to call you.";
    if (!isEmail(email)) next.email = "Enter a valid work email.";
    if (password.length < 8) next.password = "Use at least 8 characters.";
    else if (passwordScore(password) < 2) next.password = "Add upper-case letters, numbers or symbols.";
    if (!agreed) next.agreed = "Please accept the terms to continue.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    await simulateRequest(1300);
    setLoading(false);
    setDone(true);
  };

  const onSocial = async () => {
    setLoading(true);
    await simulateRequest(900);
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <SuccessState
        title="Check your inbox."
        description={
          <>
            We sent a verification link to{" "}
            <span className="text-foreground">{email || "your email"}</span>. Confirm it and your first 1 million events
            are on us.
          </>
        }
      >
        <div className="border border-foreground/10 bg-foreground/[0.02] p-5 font-mono text-xs leading-relaxed text-muted-foreground">
          <span className="text-foreground/40">$</span> npm install @nexus/sdk
          <br />
          <span className="text-foreground/40">$</span> npx nexus login
        </div>
        <Link
          href="/docs"
          className="flex h-12 w-full items-center justify-center rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          Read the quickstart
        </Link>
      </SuccessState>
    );
  }

  return (
    <>
      <div className="mb-6 animate-fade-up">
        <span className="inline-flex items-center gap-2 border border-foreground/15 px-3 py-1.5 text-xs font-mono text-muted-foreground">
          <Zap className="w-3 h-3 text-[#eca8d6]" />
          {plan}
        </span>
      </div>
      <AuthHeader
        title="Start building"
        accent="in minutes."
        description="Create your workspace. No credit card, no brokers to manage."
      />

      <div className="animate-fade-up" style={{ animationDelay: "80ms" }}>
        <SocialAuth onSelect={onSocial} disabled={loading} />

        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <Field
            label="Full name"
            name="name"
            autoComplete="name"
            placeholder="Ada Lovelace"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />
          <Field
            label="Work email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <PasswordField
            label="Password"
            name="password"
            autoComplete="new-password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            hint={<PasswordStrength password={password} />}
          />

          <div className="space-y-2">
            <Checkbox checked={agreed} onChange={setAgreed} error={!!errors.agreed}>
              I agree to the{" "}
              <Link href="/terms" className="text-foreground underline underline-offset-4 decoration-foreground/30">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-foreground underline underline-offset-4 decoration-foreground/30">
                Privacy Policy
              </Link>
              .
            </Checkbox>
            {errors.agreed && <p className="text-xs text-[#f87171] pl-7">{errors.agreed}</p>}
          </div>

          <div className="pt-3">
            <SubmitButton loading={loading}>Create workspace</SubmitButton>
          </div>
        </form>

        <p className="mt-8 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
