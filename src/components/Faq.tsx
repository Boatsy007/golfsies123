import { faqs } from "@/lib/site";
import { Container, SectionTitle } from "./ui";

export function Faq() {
  return (
    <section id="faq" className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-[860px]">
        <SectionTitle>FAQ</SectionTitle>
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-line py-4">
            <summary className="display flex cursor-pointer list-none justify-between gap-4 text-[22px] font-bold text-navy [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden="true" className="font-body text-[26px] leading-none font-normal group-open:hidden">
                +
              </span>
              <span aria-hidden="true" className="hidden font-body text-[26px] leading-none font-normal group-open:inline">
                –
              </span>
            </summary>
            <p className="mt-2.5 text-[#3a434d]">{f.a}</p>
          </details>
        ))}
        </div>
      </Container>
    </section>
  );
}
