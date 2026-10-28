@AGENTS.md
@docs/website-standards.md
@docs/brief.md

# Golfsies website

Marketing site for Golfsies®, a 6-hole social golf tournament circuit on the Gold Coast. Teams take out a monthly membership to own a team name, then enter tournaments and earn ranking points.

## Stack

- Next.js 16 (App Router, `src/` dir) + TypeScript, deployed on Vercel
- Tailwind CSS v4: theme tokens (colours, fonts, the `display` utility) live in `src/app/globals.css`
- Motion (`motion/react`) for animations; wrap reveal-on-scroll content in `<Reveal>` from `src/components/Reveal.tsx`
- Playwright for end-to-end tests in `e2e/`

## Commands

- `npm run dev`: local dev server at http://localhost:3000
- `npm run build`: production build
- `npm run lint` and `npm run typecheck`
- `npm run test:e2e`: Playwright tests (desktop and mobile). Run `npx playwright install chromium` once first.

## Structure

- Pages: `/`, `/how-it-works`, `/membership`, `/tournaments`, `/claim`, `/partners`, `/faq`, `/privacy`, plus `not-found.tsx` and `error.tsx`.
- `src/app/layout.tsx` holds the header, announcement bar and footer (`src/components/layout/`).
- Reusable page sections are in `src/components/sections/`; forms in `src/components/forms/`.
- Forms submit to Server Actions in `src/app/actions.ts`, validated with the Zod schemas in `src/lib/forms.ts`.

## Conventions

- All page copy, prices, teams, events, FAQs and the Founding spots counter live in `src/lib/site.ts`. Change content there, not in components.
- Shared pieces (`ButtonLink`, `PageHeader`, `CtaBand`, `SectionTitle`, `Eyebrow`, `Container`) are in `src/components/ui.tsx`. Use `ButtonLink` for internal links styled as buttons.
- Use the `display` utility for the condensed uppercase headline style, and `buttonClass(variant)` for buttons.
- Mark a component `"use client"` only when it needs state, effects or Motion.
- Brand colours: navy `#1b3550`, cream `#f5f0eb`, fairway green `#b8c76e` (text-safe `fairway-deep` `#556a24`), Party Hole pink `#f27fb2`, coral `#c43d2a` (announcement bar only), tan `#af9b8c` (decorative; `tan-ink` for text).
- Australian English. Golfsies® is a registered trade mark (Class 41); don't put ® on merchandise copy.
- Don't promise cash prizes or betting-style features (Queensland gaming law); prizes are trophies, kit and sponsor prizes.
- After UI changes, run `npm run lint`, `npm run typecheck` and `npm run test:e2e`, and check the layout at phone width (390px) with no horizontal scrolling.

## Environment

- `ENQUIRY_WEBHOOK_URL` (server-only): where validated claims and partner enquiries are POSTed as JSON. If unset, forms show an honest error with an email link.
- `ENQUIRY_DRY_RUN=1`: accept submissions without sending them. Playwright sets this automatically. See `.env.example`.
