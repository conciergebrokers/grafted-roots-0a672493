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
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="border-b border-border"
        >
          <AccordionTrigger className="py-6 text-left font-serif text-lg text-deep-waters hover:no-underline md:text-xl">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-base leading-relaxed text-deep-waters/80">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}