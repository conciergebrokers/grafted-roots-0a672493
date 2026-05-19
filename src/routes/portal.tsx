import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { FutureFeatureCard } from "@/components/site/FutureFeatureCard";
import { Button } from "@/components/ui/button";
import { FUTURE_FEATURES } from "@/data/grafted";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Member Portal | Grafted" },
      {
        name: "description",
        content:
          "The Grafted Member Portal is coming soon. Members will track slips, submit prayer requests, and access branch updates here.",
      },
      { property: "og:title", content: "Member Portal | Grafted" },
      { property: "og:url", content: "/portal" },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/portal" }],
  }),
  component: PortalPage,
});

function PortalPage() {
  return (
    <>
      <PageHero
        eyebrow="Member Portal"
        title="A home for slips, prayer, and member life."
        subtitle="The portal is being built. When it launches, members will track activity, follow up on prayer, and stay connected to their branch."
      />
      <Section tone="sand">
        <FutureFeatureCard
          title="Member Portal"
          body="The portal will support slip tracking, member reporting, prayer follow-up, branch updates, and resources."
          features={FUTURE_FEATURES.portal}
        />
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild className="bg-deep-waters text-river-sand hover:bg-still-pool">
            <Link to="/contact">Contact Grafted</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}