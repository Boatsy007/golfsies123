// All editable site content lives here.

export const siteUrl = "https://golfsies.com.au";
export const contactEmail = "rohan@golfsies.com.au";

// Background photos. Put the files in /public and set the paths, e.g. hero: "/hero.jpg".
// Left empty, those sections use solid navy backgrounds instead.
export const photos = { hero: "", claim: "" };

// Update by hand as Founding Team names are confirmed.
export const foundingSpots = { total: 16, left: 16 };

export const pricing = {
  membershipMonthly: 59,
  tournamentEntry: 99,
};

export const socials = {
  instagram: "https://www.instagram.com/golfsies",
  tiktok: "https://www.tiktok.com/@golfsies",
  x: "https://x.com/golfsies",
};

export const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/membership", label: "Membership" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/partners", label: "Partners" },
  { href: "/faq", label: "FAQ" },
];

/* ---------- Format ---------- */

export const formatStats = [
  { value: "3", label: "Clubs each", note: "Any three you like, or borrow ours" },
  { value: "6", label: "Short holes", note: "100–130m, played from forward tees" },
  { value: "60", label: "Minutes", note: "A shotgun start, so everyone finishes together" },
  { value: "4", label: "Per team", note: "With up to 8 players on the roster" },
];

export const howItWorks = [
  { title: "Own a team", body: "A monthly membership makes the team name, crest and ranking yours." },
  { title: "Build your roster", body: "Up to 8 players on the roster, with 4 playing at each event." },
  { title: "Enter tournaments", body: "6 holes, 3 clubs, team scramble, then the Party Hole for double points." },
  { title: "Climb the rankings", body: "Every event earns ranking points towards the Golfsies Championship." },
];

// Example scorecard: 1 point for a bogey, 2 for a par, 3 for a birdie; the Party Hole doubles.
export const exampleScorecard = {
  team: "Drop Bears",
  position: "2nd",
  field: 16,
  holes: [
    { label: "Hole 1", par: 3, metres: 112, points: 2 },
    { label: "Hole 2", par: 3, metres: 124, points: 3 },
    { label: "Hole 3", par: 3, metres: 101, points: 1 },
    { label: "Hole 4", par: 3, metres: 130, points: 2 },
    { label: "Hole 5", par: 3, metres: 118, points: 2 },
    { label: "Party", par: 3, metres: 115, points: 6, party: true },
  ],
};

export const scoring = [
  { result: "Birdie", strokes: "2 shots", points: 3, party: 6 },
  { result: "Par", strokes: "3 shots", points: 2, party: 4 },
  { result: "Bogey", strokes: "4 shots", points: 1, party: 2 },
  { result: "Anything more", strokes: "5 shots, then pick up", points: 0, party: 0 },
];

export const rules = [
  { big: "3", top: "Club", bottom: "Limit", body: "Carry a maximum of three clubs. It levels the field and keeps play quick." },
  { big: "4", top: "Team", bottom: "Scramble", body: "Everyone hits, the team picks the best shot, and you all play from there." },
  { big: "1m", top: "Free", bottom: "Drop", body: "Missed the fairway? Drop it one metre back onto the short grass with no penalty." },
  { big: "5", top: "Shot", bottom: "Cap", body: "Pick up after five shots and score zero. Nobody waits on a bad hole." },
  { big: "2×", top: "Party", bottom: "Hole", body: "Hole 6 scores double points, so no tournament is over until the last putt." },
];

// A proposed run sheet. Times will vary by venue and season.
export const tournamentNight = [
  { time: "5:15pm", title: "Check in", body: "Collect your scorecard, borrow loan clubs if you need them, and find your starting hole." },
  { time: "5:30pm", title: "Shotgun start", body: "Every team tees off at once on a different hole." },
  { time: "6:30pm", title: "The Party Hole", body: "Teams finish on hole 6 beside the clubhouse, with music and double points." },
  { time: "6:45pm", title: "Results", body: "Scores are confirmed, prizes handed out, and ranking points added to the board." },
];

export const whatToBring = [
  { title: "Up to three clubs", body: "A wood, a 7-iron and a putter covers everything. No clubs? Borrow a loan set." },
  { title: "Comfortable shoes", body: "Golf shoes or clean runners. No spikes required." },
  { title: "Your team kit", body: "Matching kits are made to order for every team." },
  { title: "Your crew", body: "Four players per event, from a roster of up to eight." },
];

/* ---------- Teams ---------- */

export type Team = {
  name: string;
  short: string;
  suburb: string;
  color: string;
  text: string;
};

