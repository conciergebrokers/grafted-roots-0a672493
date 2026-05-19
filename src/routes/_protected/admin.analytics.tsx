import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FutureFeatureCard } from "@/components/site/FutureFeatureCard";
import { BRANCHES, FUTURE_FEATURES, SAMPLE_KPI } from "@/data/grafted";

export const Route = createFileRoute("/_protected/admin/analytics")({
  head: () => ({
    meta: [
      { title: "Branch Analytics | Grafted" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <>
      <PageHero
        eyebrow="Branch Analytics"
        title="Branch by branch, season by season."
        subtitle="A protected placeholder. The live view will compare attendance, referrals, closed business, Forge activity, and prayer follow-up across every branch."
      />
      <Section tone="sand">
        <SectionHeading eyebrow="Preview" number="01">
          Sample branch summary.
        </SectionHeading>
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-river-pale font-eyebrow text-[10px] uppercase tracking-[0.18em] text-deep-waters/60">
              <tr>
                <th className="px-5 py-3">Branch</th>
                <th className="px-5 py-3">Members</th>
                <th className="px-5 py-3">Sowing</th>
                <th className="px-5 py-3">Harvest</th>
                <th className="px-5 py-3">Referral $</th>
                <th className="px-5 py-3">Answered</th>
              </tr>
            </thead>
            <tbody>
              {BRANCHES.map((b) => (
                <tr key={b.id} className="border-t border-border text-deep-waters">
                  <td className="px-5 py-4 font-serif">{b.name}</td>
                  <td className="px-5 py-4">{SAMPLE_KPI.memberCount}</td>
                  <td className="px-5 py-4">{SAMPLE_KPI.sowingSlipCount}</td>
                  <td className="px-5 py-4">{SAMPLE_KPI.harvestSlipCount}</td>
                  <td className="px-5 py-4">${SAMPLE_KPI.referralValue.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    {SAMPLE_KPI.answeredPrayerCount} / {SAMPLE_KPI.prayerRequestCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-12">
          <FutureFeatureCard
            title="Branch Analytics"
            features={FUTURE_FEATURES.analytics}
          />
        </div>
      </Section>
    </>
  );
}