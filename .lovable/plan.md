# Plan: Pricing rewrite, FAQ alignment, header cleanup

Source of truth for pricing: `Grafted_Registration_Spec.docx` (v1.0). Membership is now a single flat price, not tiered.

## 1. Pricing language (site-wide)

Replace tiered pricing everywhere with the spec's flat structure:

- **$150 CAD / month**, per member
- **No GST charged at this time** (Grafted is operating under Jen's name; GST will be added if/when Grafted registers)
- **Everyone bills on the 1st of the month**
- **Launch cohort (signs up on or before June 30, 2026):** charged $0 at signup, first full $150 on July 1, 2026
- **After launch (July 1, 2026 onward):** prorated amount at signup for the days until the next 1st, then $150 on the 1st each month
- **First 15 paid signups are founding members** (auto-flagged by payment time, founding badge in the directory) — keep as urgency lever
- **Lunch is on your own** at each meeting
- **Self-serve billing** via Stripe customer portal (members update card / cancel themselves)
- Remove the "20% of fees is set aside for charitable giving, members vote" line — not in the spec, so it should not appear on the public site unless Jen confirms it still applies. I'll pull it for now; easy to re-add.

### Files touched

- `src/data/grafted.ts` — replace `PRICING_TIERS` array with a single `MEMBERSHIP` object (price, currency, cadence, billing notes, founding-member rule). Update the `What does membership cost?` FAQ answer. Add/refresh related FAQ entries (see §2).
- `src/data/membership.ts` — already has the right $150 shape; reconcile copy with the new spec wording (founding cohort, billing on the 1st, lunch on your own).
- `src/routes/index.tsx` — replace the Membership section: drop the tier list and `PRICING_TIERS.map(...)`. New layout = one prominent price card ($150/mo, "No GST", "Bills on the 1st", "Founding member: first 15") + supporting copy. Remove `PricingTierCard` import.
- `src/components/site/FAQAccordion.tsx` — remove the special-case tier grid in `FAQAnswer` (no longer needed); render the answer as normal paragraphs.
- `src/components/site/PricingTierCard.tsx` — delete (no longer used) OR repurpose as a single `MembershipPriceCard`. I'll delete and add a small `MembershipPriceCard` to keep the component layer clean.

## 2. FAQ updates (`FAQ_ITEMS` in `src/data/grafted.ts`)

- **"What does membership cost?"** → "Membership is $150 CAD per month, billed on the 1st. No GST is charged at this time. The first 15 paid signups are founding members."
- **"When am I charged?"** (new) → Explains launch cohort vs ongoing proration rule, and that everyone renews on the 1st.
- **"What if I cannot afford membership?"** → Keep current tone; remove tier reference.
- **"Are meals included?"** → Keep, members and visitors pay for their own meal.
- **"How do I cancel or update my card?"** (new) → Self-serve Stripe customer portal.
- **"What does founding member mean?"** (new) → First 15 paid signups, badge in the directory, recognized in the community.

Update FAQ JSON-LD automatically (already derived from `FAQ_ITEMS`).

## 3. Hide Sign in button (keep code)

`src/components/site/SiteHeader.tsx`: comment out the desktop and mobile `<Button asChild …><Link to="/auth">Sign in</Link></Button>` blocks with a `{/* TODO: re-enable when member auth is live */}` note so they can be restored verbatim. Leave `/auth` route, `auth.tsx`, and Google auth wiring in place.

## 4. Header crowding / hover polish

Current header (per the attached screenshot) crowds nav links against the "Apply for Membership" pill, and ghost-button hover backgrounds bleed into adjacent labels. Cleanup:

- Tighten the three-column layout: logo / centered nav / right-side actions, with consistent `gap-6` between nav items (down from `gap-8`) and `gap-2` between right-side buttons.
- Demote **Apply for Membership** from a filled gold pill to a quieter outline/ghost link styled to match the nav eyebrow type, so only **Visit Grafted** reads as the primary CTA. This removes the visual collision between "Contact" and the gold pill in the screenshot.
- Replace ghost-hover background fill on nav links with a subtle underline-on-hover (and `text-deep-waters` color shift) so hover no longer paints a rounded block over the link.
- Add a thin vertical divider between the nav cluster and the right-side actions for breathing room.
- Mobile sheet: no functional change, just drop the Sign in button there too.

### Files touched

- `src/components/site/SiteHeader.tsx` — layout/spacing tweaks, hover styles, hide Sign in, restyle Apply for Membership.

## Out of scope (flagging for later, not in this change)

- Building the actual registration form / Stripe subscription per the spec's §6 billing logic. The current "Apply for Membership" form stays as-is; only the public marketing copy changes now.
- Re-adding Sign in once the member portal ships.

## Verification

- `tsgo` typecheck after edits (PricingTierCard removal + new component).
- Visual check on `/` (Membership section), `/faq` (cost question + new entries), and header at desktop + mobile widths.
