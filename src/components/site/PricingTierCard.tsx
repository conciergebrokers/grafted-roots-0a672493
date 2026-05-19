export function PricingTierCard({
  label,
  price,
  highlight,
}: {
  label: string;
  price: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        "flex items-baseline justify-between rounded-xl border bg-card px-5 py-4 " +
        (highlight
          ? "border-refined-gold/60 shadow-sm"
          : "border-border")
      }
    >
      <span className="text-deep-waters">{label}</span>
      <span className="font-serif text-xl text-deep-waters">
        ${price}
        <span className="ml-1 text-xs text-deep-waters/60">/ month</span>
      </span>
    </div>
  );
}