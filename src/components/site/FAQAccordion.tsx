import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MEMBERSHIP_PRICING } from "@/data/membership";

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
  if (item.q === "What does membership cost?") {
    return (
      <div className="space-y-5">
        <div className="rounded-2xl border border-refined-gold/35 bg-background p-5 shadow-sm">
          <div className="font-eyebrow text-[10px] uppercase tracking-[0.28em] text-refined-gold">
            Membership
          </div>
          <div className="mt-3 font-display text-4xl leading-none text-deep-waters">
            {MEMBERSHIP_PRICING.label}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-deep-waters/75">
            {MEMBERSHIP_PRICING.description}
          </p>
          <ul className="mt-5 space-y-3 text-sm text-deep-waters/80">
            {MEMBERSHIP_PRICING.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-refined-gold" strokeWidth={1.8} />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2 text-sm text-deep-waters/70">
          {MEMBERSHIP_PRICING.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </div>
    );
  }

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
