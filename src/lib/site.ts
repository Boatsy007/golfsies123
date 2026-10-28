// All editable site content lives here.

export const contactEmail = "rohan@golfsies.com.au";

// Set NEXT_PUBLIC_FORM_ENDPOINT (e.g. a Formspree URL) in Vercel to receive claims.
// Without it, the claim form opens the visitor's email app addressed to contactEmail.
export const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

// Background photos. Put the files in /public and set the paths, e.g. hero: "/hero.jpg".
// Left empty, those sections use navy and sunset gradients instead.
export const photos = { hero: "", register: "" };

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
  { href: "#how", label: "How it works" },
  { href: "#own", label: "Own a team" },
  { href: "#tournaments", label: "Tournaments" },
  { href: "#rankings", label: "Rankings" },
  { href: "#kits", label: "Kits" },
  { href: "#partners", label: "Partner" },
];

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

export const rankings = teams.map((team) => ({ team, events: 0, wins: 0, points: 0 }));

export type EventBadge = "free" | "members" | "coming" | "top";

export const tournaments: { when: string; tag: string; name: string; blurb: string; badge: EventBadge; badgeLabel: string }[] = [
  { when: "TBA", tag: "First", name: "Try Golfsies Day", blurb: "Free launch event. Play the format, meet the teams, claim your name.", badge: "free", badgeLabel: "Free" },
  { when: "TBA", tag: "Monthly", name: "Golfsies Cup", blurb: "The monthly members' tournament for 8–16 teams. Ranking points on offer.", badge: "members", badgeLabel: "Members" },
  { when: "TBA", tag: "Special", name: "Corporate Cup", blurb: "Company teams only. Your logo on the kits and bragging rights in the office.", badge: "members", badgeLabel: "Members" },
  { when: "TBA", tag: "Special", name: "Ladies Cup & Over 55s Cup", blurb: "Dedicated events with daytime tee-offs.", badge: "coming", badgeLabel: "Coming" },
  { when: "TBA", tag: "Finale", name: "Golfsies Championship", blurb: "The season finale for the top-ranked teams. The trophy, the title and a year of bragging rights.", badge: "top", badgeLabel: "Top teams" },
];

export const howItWorks = [
  { title: "Own a team", body: "A monthly membership makes the team name, crest and ranking yours" },
  { title: "Build your roster", body: "Up to 8 players on the roster, with 4 playing at each event" },
  { title: "Enter tournaments", body: "6 holes, 3 clubs, team scramble, then the Party Hole for double points" },
  { title: "Climb the rankings", body: "Every event earns ranking points towards the Golfsies Championship" },
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
    cta: { label: "Claim your team name", href: "#register" },
    featured: true,
  },
  {
    kicker: "Members only",
    title: "Tournament Entry",
    price: `$${pricing.tournamentEntry}`,
    unit: "/team",
    note: `Per event, for a team of 4. That's about $${Math.round(pricing.tournamentEntry / 4)} each.`,
    features: [
      "6-hole team scramble, about 2 hours with the Party Hole",
      "Shotgun start, so everyone finishes together",
      "Trophies, prizes and ranking points",
      "Loan clubs available",
    ],
    cta: { label: "See tournaments", href: "#tournaments" },
    featured: false,
  },
  {
    kicker: "Not sure yet?",
    title: "Try Golfsies Day",
    price: "Free",
    unit: "",
    note: "Bring your crew and play the format before you commit.",
    features: ["Play a full 6-hole round", "No membership needed", "Meet the other founding teams", "Claim your name on the day"],
    cta: { label: "Get an invite", href: "#register" },
    featured: false,
  },
];

export const rules = [
  { big: "3", top: "Club", bottom: "Limit", color: "#3e8e4e", body: "Carry a maximum of three clubs. It levels the field and keeps play quick." },
  { big: "6", top: "Short", bottom: "Holes", color: "#2f6fd0", body: "Holes of 100–130m, played from adjusted tees. The round is done in under an hour." },
  { big: "4", top: "Team", bottom: "Scramble", color: "#d9366b", body: "Everyone hits, the team picks the best shot, and you all play from there." },
  { big: "1m", top: "Free", bottom: "Drop", color: "#c8302e", body: "Missed the fairway? Drop it one metre back onto the short grass with no penalty." },
  { big: "2×", top: "Party", bottom: "Hole", color: "#f27fb2", body: "Hole 6 scores double points, so no tournament is over until the last putt." },
];

