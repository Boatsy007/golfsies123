# Golfsies website

Website for **Golfsies®**, the Gold Coast's 6-hole social golf tournament circuit: own a team, enter tournaments, climb the rankings.

| Tool | Role |
|---|---|
| Claude Code | Main AI developer (project instructions in `CLAUDE.md`) |
| VS Code | Code editor (recommended extensions in `.vscode/`) |
| Next.js + TypeScript | Website framework |
| Tailwind CSS | Styling |
| Motion | Animations |
| Playwright | Automated browser testing |
| Vercel | Deployment |

## Getting started

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000. Pages reload as you edit.

Opening the folder in VS Code will suggest the recommended extensions (Claude Code, ESLint, Tailwind CSS IntelliSense, Playwright).

## Pages

| Path | Page |
|---|---|
| `/` | Home |
| `/how-it-works` | The round, scoring, rules, a tournament night, what to bring |
| `/membership` | Plans, Founding Teams, kits, membership questions |
| `/tournaments` | Calendar, rankings, how ranking points work |
| `/claim` | Claim a Founding Team name (form) |
| `/partners` | Venues, sponsors, company teams (enquiry form) |
| `/faq` | All questions, grouped |
| `/privacy` | Privacy notice |

The project brief (audience, journeys, design direction and architecture) is in `docs/brief.md`.

## Editing content

Almost everything you'll want to change lives in **`src/lib/site.ts`**:

- prices (`pricing`) and the Founding spots counter (`foundingSpots.left`)
- the format, rules, scoring, tournament calendar, example teams, partner types, milestones and FAQs
- contact email and social links
- background photos (`photos`): put a file in `public/` (e.g. `public/hero.jpg`) and set `photos.hero = "/hero.jpg"` (also `photos.claim` for the claim page)

Pages live in `src/app/`, reusable sections in `src/components/sections/`, and the header and footer in `src/components/layout/`. Colours and fonts are set in `src/app/globals.css`.

To use the real logo, add it to `public/` and swap the `Wordmark` in `src/components/layout/SiteHeader.tsx` for a Next.js `<Image>`.

## The forms

Both forms (claiming a team name and partner enquiries) are checked on the server, then sent as JSON to the address in `ENQUIRY_WEBHOOK_URL`. Any service that accepts a JSON POST works, for example a [Formspree](https://formspree.io) form endpoint, a Zapier or Make webhook, or a Google Apps Script.

- Copy `.env.example` to `.env.local` for local development.
- Without `ENQUIRY_WEBHOOK_URL`, visitors see a clear message asking them to email `rohan@golfsies.com.au` instead. Nothing pretends to send.
- `ENQUIRY_DRY_RUN=1` accepts submissions without sending them, for local testing only.
- Spam protection: a hidden honeypot field, plus complete forms sent within two seconds of loading are asked to resend.

## Checks and tests

```bash
npm run lint
```

```bash
npm run typecheck
```

The first time you run the browser tests, install the test browser:

```bash
npx playwright install chromium
```

```bash
npm run test:e2e
```

The tests run every page at a desktop and a mobile screen size: page loads, broken links, sideways scrolling, navigation, the mobile menu, both forms (errors, resubmission and success) and an automated accessibility check (axe, WCAG 2.1 AA). `npm run test:e2e:ui` opens Playwright's visual test runner.

## Deploying to Vercel

1. Sign in at [vercel.com](https://vercel.com) with your GitHub account and choose **Add New → Project**.
2. Import the `golfsies123` repository. Vercel detects Next.js automatically, so keep the default settings.
3. Under **Environment Variables**, add `ENQUIRY_WEBHOOK_URL` with your form or webhook URL.
4. Click **Deploy**. Every push to `main` then redeploys the site, and every pull request gets its own preview link.
5. To use your domain, go to **Project → Settings → Domains**, add `golfsies.com.au`, and follow the DNS instructions Vercel shows for your registrar.
