"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  AuthHeader,
  Checkbox,
  Field,
  PasswordField,
  SocialAuth,
  SubmitButton,
  SuccessState,
  isEmail,
  simulateRequest,
} from "@/components/auth/auth-ui";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!isEmail(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    await simulateRequest();
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
        title="Welcome back."
        description={
          <>
            You&apos;re signed in{email && <> as <span className="text-foreground">{email}</span></>}. Your pipelines are
            streaming exactly where you left them.
          </>
        }
      >
        <Link
          href="/docs"
          className="flex h-12 w-full items-center justify-center rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          Continue to docs
        </Link>
        <Link
          href="/"
          className="flex h-12 w-full items-center justify-center rounded-full border border-foreground/15 text-sm hover:bg-foreground/[0.04] transition-colors"
        >
          Back to home
        </Link>
      </SuccessState>
    );
  }

  return (
    <>
      <AuthHeader
        title="Sign in"
        accent="to NEXUS."
        description="Pick up where your data left off."
      />

      <div className="animate-fade-up" style={{ animationDelay: "80ms" }}>
        <SocialAuth onSelect={onSocial} disabled={loading} />

        <form onSubmit={onSubmit} noValidate className="space-y-5">
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
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            trailing={
              <Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Forgot password?
              </Link>
            }
          />

          <Checkbox checked={remember} onChange={setRemember}>
            Keep me signed in for 30 days
          </Checkbox>

          <div className="pt-3">
            <SubmitButton loading={loading}>Sign in</SubmitButton>
          </div>
        </form>

        <p className="mt-8 text-sm text-muted-foreground">
          New to NEXUS?{" "}
          <Link href="/signup" className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors">
            Create an account
          </Link>
        </p>

        <p className="mt-3 text-xs text-muted-foreground font-mono">
          Using SSO?{" "}
          <Link href="/contact?topic=support" className="hover:text-foreground transition-colors">
            Sign in with SAML &rarr;
          </Link>
        </p>
      </div>
    </>
  );
}