export type NewsKind = "announce" | "venue" | "team";

export const news: { kind: NewsKind; date: string; done: boolean; strong: string; rest: string }[] = [
  { kind: "team", date: "Now", done: true, strong: "Founding Team names", rest: ` are open. Reserve yours free (${foundingSpots.total} spots).` },
  { kind: "announce", date: "25/05/26", done: true, strong: "Golfsies®", rest: " is officially a registered trade mark" },
  { kind: "venue", date: "Coming", done: false, strong: "First tournament venue", rest: " to be announced" },
  { kind: "announce", date: "Coming", done: false, strong: "Try Golfsies Day", rest: ", a free launch event with the format played live" },
  { kind: "team", date: "Coming", done: false, strong: "Founding Teams", rest: " revealed as names are claimed" },
];

export const faqs = [
  { q: "What do I get with a team membership?", a: "Your team name and crest reserved in Golfsies, a team page, a roster of up to 8 players, members-only tournament entry, ranking points at every event, and member kit pricing." },
  { q: "Do I pay anything now?", a: "No. Reserving a Founding Team name is free. We'll confirm pricing and send the membership terms before the first event, and you only pay once you choose to join." },
  { q: "Can I cancel?", a: "Yes. Memberships are month to month, and the full terms, including how to cancel, will be sent before any payment is taken." },
  { q: "Who owns the team?", a: "The person who takes out the membership is the team owner. They hold the right to that team name and crest within Golfsies, and they manage the roster. Golfsies® itself remains a registered trade mark of Golfsies." },
  { q: "Do I need to be good at golf?", a: "No. In a team scramble everyone plays the best shot, so beginners and regular golfers contribute on every hole." },
  { q: "Do I need my own clubs?", a: "You only need three. If you don't have any, we'll have loan sets at the course." },
  { q: "Where and when are tournaments played?", a: "At Gold Coast courses, on twilight weeknights in summer and weekend afternoons in winter. We're locking in venues now, and Founding Teams will hear first." },
  { q: "How does scoring work?", a: "Each team plays a scramble and scores points on every hole: 1 for a bogey, 2 for a par and 3 for a birdie. The Party Hole doubles your points. The team with the most points wins the tournament." },
  { q: "How do ranking points work?", a: "Every team earns ranking points at each tournament based on where it finishes, plus points for turning up. The top-ranked teams at the end of the season qualify for the Golfsies Championship." },
  { q: "What are the prizes?", a: "Trophies, kit, sponsor prizes and the bragging rights that come with them. Details will be announced for each event." },
  { q: "What if I don't have a team?", a: "Register as a solo player or a pair and we'll match you with others to make up a team." },
];

export const partnerCards = [
  {
    icon: "⛳",
    title: "Host a league",
    body: "Bring 32–48 new players onto your course on a quiet weeknight. You keep the bar takings.",
    cta: "Talk venues",
    href: `mailto:${contactEmail}?subject=Hosting%20Golfsies`,
    gradient: "linear-gradient(160deg,#2c5a3a,#14301f)",
  },
  {
    icon: "★",
    title: "Sponsor the league",
    body: "Put your brand in front of Gold Coast teams every week, from the Party Hole prize to the grand final.",
    cta: "Become a partner",
    href: `mailto:${contactEmail}?subject=Sponsoring%20Golfsies`,
    gradient: "linear-gradient(160deg,#2b4d70,#10233a)",
  },
  {
    icon: "◆",
    title: "Enter a company team",
    body: "An after-work social people actually want to go to, with your logo on the kits.",
    cta: "Register a team",
    href: "#register",
    gradient: "linear-gradient(160deg,#c45a86,#6b2448)",
  },
];
