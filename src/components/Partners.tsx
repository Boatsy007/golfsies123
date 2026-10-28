import { partnerCards } from "@/lib/site";
import { Reveal } from "./Reveal";
import { Arrow, BarTitle, buttonClass, Container } from "./ui";

const slots = ["Your logo here", "Venue partner", "Drinks partner", "Apparel partner", "Your logo here", "Team sponsor"];

export function Partners() {
  return (
    <>
      <div aria-hidden="true" className="overflow-hidden border-b border-line bg-paper">
        <div className="inline-flex animate-marquee gap-[70px] py-6.5 whitespace-nowrap">
          {[...slots, ...slots].map((s, i) => (
            <span key={i} className="display rounded-md border-2 border-dashed border-[#cfc8bf] px-5.5 py-2.5 text-[22px] font-extrabold tracking-wider text-[#b7b2ab]">
              {s}
            </span>
          ))}
        </div>
      </div>
      <section id="partners" className="bg-cream pt-10 pb-16 sm:pb-24">
        <Container>
          <BarTitle center className="rounded-lg bg-tan">
            Partner with Golfsies
          </BarTitle>
          <div className="mt-5.5 grid gap-6 md:grid-cols-3">
            {partnerCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.1} className="flex flex-col items-center">
                <div
                  className="relative flex aspect-[16/10] w-full flex-col justify-end overflow-hidden p-5.5 text-white md:aspect-[4/5]"
                  style={{ background: card.gradient }}
                >
                  <span aria-hidden="true" className="display absolute top-5.5 left-5.5 text-[120px] leading-[0.8] font-extrabold opacity-20">
                    {card.icon}
                  </span>
                  <h3 className="display mb-2.5 text-[40px] leading-[0.92] font-extrabold">{card.title}</h3>
                  <p className="text-[15px] text-white/85">{card.body}</p>
                </div>
                <a href={card.href} className={buttonClass("tan") + " mt-3.5"}>
                  {card.cta} <Arrow />
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
