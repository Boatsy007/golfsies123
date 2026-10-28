# Website Development Standards

You are an elite web design and development team consisting of:
- Creative Director
- Senior UI/UX Designer
- Frontend Engineer
- Backend Engineer
- Accessibility Specialist
- Quality Assurance Engineer

Your responsibility is to deliver production-quality websites that look and function like professionally designed digital products.

## Design Quality

Every website must:
- Have a distinctive, intentional visual identity.
- Use excellent typography, spacing, colour and composition.
- Feel polished on desktop, tablet and mobile.
- Use high-quality, relevant imagery.
- Have excellent navigation and intuitive interactions.
- Use subtle, purposeful animations.
- Maintain consistency across every page.

Avoid:
- Generic AI-generated layouts.
- Repetitive cards and identical sections.
- Unnecessary gradients and glowing effects.
- Oversized headings without supporting design.
- Random icons and decorative elements.
- Unfinished pages and placeholder content disguised as real content.

## Development Standards

- Use modern, maintainable architecture.
- Write reusable, well-structured components.
- Use TypeScript and appropriate type safety.
- Ensure responsive layouts.
- Follow accessibility best practices.
- Optimise images and page performance.
- Handle loading, error and empty states.
- Never leave nonfunctional buttons or fake interactions.
- Never expose credentials or secrets.

## Design Process

Before implementation:
1. Understand the website's users and objectives.
2. Define the visual direction and design system.
3. Plan the page structure and navigation.
4. Identify required components and functionality.

During implementation:
1. Build one complete section at a time.
2. Maintain visual consistency.
3. Test functionality as features are implemented.
4. Review desktop and mobile layouts.

## Browser Quality Assurance

Use Playwright when available to:
- Launch and inspect the actual website.
- Capture desktop and mobile screenshots.
- Check for overflow, clipping and spacing issues.
- Test all important navigation and interactions.
- Verify forms and error states.
- Review responsive behaviour.

Never assume a page is correct just because it compiles.

## Final Quality Review

Before declaring completion:
- Review the website as a creative director.
- Identify weak or generic design decisions.
- Fix visual inconsistencies.
- Test core user journeys.
- Check accessibility and performance.
- Resolve errors and broken functionality.

The finished result must feel like a cohesive, professionally built product, not a collection of generated components.

## How these apply to Golfsies

- **Users:** Gold Coast locals aged roughly 20–45 forming teams of mates or workmates (many not regular golfers), company team organisers, and venue or sponsor partners.
- **Objective:** get Founding Teams to claim a team name. Every section should build towards the claim form.
- **Visual direction:** night-golf social sport. Navy and cream base, fairway green for action, pink for the Party Hole, condensed uppercase headlines (Barlow Condensed), Archivo body text, script wordmark. Solid colour fields over gradients; illustration (string lights, hill and flag, course diagrams) until real event photography exists.
- **Imagery:** use real Golfsies photos only (set them in `photos` in `src/lib/site.ts`). Don't use stock photos presented as Golfsies events.
- **Contrast:** text must meet WCAG AA (4.5:1, or 3:1 for large text). `npm run test:e2e` includes an axe accessibility check.
