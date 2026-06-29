import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export function FAQAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="rounded-2xl border border-border bg-background px-5 shadow-sm md:px-6"
        >
          <AccordionTrigger className="gap-4 py-5 text-left font-serif text-lg leading-snug text-deep-waters hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-refined-gold/50 focus-visible:ring-offset-2 md:text-xl">
            <span>{item.q}</span>
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-base leading-relaxed text-deep-waters/80">
            <FAQAnswer item={item} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function FAQAnswer({ item }: { item: { q: string; a: string } }) {
  return (
    <div className="space-y-3">
      {splitIntoReadableParagraphs(item.a).map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

function splitIntoReadableParagraphs(text: string) {
  return text
    .split(/(?<=\.)\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}
