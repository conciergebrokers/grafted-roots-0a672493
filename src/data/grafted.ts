import type { LucideIcon } from "lucide-react";
import {
  Users,
  Sprout,
  HeartHandshake,
  Hammer,
  Repeat,
  HandHelping,
} from "lucide-react";

export const MEETING_INFO = {
  day: "Tuesdays",
  time: "12:30 PM",
  city: "Edmonton",
  province: "Alberta",
  launch: "Launching June 2026",
  founder: "Jen Garrison",
  email: "info@graftedexchange.ca",
  domain: "graftedexchange.ca",
};

export const PILLARS = [
  {
    title: "Built My Business",
    body: "Real referrals, results, tracked and celebrated.",
  },
  {
    title: "Helped Me Grow",
    body: "Practical business development woven with spiritual alignment.",
  },
  {
    title: "I Am Not Alone",
    body: "Deep community where people are known, supported, and connected.",
  },
];

export const CONNECTION_POINTS = [
  {
    title: "Real relationship",
    body: "People learn each other's businesses, lives, needs, and capacity before referrals begin to move.",
  },
  {
    title: "Generous exchange",
    body: "Members give, receive, celebrate, and follow through with open hands.",
  },
  {
    title: "Whole-person growth",
    body: "Business development, spiritual alignment, and honest community belong in the same room.",
  },
];

export const MEETING_SEGMENTS: {
  name: string;
  body: string;
  icon: LucideIcon;
}[] = [
  {
    name: "Grafted In",
    body: "Small circles where members share who they are, a win, and what they need in business or faith.",
    icon: Users,
  },
  {
    name: "Equipping Time",
    body: "Practical business teaching woven with Kingdom principle.",
    icon: Sprout,
  },
  {
    name: "The Forge",
    body: "Three focused one-on-one conversations that deepen relationship and sharpen what was just taught.",
    icon: Hammer,
  },
  {
    name: "The Exchange",
    body: "Members pass referrals, celebrate closed business, share gratitude, and name what God is doing.",
    icon: Repeat,
  },
  {
    name: "Kingdom Come",
    body: "The community closes in prayer. Requests are written down, followed up, and answered prayer is celebrated.",
    icon: HeartHandshake,
  },
];

export const PRICING_TIERS = [
  { label: "Solo or home-based", price: 100 },
  { label: "1 to 3 employees", price: 150 },
  { label: "3 to 5 employees", price: 200 },
  { label: "5 to 10 employees", price: 250 },
  { label: "10 to 20 employees", price: 350 },
  { label: "20 or more employees", price: 500 },
];

export const SLIP_TYPES = [
  {
    name: "Sowing Slip",
    body: "A referral passed into the community.",
  },
  {
    name: "Harvest Slip",
    body: "Closed business received through Grafted.",
  },
  {
    name: "Forge Slip",
    body: "An outside one-on-one completed.",
  },
  {
    name: "Growth Slip",
    body: "Personal development engagement.",
  },
];

export const AUDIENCE_CARDS = [
  "Solopreneurs",
  "Tradespeople",
  "Service providers",
  "Creatives",
  "Retail owners",
  "Established companies",
  "Faith-motivated entrepreneurs",
  "Business owners who are curious, respectful, and open to the faith-forward nature of the room",
];

export const DIFFERENTIATORS = [
  "Relationship with accountability",
  "Referrals celebrated with generosity",
  "Faith integrated openly",
  "Room for every business size and stage",
  "Selling welcomed with honour",
  "Prayer practiced with care",
];

export const MEMBER_POSTURE = [
  "Show up genuinely",
  "Honour the faith in the room",
  "Participate fully",
  "Attend consistently",
  "Bring guests when you can",
  "Contribute referrals and support when available",
  "Stay open to being surprised",
];

export const BRANCH_PHASES = [
  {
    phase: "Phase 1: Root",
    body: "Founding Edmonton community.",
  },
  {
    phase: "Phase 2: Branch",
    body: "Train leaders and seed additional branches.",
  },
  {
    phase: "Phase 3: Multiply",
    body: "Expand across Alberta and beyond as leaders rise from within.",
  },
];

