import { Check } from "lucide-react";
import { MEMBERSHIP } from "@/data/grafted";

export function MembershipPriceCard() {
  return (
    <div className="rounded-2xl border border-refined-gold/50 bg-card p-8 shadow-sm">
      <div className="font-eyebrow text-[10px] uppercase tracking-[0.28em] text-refined-gold">
        Membership
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-serif text-5xl text-deep-waters">$150</span>
        <span className="text-deep-waters/70">CAD / month</span>
      </div>
      <p className="mt-3 text-sm text-deep-waters/70">
        One flat price for every member. No GST charged at this time.
      </p>
      <ul className="mt-6 space-y-3">
        {MEMBERSHIP.highlights.map((item) => (
          <li key={item} className="flex items-start gap-3 text-deep-waters">
            <Check className="mt-1 h-4 w-4 flex-shrink-0 text-refined-gold" strokeWidth={2} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 rounded-xl border border-refined-gold/40 bg-river-sand px-4 py-3 text-sm text-deep-waters">
        <span className="font-eyebrow text-[10px] uppercase tracking-[0.28em] text-refined-gold">
          Founding members
        </span>
        <p className="mt-1">{MEMBERSHIP.founding.line}</p>
      </div>
    </div>
  );
}