import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Hero } from "@/components/sections/Hero";
import { FoundingMeter } from "@/components/sections/Plans";
import { RoundDiagram } from "@/components/sections/RoundDiagram";
import { TeamsMap } from "@/components/sections/TeamsMap";
import { TournamentCalendar } from "@/components/sections/Tournaments";
import { Arrow, ButtonLink, Container, CtaBand, Eyebrow, SectionTitle } from "@/components/ui";
import { formatStats, foundingPerks, howItWorks, milestones, partnerTypes, pricing } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />

      {/* The format in four numbers */}
      <section aria-label="The format at a glance" className="border-b border-line bg-cream">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {formatStats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.06}
                className="border-line py-8 pr-4 not-last:border-r max-lg:nth-2:border-r-0 max-lg:nth-[-n+2]:border-b lg:px-8 lg:first:pl-0"
              >
                <dt className="display text-[15px] font-bold tracking-[0.12em] text-fairway-deep">{s.label}</dt>
                <dd className="display mt-1 text-[clamp(56px,7vw,88px)] leading-[0.85] font-extrabold text-navy">{s.value}</dd>
                <dd className="mt-2 max-w-[24ch] text-sm text-muted">{s.note}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* What it is */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <RoundDiagram />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>What is Golfsies?</Eyebrow>
            <SectionTitle>Golf, minus the four hours</SectionTitle>
            <p className="mb-4 max-w-[52ch] text-lg text-[#2a333d]">
              Golfsies is short, social team golf for people who&apos;d rather play an hour after work than lose a whole Saturday.
            </p>
            <p className="mb-8 max-w-[52ch] text-[#2a333d]">
              Teams of four play six short holes as a scramble, so beginners and regular golfers count on every shot. Every round finishes on the
              Party Hole beside the clubhouse, and every result counts towards the Golfsies Rankings.
            </p>
            <ButtonLink href="/how-it-works" variant="outline">
              See how it works <Arrow />
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-navy py-16 text-white sm:py-24" aria-labelledby="steps-title">
        <Container>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="display mb-2 text-[15px] font-bold tracking-[0.12em] text-fairway">Never played? Perfect.</p>
              <h2 id="steps-title" className="display text-[clamp(40px,5.5vw,64px)] leading-[0.95] font-extrabold">
                From team name to trophy
              </h2>
            </div>
            <ButtonLink href="/claim" variant="onDark">
              Claim your team name <Arrow />
            </ButtonLink>
          </div>
          <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, i) => (
              <li key={step.title} className="border-t-2 border-fairway pt-5">
                <Reveal delay={i * 0.08}>
                  <span className="display block text-[56px] leading-none font-extrabold text-fairway">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-3 mb-2 text-[28px] leading-none font-extrabold">{step.title}</h3>
                  <p className="text-white/80">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Founding Teams */}
      <section className="py-16 sm:py-24" aria-labelledby="founding-title">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <Reveal>
            <Eyebrow>Founding Teams</Eyebrow>
            <SectionTitle>
              <span id="founding-title">Own a team from ${pricing.membershipMonthly} a month</span>
            </SectionTitle>
            <p className="mb-6 max-w-[48ch] text-lg text-[#2a333d]">
              The first sixteen teams lock in the founding price, choose their names first and earn the first ranking points. Reserving a
              name is free.
            </p>
            <FoundingMeter />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/claim">
                Claim your team name <Arrow />
              </ButtonLink>
              <ButtonLink href="/membership" variant="outline">
                Membership details
              </ButtonLink>
            </div>
          </Reveal>
          <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {foundingPerks.map((perk, i) => (
              <li key={perk.title} className="bg-white p-6 sm:p-7">
                <Reveal delay={i * 0.06}>
                  <h3 className="display mb-2 text-[26px] leading-none font-extrabold text-navy">{perk.title}</h3>
                  <p className="text-[15px] text-muted">{perk.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <TeamsMap />

      {/* What's coming */}
      <section className="py-16 sm:py-24" aria-labelledby="coming-title">
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="min-w-0">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <h2 id="coming-title" className="display text-[clamp(36px,5vw,56px)] leading-[0.95] font-extrabold text-navy">
                The season ahead
              </h2>
              <Link href="/tournaments" className="display text-lg font-bold text-navy underline decoration-fairway decoration-2 underline-offset-[6px]">
                All tournaments →
              </Link>
            </div>
            <Reveal>
              <TournamentCalendar limit={3} title="First events" />
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <h3 className="display mb-6 text-[28px] font-extrabold text-navy">Road to launch</h3>
            <ol className="relative border-l-2 border-line pl-7">
              {milestones.map((m) => (
                <li key={m.title} className="relative pb-7 last:pb-0">
                  <span
                    aria-hidden="true"
                    className={
                      "absolute top-1 -left-[37px] h-4 w-4 rounded-full border-2 " +
                      (m.done ? "border-navy bg-fairway" : "border-navy/40 bg-paper")
                    }
                  />
                  <p className="display text-sm font-bold tracking-wider text-muted">{m.date}</p>
                  <p className="display text-[22px] leading-tight font-extrabold text-navy">{m.title}</p>
                  <p className="text-[15px] text-muted">{m.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {/* Partners */}
      <section className="border-t border-line bg-cream py-16 sm:py-24" aria-labelledby="partners-title">
        <Container>
          <div className="mb-10 grid items-end gap-4 lg:grid-cols-2">
            <div>
              <Eyebrow>Partners</Eyebrow>
              <SectionTitle className="mb-0">
                <span id="partners-title">Grow the game with us</span>
              </SectionTitle>
            </div>
            <p className="max-w-[48ch] text-[#2a333d] lg:justify-self-end">
              We&apos;re looking for venues, local brands and Gold Coast businesses to help launch the first season.
            </p>
          </div>
          <ul className="grid border-t-2 border-navy md:grid-cols-3">
            {partnerTypes.map((p, i) => (
              <li key={p.id} className="border-b border-line py-7 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0 md:not-first:border-l">
                <Reveal delay={i * 0.08} className="flex h-full flex-col">
                  <h3 className="display mb-3 text-[32px] leading-[0.95] font-extrabold text-navy">{p.title}</h3>
                  <p className="mb-6 flex-1 text-[#2a333d]">{p.lead}</p>
                  <Link
                    href={`/partners#enquire-${p.id}`}
                    className="display inline-flex items-center gap-2 self-start text-lg font-bold text-navy underline decoration-fairway decoration-2 underline-offset-[6px] hover:decoration-navy"
                  >
                    {p.cta} <Arrow />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
