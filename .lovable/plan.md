# Verify GitHub connection, then deploy

## Why this comes first

None of the work you referenced exists in this Lovable workspace:

- `supabase/migrations/20260628000000_member_profiles.sql` — missing
- `supabase/functions/create-checkout-session/index.ts` — missing (no `supabase/functions/` directory at all)
- `supabase/functions/stripe-webhook/index.ts` — missing
- Routes `/join`, `/complete-profile`, `/profile` — not in `src/routes/`

Lovable's workspace is the source of truth and syncs two-way with the linked GitHub repo. If those commits were pushed to `conciergebrokers/grafted-launchpad` and that repo is linked to this project on its synced branch, the files would be here. They aren't, so one of the link / repo / branch assumptions is off. Deploying before sorting that out would mean shipping a different codebase than the one you reviewed on GitHub.

## Step 1 — You confirm the GitHub link (manual, ~2 min)

In the Lovable editor:

1. Open the **+** menu (bottom-left of the chat input) → **GitHub**.
2. Confirm the connected repo is exactly `conciergebrokers/grafted-launchpad`.
3. Confirm the synced branch is the one your commits are on (usually `main`). If your commits are on a feature branch, either merge to the synced branch or switch the synced branch.
4. On GitHub, open the repo and confirm the four paths actually exist on that branch:
   - `supabase/migrations/20260628000000_member_profiles.sql`
   - `supabase/functions/create-checkout-session/index.ts`
   - `supabase/functions/stripe-webhook/index.ts`
   - `src/routes/join.tsx`, `src/routes/complete-profile.tsx`, `src/routes/profile.tsx` (or equivalent)

Report back which of these is true:

- **A** — Repo is linked, branch matches, files exist on that branch but aren't here → it's a sync issue; I'll trigger a re-sync from my side after you confirm.
- **B** — Repo isn't linked / linked to a different repo → connect / re-connect to `conciergebrokers/grafted-launchpad`, pick the right branch, then files appear automatically.
- **C** — Synced branch is wrong → switch the synced branch in Lovable's GitHub settings; files appear automatically.
- **D** — Files don't exist on that branch on GitHub → they were committed somewhere else; locate them and either merge to the synced branch or paste them in.

## Step 2 — Once the files land in the workspace, I deploy

After you confirm and the files appear in this workspace, I will, in one pass:

1. Read the migration and run it via `supabase--migration` (you approve it).
2. Read each edge function file and confirm it's well-formed; Lovable-managed edge functions deploy automatically on save — no manual deploy step.
3. Smoke-test both endpoints:
   - `POST https://lvfcywukgityhijpnwos.supabase.co/functions/v1/create-checkout-session`
   - `POST https://lvfcywukgityhijpnwos.supabase.co/functions/v1/stripe-webhook` (without a valid signature; expect 401 — proves the function is reachable and signature verification is wired)
4. Confirm `PUBLIC_SITE_URL`, `STRIPE_PRICE_ID`, and `STRIPE_SECRET_KEY` are present in the Cloud secrets (they already are — values stay hidden).
5. Verify the `member_profiles` table exists with the expected columns and RLS via `supabase--read_query`.
6. Report exactly what shipped, what passed, and what's still pending in Stripe — including `STRIPE_WEBHOOK_SIGNING_SECRET`, which I will leave unset until you paste the signing secret from the Stripe dashboard webhook endpoint you point at the deployed `stripe-webhook` URL.

## What I will not do

- Rewrite the `/join → Google sign-in → Stripe Checkout → /complete-profile → /profile` flow.
- Touch the `account_status` / `payment_status` transitions encoded in the webhook.
- Print or echo any secret value.

Reply once you've checked the GitHub link (or paste the migration + two edge function files inline if that's faster) and I'll deploy.
