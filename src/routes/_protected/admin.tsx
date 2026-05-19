import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  Network,
  UserPlus,
  Sprout,
  Wheat,
  Hammer,
  TrendingUp,
  HandHeart,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BranchMetricPreview } from "@/components/site/BranchMetricPreview";
import { FutureFeatureCard } from "@/components/site/FutureFeatureCard";
import { FUTURE_FEATURES, SAMPLE_KPI } from "@/data/grafted";

export const Route = createFileRoute("/_protected/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Grafted" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const k = SAMPLE_KPI;
  return (
    <>
      <PageHero
        eyebrow="Admin Dashboard"
        title="The shape of the future Grafted command center."
        subtitle="A protected placeholder. The live dashboard will surface real activity across every branch."
      />
      <Section tone="sand">
        <SectionHeading eyebrow="Preview" number="01">
          Sample KPIs across all branches.
        </SectionHeading>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <BranchMetricPreview label="Total members" value={String(k.memberCount)} icon={Users} hint="Across active branches" />
          <BranchMetricPreview label="Branches" value="1" icon={Network} hint="Edmonton Root" />
          <BranchMetricPreview label="Visitor pipeline" value={String(k.visitorCount)} icon={UserPlus} />
          <BranchMetricPreview label="Sowing Slips" value={String(k.sowingSlipCount)} icon={Sprout} />
          <BranchMetricPreview label="Harvest Slips" value={String(k.harvestSlipCount)} icon={Wheat} />
          <BranchMetricPreview label="Forge Slips" value={String(k.forgeSlipCount)} icon={Hammer} />
          <BranchMetricPreview label="Referral value" value={`$${k.referralValue.toLocaleString()}`} icon={TrendingUp} />
          <BranchMetricPreview label="Answered prayers" value={`${k.answeredPrayerCount} / ${k.prayerRequestCount}`} icon={HandHeart} />
        </div>
        <div className="mt-12">
          <FutureFeatureCard
            title="Admin Dashboard"
            features={FUTURE_FEATURES.admin}
          />
        </div>
      </Section>
    </>
  );
}