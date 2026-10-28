import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Kits } from "@/components/sections/Kits";
import { FoundingMeter, Plans } from "@/components/sections/Plans";
import { Container, CtaBand, Eyebrow, PageHeader, SectionTitle } from "@/components/ui";
import { faqGroups, foundingPerks, pricing } from "@/lib/site";

export const metadata: Metadata = {
  title: "Membership",
  description: `Own a Golfsies team from $${pricing.membershipMonthly} a month. Founding Teams lock in the lowest price, choose their names first and are on the rankings from day one.`,
};

export default function MembershipPage() {
  const membershipFaqs = faqGroups.find((g) => g.title === "Membership and cost")?.items ?? [];

  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title={
          <>
            Your name.
            {" "}
            <br />
            Your crest.
            {" "}
            <br />
            <span className="text-fairway">Your ranking.</span>
          </>
        }
        intro="A Golfsies team membership makes the team yours: the name, the crest, the roster and every ranking point you earn. Reserve a Founding Team name now and pay nothing until the first event is confirmed."
      >
        <FoundingMeter tone="dark" />
      </PageHeader>

      <section className="py-16 sm:py-24" aria-labelledby="plans-title">
        <Container>
          <h2 id="plans-title" className="sr-only">
            Plans and prices
          </h2>
          <Plans />
          <p className="mx-auto mt-8 max-w-[70ch] text-center text-sm text-muted">
            Founding prices will be confirmed before the first event. Reserving a team name is free and doesn&apos;t commit you to anything. Full
            membership terms, including how to cancel, will be sent before any payment is taken.
          </p>
        </Container>
      </section>

      <section className="border-y border-line bg-cream py-16 sm:py-24" aria-labelledby="founding-title">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Why be a Founding Team</Eyebrow>
            <SectionTitle>
              <span id="founding-title">First in gets the best of it</span>
            </SectionTitle>
          </div>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {foundingPerks.map((perk, i) => (
              <li key={perk.title} className="border-t-2 border-navy pt-5">
                <Reveal delay={i * 0.06}>
                  <h3 className="display mb-2 text-[26px] leading-none font-extrabold text-navy">{perk.title}</h3>
                  <p className="text-[#2a333d]">{perk.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Kits />

      <section className="border-t border-line py-16 sm:py-24" aria-labelledby="mfaq-title">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Good to know</Eyebrow>
            <SectionTitle>
              <span id="mfaq-title">Membership questions</span>
            </SectionTitle>
            <Link href="/faq" className="display text-lg font-bold text-navy underline decoration-fairway decoration-2 underline-offset-[6px]">
              All FAQs →
            </Link>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {membershipFaqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="display text-[22px] leading-tight font-extrabold text-navy">{f.q}</dt>
                <dd className="mt-2 text-[#2a333d]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CtaBand secondary={{ label: "See tournaments", href: "/tournaments" }} />
    </>
  );
}
