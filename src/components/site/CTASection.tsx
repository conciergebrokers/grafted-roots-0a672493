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
    <section className="relative overflow-hidden bg-deepest text-river-sand">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 82% at 50% 0%, rgba(27,110,105,0.38) 0%, rgba(21,85,82,0.18) 34%, transparent 72%), radial-gradient(ellipse 48% 70% at 82% 55%, rgba(34,136,128,0.22) 0%, transparent 68%), linear-gradient(135deg, #081E1C 0%, #0D3D3A 48%, #081E1C 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.12'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-5 py-14 text-center md:px-8 md:py-16 lg:py-20">
        {eyebrow && (
          <div className="font-eyebrow text-xs uppercase tracking-[0.32em] text-refined-gold">
            {eyebrow}
          </div>
        )}
        <h2 className="mt-5 font-display text-4xl leading-tight text-white md:text-5xl">
          {title}
        </h2>
        {body && (
          <p className="mx-auto mt-5 max-w-2xl text-river-sand/78">{body}</p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
