import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  tone = "dark",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        tone === "dark"
          ? "bg-deep-waters text-river-sand"
          : "bg-river-pale text-deep-waters",
      )}
    >
      {tone === "dark" && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(60% 60% at 80% 0%, var(--still-pool) 0%, transparent 60%), radial-gradient(50% 50% at 10% 100%, var(--charcoal-teal) 0%, transparent 60%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-refined-gold/40 to-transparent"
          />
        </>
      )}
      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28 lg:py-32">
        {eyebrow && (
          <div className="font-eyebrow text-xs uppercase tracking-[0.24em] text-refined-gold">
            {eyebrow}
          </div>
        )}
        <h1
          className={cn(
            "mt-5 max-w-4xl font-display text-4xl leading-[1.05] md:text-6xl lg:text-7xl",
            tone === "dark" ? "text-river-sand" : "text-deep-waters",
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              "mt-6 max-w-2xl text-lg md:text-xl",
              tone === "dark" ? "text-river-sand/80" : "text-deep-waters/75",
            )}
          >
            {subtitle}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}