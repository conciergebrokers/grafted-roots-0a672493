import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
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

// Allow-listed editable fields on member_profiles. Anything else is ignored.
const EDITABLE_FIELDS = [
  "business_category",
  "business_category_other",
  "one_line_description",
  "city_service_area",
  "city_service_area_visibility",
  "logo_url",
  "headshot_url",
  "headshot_visibility",
  "what_i_do_differently",
  "ideal_referral",
  "website_url",
  "social_links",
  "what_drew_you_to_grafted",
  "stage_of_business",
  "annual_revenue",
  "number_of_employees",
  "salesperson_own_book",
] as const;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabaseAnonKey =
      Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseServiceRoleKey || !supabaseAnonKey) {
      console.error("Missing required server configuration", {
        hasUrl: !!supabaseUrl,
        hasService: !!supabaseServiceRoleKey,
        hasAnon: !!supabaseAnonKey,
      });
      return jsonResponse({ error: "Missing required server configuration." }, 500);
    }

    const body = (await req.json()) as Record<string, unknown>;
    const rawEmail = typeof body.email === "string" ? body.email : "";
    const email = rawEmail.trim().toLowerCase();
    if (!email) return jsonResponse({ error: "An email is required to complete your profile." }, 400);

    // If a Supabase session is attached, prefer that authenticated email.
    const authorization = req.headers.get("Authorization");
    let authUserId: string | null = null;
    let authEmail: string | null = null;
    if (authorization) {
      const authClient = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: authorization } },
      });
      const { data: userResult } = await authClient.auth.getUser();
      if (userResult?.user) {
        authUserId = userResult.user.id;
        authEmail = userResult.user.email?.toLowerCase() ?? null;
      }
    }

    const targetEmail = authEmail ?? email;
    const serviceClient = createClient(supabaseUrl, supabaseServiceRoleKey);

    const { data: existing, error: lookupError } = await serviceClient
      .from("member_profiles")
      .select("id, email, payment_status, stripe_subscription_id, user_id")
      .eq("email", targetEmail)
      .maybeSingle();

    if (lookupError) {
      console.error("member_profiles lookup failed", lookupError);
      return jsonResponse({ error: "Could not look up your member profile." }, 500);
    }

    if (!existing) {
      return jsonResponse(
        { error: "We could not find a Grafted membership tied to that email. Please complete signup first." },
        404,
      );
    }

    const isPaid =
      existing.payment_status === "paid" || !!existing.stripe_subscription_id;

    if (!isPaid) {
      return jsonResponse(
        {
          error:
            "Payment hasn't been confirmed for this membership yet. Please complete checkout before saving your profile.",
          payment_status: existing.payment_status ?? "pending",
        },
        402,
      );
    }

    const updatePayload: Record<string, unknown> = {};
    for (const field of EDITABLE_FIELDS) {
      if (!(field in body)) continue;
      const value = body[field];
      // Skip empty strings so a partial edit form doesn't wipe previously
      // saved fields. Booleans, numbers, and explicit nulls are preserved.
      if (typeof value === "string" && value.trim() === "") continue;
      updatePayload[field] = value;
    }

    if (updatePayload.number_of_employees !== undefined && updatePayload.number_of_employees !== null && updatePayload.number_of_employees !== "") {
      const n = Number(updatePayload.number_of_employees);
      updatePayload.number_of_employees = Number.isFinite(n) ? n : null;
    } else if (updatePayload.number_of_employees === "") {
      updatePayload.number_of_employees = null;
    }

    updatePayload.profile_complete = true;
    updatePayload.account_status = existing.payment_status === "paid" ? "active" : "pending_profile";
    updatePayload.updated_at = new Date().toISOString();

    // Link auth user if we have one and the row doesn't already have it.
    if (authUserId && !existing.user_id) {
      updatePayload.user_id = authUserId;
    }

    const { error: updateError } = await serviceClient
      .from("member_profiles")
      .update(updatePayload)
      .eq("id", existing.id);

    if (updateError) {
      console.error("member_profiles update failed", updateError);
      return jsonResponse({ error: "Could not save your profile. Please try again." }, 500);
    }

    return jsonResponse({
      success: true,
      account_status: updatePayload.account_status,
      profile_complete: true,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("complete-member-profile error", message, error);
    return jsonResponse({ error: "Could not save your profile.", detail: message }, 500);
  }
});