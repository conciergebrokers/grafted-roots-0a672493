## Problem
The header uses `bg-background/85` with `backdrop-blur`, so when it sits over the dark teal hero it picks up the page color and looks teal-tinted. That muddies the white logo tile.

## Fix
In `src/components/site/SiteHeader.tsx`, replace the translucent background with a solid one and drop the backdrop blur:

- Change `bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70` → `bg-background` (solid white).
- Keep border, sticky, z-index as-is.

That keeps the header consistently white on every page so the logo's white tile blends in and the teal hero no longer bleeds through.

No other files change.