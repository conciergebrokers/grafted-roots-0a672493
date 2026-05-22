import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calendar,
  MapPin,
  Sparkles,
  Handshake,
  Sprout,
  HeartHandshake,
  Users,
  Hammer,
  Repeat,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PillarCard } from "@/components/site/PillarCard";
import { MeetingSegmentCard } from "@/components/site/MeetingSegmentCard";
import { PricingTierCard } from "@/components/site/PricingTierCard";
import { CTASection } from "@/components/site/CTASection";
import { Reveal } from "@/components/site/Reveal";
import {
  CONNECTION_POINTS,
  MEETING_INFO,
  MEETING_SEGMENTS,
  PILLARS,
  PRICING_TIERS,
  SLIP_TYPES,
} from "@/data/grafted";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grafted | Faith-Integrated Business Networking in Edmonton" },
      {
        name: "description",
        content:
          "Grafted is a faith-integrated business networking community in Edmonton for business owners who want real referrals, practical growth, and relationships that hold.",
      },
      { property: "og:title", content: "Grafted | Faith-Integrated Business Networking in Edmonton" },
      {
        property: "og:description",
        content:
          "A community of faith-first, business-forward people. Weekly Tuesdays at 12:30 PM in Edmonton.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const PILLAR_ICONS = [Handshake, Sprout, HeartHandshake];

function HomePage() {
  return (
    <>
      <PageHero
        align="center"
        title="Grafted"
        subtitle="A community of faith-first, business-forward people."
      >
        <div className="mx-auto max-w-3xl">
          <div className="font-eyebrow flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.32em] text-refined-gold sm:gap-x-5 sm:text-sm sm:tracking-[0.46em] md:gap-x-6 md:text-base md:tracking-[0.58em]">
            <span>Known</span>
            <span className="text-river-sand/35">·</span>
            <span>Rooted</span>
            <span className="text-river-sand/35">·</span>
            <span>Sent</span>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-refined-gold text-deepest hover:bg-sunrise-copper font-eyebrow text-xs uppercase tracking-[0.2em]"
            >
              <Link to="/contact">Visit Grafted</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-river-sand/30 bg-transparent text-river-sand hover:bg-river-sand/10 hover:text-river-sand font-eyebrow text-xs uppercase tracking-[0.2em]"
            >
              <a href="#how-it-works">Learn How It Works</a>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-river-sand/70">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-refined-gold" strokeWidth={1.5} />
              Weekly {MEETING_INFO.day} at {MEETING_INFO.time}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-refined-gold" strokeWidth={1.5} />
              {MEETING_INFO.city}, {MEETING_INFO.province}
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-refined-gold" strokeWidth={1.5} />
              {MEETING_INFO.launch}
            </span>
          </div>
        </div>
      </PageHero>

      {/* What Grafted Is */}
      <Section tone="sand" id="how-it-works">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="What Grafted Is" number="01">
              Faith-first. Business-forward. Built for real connection.
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lg text-deep-waters/80">
              Grafted brings business owners into one room for practical
              business growth, genuine relationship, and Spirit-led
              encouragement. Selling is welcome. Referrals are celebrated.
              Prayer is part of the room. Members grow through a community
              where people actually want each other to win.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <PillarCard
                title={p.title}
                body={p.body}
                icon={PILLAR_ICONS[i]}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why This Exists */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Why This Exists" number="02">
              Business ownership can be lonely. Community changes what people
              can carry.
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lg text-deep-waters/80">
              Edmonton has business owners who are hungry for a room where they
              can show up as their whole selves. Grafted exists for the owner
              who wants to grow their business, give generously, receive
              support, and bring God into the way they build.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3" style={{ alignItems: "stretch" }}>
          {CONNECTION_POINTS.map((c, i) => (
            <div key={c.title} style={{ height: "100%" }}>
              <Reveal delay={i * 0.05} className="h-full">
                <div
                  className="flex h-full flex-col rounded-2xl border border-border bg-river-pale p-7"
                  style={{ minHeight: "230px" }}
                >
                  <div className="font-eyebrow text-[10px] uppercase tracking-[0.22em] text-deep-waters/50">
                    {c.title}
                  </div>
                  <div className="mt-3 flex items-start gap-2 text-deep-waters/80">
                    <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-refined-gold" strokeWidth={1.5} />
                    <p>{c.body}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      {/* Meeting Flow */}
      <Section tone="pale">
        <div className="max-w-3xl">
          <Reveal>
            <SectionHeading eyebrow="The Meeting Flow" number="03">
              A meeting rhythm designed for depth.
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-lg text-deep-waters/80">
              Every Grafted meeting follows a specific flow. It is structured
              enough to be repeatable and personal enough to feel human.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {MEETING_SEGMENTS.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.04}>
              <MeetingSegmentCard
                index={i + 1}
                name={s.name}
                body={s.body}
                icon={s.icon}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Visit Before You Join */}
      <Section tone="dark">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Visit Before You Join"
              number="04"
              tone="light"
            >
              Come see the room before you decide.
            </SectionHeading>
            <p className="mt-6 text-lg text-river-sand/80">
              Visitors may attend up to three times before making a membership
              decision. The first three meetings are free to visit. Visitors pay
              for their own meal.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-refined-gold text-deepest hover:bg-sunrise-copper font-eyebrow text-xs uppercase tracking-[0.2em]"
            >
              <Link to="/contact">Plan Your First Visit</Link>
            </Button>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="rounded-2xl border border-river-sand/15 bg-charcoal-teal/40 p-8">
              <div className="font-eyebrow text-[10px] uppercase tracking-[0.28em] text-refined-gold">
                What to expect
              </div>
              <ul className="mt-5 space-y-3 text-river-sand/85">
                <li className="flex items-start gap-3">
                  <Users className="mt-1 h-4 w-4 text-refined-gold" strokeWidth={1.5} />
                  Conversation with depth
                </li>
                <li className="flex items-start gap-3">
                  <Hammer className="mt-1 h-4 w-4 text-refined-gold" strokeWidth={1.5} />
                  Practical teaching you can use this week
                </li>
                <li className="flex items-start gap-3">
                  <Repeat className="mt-1 h-4 w-4 text-refined-gold" strokeWidth={1.5} />
                  Referrals celebrated with generosity
                </li>
                <li className="flex items-start gap-3">
                  <HeartHandshake className="mt-1 h-4 w-4 text-refined-gold" strokeWidth={1.5} />
                  Prayer treated as practice
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Membership */}
      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Membership" number="05">
              Accessible by design.
            </SectionHeading>
            <p className="mt-6 text-lg text-deep-waters/80">
              Grafted is built to welcome business owners at different stages.
              Membership fees are tiered by business size so solo entrepreneurs
              can enter accessibly and larger businesses can help carry the
              community.
            </p>
            <div className="mt-8 space-y-2 text-sm text-deep-waters/70">
              <p>
                Members pay for their own lunch at each meeting.
              </p>
              <p>
                Twenty percent of membership fees is set aside for charitable
                giving, with members voting on where those funds are directed.
              </p>
              <p>
                Extenuating circumstances can be handled through a conversation.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="space-y-3">
              {PRICING_TIERS.map((t, i) => (
                <PricingTierCard
                  key={t.label}
                  label={t.label}
                  price={t.price}
                  highlight={i === 0}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Tracking */}
      <Section tone="white">
        <div className="max-w-3xl">
          <Reveal>
            <SectionHeading eyebrow="Future Community Tracking" number="06">
              We will track what matters.
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-lg text-deep-waters/80">
              Grafted tracks referrals, closed business, Forge Meetings, growth
              activity, prayer requests, and answered prayer. The numbers help
              the community celebrate the testimony of what God is building
              through the room.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SLIP_TYPES.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-river-sand p-6">
                <div className="font-eyebrow text-[10px] uppercase tracking-[0.22em] text-refined-gold">
                  Slip
                </div>
                <h4 className="mt-2 font-serif text-xl text-deep-waters">
                  {s.name}
                </h4>
                <p className="mt-2 text-sm text-deep-waters/75">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-6 rounded-2xl border border-refined-gold/40 bg-river-pale p-8 md:grid-cols-[auto_1fr] md:items-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-deep-waters text-refined-gold">
              <LayoutDashboard className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-eyebrow text-[10px] uppercase tracking-[0.28em] text-refined-gold">
                Coming soon
              </div>
              <div className="mt-2 font-serif text-2xl text-deep-waters">
                Future Member Portal
              </div>
              <p className="mt-2 text-deep-waters/75">
                Personal slip activity, prayer follow-up, member directory, and
                branch updates will live here.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <CTASection
        eyebrow="Visit the Room"
        title="If you have been looking for a room like this, come visit."
        body="Bring your business. Bring your questions. Bring what you need and what you have to give."
        primary={{ label: "Contact Grafted", to: "/contact" }}
        secondary={{ label: "Read the FAQ", to: "/faq" }}
      />
    </>
  );
}
