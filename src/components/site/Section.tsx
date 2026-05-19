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
    dark: "bg-deep-waters text-river-sand",
  }[tone];
  return (
    <section id={id} className={cn("py-20 md:py-28", toneClass, className)}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  );
}