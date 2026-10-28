@AGENTS.md
@docs/website-standards.md

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

## Conventions

- All page copy, prices, teams, events, FAQs and the Founding spots counter live in `src/lib/site.ts`. Change content there, not in components.
- One component per page section in `src/components/`, composed in `src/app/page.tsx`. Shared pieces (buttons, headings, `Container`, `Crest`) are in `src/components/ui.tsx`.
- Use the `display` utility for the condensed uppercase headline style, and `buttonClass(variant)` for buttons.
- Mark a component `"use client"` only when it needs state, effects or Motion.
- Brand colours: navy `#1b3550`, cream `#f5f0eb`, fairway green `#b8c76e`, pink `#f27fb2`, coral `#e2543f`, tan `#af9b8c`.
- Australian English. Golfsies® is a registered trade mark (Class 41); don't put ® on merchandise copy.
- Don't promise cash prizes or betting-style features (Queensland gaming law); prizes are trophies, kit and sponsor prizes.
- After UI changes, run `npm run lint`, `npm run typecheck` and `npm run test:e2e`, and check the layout at phone width (390px) with no horizontal scrolling.

## Environment

- `NEXT_PUBLIC_FORM_ENDPOINT`: where the claim form posts (e.g. Formspree). Empty falls back to a `mailto:` link. See `.env.example`.
