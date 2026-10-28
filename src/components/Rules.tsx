import { rules } from "@/lib/site";
import { Reveal } from "./Reveal";
import { Container, SectionTitle } from "./ui";

export function Rules() {
  return (
    <section id="rules" className="py-16 sm:py-24">
      <Container>
        <SectionTitle className="text-center">The rules</SectionTitle>
        <p className="mx-auto max-w-[56ch] text-center text-muted">Simple enough for first-timers and competitive enough for everyone.</p>
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-6 md:grid-cols-3 lg:grid-cols-5">
          {rules.map((r, i) => (
            <Reveal key={r.bottom} delay={i * 0.07} className="border-t border-line">
              <div className="relative flex h-40 items-center justify-center bg-paper">
                <span className="display mr-8 text-[86px] leading-none font-extrabold text-navy normal-case">{r.big}</span>
                <span className="absolute inset-y-0 right-0 w-10" style={{ background: r.color }} />
              </div>
              <div className="mt-3 border-b border-line pb-2.5">
                <span className="block text-[15px]">{r.top}</span>
                <b className="block text-[17px] font-extrabold uppercase">{r.bottom}</b>
              </div>
              <p className="mt-2.5 text-sm text-muted">{r.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
