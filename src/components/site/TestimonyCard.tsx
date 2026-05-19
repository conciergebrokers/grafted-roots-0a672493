export function TestimonyCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role?: string;
}) {
  return (
    <figure className="rounded-2xl border border-border bg-card p-7">
      <blockquote className="font-serif text-lg text-deep-waters">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 text-sm">
        <span className="font-medium text-deep-waters">{name}</span>
        {role && <span className="text-deep-waters/60">, {role}</span>}
      </figcaption>
    </figure>
  );
}