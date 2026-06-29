import { FormEvent, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Lock } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { ANNUAL_REVENUE_RANGES, BUSINESS_CATEGORIES, CONFIDENTIAL_METRICS_COPY, MEMBER_STORAGE_KEY, STAGE_OF_BUSINESS } from "@/data/memberRegistration";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/complete-profile")({
  head: () => ({
    meta: [{ title: "Complete Your Profile | Grafted" }, { name: "robots", content: "noindex" }],
    links: [{ rel: "canonical", href: "/complete-profile" }],
  }),
  component: CompleteProfilePage,
});

const fieldClass = "mt-2 w-full rounded-md border border-deep-waters/15 bg-background px-4 py-3 text-sm text-deep-waters outline-none focus:border-refined-gold focus:ring-2 focus:ring-refined-gold/20";
const labelClass = "font-eyebrow text-[10px] uppercase tracking-[0.22em] text-deep-waters/65";

const initialProfile = {
  email: "",
  business_category: "",
  business_category_other: "",
  one_line_description: "",
  city_service_area: "",
  city_service_area_visibility: "public",
  logo_url: "",
  headshot_url: "",
  headshot_visibility: "public",
  what_i_do_differently: "",
  ideal_referral: "",
  website_url: "",
  social_links: "",
  what_drew_you_to_grafted: "",
  stage_of_business: "",
  annual_revenue: "",
  number_of_employees: "",
  salesperson_own_book: false,
};

type ProfileForm = typeof initialProfile;

function CompleteProfilePage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "saving">("idle");
  const [form, setForm] = useState<ProfileForm>(initialProfile);

  useEffect(() => {
    const raw = localStorage.getItem(MEMBER_STORAGE_KEY);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw);
      setForm((current) => ({ ...current, email: saved.email ?? "" }));
    } catch {
      // Leave blank.
    }
  }, []);

  const update = (key: keyof ProfileForm, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("saving");

    try {
      const supabaseAny = supabase as any;
      const { data } = await supabase.auth.getUser();
      const email = data?.user?.email ?? form.email;
      const { data: existingProfile } = await supabaseAny.from("member_profiles").select("payment_status").eq("email", email).maybeSingle();
      const paymentStatus = existingProfile?.payment_status ?? "pending";
      const accountStatus = paymentStatus === "paid" ? "active" : "pending_payment";
      const payload = { ...form, email, user_id: data?.user?.id ?? null, number_of_employees: form.number_of_employees ? Number(form.number_of_employees) : null, profile_complete: true, account_status: accountStatus, updated_at: new Date().toISOString() };
      await supabaseAny.from("member_profiles").upsert(payload, { onConflict: "email" });
      localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify({ ...payload, payment_status: paymentStatus }));
    } catch (error) {
      console.error(error);
      localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify({ ...form, profile_complete: true, account_status: "pending_payment", updated_at: new Date().toISOString() }));
    }

    navigate({ to: "/profile" });
  };

  return (
    <>
      <PageHero eyebrow="Member Profile" title="Complete your profile." subtitle="Public fields can support the future directory. Private metrics stay Grafted-only." />
      <Section tone="sand">
        <form onSubmit={submit} className="mx-auto max-w-5xl rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <h2 className="font-display text-3xl text-deep-waters">Public profile</h2>
              <label><span className={labelClass}>Email</span><input required type="email" className={fieldClass} value={form.email} onChange={(e) => update("email", e.target.value)} /></label>
              <label><span className={labelClass}>Business category</span><select required className={fieldClass} value={form.business_category} onChange={(e) => update("business_category", e.target.value)}><option value="">Choose one</option>{BUSINESS_CATEGORIES.map((category) => (<option key={category} value={category}>{category}</option>))}</select></label>
              {form.business_category === "Other" && <label><span className={labelClass}>Other category</span><input className={fieldClass} value={form.business_category_other} onChange={(e) => update("business_category_other", e.target.value)} /></label>}
              <label><span className={labelClass}>One-line description</span><input required className={fieldClass} value={form.one_line_description} onChange={(e) => update("one_line_description", e.target.value)} /></label>
              <label><span className={labelClass}>City / service area</span><input required className={fieldClass} value={form.city_service_area} onChange={(e) => update("city_service_area", e.target.value)} /></label>
              <label><span className={labelClass}>City visibility</span><select className={fieldClass} value={form.city_service_area_visibility} onChange={(e) => update("city_service_area_visibility", e.target.value)}><option value="public">Public</option><option value="member-only">Member-only</option></select></label>
              <label><span className={labelClass}>Website</span><input type="url" className={fieldClass} value={form.website_url} onChange={(e) => update("website_url", e.target.value)} /></label>
              <label><span className={labelClass}>Social links</span><textarea className={fieldClass} rows={3} value={form.social_links} onChange={(e) => update("social_links", e.target.value)} /></label>
            </div>
            <div className="space-y-5">
              <h2 className="font-display text-3xl text-deep-waters">Referral details</h2>
              <label><span className={labelClass}>What I do differently</span><textarea required className={fieldClass} rows={4} value={form.what_i_do_differently} onChange={(e) => update("what_i_do_differently", e.target.value)} /></label>
              <label><span className={labelClass}>My ideal referral is</span><textarea required className={fieldClass} rows={4} value={form.ideal_referral} onChange={(e) => update("ideal_referral", e.target.value)} /></label>
              <label><span className={labelClass}>What drew you to Grafted</span><textarea className={fieldClass} rows={4} value={form.what_drew_you_to_grafted} onChange={(e) => update("what_drew_you_to_grafted", e.target.value)} /></label>
              <div className="rounded-2xl border border-refined-gold/35 bg-river-pale p-5">
                <div className="flex items-center gap-2 font-serif text-xl text-deep-waters"><Lock className="h-4 w-4 text-refined-gold" /> Grafted-only metrics</div>
                <p className="mt-3 text-sm leading-relaxed text-deep-waters/75">{CONFIDENTIAL_METRICS_COPY}</p>
                <div className="mt-5 space-y-5">
                  <label><span className={labelClass}>Stage of business</span><select required className={fieldClass} value={form.stage_of_business} onChange={(e) => update("stage_of_business", e.target.value)}><option value="">Choose one</option>{STAGE_OF_BUSINESS.map((stage) => (<option key={stage} value={stage}>{stage}</option>))}</select></label>
                  <label><span className={labelClass}>Annual revenue</span><select required className={fieldClass} value={form.annual_revenue} onChange={(e) => update("annual_revenue", e.target.value)}><option value="">Choose one</option>{ANNUAL_REVENUE_RANGES.map((range) => (<option key={range} value={range}>{range}</option>))}</select></label>
                  <label><span className={labelClass}>Number of employees</span><input required type="number" min="0" className={fieldClass} value={form.number_of_employees} onChange={(e) => update("number_of_employees", e.target.value)} /><span className="mt-1 block text-xs text-deep-waters/55">Do not include subcontractors.</span></label>
                  <label className="flex gap-3 text-sm text-deep-waters/80"><input type="checkbox" checked={form.salesperson_own_book} onChange={(e) => update("salesperson_own_book", e.target.checked)} />I am a salesperson who owns my book of business, not the business owner.</label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3"><Button disabled={status === "saving"} className="bg-deep-waters text-river-sand hover:bg-still-pool font-eyebrow text-xs uppercase tracking-[0.2em]">{status === "saving" ? "Saving..." : "Save Profile"}<ArrowRight className="ml-2 h-4 w-4" /></Button><Button asChild variant="outline"><Link to="/join">Back to signup</Link></Button></div>
        </form>
      </Section>
    </>
  );
}
