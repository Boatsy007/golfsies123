import { howItWorks } from "@/lib/site";
import { Reveal } from "./Reveal";
import { Arrow, buttonClass, Container } from "./ui";

export function HowItWorks() {
  return (
    <section id="how" className="bg-navy py-16 text-white sm:py-24">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="display mb-2 text-lg font-bold text-fairway">Never played? Perfect.</p>
            <h2 className="display text-[clamp(40px,5.5vw,64px)] font-extrabold">How it works</h2>
          </Reveal>
          <a href="#register" className={buttonClass("onDark")}>
            Claim your team name <Arrow />
          </a>
        </div>
        <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, i) => (
            <li key={step.title} className="list-none border-t-2 border-fairway pt-5">
              <Reveal delay={i * 0.08}>
                <span className="display block text-[56px] leading-none font-extrabold text-fairway">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-3 mb-2 text-[28px] leading-none font-extrabold">{step.title}</h3>
                <p className="text-white/80">{step.body}.</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
