import { rules } from "@/lib/site";
import { Reveal } from "../Reveal";
import { Container, Eyebrow, SectionTitle } from "../ui";

export function Rules() {
  return (
    <section id="rules" className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-4 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>The rules</Eyebrow>
            <SectionTitle className="mb-0">Five rules. That&apos;s it.</SectionTitle>
          </div>
          <p className="max-w-[46ch] text-[#2a333d] lg:justify-self-end">Simple enough for first-timers, and competitive enough that nobody takes it too easy.</p>
        </div>
        <ul className="mt-12 grid gap-x-8 lg:grid-cols-5">
          {rules.map((r, i) => (
            <li key={r.bottom} className="border-t-2 border-navy max-lg:last:border-b max-lg:last:border-line">
              <Reveal delay={i * 0.06} className="grid grid-cols-[88px_1fr] items-start gap-4 py-5 lg:block lg:pt-6">
                <span className="display block text-[64px] leading-[0.85] font-extrabold text-navy normal-case lg:text-[80px]">{r.big}</span>
                <div>
                  <h3 className="display text-[24px] leading-none font-extrabold text-navy lg:mt-4">
                    {r.top} {r.bottom.toLowerCase()}
                  </h3>
                  <p className="mt-2 text-[15px] text-muted">{r.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
