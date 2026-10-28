import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Rules } from "@/components/sections/Rules";
import { RoundDiagram } from "@/components/sections/RoundDiagram";
import { Container, CtaBand, Eyebrow, PageHeader, SectionTitle } from "@/components/ui";
import { scoring, tournamentNight, whatToBring } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description: "Six short holes, three clubs, a team scramble and the Party Hole. Here's how a Golfsies tournament runs, how scoring works and what to bring.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title={
          <>
            Six holes.
            {" "}
            <br />
            One hour.
            {" "}
            <br />
            <span className="text-fairway">Zero fuss.</span>
          </>
        }
        intro="Golfsies takes everything that makes golf fun with your mates and leaves out the four hours, the full bag and the pressure. Here's exactly how a tournament night runs."
      />

      {/* The round */}
      <section className="py-16 sm:py-24" aria-labelledby="round-title">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.25fr]">
          <Reveal>
            <Eyebrow>The round</Eyebrow>
            <SectionTitle>
              <span id="round-title">Short holes, played as a team</span>
            </SectionTitle>
            <div className="max-w-[52ch] space-y-4 text-[#2a333d]">
              <p className="text-lg">
                Every tournament is six holes of 100–130 metres, set up with forward tees on a Gold Coast course. That&apos;s a 7-iron for most
                people, so nobody spends the night hacking out of the rough.
              </p>
              <p>
                Teams play a <b>scramble</b>: all four players hit, you choose the best shot, and everyone plays the next one from there. The
                strongest shot always counts, so first-timers and regular golfers both matter on every hole.
              </p>
              <p>
                A <b>shotgun start</b> sends every team out at once on a different hole, so the whole field finishes together on the Party Hole.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <RoundDiagram />
          </Reveal>
        </Container>
      </section>

      {/* Scoring */}
      <section className="bg-navy py-16 text-white sm:py-24" aria-labelledby="scoring-title">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <p className="display mb-3 text-[15px] font-bold tracking-[0.12em] text-fairway">Scoring</p>
            <h2 id="scoring-title" className="display text-[clamp(40px,5.5vw,64px)] leading-[0.95] font-extrabold">
              Points, not strokes
            </h2>
            <p className="mt-5 max-w-[48ch] text-lg text-white/80">
              Every hole is worth points, so one bad hole never ruins your night. Most points across the six holes wins.
            </p>
            <p className="mt-4 max-w-[48ch] text-white/80">
              The Party Hole doubles everything, which means a birdie on hole 6 is worth six points and the lead can change on the very last
              putt.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="min-w-0">
            <div className="overflow-hidden rounded-lg bg-white text-ink">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">Points per hole on a par 3</caption>
                <thead>
                  <tr className="display bg-cream text-sm font-bold tracking-wider text-navy">
                    <th scope="col" className="px-3 py-3.5 sm:px-5">
                      Result on a par 3
                    </th>
                    <th scope="col" className="px-3 py-3.5 sm:px-5">
                      Holes 1–5
                    </th>
                    <th scope="col" className="bg-pink/30 px-3 py-3.5 sm:px-5">
                      Party Hole
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scoring.map((row) => (
                    <tr key={row.result} className="border-t border-line">
                      <th scope="row" className="px-3 py-4 font-normal sm:px-5">
                        <span className="display block text-[22px] leading-none font-extrabold text-navy">{row.result}</span>
                        <span className="text-sm text-muted">{row.strokes}</span>
                      </th>
                      <td className="display px-3 py-4 text-[32px] font-extrabold text-navy sm:px-5">{row.points}</td>
                      <td className="display bg-pink/10 px-3 py-4 text-[32px] font-extrabold text-[#a3175a] sm:px-5">{row.party}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      <Rules />

      {/* A tournament night */}
      <section className="border-t border-line bg-cream py-16 sm:py-24" aria-labelledby="night-title">
        <Container>
          <div className="mb-12 grid gap-4 lg:grid-cols-2 lg:items-end">
            <div>
              <Eyebrow>A typical tournament night</Eyebrow>
              <SectionTitle className="mb-0">
                <span id="night-title">In and out in 90 minutes</span>
              </SectionTitle>
            </div>
            <p className="max-w-[46ch] text-[#2a333d] lg:justify-self-end">
              A weeknight twilight event looks like this. Start times move with the seasons and each venue, and weekend afternoon events follow the
              same rhythm.
            </p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4">
            {tournamentNight.map((step, i) => (
              <li key={step.title} className="bg-paper p-6 sm:p-7">
                <Reveal delay={i * 0.07}>
                  <p className="display text-[36px] leading-none font-extrabold text-navy normal-case">{step.time}</p>
                  <h3 className="display mt-4 mb-2 text-[24px] leading-none font-extrabold text-fairway-deep">{step.title}</h3>
                  <p className="text-[15px] text-muted">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* What to bring */}
      <section className="py-16 sm:py-24" aria-labelledby="bring-title">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>What to bring</Eyebrow>
            <SectionTitle>
              <span id="bring-title">Travel light</span>
            </SectionTitle>
            <p className="max-w-[44ch] text-lg text-[#2a333d]">No full bag, no buggy, no dress code beyond your team kit.</p>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {whatToBring.map((item) => (
              <div key={item.title} className="grid gap-1 py-5 sm:grid-cols-[200px_1fr] sm:gap-6">
                <dt className="display text-[22px] leading-tight font-extrabold text-navy">{item.title}</dt>
                <dd className="text-[#2a333d]">{item.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CtaBand title="Got a crew? Claim your name." secondary={{ label: "Membership details", href: "/membership" }} />
    </>
  );
}
