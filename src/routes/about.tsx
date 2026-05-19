import { createFileRoute } from "@tanstack/react-router";
import {
  Sprout,
  Heart,
  Users,
  Briefcase,
  Sparkles,
  HandHeart,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ScriptureCallout } from "@/components/site/ScriptureCallout";
import { CTASection } from "@/components/site/CTASection";
import { Reveal } from "@/components/site/Reveal";
import {
  AUDIENCE_CARDS,
  BRANCH_PHASES,
  DIFFERENTIATORS,
  MEMBER_POSTURE,
} from "@/data/grafted";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Grafted | Known. Rooted. Sent." },
      {
        name: "description",
        content:
          "Learn about Grafted, a faith-first, business-forward community founded in Edmonton for business owners who want to be known, rooted, and sent.",
      },
      { property: "og:title", content: "About Grafted | Known. Rooted. Sent." },
      {
        property: "og:description",
        content:
          "Founded in Edmonton by Jen Garrison for business owners who want real relationship, practical growth, and a room where faith is welcome.",
      },
      { property: "og:url", content: "/about" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const DIFF_ICONS = [Heart, Sparkles, HandHeart, Users, Briefcase, Sprout];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Grafted"
        title="Known before useful. Rooted before sent."
        subtitle="Grafted is a faith-integrated business networking community founded in Edmonton by Jen Garrison. It exists for business owners who want more than contacts. They want real relationship, practical growth, and a community where God is welcome in the way business is done."
      />

      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="The Vision" number="01">
              A community of faith-first, business-forward people.
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lg text-deep-waters/80">
              Grafted was built from the ground up to serve what many existing
              rooms cannot: genuine human connection, spiritual alignment, and
              practical business growth in one place.
            </p>
          </Reveal>
        </div>
        <div className="mt-16">
          <Reveal>
            <ScriptureCallout
              text="As iron sharpens iron, so one person sharpens another."
              citation="Proverbs 27:17"
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="white">
        <Reveal>
          <SectionHeading eyebrow="What Makes Grafted Different" number="02">
            Built for the way faith and business actually work together.
          </SectionHeading>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIATORS.map((d, i) => {
            const Icon = DIFF_ICONS[i % DIFF_ICONS.length];
            return (
              <Reveal key={d} delay={i * 0.04}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-6">
                  <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-refined-gold/40 text-refined-gold">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <p className="font-serif text-lg text-deep-waters">{d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="pale">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Faith Integration" number="03">
              Faith is the operating system.
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lg text-deep-waters/80">
              Grafted does not add God to a business meeting as a final
              thought. The community is built from the conviction that God
              cares about work, that the marketplace matters, and that beloved
              identity changes the way people give, receive, sell, lead, and
              serve.
            </p>
            <div className="mt-8 rounded-2xl border border-refined-gold/40 bg-background p-6">
              <div className="font-eyebrow text-[10px] uppercase tracking-[0.28em] text-refined-gold">
                Beloved identity
              </div>
              <p className="mt-3 font-serif text-xl text-deep-waters">
                Beloved identity means being known and loved before earning
                anything.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Who Grafted Is For" number="04">
              The room is wide. The posture is specific.
            </SectionHeading>
            <p className="mt-6 text-deep-waters/75">
              You do not need to have everything figured out to visit. You do
              need to honour the posture of the room.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="flex flex-wrap gap-2">
              {AUDIENCE_CARDS.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-border bg-river-sand px-4 py-2 text-sm text-deep-waters"
                >
                  {a}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Member Posture" number="05">
              Membership is a posture.
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="space-y-3">
              {MEMBER_POSTURE.map((m) => (
                <li
                  key={m}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-refined-gold"
                  />
                  <span className="text-deep-waters">{m}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="dark">
        <div className="max-w-3xl">
          <Reveal>
            <SectionHeading
              eyebrow="Growth and Branches"
              number="06"
              tone="light"
            >
              Built to multiply without losing depth.
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-lg text-river-sand/80">
              The long-term vision is not one oversized room. It is multiple
              Grafted branches that carry the same culture, meeting flow,
              tracking standards, and community depth.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {BRANCH_PHASES.map((p, i) => (
            <Reveal key={p.phase} delay={i * 0.06}>
              <div className="rounded-2xl border border-river-sand/15 bg-charcoal-teal/40 p-7">
                <div className="font-eyebrow text-[10px] uppercase tracking-[0.28em] text-refined-gold">
                  Phase {i + 1}
                </div>
                <h3 className="mt-3 font-serif text-2xl text-river-sand">
                  {p.phase.replace(/^Phase \d+:\s*/, "")}
                </h3>
                <p className="mt-3 text-river-sand/75">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="Come and see"
        title="The room is being built. There is space for you in it."
        body="Visit a meeting, ask a question, or learn about future branches."
        primary={{ label: "Contact Grafted", to: "/contact" }}
        secondary={{ label: "Read the FAQ", to: "/faq" }}
      />
    </>
  );
}