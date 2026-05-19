export function ScriptureCallout({
  text,
  citation,
}: {
  text: string;
  citation: string;
}) {
  return (
    <figure className="relative mx-auto max-w-3xl rounded-2xl border border-refined-gold/30 bg-river-pale px-8 py-10 md:px-12 md:py-14">
      <div className="absolute -top-3 left-8 bg-river-pale px-3 font-eyebrow text-[10px] uppercase tracking-[0.3em] text-refined-gold">
        Scripture
      </div>
      <blockquote className="font-serif text-2xl leading-snug text-deep-waters md:text-3xl">
        &ldquo;{text}&rdquo;
      </blockquote>
      <figcaption className="mt-4 font-eyebrow text-xs uppercase tracking-[0.22em] text-deep-waters/60">
        {citation}
      </figcaption>
    </figure>
  );
}