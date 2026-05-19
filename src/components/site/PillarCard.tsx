import type { LucideIcon } from "lucide-react";

export function PillarCard({
  title,
  body,
  icon: Icon,
}: {
  title: string;
  body: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="group relative rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:shadow-md">
      <div className="absolute left-8 top-0 h-px w-12 bg-refined-gold" />
      {Icon && (
        <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-refined-gold/40 text-refined-gold">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
      )}
      <h3 className="font-serif text-2xl text-deep-waters">{title}</h3>
      <p className="mt-3 text-deep-waters/75">{body}</p>
    </div>
  );
}