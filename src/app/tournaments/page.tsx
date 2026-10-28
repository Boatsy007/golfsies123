import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { RankingsBoard, TournamentCalendar } from "@/components/sections/Tournaments";
import { Container, CtaBand, Eyebrow, PageHeader, SectionTitle } from "@/components/ui";
import { pricing, rankingPoints } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tournaments",
  description: "The Golfsies tournament calendar, event formats and rankings. Monthly Golfsies Cups, the Corporate Cup and the Golfsies Championship.",
};

export default function TournamentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tournaments"
        title={
          <>
            Monthly cups.
            {" "}
            <br />
            <span className="text-fairway">One championship.</span>
          </>
        }
        intro={`Members enter tournaments for $${pricing.tournamentEntry} a team. Dates and venues for the first season are being locked in now, and Founding Teams hear first.`}
      />

      <section className="py-16 sm:py-24" aria-label="Calendar and rankings">
        <Container className="grid items-start gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal className="min-w-0">
            <TournamentCalendar />
            <p className="mt-3 text-sm text-muted">TBA: dates and venues to be announced.</p>
          </Reveal>
          <Reveal delay={0.1} className="min-w-0">
            <RankingsBoard />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line bg-cream py-16 sm:py-24" aria-labelledby="points-title">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>Ranking points</Eyebrow>
            <SectionTitle>
              <span id="points-title">Every night counts</span>
            </SectionTitle>
            <p className="max-w-[44ch] text-lg text-[#2a333d]">
              The Golfsies Rankings run across the whole season. The full points table will be published before the first Golfsies Cup.
            </p>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {rankingPoints.map((p) => (
              <div key={p.label} className="grid gap-1 py-5 sm:grid-cols-[220px_1fr] sm:gap-6">
                <dt className="display text-[22px] leading-tight font-extrabold text-navy">{p.label}</dt>
                <dd className="text-[#2a333d]">{p.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CtaBand title="Be on the board from day one." secondary={{ label: "Membership details", href: "/membership" }} />
    </>
  );
}
