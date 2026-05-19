import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      to="/"
      className={cn(
        "font-display text-2xl tracking-tight",
        tone === "light" ? "text-river-sand" : "text-deep-waters",
        className,
      )}
      aria-label="Grafted home"
    >
      Grafted
    </Link>
  );
}