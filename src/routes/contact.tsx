import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Calendar, Globe } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/site/Reveal";
import { MEETING_INFO, VISIT_EXPECTATIONS } from "@/data/grafted";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Grafted | Visit a Meeting in Edmonton" },
      {
        name: "description",
        content:
          "Contact Grafted to visit a weekly business networking meeting in Edmonton, ask a membership question, or learn more about future branches.",
      },
      { property: "og:title", content: "Contact Grafted | Visit a Meeting in Edmonton" },
      {
        property: "og:description",
        content:
          "Reach out to visit Grafted, ask about membership, or learn about future branches.",
      },
      { property: "og:url", content: "/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Come visit the room."
        subtitle="Whether you are ready to visit, curious about membership, or wondering if Grafted is the right fit, reach out. We will help you take the next step."
      />

      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <div className="space-y-8">
              <SectionHeading eyebrow="Details" number="01">
                Where and when to find us.
              </SectionHeading>
              <ul className="space-y-4 text-deep-waters">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-refined-gold" strokeWidth={1.5} />
                  {MEETING_INFO.city}, {MEETING_INFO.province}
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="mt-1 h-4 w-4 text-refined-gold" strokeWidth={1.5} />
                  {MEETING_INFO.day} at {MEETING_INFO.time}
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-1 h-4 w-4 text-refined-gold" strokeWidth={1.5} />
                  <a
                    className="underline-offset-4 hover:underline"
                    href={`mailto:${MEETING_INFO.email}`}
                  >
                    {MEETING_INFO.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="mt-1 h-4 w-4 text-refined-gold" strokeWidth={1.5} />
                  {MEETING_INFO.domain}
                </li>
              </ul>

              <div className="rounded-2xl border border-border bg-background p-6">
                <div className="font-eyebrow text-[10px] uppercase tracking-[0.28em] text-refined-gold">
                  What to expect when you visit
                </div>
                <ul className="mt-4 space-y-2 text-deep-waters/85">
                  {VISIT_EXPECTATIONS.map((v) => (
                    <li key={v} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-refined-gold"
                      />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}