// Example teams from the business plan. Replace with real Founding Teams as names are confirmed.
export const teams: Team[] = [
  { name: "Birdie Bandits", short: "BB", suburb: "Hope Island", color: "#d9366b", text: "#ffffff" },
  { name: "Hitters", short: "HI", suburb: "Southport", color: "#2f6fd0", text: "#ffffff" },
  { name: "Stingers", short: "ST", suburb: "Surfers", color: "#1e9bd7", text: "#ffffff" },
  { name: "Barras", short: "BA", suburb: "Broadbeach", color: "#6b7b8c", text: "#ffffff" },
  { name: "Drop Bears", short: "DB", suburb: "Robina", color: "#3e8e4e", text: "#ffffff" },
  { name: "Galahs", short: "GA", suburb: "Burleigh", color: "#f27fb2", text: "#1b3550" },
  { name: "Strikers", short: "SK", suburb: "Palm Beach", color: "#c8302e", text: "#ffffff" },
];

/* ---------- Membership ---------- */

export const plans = [
  {
    kicker: `Founding Team · Limited to ${foundingSpots.total}`,
    title: "Team Membership",
    price: `$${pricing.membershipMonthly}`,
    unit: "/month",
    note: "Founding price, locked in. Nothing to pay until the first event is confirmed.",
    features: [
      "Your team name and crest, reserved in Golfsies",
      "Team page with roster, results and ranking",
      "Roster of up to 8 players",
      "Members-only tournament entry",
      "Golfsies Rankings points at every event",
      "Founding Team badge and member kit pricing",
    ],
    cta: { label: "Claim your team name", href: "/claim" },
    featured: true,
  },
  {
    kicker: "Members only",
    title: "Tournament Entry",
    price: `$${pricing.tournamentEntry}`,
    unit: "/team",
    note: `Per event, for a team of 4. That's about $${Math.round(pricing.tournamentEntry / 4)} each.`,
    features: [
      "6-hole team scramble, about 90 minutes with results",
      "Shotgun start, so everyone finishes together",
      "Trophies, prizes and ranking points",
      "Loan clubs available",
    ],
    cta: { label: "See tournaments", href: "/tournaments" },
    featured: false,
  },
  {
    kicker: "Not sure yet?",
    title: "Try Golfsies Day",
    price: "Free",
    unit: "",
    note: "Bring your crew and play the format before you commit.",
    features: ["Play a full 6-hole round", "No membership needed", "Meet the other founding teams", "Claim your name on the day"],
    cta: { label: "Get an invite", href: "/claim" },
    featured: false,
  },
];

export const foundingPerks = [
  { title: "First pick of names", body: "Names are first in, first served. Founding Teams choose before anyone else." },
  { title: "Price locked in", body: `The founding membership price stays at $${pricing.membershipMonthly} a month for as long as your team stays a member.` },
  { title: "On the board from day one", body: "Founding Teams play the first Golfsies Cup and earn the first ranking points." },
  { title: "Founding Team badge", body: "A permanent badge on your team page and kit to show you were there first." },
];

/* ---------- Tournaments ---------- */

export type EventBadge = "free" | "members" | "coming" | "top";

export const tournaments: { when: string; tag: string; name: string; blurb: string; badge: EventBadge; badgeLabel: string }[] = [
  { when: "TBA", tag: "First", name: "Try Golfsies Day", blurb: "Free launch event. Play the format, meet the teams, claim your name.", badge: "free", badgeLabel: "Free" },
  { when: "TBA", tag: "Monthly", name: "Golfsies Cup", blurb: "The monthly members' tournament for 8–16 teams. Ranking points on offer.", badge: "members", badgeLabel: "Members" },
  { when: "TBA", tag: "Special", name: "Corporate Cup", blurb: "Company teams only. Your logo on the kits and bragging rights in the office.", badge: "members", badgeLabel: "Members" },
  { when: "TBA", tag: "Special", name: "Ladies Cup & Over 55s Cup", blurb: "Dedicated events with daytime tee-offs.", badge: "coming", badgeLabel: "Coming" },
  { when: "TBA", tag: "Finale", name: "Golfsies Championship", blurb: "The season finale for the top-ranked teams. The trophy, the title and a year of bragging rights.", badge: "top", badgeLabel: "Top teams" },
];

export const rankingPoints = [
  { label: "Turn up and finish", body: "Every team that completes a tournament earns ranking points, wherever it finishes." },
  { label: "Finishing position", body: "The higher you finish, the more points you take from the night." },
  { label: "Championship spots", body: "The top-ranked teams at the end of the season qualify for the Golfsies Championship." },
];

