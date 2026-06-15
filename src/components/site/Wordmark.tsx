import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/grafted-logo.svg.asset.json";

export function Wordmark({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  void tone;
  return (
    <Link
      to="/"
      className={cn("inline-flex items-center", className)}
      aria-label="Grafted home"
    >
      <img
        src={logoAsset.url}
        alt="Grafted"
        className="h-9 w-auto md:h-10"
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}