import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, CreditCard, UserRound } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { MEMBER_STORAGE_KEY, STRIPE_PLACEHOLDER_COPY } from "@/data/memberRegistration";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [{ title: "Member Profile | Grafted" }, { name: "robots", content: "noindex" }],
    links: [{ rel: "canonical", href: "/profile" }],
  }),
  component: ProfilePage,
});

type SavedProfile = Record<string, any>;

function ProfilePage() {
  const [profile, setProfile] = useState<SavedProfile | null>(null);

  useEffect(() => {
    const load = async () => {
      const raw = localStorage.getItem(MEMBER_STORAGE_KEY);
      if (raw) {
        try { setProfile(JSON.parse(raw)); } catch { setProfile(null); }
      }

      try {
        const supabaseAny = supabase as any;
        const { data: userResult } = await supabase.auth.getUser();
        const email = userResult?.user?.email;
        if (!email) return;
        const { data } = await supabaseAny.from("member_profiles").select("*").eq("email", email).maybeSingle();
        if (data) setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, []);

  const displayName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || "Member profile";

  return (
    <>
      <PageHero eyebrow="Member Profile" title="Your Grafted profile." subtitle="This is the first version of the member profile. Billing, directory access, and richer member tools will connect as Stripe and the portal come online." />
      <Section tone="sand">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-deep-waters text-refined-gold"><UserRound className="h-6 w-6" strokeWidth={1.5} /></div>
              <div>
                <div className="font-eyebrow text-[10px] uppercase tracking-[0.28em] text-refined-gold">Member</div>
                <h2 className="mt-2 font-display text-4xl text-deep-waters">{displayName}</h2>
                <p className="mt-2 text-deep-waters/70">{profile?.business_name || "Business profile pending"}</p>
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <ProfileItem label="Email" value={profile?.email} />
              <ProfileItem label="Phone" value={profile?.mobile_phone} />
              <ProfileItem label="Business category" value={profile?.business_category} />
              <ProfileItem label="Service area" value={profile?.city_service_area} />
              <ProfileItem label="Website" value={profile?.website_url} />
              <ProfileItem label="Account status" value={profile?.account_status || "pending_payment"} />
            </div>
            <div className="mt-8 space-y-5">
              <ProfileBlock label="One-line description" value={profile?.one_line_description} />
              <ProfileBlock label="What I do differently" value={profile?.what_i_do_differently} />
              <ProfileBlock label="My ideal referral is" value={profile?.ideal_referral} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-deep-waters text-river-sand hover:bg-still-pool font-eyebrow text-xs uppercase tracking-[0.2em]"><Link to="/complete-profile">Edit Profile</Link></Button>
              <Button asChild variant="outline"><Link to="/">Back to Home</Link></Button>
            </div>
          </div>
          <aside className="space-y-5">
            <div className="rounded-2xl border border-refined-gold/35 bg-river-pale p-6">
              <div className="flex items-center gap-3 font-serif text-xl text-deep-waters"><CreditCard className="h-5 w-5 text-refined-gold" /> Billing status</div>
              <p className="mt-3 text-sm leading-relaxed text-deep-waters/75">{STRIPE_PLACEHOLDER_COPY}</p>
              <div className="mt-4 rounded-lg bg-background px-4 py-3 text-sm text-deep-waters/75">Current status: <strong>{profile?.payment_status || "pending"}</strong></div>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="flex items-center gap-3 font-serif text-xl text-deep-waters"><BadgeCheck className="h-5 w-5 text-refined-gold" /> Founding member</div>
              <p className="mt-3 text-sm leading-relaxed text-deep-waters/75">The first 15 paid signups receive founding member status after Stripe confirms payment.</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function ProfileItem({ label, value }: { label: string; value?: string | number | null }) {
  return <div className="rounded-xl border border-deep-waters/10 bg-river-pale p-4"><div className="font-eyebrow text-[10px] uppercase tracking-[0.22em] text-deep-waters/50">{label}</div><div className="mt-2 text-sm text-deep-waters/80">{value || "Not added yet"}</div></div>;
}

function ProfileBlock({ label, value }: { label: string; value?: string | null }) {
  return <div><div className="font-eyebrow text-[10px] uppercase tracking-[0.22em] text-refined-gold">{label}</div><p className="mt-2 text-deep-waters/80">{value || "Not added yet"}</p></div>;
}
