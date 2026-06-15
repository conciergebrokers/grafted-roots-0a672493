## Resize Header Logo to Large

The logo in the site header is currently `h-9` (36px) on mobile and `h-10` (40px) on desktop, which is small relative to the `h-16` (64px) header height.

### Change
- Update `src/components/site/Wordmark.tsx`
- Change the logo image classes from `h-9 w-auto md:h-10` to `h-12 w-auto md:h-14` (48px mobile / 56px desktop)

This gives a much more prominent logo while keeping a small buffer within the header.