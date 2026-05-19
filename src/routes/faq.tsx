import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { CTASection } from "@/components/site/CTASection";
import { FAQ_ITEMS } from "@/data/grafted";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Grafted FAQ | Membership, Meetings, and Visiting" },
      {
        name: "description",
        content:
          "Answers to common questions about Grafted membership, weekly meetings, visiting, faith integration, pricing, slips, and future branches.",
      },
      { property: "og:title", content: "Grafted FAQ | Membership, Meetings, and Visiting" },
      {
        property: "og:description",
        content:
          "Practical answers about visiting Grafted, membership tiers, the meeting flow, slips, and future branches.",
      },
      { property: "og:url", content: "/faq" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="Frequently Asked"
        title="Questions about visiting, membership, and the room itself."
        subtitle="If your question is not answered here, reach out and we will help you take the next step."
      />
      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </Section>
      <CTASection
        eyebrow="Still curious"
        title="Send us your question."
        body="We would rather have a real conversation than answer in the abstract."
        primary={{ label: "Contact Grafted", to: "/contact" }}
      />
    </>
  );
}