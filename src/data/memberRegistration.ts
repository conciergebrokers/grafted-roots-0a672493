export const BUSINESS_CATEGORIES = [
  "Construction and Trades",
  "Home Services",
  "Professional Services",
  "Financial Services and Insurance",
  "Real Estate and Property",
  "Health and Wellness",
  "Retail and E-commerce",
  "Marketing, Media and Design",
  "Technology and IT",
  "Food and Hospitality",
  "Coaching and Education",
  "Manufacturing and Industrial",
  "Nonprofit and Ministry",
  "Other",
] as const;

export const STAGE_OF_BUSINESS = [
  "Startup, under 1 year",
  "Established and steady",
  "Growing and scaling",
  "Stuck or plateaued",
] as const;

export const ANNUAL_REVENUE_RANGES = [
  "Under $250,000",
  "$250,000 to $500,000",
  "$500,000 to $1 million",
  "$1 million to $2 million",
  "$2 million to $5 million",
  "$5 million and up",
] as const;

export const VISIBILITY_OPTIONS = ["public", "member-only"] as const;

export const ACCOUNT_STATUSES = [
  "pending_payment",
  "pending_profile",
  "active",
  "past_due",
  "cancelled",
] as const;

export type AccountStatus = (typeof ACCOUNT_STATUSES)[number];
export type VisibilityOption = (typeof VISIBILITY_OPTIONS)[number];

export const CONFIDENTIAL_METRICS_COPY =
  "These answers are confidential. They are never shown to other members or to the public. Grafted uses them only for overall reporting on the membership, in aggregate, never tied back to your name or business.";

export const STRIPE_PLACEHOLDER_COPY =
  "Membership billing will be completed through Stripe. Stripe checkout is being connected.";

export const MEMBER_STORAGE_KEY = "grafted_pending_member_signup";

export type PendingMemberSignup = {
  first_name: string;
  last_name: string;
  business_name: string;
  email: string;
  mobile_phone: string;
  public_directory_consent: boolean;
};