export const FAQ_ITEMS = [
  {
    q: "What is Grafted?",
    a: "Grafted is a faith-integrated business networking community in Edmonton for business owners who want real referrals, practical growth, and deeper relationship.",
  },
  {
    q: "Is Grafted a church program?",
    a: "Grafted is an independent business networking community with faith fully present in the room. It serves business owners across churches, industries, and stages of growth.",
  },
  {
    q: "Do I have to be a Christian to visit?",
    a: "No, you don't. Everyone's faith journey is their own, and we will respect that as much as you respect the room. The faith in the room will be clear, and visitors are asked to honour the prayer, scripture, and faith-forward nature of the community.",
  },
  {
    q: "What happens at a meeting?",
    a: "Each meeting includes Grafted In, Equipping Time, The Forge, The Exchange, and Kingdom Come. The room includes conversation, teaching, one-on-ones, referral sharing, gratitude, testimony, and prayer.",
  },
  {
    q: "When does Grafted meet?",
    a: "Grafted meets weekly on Tuesdays at 12:30 PM in Edmonton.",
  },
  {
    q: "Can I visit before joining?",
    a: "Yes. Visitors may attend up to three times before making a membership decision. The first three visits are free. Visitors pay for their own meal.",
  },
  {
    q: "What does membership cost?",
    a: "Membership is $150 CAD per month. One simple monthly membership keeps the room accessible, sustainable, and easy to understand. No GST is charged at this time. Lunch is not included. Members pay for their own lunch at each meeting. The first 15 paid signups receive founding member status.",
  },
  {
    q: "Are meals included?",
    a: "Members and visitors pay for their own meal at each meeting.",
  },
  {
    q: "What if I cannot afford membership?",
    a: "We believe where we put our money is tied to where our heart is. Investing in yourself and your business growth is an important step in business. If there are extenuating circumstances, we are open to hearing about them.",
  },
  {
    q: "Are industries exclusive?",
    a: "Grafted welcomes business owners across industries. The room is relationship-first and inclusive of business owners across business sizes and stages.",
  },
  {
    q: "Are MLM businesses allowed?",
    a: "The membership team considers these situations case by case. The key question is posture. A business owner whose primary intention is recruiting members into a team structure creates a mismatch with the room.",
  },
  {
    q: "What are slips?",
    a: "Slips are how Grafted tracks what matters. Sowing Slips track referrals passed. Harvest Slips track closed business received. Forge Slips track outside one-on-ones. Growth Slips track personal development engagement.",
  },
  {
    q: "Will there be a member portal?",
    a: "Yes, later. The future portal will support slip tracking, member reporting, prayer follow-up, branch updates, and member resources.",
  },
  {
    q: "Will members be listed publicly?",
    a: "The future member showcase may allow members to be displayed publicly, with permission, so the broader community can discover Grafted businesses.",
  },
  {
    q: "Will there be more branches?",
    a: "Yes, when the community is ready. Grafted is designed to multiply into branches while keeping the same meeting flow, culture, and depth.",
  },
];

// Typed placeholder data for future portal, showcase, admin areas

export type Branch = {
  id: string;
  name: string;
  city: string;
  province: string;
  meetingDay: string;
  meetingTime: string;
  venueName: string;
  venueAddress: string;
  leaderName: string;
  status: "founding" | "active" | "planning";
};

export type Member = {
  id: string;
  firstName: string;
  lastName: string;
  businessName: string;
  industry: string;
  branchId: string;
  membershipStatus: "founding" | "active" | "visitor";
  publicProfileEnabled: boolean;
  profileImage?: string;
  website?: string;
  bio: string;
};

export type SlipType = "sowing" | "harvest" | "forge" | "growth";

export type Slip = {
  id: string;
  type: SlipType;
  memberId: string;
  branchId: string;
  date: string;
  value?: number;
  description: string;
};

export type PrayerRequest = {
  id: string;
  memberId: string;
  branchId: string;
  request: string;
  status: "open" | "answered" | "archived";
  dateSubmitted: string;
  dateAnswered?: string;
};

