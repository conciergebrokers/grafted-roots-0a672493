import { FormEvent, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { MEMBERSHIP_PRICING } from "@/data/membership";
import { MEMBER_STORAGE_KEY, PendingMemberSignup } from "@/data/memberRegistration";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [{ title: "Become a Member | Grafted" }, { name: "robots", content: "noindex" }],
    links: [{ rel: "canonical", href: "/join" }],
  }),
  component: JoinPage,
});

const fieldClass = "mt-2 w-full rounded-md border border-deep-waters/15 bg-background px-4 py-3 text-sm text-deep-waters outline-none focus:border-refined-gold focus:ring-2 focus:ring-refined-gold/20";
const labelClass = "font-eyebrow text-[10px] uppercase tracking-[0.22em] text-deep-waters/65";

function JoinPage() {
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState<PendingMemberSignup>({ first_name: "", last_name: "", business_name: "", email: "", mobile_phone: "", public_directory_consent: false });

  useEffect(() => {
    const raw = localStorage.getItem(MEMBER_STORAGE_KEY);
    if (raw) {
      try { setForm((current) => ({ ...current, ...JSON.parse(raw) })); } catch { /* ignore */ }
    }
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.email) setForm((current) => ({ ...current, email: data.user.email ?? current.email }));
    });
  }, []);

  const update = (key: keyof PendingMemberSignup, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));

  const continueWithGoogle = async () => {
    setErrorMessage("");
    localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(form));
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/join` } });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("saving");
    setErrorMessage("");

    if (!form.public_directory_consent) {
      setStatus("error");
      setErrorMessage("Please confirm the public directory consent before continuing.");
      return;
    }

    try {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        setStatus("error");
        setErrorMessage("Please continue with Google before payment so Stripe can connect your membership to your account.");
        return;
      }

      const payload = { ...form, email: data.user.email ?? form.email, account_status: "pending_payment", payment_status: "checkout_started", profile_complete: false, founding_member: false, signup_date: new Date().toISOString() };
      localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(payload));
      const { data: checkoutData, error } = await supabase.functions.invoke("create-checkout-session", { body: payload });
      if (error || !checkoutData?.url) throw error ?? new Error("No Stripe checkout URL returned.");
      window.location.href = checkoutData.url;
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage("Stripe checkout could not be started. Please try again, or contact Grafted if the issue continues.");
    }
  };

  return (
    <>
      <PageHero eyebrow="Become a Member" title="Start your Grafted membership." subtitle="Create your account, save your member details, and continue to Stripe Checkout." />
      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={submit} className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
            <h2 className="font-display text-4xl text-deep-waters">Create your member account.</h2>
            <p className="mt-3 text-deep-waters/75">Use Google sign in, enter your member details, then continue to payment.</p>
            <Button type="button" onClick={continueWithGoogle} variant="outline" className="mt-6 w-full font-eyebrow text-xs uppercase tracking-[0.18em]">Continue with Google</Button>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <label><span className={labelClass}>First name</span><input required className={fieldClass} value={form.first_name} onChange={(e) => update("first_name", e.target.value)} /></label>
              <label><span className={labelClass}>Last name</span><input required className={fieldClass} value={form.last_name} onChange={(e) => update("last_name", e.target.value)} /></label>
              <label className="md:col-span-2"><span className={labelClass}>Business name</span><input required className={fieldClass} value={form.business_name} onChange={(e) => update("business_name", e.target.value)} /></label>
              <label><span className={labelClass}>Email</span><input required type="email" className={fieldClass} value={form.email} onChange={(e) => update("email", e.target.value)} /></label>
              <label><span className={labelClass}>Mobile phone</span><input required type="tel" className={fieldClass} value={form.mobile_phone} onChange={(e) => update("mobile_phone", e.target.value)} /></label>
            </div>
            <label className="mt-6 flex gap-3 rounded-xl border border-deep-waters/10 bg-river-pale p-4 text-sm text-deep-waters/80"><input type="checkbox" className="mt-1" checked={form.public_directory_consent} onChange={(e) => update("public_directory_consent", e.target.checked)} /><span>I consent to being listed in the Grafted member directory once my profile is complete.</span></label>
            {errorMessage && <p className="mt-4 text-sm text-red-700">{errorMessage}</p>}
            <Button disabled={status === "saving"} className="mt-6 bg-deep-waters text-river-sand hover:bg-still-pool font-eyebrow text-xs uppercase tracking-[0.2em]">{status === "saving" ? "Preparing Checkout..." : "Continue to Payment"}<ArrowRight className="ml-2 h-4 w-4" /></Button>
          </form>
          <aside className="rounded-2xl border border-refined-gold/35 bg-background p-6 shadow-sm">
            <div className="font-eyebrow text-[10px] uppercase tracking-[0.28em] text-refined-gold">Membership</div>
            <div className="mt-3 font-display text-5xl text-deep-waters">{MEMBERSHIP_PRICING.label}</div>
            <p className="mt-4 text-sm leading-relaxed text-deep-waters/75">{MEMBERSHIP_PRICING.description}</p>
          </aside>
        </div>
      </Section>
    </>
  );
}
