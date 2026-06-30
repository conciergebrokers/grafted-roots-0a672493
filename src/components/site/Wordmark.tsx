import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/grafted-tree-logo.png.asset.json";

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
      <img
        src={logoAsset.url}
        alt="Grafted logo"
        className="h-14 w-14 object-contain md:h-16 md:w-16"
      />
      <span className="hidden font-display text-2xl leading-none tracking-tight sm:inline">
        Grafted
      </span>
    </Link>
  );
}
