import type { LucideIcon } from "lucide-react";

export function BranchMetricPreview({
  label,
  value,
  icon: Icon,
  hint,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="font-eyebrow text-[10px] uppercase tracking-[0.22em] text-deep-waters/60">
          {label}
        </div>
        <Icon className="h-4 w-4 text-refined-gold" strokeWidth={1.5} />
      </div>
      <div className="mt-4 font-serif text-3xl text-deep-waters">{value}</div>
      {hint && <div className="mt-1 text-xs text-deep-waters/60">{hint}</div>}
    </div>
  );
}