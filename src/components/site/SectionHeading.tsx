import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  number,
  children,
  tone = "dark",
  align = "left",
  className,
}: {
  eyebrow?: string;
  number?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {(eyebrow || number) && (
        <div
          className={cn(
            "flex items-center gap-3 font-eyebrow text-xs uppercase tracking-[0.22em] text-refined-gold",
            align === "center" && "justify-center",
          )}
        >
          {number && <span>{number}</span>}
          {number && eyebrow && <span className="h-px w-8 bg-refined-gold/50" />}
          {eyebrow && <span>{eyebrow}</span>}
        </div>
      )}
      <h2
        className={cn(
          "mt-4 font-serif text-3xl leading-tight md:text-4xl lg:text-[2.75rem]",
          tone === "light" ? "text-river-sand" : "text-deep-waters",
        )}
      >
        {children}
      </h2>
    </div>
  );
}