/* ---------- Partners ---------- */

export type PartnerType = "venue" | "sponsor" | "company";

export const partnerTypes: { id: PartnerType; title: string; lead: string; points: string[]; cta: string }[] = [
  {
    id: "venue",
    title: "Host a tournament",
    lead: "Bring 32–64 new players onto your course on a quiet weeknight or weekend afternoon.",
    points: [
      "Runs on existing short holes with forward tees, so there's no new infrastructure",
      "A shotgun start keeps the course clear within about 90 minutes",
      "You keep the bar and food takings from the Party Hole crowd",
      "A path for new players to become green-fee customers and members",
    ],
    cta: "Talk about hosting",
  },
  {
    id: "sponsor",
    title: "Sponsor the league",
    lead: "Put your brand in front of Gold Coast teams at every event, from the Party Hole prize to the Golfsies Championship.",
    points: [
      "Party Hole and nearest-the-pin prize naming",
      "Your logo on event signage and social content",
      "Category options for drinks, apparel and local services",
      "Packages built around your goals, not a fixed rate card",
    ],
    cta: "Talk about sponsorship",
  },
  {
    id: "company",
    title: "Enter a company team",
    lead: "An after-work social people actually want to go to, with your logo on the kits.",
    points: [
      "Your business name and logo on the team kit",
      "Entry to the Corporate Cup against other Gold Coast businesses",
      "Enter more than one team and settle office rivalries properly",
      "Easy for non-golfers: three clubs, short holes, loan sets",
    ],
    cta: "Enter a company team",
  },
];

/* ---------- Milestones ---------- */

export const milestones = [
  { date: "25 May 2026", done: true, title: "Golfsies® registered", body: "The Golfsies name is officially a registered trade mark." },
  { date: "Now", done: true, title: "Founding Team names open", body: `${foundingSpots.total} spots, free to reserve.` },
  { date: "Coming", done: false, title: "First venue announced", body: "Founding Teams hear first." },
  { date: "Coming", done: false, title: "Try Golfsies Day", body: "A free launch event with the format played live." },
];

/* ---------- FAQ ---------- */

export const faqGroups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "The format",
    items: [
      { q: "Do I need to be good at golf?", a: "No. In a team scramble everyone plays the best shot, so beginners and regular golfers contribute on every hole. Many players have never played a full round." },
      { q: "Do I need my own clubs?", a: "You only need three. If you don't have any, borrow a loan set at the course." },
      { q: "How does scoring work?", a: "Each team plays a scramble and scores points on every hole: 3 for a birdie, 2 for a par, 1 for a bogey and 0 after that. The Party Hole doubles your points. The team with the most points wins." },
      { q: "How long does a tournament take?", a: "The round itself takes about an hour. With check-in and results, plan for about 90 minutes." },
    ],
  },
  {
    title: "Membership and cost",
    items: [
      { q: "What do I get with a team membership?", a: "Your team name and crest reserved in Golfsies, a team page, a roster of up to 8 players, members-only tournament entry, ranking points at every event, and member kit pricing." },
      { q: "Do I pay anything now?", a: "No. Reserving a Founding Team name is free. We'll confirm pricing and send the membership terms before the first event, and you only pay once you choose to join." },
      { q: "Can I cancel?", a: "Yes. Memberships are month to month, and the full terms, including how to cancel, will be sent before any payment is taken." },
      { q: "What are the prizes?", a: "Trophies, kit, sponsor prizes and the bragging rights that come with them. Details are announced for each event." },
    ],
  },
  {
    title: "Teams",
    items: [
      { q: "Who owns the team?", a: "The person who takes out the membership is the team owner. They hold the right to that team name and crest within Golfsies, and they manage the roster. Golfsies® itself remains a registered trade mark of Golfsies." },
      { q: "What if I don't have a team?", a: "Claim as a solo player or a pair and we'll match you with others to make up a team." },
      { q: "Can my workplace enter a team?", a: "Yes. Company teams can put their logo on the kit and enter the Corporate Cup. See the Partners page to get started." },
    ],
  },
  {
    title: "Tournaments",
    items: [
      { q: "Where and when are tournaments played?", a: "At Gold Coast courses, on twilight weeknights in summer and weekend afternoons in winter. We're locking in venues now, and Founding Teams will hear first." },
      { q: "How do ranking points work?", a: "Every team earns ranking points at each tournament based on where it finishes, plus points for turning up. The top-ranked teams at the end of the season qualify for the Golfsies Championship." },
    ],
  },
];

export const allFaqs = faqGroups.flatMap((g) => g.items);
