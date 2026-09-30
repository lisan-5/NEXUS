"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Field, SubmitButton, SuccessState, isEmail, simulateRequest } from "@/components/auth/auth-ui";

const topics = [
  { id: "sales", label: "Talk to sales", team: "sales" },
  { id: "demo", label: "Book a demo", team: "solutions" },
  { id: "support", label: "Get support", team: "support" },
  { id: "careers", label: "Careers", team: "talent" },
  { id: "other", label: "Something else", team: "" },
];

const volumes = ["< 1M / month", "1–25M / month", "25–500M / month", "500M+ / month"];

export function ContactForm() {
  const params = useSearchParams();
  const initialTopic = topics.some((t) => t.id === params.get("topic")) ? params.get("topic")! : "sales";
  const role = params.get("role");

  const [topic, setTopic] = useState(initialTopic);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [volume, setVolume] = useState(volumes[1]);
  const [message, setMessage] = useState(role ? `I'd like to apply for the ${role} role.\n\n` : "");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const showVolume = topic === "sales" || topic === "demo";

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Please add your name.";
    if (!isEmail(email)) next.email = "Enter a valid email address.";
    if (message.trim().length < 10) next.message = "Tell us a little more (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    await simulateRequest(1200);
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="border border-foreground/10 p-8 lg:p-12">
        <SuccessState
          title="Message received."
          description={
            <>
              Thanks, {name.split(" ")[0]}. Someone from our{" "}
              {[topics.find((t) => t.id === topic)?.team, "team"].filter(Boolean).join(" ")} will reply to <span className="text-foreground">{email}</span> within one business day.
            </>
          }
        >
          <button
            type="button"
            onClick={() => {
              setDone(false);
              setMessage("");
            }}
            className="h-12 px-8 rounded-full border border-foreground/15 text-sm hover:bg-foreground/[0.04] transition-colors"
          >
            Send another message
          </button>
        </SuccessState>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-foreground/10 p-8 lg:p-12 space-y-8">
      <fieldset>
        <legend className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">How can we help?</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={topic === t.id}
              onClick={() => setTopic(t.id)}
              className={`px-4 py-2 text-sm border transition-colors ${
                topic === t.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/15 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Name"
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
      </div>

      <Field
        label="Company"
        name="company"
        autoComplete="organization"
        placeholder="Optional"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      {showVolume && (
        <fieldset className="animate-fade-up">
          <legend className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">Expected event volume</legend>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {volumes.map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={volume === v}
                onClick={() => setVolume(v)}
                className={`h-11 px-3 text-xs font-mono border transition-colors ${
                  volume === v
                    ? "border-[#eca8d6]/60 bg-[#eca8d6]/10 text-foreground"
                    : "border-foreground/10 text-muted-foreground hover:border-foreground/30"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your stack and what you're trying to build…"
          aria-invalid={!!errors.message}
          className={`w-full resize-y px-4 py-3 bg-foreground/[0.02] border text-[15px] placeholder:text-foreground/25 outline-none transition-colors hover:border-foreground/25 focus:border-foreground/60 focus:bg-foreground/[0.04] ${
            errors.message ? "border-[#f87171]/60" : "border-foreground/10"
          }`}
        />
        {errors.message && <p className="text-xs text-[#f87171]">{errors.message}</p>}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="sm:w-56">
          <SubmitButton loading={loading}>Send message</SubmitButton>
        </div>
        <p className="text-xs text-muted-foreground">We reply within one business day. No spam, ever.</p>
      </div>
    </form>
  );
}
