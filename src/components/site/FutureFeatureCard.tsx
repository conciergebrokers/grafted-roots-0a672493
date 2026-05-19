import { Sparkles } from "lucide-react";

export function FutureFeatureCard({
  title,
  body,
  features,
}: {
  title: string;
  body?: string;
  features: string[];
}) {
  return (
    <div className="rounded-2xl border border-dashed border-refined-gold/50 bg-river-pale p-8">
      <div className="flex items-center gap-2 font-eyebrow text-[10px] uppercase tracking-[0.28em] text-refined-gold">
        <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
        Coming soon
      </div>
      <h3 className="mt-3 font-serif text-2xl text-deep-waters">{title}</h3>
      {body && <p className="mt-3 text-deep-waters/75">{body}</p>}
      <ul className="mt-6 grid gap-2 text-sm text-deep-waters/80 sm:grid-cols-2">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span
              aria-hidden
              className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-refined-gold"
            />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}