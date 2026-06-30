import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, CreditCard, LogOut, UserRound } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { MEMBER_STORAGE_KEY } from "@/data/memberRegistration";
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
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [billingLoading, setBillingLoading] = useState(false);
  const [billingError, setBillingError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const supabaseAny = supabase as any;
        const { data: userResult } = await supabase.auth.getUser();
        const email = userResult?.user?.email;
        if (!email) {
          setSignedIn(false);
          setProfile(null);
          return;
        }
        setSignedIn(true);
        const { data } = await supabaseAny.from("member_profiles").select("*").eq("email", email).maybeSingle();
        if (data) {
          setProfile(data);
          localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(data));
        } else {
          setProfile({ email });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const displayName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || "Member profile";

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem(MEMBER_STORAGE_KEY);
    setSignedIn(false);
    setProfile(null);
  };

  const openBillingPortal = async () => {
    setBillingError("");
    setBillingLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-customer-portal-session", {
        body: { return_url: `${window.location.origin}/profile` },
      });
      if (error) throw error;
      if (!data?.url) throw new Error("No billing portal URL returned.");
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      setBillingError("Receipts could not be opened yet. Confirm this member has a Stripe customer ID and the Stripe customer portal is configured.");
    } finally {
      setBillingLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <PageHero eyebrow="Member Portal" title="Loading your member portal." subtitle="Checking your sign-in session." />
        <Section tone="sand"><div className="mx-auto max-w-2xl rounded-2xl border border-border bg-background p-8 text-center">Loading...</div></Section>
      </>
    );
  }

  if (!signedIn) {
    return (
      <>
        <PageHero eyebrow="Member Portal" title="Sign in to access your member portal." subtitle="Use Google or a secure email link to view your profile and billing receipts." />
        <Section tone="sand">
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-background p-8 text-center shadow-sm">
            <UserRound className="mx-auto h-10 w-10 text-refined-gold" />
            <h2 className="mt-4 font-display text-3xl text-deep-waters">Member sign-in required</h2>
            <p className="mt-3 text-deep-waters/75">Use the same email connected to your Grafted membership.</p>
            <Button asChild className="mt-6 bg-deep-waters text-river-sand hover:bg-still-pool font-eyebrow text-xs uppercase tracking-[0.2em]"><Link to="/auth">Sign In</Link></Button>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Member Profile" title="Your Grafted profile." subtitle="Access your profile details and billing receipts." />
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
              <Button type="button" variant="outline" onClick={signOut} className="font-eyebrow text-xs uppercase tracking-[0.18em]"><LogOut className="mr-2 h-4 w-4" />Sign Out</Button>
            </div>
          </div>
          <aside className="space-y-5">
            <BillingCard
              profile={profile}
              billingLoading={billingLoading}
              billingError={billingError}
              onOpenBillingPortal={openBillingPortal}
            />
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

type BillingState = "active" | "pending" | "past_due" | "cancelled";

function resolveBillingState(profile: SavedProfile | null): BillingState {
  const paymentStatus = String(profile?.payment_status || "").toLowerCase();
  const accountStatus = String(profile?.account_status || "").toLowerCase();

  if (paymentStatus === "paid") return "active";
  if (paymentStatus === "failed") return "past_due";
  if (paymentStatus === "cancelled" || paymentStatus === "canceled") return "cancelled";
  if (paymentStatus === "checkout_started") return "pending";
  if (accountStatus === "pending_payment" || accountStatus === "pending_profile") return "pending";
  if (accountStatus === "past_due") return "past_due";
  if (accountStatus === "cancelled" || accountStatus === "canceled") return "cancelled";
  return "pending";
}

function BillingCard({
  profile,
  billingLoading,
  billingError,
  onOpenBillingPortal,
}: {
  profile: SavedProfile | null;
  billingLoading: boolean;
  billingError: string;
  onOpenBillingPortal: () => void;
}) {
  const state = resolveBillingState(profile);
  const hasStripeCustomer = Boolean(profile?.stripe_customer_id);

  const content: Record<
    BillingState,
    { title: string; body: string; action: "receipts" | "billing" | "complete" | null }
  > = {
    active: {
      title: "Membership active",
      body: "Your Grafted membership is active. Receipts and billing details are managed securely through Stripe.",
      action: hasStripeCustomer ? "receipts" : null,
    },
    pending: {
      title: "Payment not complete",
      body: "We have your profile details, but Stripe has not confirmed an active membership payment yet.",
      action: "complete",
    },
    past_due: {
      title: "Payment needs attention",
      body: "Your membership payment needs attention. Please update your billing details through Stripe or contact Grafted.",
      action: hasStripeCustomer ? "billing" : null,
    },
    cancelled: {
      title: "Membership inactive",
      body: "This membership is no longer active. Contact Grafted if you believe this is incorrect.",
      action: null,
    },
  };

  const { title, body, action } = content[state];

  return (
    <div className="rounded-2xl border border-refined-gold/35 bg-river-pale p-6">
      <div className="flex items-center gap-3 font-serif text-xl text-deep-waters">
        <CreditCard className="h-5 w-5 text-refined-gold" /> Billing and receipts
      </div>
      <p className="mt-3 text-sm leading-relaxed text-deep-waters/75">
        Manage your Grafted membership billing and receipts securely through Stripe.
      </p>
      <div className="mt-4 rounded-lg bg-background px-4 py-3 text-sm text-deep-waters/75">
        <strong>{title}</strong>
        <p className="mt-1 text-deep-waters/70">{body}</p>
      </div>
      {action === "receipts" && (
        <Button
          type="button"
          onClick={onOpenBillingPortal}
          disabled={billingLoading}
          className="mt-4 w-full bg-deep-waters text-river-sand hover:bg-still-pool font-eyebrow text-xs uppercase tracking-[0.18em]"
        >
          {billingLoading ? "Opening..." : "Open Receipts"}
        </Button>
      )}
      {action === "billing" && (
        <Button
          type="button"
          onClick={onOpenBillingPortal}
          disabled={billingLoading}
          className="mt-4 w-full bg-deep-waters text-river-sand hover:bg-still-pool font-eyebrow text-xs uppercase tracking-[0.18em]"
        >
          {billingLoading ? "Opening..." : "Open Billing"}
        </Button>
      )}
      {action === "complete" && (
        <Button
          asChild
          className="mt-4 w-full bg-deep-waters text-river-sand hover:bg-still-pool font-eyebrow text-xs uppercase tracking-[0.18em]"
        >
          <Link to="/join">Complete Membership Payment</Link>
        </Button>
      )}
      {!action && hasStripeCustomer === false && (
        <p className="mt-4 rounded-lg bg-background px-4 py-3 text-sm text-deep-waters/75">
          Receipts will appear here once Stripe has linked billing to this member account.
        </p>
      )}
      {billingError && <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{billingError}</p>}
    </div>
  );
}

function ProfileItem({ label, value }: { label: string; value?: string | number | null }) {
  return <div className="rounded-xl border border-deep-waters/10 bg-river-pale p-4"><div className="font-eyebrow text-[10px] uppercase tracking-[0.22em] text-deep-waters/50">{label}</div><div className="mt-2 text-sm text-deep-waters/80">{value || "Not added yet"}</div></div>;
}

function ProfileBlock({ label, value }: { label: string; value?: string | null }) {
  return <div><div className="font-eyebrow text-[10px] uppercase tracking-[0.22em] text-refined-gold">{label}</div><p className="mt-2 text-deep-waters/80">{value || "Not added yet"}</p></div>;
}
