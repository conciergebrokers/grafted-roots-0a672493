import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function CTASection({
  eyebrow,
  title,
  body,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  return (
    <section className="relative overflow-hidden bg-deep-waters text-river-sand">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 0%, var(--still-pool) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center md:px-8 md:py-24">
        {eyebrow && (
          <div className="font-eyebrow text-xs uppercase tracking-[0.24em] text-refined-gold">
            {eyebrow}
          </div>
        )}
        <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
          {title}
        </h2>
        {body && (
          <p className="mx-auto mt-5 max-w-2xl text-river-sand/80">{body}</p>
        )}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-refined-gold text-deepest hover:bg-sunrise-copper font-eyebrow text-xs uppercase tracking-[0.2em]"
          >
            <Link to={primary.to}>{primary.label}</Link>
          </Button>
          {secondary && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-river-sand/30 bg-transparent text-river-sand hover:bg-river-sand/10 hover:text-river-sand font-eyebrow text-xs uppercase tracking-[0.2em]"
            >
              <Link to={secondary.to}>{secondary.label}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}