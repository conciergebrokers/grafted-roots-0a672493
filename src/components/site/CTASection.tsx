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
    <section className="relative overflow-hidden bg-river-sand text-deep-waters">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 58% 80% at 50% 0%, rgba(238,247,246,0.92) 0%, rgba(247,243,234,0.72) 50%, transparent 78%), linear-gradient(180deg, #F7F3EA 0%, #EEF7F6 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-refined-gold/45 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-deep-waters/20 to-transparent"
      />
      <div className="relative mx-auto max-w-4xl px-5 py-14 text-center md:px-8 md:py-16 lg:py-20">
        {eyebrow && (
          <div className="font-eyebrow text-xs uppercase tracking-[0.32em] text-refined-gold">
            {eyebrow}
          </div>
        )}
        <h2 className="mt-5 font-display text-4xl leading-tight text-deep-waters md:text-5xl">
          {title}
        </h2>
        {body && (
          <p className="mx-auto mt-5 max-w-2xl text-deep-waters/72">{body}</p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-refined-gold text-deepest hover:bg-sunrise-copper font-eyebrow text-xs uppercase tracking-[0.2em]"
          >
            {primary.to.startsWith("http") ? (
              <a href={primary.to} target="_blank" rel="noopener noreferrer">
                {primary.label}
              </a>
            ) : (
              <Link to={primary.to}>{primary.label}</Link>
            )}
          </Button>
          {secondary && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-deep-waters/25 bg-transparent text-deep-waters hover:bg-deep-waters/5 hover:text-deep-waters font-eyebrow text-xs uppercase tracking-[0.2em]"
            >
              {secondary.to.startsWith("http") ? (
                <a href={secondary.to} target="_blank" rel="noopener noreferrer">
                  {secondary.label}
                </a>
              ) : (
                <Link to={secondary.to}>{secondary.label}</Link>
              )}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
