import type { LucideIcon } from "lucide-react";

export function MeetingSegmentCard({
  index,
  name,
  body,
  icon: Icon,
}: {
  index: number;
  name: string;
  body: string;
  icon: LucideIcon;
}) {
  const num = String(index).padStart(2, "0");
  return (
    <div className="grid grid-cols-[auto_1fr] gap-6 rounded-2xl border border-border bg-card p-7 md:p-8">
      <div className="flex flex-col items-start gap-4">
        <span className="font-eyebrow text-xs uppercase tracking-[0.22em] text-refined-gold">
          {num}
        </span>
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-refined-gold/40 text-refined-gold">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
      </div>
      <div>
        <h3 className="font-serif text-2xl text-deep-waters">{name}</h3>
        <p className="mt-2 text-deep-waters/75">{body}</p>
      </div>
    </div>
  );
}