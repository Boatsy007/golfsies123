import { Reveal } from "./Reveal";
import { Arrow, buttonClass, Container } from "./ui";

export function Intro() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          {/* Replace with the launch video once it's filmed */}
          <div
            aria-label="Golfsies launch video coming soon"
            className="relative grid aspect-video place-items-center overflow-hidden text-cream"
            style={{ background: "radial-gradient(circle at 50% 50%, #2a4a6c, #10233a)" }}
          >
            <div className="display text-center text-[clamp(40px,6.5vw,84px)] leading-[0.86] font-extrabold">
              6 Hole
              <br />
              Social
              <br />
              Golf
            </div>
            <div aria-hidden="true" className="absolute grid h-[84px] w-[84px] place-items-center rounded-full bg-navy-ink shadow-xl">
              <span className="ml-1.5 border-y-[12px] border-l-[20px] border-y-transparent border-l-white" />
            </div>
            <div className="display absolute bottom-3.5 left-4 text-[15px] font-bold tracking-widest text-fairway">Launch video coming soon</div>
          </div>
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
