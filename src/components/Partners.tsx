import { partnerCards } from "@/lib/site";
import { Reveal } from "./Reveal";
import { Arrow, Container, SectionTitle } from "./ui";

export function Partners() {
  return (
    <section id="partners" className="bg-cream py-16 sm:py-24">
      <Container>
        <div className="mb-10 grid items-end gap-4 lg:grid-cols-[1fr_1fr]">
          <SectionTitle className="mb-0">Partner with Golfsies</SectionTitle>
          <p className="max-w-[48ch] text-[#2a333d] lg:justify-self-end">
            We&apos;re looking for venues, local brands and Gold Coast businesses to help launch the first season. Here&apos;s how to get involved.
          </p>
        </div>
        <div className="grid border-t-2 border-navy md:grid-cols-3">
          {partnerCards.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i * 0.08}
              className="flex flex-col border-b border-line py-7 md:border-b-0 md:px-7 md:first:pl-0 md:last:pr-0 md:[&:not(:first-child)]:border-l"
            >
              <span className="display text-sm font-bold tracking-widest text-fairway-deep">0{i + 1}</span>
              <h3 className="display mt-2 mb-3 text-[34px] leading-[0.95] font-extrabold text-navy">{card.title}</h3>
              <p className="mb-6 flex-1 text-[#2a333d]">{card.body}</p>
              <a href={card.href} className="display inline-flex items-center gap-2 self-start text-lg font-bold text-navy underline decoration-fairway decoration-2 underline-offset-[6px] hover:decoration-navy">
                {card.cta} <Arrow />
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
