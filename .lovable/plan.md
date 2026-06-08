## Goal
Route all primary "visit" CTAs on the homepage to the Eventbrite registration page, opening in a new browser tab.

## Affected buttons
1. Hero — "Visit Grafted"
2. "Visit Before You Join" section — "Plan Your First Visit"
3. Footer CTASection — "Contact Grafted"

## Implementation
- **index.tsx**: Replace `Link to="/contact"` with an `<a>` tag pointing to `https://www.eventbrite.ca/e/grafted-faith-integrated-business-networking-tickets-1989963772211` with `target="_blank"` and `rel="noopener noreferrer"` for buttons 1 and 2.
- **CTASection.tsx**: Update the component so that when the `primary.to` value starts with `http`, it renders a native `<a>` tag with `target="_blank" rel="noopener noreferrer"` instead of `Link`. Then pass the Eventbrite URL as the primary `to` value in the CTASection call in `index.tsx`.

No other pages or routes are changed. The /contact route remains intact for future use.