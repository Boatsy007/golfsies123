import { Reveal } from "./Reveal";
import { RoundDiagram } from "./RoundDiagram";
import { Arrow, buttonClass, Container } from "./ui";

export function Intro() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <RoundDiagram />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mb-6 text-[clamp(34px,4vw,46px)] leading-none font-extrabold text-navy">
            The Gold Coast&apos;s 6-hole social golf league
          </h2>
          <p className="mb-3.5 text-[#2a333d]">
            Golfsies is golf reimagined: short, social team golf for people who&apos;d rather play an hour after work than lose a whole Saturday.
          </p>
          <p className="mb-3.5 text-[#2a333d]">
            Own a team, build your roster, and enter Golfsies tournaments across the Gold Coast. Every event is 6 short holes with easy-play rules
            and a Party Hole to finish, and every result counts towards the Golfsies Rankings.
          </p>
          <a href="#register" className={buttonClass("solid") + " mt-6"}>
            Claim your team name <Arrow />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
