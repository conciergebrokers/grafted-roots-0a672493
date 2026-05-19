import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { SectionHeading } from "@/components/site/SectionHeading";
import { MemberPreviewCard } from "@/components/site/MemberPreviewCard";
import { FutureFeatureCard } from "@/components/site/FutureFeatureCard";
import { Button } from "@/components/ui/button";
import { FUTURE_FEATURES, MEMBERS } from "@/data/grafted";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "Member Showcase | Grafted" },
      {
        name: "description",
        content:
          "A preview of the future Grafted Member Showcase: a public directory of faith-forward business owners across our branches.",
      },
      { property: "og:title", content: "Member Showcase | Grafted" },
      { property: "og:url", content: "/members" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/members" }],
  }),
  component: MembersPage,
});

function MembersPage() {
  return (
    <>
      <PageHero
        eyebrow="Member Showcase"
        title="The community, soon to be visible."
        subtitle="A preview of the public directory. With permission, members will appear here so the wider community can discover Grafted businesses."
      />
      <Section tone="sand">
        <SectionHeading eyebrow="Preview" number="01">
          A few of the kinds of business owners you will meet.
        </SectionHeading>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {MEMBERS.map((m) => (
            <MemberPreviewCard key={m.id} member={m} />
          ))}
        </div>
        <div className="mt-16">
          <FutureFeatureCard
            title="Public Member Directory"
            body="The showcase will let members publish a profile, filter by branch and industry, and connect outside meeting hours."
            features={FUTURE_FEATURES.showcase}
          />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild className="bg-deep-waters text-river-sand hover:bg-still-pool">
            <Link to="/contact">Contact Grafted</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}