import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import Stripe from "npm:stripe@17.7.0";
import { createClient } from "npm:@supabase/supabase-js@2.48.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
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
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!stripeSecretKey || !supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
      return jsonResponse({ error: "Missing required server configuration." }, 500);
    }

    const authorization = req.headers.get("Authorization");
    if (!authorization) return jsonResponse({ error: "Sign in is required." }, 401);

    const authClient = createClient(supabaseUrl, supabaseAnonKey, { global: { headers: { Authorization: authorization } } });
    const { data: userResult, error: userError } = await authClient.auth.getUser();
    if (userError || !userResult?.user?.email) return jsonResponse({ error: "Sign in is required." }, 401);

    const body = await req.json().catch(() => ({}));
    const returnUrl = typeof body?.return_url === "string" ? body.return_url : "https://graftedexchange.ca/profile";

    const serviceClient = createClient(supabaseUrl, supabaseServiceRoleKey);
    const { data: memberProfile, error: profileError } = await serviceClient
      .from("member_profiles")
      .select("id, email, stripe_customer_id, payment_status")
      .eq("email", userResult.user.email.toLowerCase())
      .maybeSingle();

    if (profileError) throw profileError;
    if (!memberProfile?.stripe_customer_id) {
      return jsonResponse({ error: "No Stripe customer is connected to this member profile yet." }, 404);
    }

    const stripe = new Stripe(stripeSecretKey, { httpClient: Stripe.createFetchHttpClient() });
    const session = await stripe.billingPortal.sessions.create({
      customer: memberProfile.stripe_customer_id,
      return_url: returnUrl,
    });

    return jsonResponse({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("create-customer-portal-session error", message, error);
    return jsonResponse({ error: "Could not create Stripe customer portal session.", detail: message }, 500);
  }
});
