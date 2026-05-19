
# Grafted Website Build Plan

A production-ready public marketing site for Grafted with scaffolding for future member/admin features. Note: the project uses **TanStack Start** (file-based routing in `src/routes/`), not React Router. I'll keep the requested stack (React, TS, Vite, Tailwind, shadcn/ui, lucide-react, Framer Motion) and use the project's existing TanStack router conventions.

## 1. Brand foundation

**`src/styles.css`** — add brand tokens (oklch equivalents of the hex palette) and map to semantic tokens:
- `--deep-waters`, `--still-pool`, `--living-water`, `--refined-gold`, `--sunrise-copper`, `--river-sand`, `--river-pale`, `--charcoal-teal`, `--deepest`
- Override semantic tokens: `--background` (River Sand/white), `--foreground` (Deep Waters), `--primary` (Deep Waters), `--accent` (Refined Gold)
- Register fonts: DM Serif Display, Source Serif 4, Raleway, Nunito Sans via `<link>` in `__root.tsx` head
- Tailwind font utilities: `font-display`, `font-serif`, `font-eyebrow`, `font-body`

## 2. Global components (`src/components/`)

- `SiteHeader.tsx` — wordmark left, nav right (Home/About/FAQ/Contact), Visit Grafted CTA, mobile Sheet hamburger
- `SiteFooter.tsx` — wordmark, tagline, mantra, meeting info, founder, email, nav, subtle future links
- `PageHero.tsx` — Deep Waters background variant + light variant, eyebrow/headline/sub/CTA slots
- `SectionHeading.tsx` — eyebrow (Raleway uppercase) + serif headline + optional gold number
- `PillarCard.tsx`, `MeetingSegmentCard.tsx` (numbered, gold accent), `CTASection.tsx`
- `FAQAccordion.tsx` (shadcn accordion wrapper)
- `ContactForm.tsx` (react-hook-form + zod + shadcn form/select/checkbox + sonner toast + success state)
- `FutureFeatureCard.tsx`, `MemberPreviewCard.tsx`, `BranchMetricPreview.tsx`, `TestimonyCard.tsx`, `PricingTierCard.tsx`, `ScriptureCallout.tsx`
- `Wordmark.tsx` — DM Serif Display lockup

## 3. Routes (TanStack Start, file-based in `src/routes/`)

Layout: `src/routes/__root.tsx` updated to render `SiteHeader` + `<Outlet />` + `SiteFooter` inside QueryClientProvider, plus Google Fonts links and per-route `head()` meta on each leaf.

Public pages:
- `src/routes/index.tsx` — Home (all sections from brief)
- `src/routes/about.tsx` — About
- `src/routes/faq.tsx` — FAQ (15 items)
- `src/routes/contact.tsx` — Contact + form

Placeholder future routes (rendered with `FutureFeatureCard`s, "Coming soon" hero, listed feature bullets):
- `src/routes/portal.tsx` — Member Portal
- `src/routes/members.tsx` — Member Showcase (renders mock `MemberPreviewCard`s from placeholder data)
- `src/routes/_protected.tsx` — pathless layout route with `beforeLoad` guard reading a stub `useAuth` context (always denies for now → renders "Protected area" notice). Establishes the scaffolding pattern.
- `src/routes/_protected/admin.tsx` — Admin Dashboard placeholder with `BranchMetricPreview` mocks
- `src/routes/_protected/admin.analytics.tsx` — Branch Analytics placeholder
- `src/routes/_protected/branches.$branchId.tsx` — Branch Dashboard placeholder

Update `src/router.tsx` context type to carry an `auth` stub so the guard pattern is real and ready for swap-in later. No real auth wired yet.

## 4. Data layer

`src/data/grafted.ts`:
- Exported TS types: `Branch`, `Member`, `Slip` (with `SlipType` union: sowing/harvest/forge/growth), `PrayerRequest`, `BranchKPI`
- Sample arrays: one Edmonton branch ("Root"), 4-6 placeholder members, sample slips, prayer requests, KPI snapshot
- Exported constants: `MEETING_INFO`, `PRICING_TIERS`, `MEETING_SEGMENTS`, `PILLARS`, `FAQ_ITEMS`, `CONTRAST_POINTS`, `AUDIENCE_CARDS`, `MEMBER_POSTURE`, `BRANCH_PHASES`, `SLIP_TYPES`, `FUTURE_FEATURES_BY_ROUTE`
- All long-form copy lives here so pages stay clean

Auth stub: `src/lib/auth.ts` exports `useAuthStub()` returning `{ isAuthenticated: false, user: null }`, used by `_protected` guard.

## 5. SEO

Each route's `head()` sets title, description, og:title, og:description, og:url (relative), og:type. Canonical only on leaves. Root `head()` carries viewport, font preconnects, og:site_name, default JSON-LD `Organization`. No og:image until provided.

## 6. Copy & voice rules enforced

- All copy lifted verbatim from the brief
- A repo-wide check: no em dashes in any new file (use commas/periods)
- Use approved vocabulary throughout (community, member, branch, slip, The Forge, etc.)

## 7. Motion & polish

- Install `framer-motion`
- Subtle fade/slide-up on section reveal via a small `<Reveal>` wrapper (no parallax, no heavy effects)
- Smooth scroll via CSS `scroll-behavior: smooth`

## 8. Imagery

Placeholder image slots use neutral River Sand panels with lucide icons (Coffee, BookOpen, Users, HandHeart, MapPin) rather than generic stock. Real photography can drop in later. No AI image generation in this pass unless requested.

## Technical notes

- Stack swap: brief says React Router, project ships TanStack Router. I'll use TanStack to avoid double-router conflict; navigation/links/guards translate cleanly. If you want React Router DOM instead, say so and I'll rewire.
- shadcn components needed: button, sheet, accordion, form, input, textarea, select, checkbox, card, badge, separator, sonner — most already present.
- No backend, no auth, no DB — `_protected` is structural scaffolding only.
- Files touched/created: ~30 files (4 page routes, 5 placeholder routes, 1 protected layout, ~14 components, 1 data file, 1 auth stub, styles.css, __root.tsx, router.tsx).

Approve and I'll build it.
