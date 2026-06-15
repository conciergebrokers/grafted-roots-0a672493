## Plan: Replace site logo & favicon

### Assets
1. Upload `magnific_..._jSaM487LD0.svg` (full logo) to CDN → `src/assets/grafted-logo.svg.asset.json`.
2. Upload `magnific_..._vu0NlfZa47.svg` (favicon mark) to CDN → `src/assets/grafted-favicon.svg.asset.json`.

### Logo replacement
Update `src/components/site/Wordmark.tsx` to render the uploaded SVG as an `<img>` inside the existing `<Link to="/">`, preserving:
- `aria-label="Grafted home"`
- height matching current wordmark (~2rem / `h-8` desktop, `h-9` in mobile sheet)
- `tone` prop kept for API compatibility but no longer needed for color (SVG has its own colors); if the dark teal header looks bad on the colored logo, we can revisit.

This single change covers every usage: `SiteHeader` (desktop + mobile sheet) — those are the only two call sites in the codebase.

### Favicon
In `src/routes/__root.tsx`, add to the `links` array:
```ts
{ rel: "icon", type: "image/svg+xml", href: "<favicon CDN url>" }
```

### Out of scope
- No changes to OG image, theme color, or copy.
- Wordmark `tone` prop kept (no callers to update).

### Verification
Confirm header renders the new logo on `/` and the browser tab shows the new favicon via preview.