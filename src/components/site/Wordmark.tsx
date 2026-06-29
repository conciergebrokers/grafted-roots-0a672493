import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const textTone = tone === "light" ? "text-river-sand" : "text-deep-waters";

  return (
    <Link
      to="/"
      className={cn("inline-flex items-center gap-3", textTone, className)}
      aria-label="Grafted home"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-refined-gold/30 bg-river-sand text-deep-waters shadow-sm">
        <svg
          viewBox="0 0 48 48"
          className="h-9 w-9"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M24 35V17"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M24 19c-5.2 0-9.4 3.6-10.6 8.5 4.5.5 8.4-1.1 10.6-4.1 2.2 3 6.1 4.6 10.6 4.1C33.4 22.6 29.2 19 24 19Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M15 35c3.3-2.2 6.3-2.2 9 0 2.7-2.2 5.7-2.2 9 0"
            fill="none"
            stroke="#C4882A"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 14c1.2-3.2 3.2-5 6-5s4.8 1.8 6 5"
            fill="none"
            stroke="#C4882A"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="hidden font-display text-2xl leading-none tracking-tight sm:inline">
        Grafted
      </span>
    </Link>
  );
}