export type BranchKPI = {
  branchId: string;
  period: string;
  memberCount: number;
  visitorCount: number;
  sowingSlipCount: number;
  harvestSlipCount: number;
  forgeSlipCount: number;
  growthSlipCount: number;
  referralValue: number;
  closedBusinessValue: number;
  prayerRequestCount: number;
  answeredPrayerCount: number;
};

export const BRANCHES: Branch[] = [
  {
    id: "edmonton-root",
    name: "Edmonton Root",
    city: "Edmonton",
    province: "Alberta",
    meetingDay: "Tuesday",
    meetingTime: "12:30 PM",
    venueName: "To be announced",
    venueAddress: "Edmonton, Alberta",
    leaderName: "Jen Garrison",
    status: "founding",
  },
];

export const MEMBERS: Member[] = [
  {
    id: "m1",
    firstName: "Sarah",
    lastName: "Bennett",
    businessName: "Bennett Bookkeeping",
    industry: "Accounting",
    branchId: "edmonton-root",
    membershipStatus: "founding",
    publicProfileEnabled: true,
    bio: "Helping Edmonton small businesses keep clean books and clearer minds.",
  },
  {
    id: "m2",
    firstName: "Marcus",
    lastName: "Reid",
    businessName: "Reid Custom Carpentry",
    industry: "Trades",
    branchId: "edmonton-root",
    membershipStatus: "founding",
    publicProfileEnabled: true,
    bio: "Built-ins, kitchens, and millwork for homes that get used.",
  },
  {
    id: "m3",
    firstName: "Priya",
    lastName: "Okafor",
    businessName: "Northlight Studio",
    industry: "Branding and design",
    branchId: "edmonton-root",
    membershipStatus: "founding",
    publicProfileEnabled: true,
    bio: "Brand identity and websites for service businesses across Alberta.",
  },
  {
    id: "m4",
    firstName: "David",
    lastName: "Chen",
    businessName: "Cornerstone Insurance",
    industry: "Financial services",
    branchId: "edmonton-root",
    membershipStatus: "active",
    publicProfileEnabled: true,
    bio: "Personal and small business coverage with plain language and follow through.",
  },
];

export const SAMPLE_KPI: BranchKPI = {
  branchId: "edmonton-root",
  period: "Q1 sample",
  memberCount: 24,
  visitorCount: 11,
  sowingSlipCount: 38,
  harvestSlipCount: 12,
  forgeSlipCount: 47,
  growthSlipCount: 22,
  referralValue: 86400,
  closedBusinessValue: 41200,
  prayerRequestCount: 19,
  answeredPrayerCount: 7,
};

export const FUTURE_FEATURES = {
  portal: [
    "Member profile",
    "Slip submission",
    "Personal activity reports",
    "Prayer requests and answered prayer",
    "Branch updates",
    "Member resources",
  ],
  showcase: [
    "Public member directory",
    "Member business cards",
    "Filter by branch, industry, and location",
    "Member profile pages",
    "Visibility permissions",
  ],
  admin: [
    "Total members",
    "Branch count",
    "Visitor pipeline",
    "Sowing Slips",
    "Harvest Slips",
    "Forge Slips",
    "Growth Slips",
    "Referral value",
    "Closed business value",
    "Prayer requests",
    "Answered prayers",
  ],
  analytics: [
    "Branch-by-branch performance",
    "Attendance trends",
    "Referral volume",
    "Closed business value",
    "Forge Meeting activity",
    "Growth activity",
    "Prayer request follow-up",
    "Quarterly summary reports",
    "Annual testimony report",
  ],
  branch: [
    "Branch-level KPIs",
    "Member activity",
    "Visitor activity",
    "Slip trends",
    "Prayer follow-up",
    "Leadership notes",
  ],
};

export const SUPPORT_ICON = HandHelping;

export const VISIT_EXPECTATIONS = [
  "Come as you are",
  "Pay for your own meal",
  "Be ready for real conversation",
  "Expect prayer and scripture",
  "You can visit up to three times before deciding",
];