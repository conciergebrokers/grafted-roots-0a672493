import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import Stripe from "npm:stripe@17.7.0";
import { createClient } from "npm:@supabase/supabase-js@2.48.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "stripe-signature, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function clean(value: string | null | undefined) {
  return value && value.length > 0 ? value : undefined;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !supabaseServiceRoleKey) {
    return jsonResponse({ error: "Missing required webhook configuration." }, 500);
  }

  const stripe = new Stripe(stripeSecretKey, { httpClient: Stripe.createFetchHttpClient() });
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  const signature = req.headers.get("stripe-signature");
  if (!signature) return jsonResponse({ error: "Missing Stripe signature." }, 400);

  let event: Stripe.Event;
  try {
    const body = await req.text();
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed", error);
    return jsonResponse({ error: "Invalid Stripe webhook signature." }, 400);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(supabase, event.data.object as Stripe.Checkout.Session);
        break;
      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(supabase, event.data.object as Stripe.Invoice);
        break;
      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(supabase, event.data.object as Stripe.Invoice);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(supabase, event.data.object as Stripe.Subscription);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(supabase, event.data.object as Stripe.Subscription);
        break;
      default:
        console.log(`Unhandled Stripe event type: ${event.type}`);
    }
    return jsonResponse({ received: true });
  } catch (error) {
    console.error("Stripe webhook handler failed", error);
    return jsonResponse({ error: "Webhook handler failed." }, 500);
  }
});

async function handleCheckoutCompleted(supabase: ReturnType<typeof createClient>, session: Stripe.Checkout.Session) {
  const memberProfileId = clean(session.metadata?.member_profile_id ?? session.client_reference_id ?? undefined);
  const email = clean(session.customer_details?.email ?? session.metadata?.email ?? undefined);
  const stripeCustomerId = typeof session.customer === "string" ? session.customer : session.customer?.id;
  const stripeSubscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
  const { data: existing, error: lookupError } = await findMemberProfile(supabase, { memberProfileId, email, stripeCustomerId, stripeSubscriptionId });
  if (lookupError) throw lookupError;
  if (!existing) return;
  const foundingMember = await shouldAssignFoundingMember(supabase, existing.id, existing.founding_member);
  const accountStatus = existing.profile_complete ? "active" : "pending_profile";
  const { error } = await supabase.from("member_profiles").update({ payment_status: "paid", account_status: accountStatus, stripe_customer_id: stripeCustomerId, stripe_subscription_id: stripeSubscriptionId, founding_member: foundingMember, updated_at: new Date().toISOString() }).eq("id", existing.id);
  if (error) throw error;
}

async function handleInvoicePaymentSucceeded(supabase: ReturnType<typeof createClient>, invoice: Stripe.Invoice) {
  const stripeCustomerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
  const stripeSubscriptionId = typeof invoice.subscription === "string" ? invoice.subscription : invoice.subscription?.id;
  const { data: existing, error: lookupError } = await findMemberProfile(supabase, { stripeCustomerId, stripeSubscriptionId });
  if (lookupError) throw lookupError;
  if (!existing) return;
  const foundingMember = await shouldAssignFoundingMember(supabase, existing.id, existing.founding_member);
  const accountStatus = existing.profile_complete ? "active" : "pending_profile";
  const { error } = await supabase.from("member_profiles").update({ payment_status: "paid", account_status: accountStatus, founding_member: foundingMember, updated_at: new Date().toISOString() }).eq("id", existing.id);
  if (error) throw error;
}

async function handleInvoicePaymentFailed(supabase: ReturnType<typeof createClient>, invoice: Stripe.Invoice) {
  const stripeCustomerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
  const stripeSubscriptionId = typeof invoice.subscription === "string" ? invoice.subscription : invoice.subscription?.id;
  const { data: existing, error: lookupError } = await findMemberProfile(supabase, { stripeCustomerId, stripeSubscriptionId });
  if (lookupError) throw lookupError;
  if (!existing) return;
  const { error } = await supabase.from("member_profiles").update({ payment_status: "failed", account_status: "past_due", updated_at: new Date().toISOString() }).eq("id", existing.id);
  if (error) throw error;
}

async function handleSubscriptionUpdated(supabase: ReturnType<typeof createClient>, subscription: Stripe.Subscription) {
  const stripeCustomerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id;
  const stripeSubscriptionId = subscription.id;
  const { data: existing, error: lookupError } = await findMemberProfile(supabase, { memberProfileId: subscription.metadata?.member_profile_id, email: subscription.metadata?.email, stripeCustomerId, stripeSubscriptionId });
  if (lookupError) throw lookupError;
  if (!existing) return;
  const isPaid = subscription.status === "active" || subscription.status === "trialing";
  const paymentStatus = isPaid ? "paid" : subscription.status;
  const accountStatus = isPaid ? (existing.profile_complete ? "active" : "pending_profile") : subscription.status === "past_due" ? "past_due" : subscription.status === "canceled" || subscription.status === "unpaid" ? "cancelled" : existing.account_status;
  const { error } = await supabase.from("member_profiles").update({ payment_status: paymentStatus, account_status: accountStatus, stripe_customer_id: stripeCustomerId, stripe_subscription_id: stripeSubscriptionId, updated_at: new Date().toISOString() }).eq("id", existing.id);
  if (error) throw error;
}

async function handleSubscriptionDeleted(supabase: ReturnType<typeof createClient>, subscription: Stripe.Subscription) {
  const stripeCustomerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id;
  const stripeSubscriptionId = subscription.id;
  const { data: existing, error: lookupError } = await findMemberProfile(supabase, { memberProfileId: subscription.metadata?.member_profile_id, email: subscription.metadata?.email, stripeCustomerId, stripeSubscriptionId });
  if (lookupError) throw lookupError;
  if (!existing) return;
  const { error } = await supabase.from("member_profiles").update({ payment_status: "cancelled", account_status: "cancelled", updated_at: new Date().toISOString() }).eq("id", existing.id);
  if (error) throw error;
}

type FindMemberInput = { memberProfileId?: string; email?: string; stripeCustomerId?: string; stripeSubscriptionId?: string };

async function findMemberProfile(supabase: ReturnType<typeof createClient>, input: FindMemberInput) {
  const columns = "id, email, profile_complete, founding_member, account_status, stripe_customer_id, stripe_subscription_id";
  if (input.memberProfileId) return supabase.from("member_profiles").select(columns).eq("id", input.memberProfileId).maybeSingle();
  if (input.stripeSubscriptionId) return supabase.from("member_profiles").select(columns).eq("stripe_subscription_id", input.stripeSubscriptionId).maybeSingle();
  if (input.stripeCustomerId) return supabase.from("member_profiles").select(columns).eq("stripe_customer_id", input.stripeCustomerId).maybeSingle();
  if (input.email) return supabase.from("member_profiles").select(columns).eq("email", input.email).maybeSingle();
  return { data: null, error: null };
}

async function shouldAssignFoundingMember(supabase: ReturnType<typeof createClient>, memberProfileId: string, alreadyFounding: boolean) {
  if (alreadyFounding) return true;
  const { count, error } = await supabase.from("member_profiles").select("id", { count: "exact", head: true }).eq("founding_member", true).eq("payment_status", "paid");
  if (error) throw error;
  if ((count ?? 0) >= 15) return false;
  const { data: existing, error: lookupError } = await supabase.from("member_profiles").select("payment_status").eq("id", memberProfileId).maybeSingle();
  if (lookupError) throw lookupError;
  return existing?.payment_status === "paid" || (count ?? 0) < 15;
}
