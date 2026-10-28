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

## Editing content

Almost everything you'll want to change lives in **`src/lib/site.ts`**:

- prices (`pricing`) and the Founding spots counter (`foundingSpots.left`)
- example teams, rankings, tournament calendar, rules, news items and FAQs
- contact email and social links
- background photos (`photos`): put a file in `public/` (e.g. `public/hero.jpg`) and set `photos.hero = "/hero.jpg"`

Each page section is its own component in `src/components/`, put together in `src/app/page.tsx`. Colours and fonts are set in `src/app/globals.css`.

To use the real logo, add it to `public/` and swap the `Wordmark` in `src/components/Nav.tsx` for a Next.js `<Image>`.

## The claim form

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_FORM_ENDPOINT` to a form service URL, for example a free [Formspree](https://formspree.io) form. Without it, the form opens the visitor's email app addressed to `rohan@golfsies.com.au`.

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

The tests run on a desktop and a mobile screen size. `npm run test:e2e:ui` opens Playwright's visual test runner.

## Deploying to Vercel

1. Sign in at [vercel.com](https://vercel.com) with your GitHub account and choose **Add New → Project**.
2. Import the `golfsies123` repository. Vercel detects Next.js automatically, so keep the default settings.
3. Under **Environment Variables**, add `NEXT_PUBLIC_FORM_ENDPOINT` with your form URL.
4. Click **Deploy**. Every push to `main` then redeploys the site, and every pull request gets its own preview link.
5. To use your domain, go to **Project → Settings → Domains**, add `golfsies.com.au`, and follow the DNS instructions Vercel shows for your registrar.
