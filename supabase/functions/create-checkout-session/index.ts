import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import Stripe from "npm:stripe@17.7.0";
import { createClient } from "npm:@supabase/supabase-js@2.48.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type CheckoutRequest = {
  first_name?: string;
  last_name?: string;
  business_name?: string;
  email?: string;
  mobile_phone?: string;
  public_directory_consent?: boolean;
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const stripePriceId = Deno.env.get("STRIPE_PRICE_ID");
    const siteUrl = Deno.env.get("PUBLIC_SITE_URL") ?? "https://graftedexchange.ca";
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey =
      Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!stripeSecretKey || !stripePriceId || !supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
      console.error("Missing required server configuration", {
        hasStripeKey: !!stripeSecretKey,
        hasStripePrice: !!stripePriceId,
        hasSupabaseUrl: !!supabaseUrl,
        hasSupabaseAnonOrPublishable: !!supabaseAnonKey,
        hasServiceRole: !!supabaseServiceRoleKey,
      });
      return jsonResponse({ error: "Missing required server configuration." }, 500);
    }

    const body = (await req.json()) as CheckoutRequest;
    const email = body.email?.trim().toLowerCase();

    if (!email) return jsonResponse({ error: "A member email is required before checkout." }, 400);
    if (!body.public_directory_consent) return jsonResponse({ error: "Public directory consent is required before checkout." }, 400);

    const authorization = req.headers.get("Authorization");
    let userId: string | null = null;
    let authEmail: string | null = null;

    if (authorization) {
      const authClient = createClient(supabaseUrl, supabaseAnonKey, { global: { headers: { Authorization: authorization } } });
      const { data: userResult, error: userError } = await authClient.auth.getUser();

      if (!userError && userResult?.user) {
        userId = userResult.user.id;
        authEmail = userResult.user.email ?? null;
      } else {
        console.warn("Checkout continued without a valid Supabase user session", userError?.message);
      }
    }

    const checkoutEmail = (authEmail ?? email).trim().toLowerCase();
    const serviceClient = createClient(supabaseUrl, supabaseServiceRoleKey);
    const stripe = new Stripe(stripeSecretKey, { httpClient: Stripe.createFetchHttpClient() });

    // Guard: never downgrade an existing paid member row.
    const { data: existingProfile } = await serviceClient
      .from("member_profiles")
      .select("id, payment_status, stripe_subscription_id, profile_complete")
      .eq("email", checkoutEmail)
      .maybeSingle();

    if (
      existingProfile &&
      (existingProfile.payment_status === "paid" || !!existingProfile.stripe_subscription_id)
    ) {
      const redirectPath = existingProfile.profile_complete ? "/profile" : "/complete-profile";
      return jsonResponse({
        already_active: true,
        redirect: redirectPath,
        url: `${siteUrl.replace(/\/$/, "")}${redirectPath}`,
        message: "This email already has an active Grafted membership.",
      });
    }

    const memberPayload: Record<string, unknown> = {
      first_name: body.first_name ?? "",
      last_name: body.last_name ?? "",
      business_name: body.business_name ?? "",
      email: checkoutEmail,
      mobile_phone: body.mobile_phone ?? "",
      public_directory_consent: true,
      account_status: "pending_payment",
      payment_status: "checkout_started",
      profile_complete: false,
      founding_member: false,
      signup_date: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (userId) memberPayload.user_id = userId;

    const { data: memberProfile, error: profileError } = await serviceClient
      .from("member_profiles")
      .upsert(memberPayload, { onConflict: "email" })
      .select("id, email, first_name, last_name, business_name, mobile_phone, stripe_customer_id")
      .single();

    if (profileError || !memberProfile) {
      console.error("member_profiles upsert failed", profileError);
      return jsonResponse({ error: "Could not prepare your member profile for checkout." }, 500);
    }

    const displayName = [memberProfile.first_name, memberProfile.last_name].filter(Boolean).join(" ");
    let stripeCustomerId = memberProfile.stripe_customer_id as string | null;
    const stripeMetadata = {
      user_id: userId ?? "",
      member_profile_id: memberProfile.id,
      business_name: memberProfile.business_name || "",
    };

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: checkoutEmail,
        name: displayName || memberProfile.business_name || undefined,
        phone: memberProfile.mobile_phone || undefined,
        metadata: stripeMetadata,
      });
      stripeCustomerId = customer.id;
      await serviceClient.from("member_profiles").update({ stripe_customer_id: stripeCustomerId, updated_at: new Date().toISOString() }).eq("id", memberProfile.id);
    }

    const metadata = { user_id: userId ?? "", member_profile_id: memberProfile.id, email: checkoutEmail };
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: stripeCustomerId,
      line_items: [{ price: stripePriceId, quantity: 1 }],
      client_reference_id: memberProfile.id,
      success_url: `${siteUrl.replace(/\/$/, "")}/complete-profile?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl.replace(/\/$/, "")}/join?checkout=cancelled`,
      metadata,
      subscription_data: { metadata },
    });

    if (!session.url) return jsonResponse({ error: "Stripe did not return a checkout URL." }, 500);
    return jsonResponse({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("create-checkout-session error", message, error);
    return jsonResponse({ error: "Could not create Stripe checkout session.", detail: message }, 500);
  }
});
