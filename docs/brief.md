# Golfsies website: project brief

## Purpose

Golfsies® is a 6-hole social golf tournament circuit on the Gold Coast. Teams pay a monthly membership to own a team name and enter members-only tournaments, earning points in the Golfsies Rankings.

The site has one commercial job before launch: **turn interest into claimed Founding Team names** (16 spots, free to reserve). Its second job is to **open conversations with venues, sponsors and company teams**.

## Audiences and what they need

| Audience | They arrive asking | The site must |
|---|---|---|
| Social groups (20–45, many non-golfers) | "Is this for people like us?" | Make the format feel easy, quick and fun; show what a night looks like; make claiming a name effortless on a phone |
| Team owners / captains | "What do I get and what does it cost?" | Explain membership, Founding Team price, what's free now, how cancelling works |
| Company organisers | "Can I enter a work team?" | Corporate Cup, logo on kits, a clear enquiry path |
| Venues (GMs of par-3 and short courses) | "What's in it for my course?" | New players on quiet sessions, bar takings, how it runs on their course |
| Sponsors | "Who will see my brand?" | Audience, placements, contact |

## Core user journeys

1. **Claim a team name:** home → (how it works / membership) → claim form → confirmation with next steps.
2. **Understand the format:** home → how it works (round, rules, scoring, a typical night).
3. **Check cost and terms:** home → membership → FAQ → claim.
4. **Partner enquiry:** home → partners → enquiry form → confirmation.

Every page ends with a route to the claim form or the partner form.

## Sitemap

| Path | Page |
|---|---|
| `/` | Home |
| `/how-it-works` | Format, rules, scoring, a typical tournament night, what to bring |
| `/membership` | Plans, Founding Teams, what members get, team kits |
| `/tournaments` | Calendar, event types, rankings (empty state until the first event) |
| `/claim` | Claim a Founding Team name (form) |
| `/partners` | Venues, sponsors, company teams + enquiry form |
| `/faq` | Grouped questions |
| `/privacy` | Privacy notice for form data |
| 404 / error | Branded recovery pages |

## Functionality

- **Forms:** claim form and partner enquiry form, both submitted with a Next.js Server Action.
  - Validated on the server with Zod (the client can't be trusted), with field-level errors shown inline and focus moved to the first error.
  - Spam protection: hidden honeypot field plus a minimum time-to-submit check.
  - Delivery: posted as JSON to `ENQUIRY_WEBHOOK_URL` (a server-only secret, e.g. a Formspree, Zapier or Make endpoint). If it isn't set, the form shows an honest error with an email fallback rather than pretending to succeed.
  - `ENQUIRY_DRY_RUN=1` accepts submissions without sending them (local testing and automated tests only).
  - Pending, success and failure states for every submission.
- **Navigation:** sticky header with active page state, accessible mobile menu, skip link, full sitemap in the footer.
- **SEO:** per-page titles and descriptions, sitemap.xml, robots.txt, generated social-share image.

## Design direction

**"Night golf, social sport."** The energy of an after-work sports league under string lights, presented with the restraint of a premium sports brand.

- **Colour:** night navy as the base, cream as the paper, fairway green for action, Party Hole pink as a rare accent, coral only for the announcement bar. Solid fields, no decorative gradients.
- **Type:** Barlow Condensed (uppercase) for headlines, stats and labels; Archivo for reading text; the Yellowtail script only for the Golfsies wordmark. A strict scale; body copy capped at about 65 characters a line.
- **Layout:** a 12-column feel inside a 1180px container, generous vertical rhythm (96px sections on desktop, 64px on mobile), asymmetric splits rather than centred stacks, rules (lines) instead of boxes where possible.
- **Imagery:** purpose-made illustration (night sky and flag, course diagrams, the Gold Coast map, kits, scorecard) until real event photography exists. No stock photos presented as Golfsies events. Photos plug in through `photos` in `src/lib/site.ts`.
- **Motion:** short, purposeful reveals on scroll; the scorecard filling in; the founding-spots meter. Everything respects "reduce motion".

## Architecture

- Next.js 16 App Router, TypeScript, static pages (fast, cheap, cache-friendly on Vercel).
- Tailwind CSS v4 with theme tokens in `src/app/globals.css`.
- Motion for animation, Zod for validation.
- Content in `src/lib/site.ts` so copy, prices and events change without touching components.
- Shared UI in `src/components/ui.tsx`; page sections in `src/components/`; form logic in `src/app/actions.ts`.
- Playwright end-to-end tests (desktop + mobile) including axe accessibility checks on every page.
- No database, CMS or auth yet: nothing on the site needs them until paid memberships go live.
