import { createFileRoute } from "@tanstack/react-router";
import { Users, UserPlus, Sprout, Wheat, Hammer, HandHeart } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BranchMetricPreview } from "@/components/site/BranchMetricPreview";
import { FutureFeatureCard } from "@/components/site/FutureFeatureCard";
import { BRANCHES, FUTURE_FEATURES, SAMPLE_KPI } from "@/data/grafted";

export const Route = createFileRoute("/_protected/branches/$branchId")({
  head: () => ({
    meta: [
      { title: "Branch Dashboard | Grafted" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BranchDashboardPage,
});

function BranchDashboardPage() {
  const { branchId } = Route.useParams();
  const branch = BRANCHES.find((b) => b.id === branchId) ?? BRANCHES[0];
  const k = SAMPLE_KPI;

  return (
    <>
      <PageHero
        eyebrow={`Branch · ${branch.name}`}
        title="Branch leadership view."
        subtitle={`Protected placeholder for ${branch.name}. Branch leaders will see members, visitors, slips, and prayer follow-up at a glance.`}
      />
      <Section tone="sand">
        <SectionHeading eyebrow="Preview" number="01">
          Sample branch KPIs.
        </SectionHeading>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <BranchMetricPreview label="Members" value={String(k.memberCount)} icon={Users} />
          <BranchMetricPreview label="Visitors" value={String(k.visitorCount)} icon={UserPlus} />
          <BranchMetricPreview label="Sowing Slips" value={String(k.sowingSlipCount)} icon={Sprout} />
          <BranchMetricPreview label="Harvest Slips" value={String(k.harvestSlipCount)} icon={Wheat} />
          <BranchMetricPreview label="Forge Slips" value={String(k.forgeSlipCount)} icon={Hammer} />
          <BranchMetricPreview label="Answered prayers" value={`${k.answeredPrayerCount} / ${k.prayerRequestCount}`} icon={HandHeart} />
        </div>
        <div className="mt-12">
          <FutureFeatureCard
            title="Branch Dashboard"
            features={FUTURE_FEATURES.branch}
          />
        </div>
      </Section>
    </>
  );
}