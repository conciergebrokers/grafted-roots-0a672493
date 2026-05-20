import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  tone = "dark",
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
}) {
  const isCentered = align === "center";

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        tone === "dark"
          ? "bg-deepest text-river-sand"
          : "bg-river-pale text-deep-waters",
      )}
    >
      {tone === "dark" && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 18% 48%, rgba(27,110,105,0.42) 0%, rgba(27,110,105,0.18) 30%, transparent 66%), radial-gradient(ellipse 55% 75% at 82% 45%, rgba(34,136,128,0.28) 0%, rgba(21,85,82,0.16) 32%, transparent 68%), linear-gradient(135deg, #081E1C 0%, #0D3D3A 48%, #081E1C 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-35 mix-blend-soft-light"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.12'/%3E%3C/svg%3E\")",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-refined-gold/40 to-transparent"
          />
        </>
      )}
      <div
        className={cn(
          "relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28 lg:py-32",
          isCentered && "text-center",
        )}
      >
        {eyebrow && (
          <div
            className={cn(
              "font-eyebrow text-xs uppercase tracking-[0.46em] text-refined-gold",
              isCentered && "mx-auto",
            )}
          >
            {eyebrow}
          </div>
        )}
        <h1
          className={cn(
            "mt-5 max-w-4xl font-display text-4xl leading-[1.05] md:text-6xl lg:text-7xl",
            tone === "dark" ? "text-white" : "text-deep-waters",
            isCentered && "mx-auto",
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              "mt-6 max-w-2xl text-lg md:text-xl",
              tone === "dark" ? "text-river-sand/76" : "text-deep-waters/75",
              isCentered && "mx-auto font-serif italic",
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
