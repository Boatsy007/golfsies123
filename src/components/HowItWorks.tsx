import { howItWorks } from "@/lib/site";
import { PhoneScorecard } from "./PhoneScorecard";
import { Reveal } from "./Reveal";
import { Arrow, buttonClass, Container } from "./ui";

export function HowItWorks() {
  return (
    <section id="how" className="bg-gradient-to-b from-[#23436a] to-navy-deep py-16 text-center text-white sm:py-24">
      <Container>
        <Reveal>
          <h2 className="display mb-12 inline-block rounded-[26px] border-2 border-fairway px-8 py-2.5 text-[clamp(44px,7vw,88px)] leading-none font-extrabold">
            How it works
          </h2>
        </Reveal>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <div className="display mb-6.5 inline-block bg-navy-ink px-3.5 py-1 text-[clamp(28px,3.4vw,38px)] font-bold">
                Never played? Perfect.
              </div>
            </Reveal>
            {howItWorks.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08} className="mb-7">
                <h3 className="display mb-1.5 text-[clamp(30px,3.6vw,40px)] leading-none font-extrabold text-fairway">{step.title}</h3>
                <p className="display mx-auto max-w-[30ch] text-xl leading-tight font-semibold">{step.body}</p>
              </Reveal>
            ))}
            <a href="#register" className={buttonClass("onDark")}>
              Claim your team name <Arrow />
            </a>
          </div>
          <PhoneScorecard />
        </div>
      </Container>
    </section>
  );
}
