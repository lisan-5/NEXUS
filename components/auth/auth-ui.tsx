"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { ArrowRight, Check, Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

/** Stand-in for a real auth request so the UI states can be exercised. */
export const simulateRequest = (ms = 1100) => new Promise((resolve) => setTimeout(resolve, ms));

export function AuthHeader({ title, accent, description }: { title: string; accent?: string; description?: ReactNode }) {
  return (
    <div className="mb-10 animate-fade-up">
      <h1 className="text-5xl sm:text-6xl font-display tracking-tight leading-[0.95]">
        {title}
        {accent && <span className="text-muted-foreground"> {accent}</span>}
      </h1>
      {description && <p className="mt-4 text-muted-foreground leading-relaxed">{description}</p>}
    </div>
  );
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: ReactNode;
  trailing?: ReactNode;
  adornment?: ReactNode;
};

export function Field({ label, error, hint, trailing, adornment, className, id, ...props }: FieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const messageId = `${inputId}-message`;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={inputId} className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
        {trailing}
      </div>
      <div className="relative">
        <input
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error || hint ? messageId : undefined}
          className={cn(
            "w-full h-12 px-4 bg-foreground/[0.02] border text-[15px] text-foreground placeholder:text-foreground/25 outline-none transition-colors",
            "hover:border-foreground/25 focus:border-foreground/60 focus:bg-foreground/[0.04]",
            error ? "border-[#f87171]/60 focus:border-[#f87171]" : "border-foreground/10",
            adornment && "pr-12",
            className
          )}
          {...props}
        />
        {adornment && <div className="absolute inset-y-0 right-0 flex items-center pr-3">{adornment}</div>}
      </div>
      {error ? (
        <p id={messageId} className="text-xs text-[#f87171]">
          {error}
        </p>
      ) : (
        hint && (
          <div id={messageId} className="text-xs text-muted-foreground">
            {hint}
          </div>
        )
      )}
    </div>
  );
}

export function PasswordField(props: Omit<FieldProps, "type" | "adornment">) {
  const [visible, setVisible] = useState(false);
  return (
    <Field
      {...props}
      type={visible ? "text" : "password"}
      adornment={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      }
    />
  );
}

export function passwordScore(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthLabels = ["Too short", "Weak", "Fair", "Good", "Strong"];
const strengthColors = ["bg-foreground/20", "bg-[#f87171]", "bg-[#fbbf24]", "bg-[#67e8f9]", "bg-[#eca8d6]"];

export function PasswordStrength({ password }: { password: string }) {
  const score = password ? Math.max(passwordScore(password), 1) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-1 gap-1">
        {[1, 2, 3, 4].map((step) => (
          <span
            key={step}
            className={cn("h-0.5 flex-1 transition-colors duration-300", score >= step ? strengthColors[score] : "bg-foreground/10")}
          />
        ))}
      </div>
      <span className="font-mono text-[11px] w-16 text-right">{password ? strengthLabels[score] : "8+ chars"}</span>
    </div>
  );
}

export function SubmitButton({ loading, children }: { loading?: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group relative w-full h-12 rounded-full bg-foreground text-background text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors hover:bg-foreground/90 disabled:opacity-70 disabled:cursor-wait"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {children}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.26-.96 2.33-2.04 3.05l3.3 2.56c1.92-1.77 3.03-4.38 3.03-7.48 0-.72-.06-1.41-.18-2.03H12z" />
      <path fill="#34A853" d="M5.27 14.29l-.74.57-2.64 2.05C3.6 20.29 7.52 22.8 12 22.8c3.24 0 5.96-1.07 7.76-2.9l-3.3-2.56c-.9.6-2.06.97-3.46.97-2.66 0-4.92-1.8-5.73-4.22z" />
      <path fill="#4A90E2" d="M1.89 7.09A10.72 10.72 0 0 0 1.2 12c0 1.77.42 3.43 1.17 4.91l3.38-2.62A6.47 6.47 0 0 1 5.4 12c0-.79.14-1.55.37-2.29z" />
      <path fill="#FBBC05" d="M12 5.48c1.6 0 3.04.55 4.17 1.63l2.93-2.93C17.95 2.47 15.23 1.2 12 1.2 7.52 1.2 3.6 3.71 1.89 7.09l3.38 2.62C6.08 7.28 8.34 5.48 12 5.48z" />
    </svg>
  );
}

export function SocialAuth({ onSelect, disabled }: { onSelect: (provider: "github" | "google") => void; disabled?: boolean }) {
  const base =
    "h-12 rounded-full border border-foreground/15 inline-flex items-center justify-center gap-2.5 text-sm transition-colors hover:border-foreground/40 hover:bg-foreground/[0.04] disabled:opacity-50";
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" className={base} onClick={() => onSelect("github")} disabled={disabled}>
          <GitHubIcon className="w-4 h-4" />
          GitHub
        </button>
        <button type="button" className={base} onClick={() => onSelect("google")} disabled={disabled}>
          <GoogleIcon className="w-4 h-4" />
          Google
        </button>
      </div>
      <div className="my-8 flex items-center gap-4 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
        <span className="h-px flex-1 bg-foreground/10" />
        or with email
        <span className="h-px flex-1 bg-foreground/10" />
      </div>
    </>
  );
}

export function Checkbox({
  checked,
  onChange,
  children,
  error,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  error?: boolean;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none text-sm text-muted-foreground">
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span
        className={cn(
          "mt-0.5 w-4 h-4 shrink-0 border flex items-center justify-center transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-foreground/40",
          checked ? "bg-foreground border-foreground text-background" : error ? "border-[#f87171]/70" : "border-foreground/25"
        )}
      >
        {checked && <Check className="w-3 h-3" strokeWidth={3} />}
      </span>
      <span>{children}</span>
    </label>
  );
}

export function SuccessState({ title, description, children }: { title: string; description: ReactNode; children?: ReactNode }) {
  return (
    <div className="animate-fade-up">
      <div className="relative w-14 h-14 mb-8">
        <span className="absolute inset-0 rounded-full bg-[#eca8d6]/20 animate-ping" />
        <span className="relative flex w-14 h-14 items-center justify-center rounded-full border border-[#eca8d6]/50 bg-[#eca8d6]/10 text-[#eca8d6]">
          <Check className="w-6 h-6" />
        </span>
      </div>
      <h1 className="text-5xl font-display tracking-tight leading-[0.95]">{title}</h1>
      <div className="mt-4 text-muted-foreground leading-relaxed">{description}</div>
      {children && <div className="mt-10 space-y-3">{children}</div>}
    </div>
  );
}
