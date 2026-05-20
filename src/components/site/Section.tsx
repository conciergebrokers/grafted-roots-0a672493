import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  tone = "sand",
  className,
  id,
}: {
  children: ReactNode;
  tone?: "sand" | "white" | "pale" | "dark";
  className?: string;
  id?: string;
}) {
  const toneClass = {
    sand: "bg-river-sand text-deep-waters",
    white: "bg-background text-deep-waters",
    pale: "bg-river-pale text-deep-waters",
    dark: "bg-deepest text-river-sand",
  }[tone];

  const isDark = tone === "dark";

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-12 md:py-16 lg:py-20",
        toneClass,
        className,
      )}
    >
      {isDark && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 18% 48%, rgba(27,110,105,0.38) 0%, rgba(27,110,105,0.16) 30%, transparent 66%), radial-gradient(ellipse 55% 75% at 82% 45%, rgba(34,136,128,0.24) 0%, rgba(21,85,82,0.14) 32%, transparent 68%), linear-gradient(135deg, #081E1C 0%, #0D3D3A 48%, #081E1C 100%)",
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
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-refined-gold/25 to-transparent"
          />
        </>
      )}
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  );
}
