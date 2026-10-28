import type { Metadata } from "next";
import { PartnerForm } from "@/components/forms/PartnerForm";
import { Reveal } from "@/components/Reveal";
import { Arrow, Container, Eyebrow, PageHeader, SectionTitle } from "@/components/ui";
import { partnerTypes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partners",
  description: "Host a Golfsies tournament at your course, sponsor the league, or enter a company team. Talk to us about partnering for the first season.",
};

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title={
          <>
            Grow the game
            {" "}
            <br />
            <span className="text-fairway">with us.</span>
          </>
        }
        intro="Golfsies is built to bring a new crowd to golf: social groups, work teams and people who've never played a full round. We're looking for venues, brands and Gold Coast businesses to help launch the first season."
      />

      {partnerTypes.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          aria-labelledby={`${p.id}-title`}
          className={i % 2 === 1 ? "border-y border-line bg-cream py-16 sm:py-20" : "py-16 sm:py-20"}
        >
          <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <h2 id={`${p.id}-title`} className="display text-[clamp(40px,5vw,60px)] leading-[0.92] font-extrabold text-navy">
                {p.title}
              </h2>
              <p className="mt-4 max-w-[44ch] text-lg text-[#2a333d]">{p.lead}</p>
              <a
                href={`#enquire-${p.id}`}
                className="display mt-6 inline-flex items-center gap-2 text-lg font-bold text-navy underline decoration-fairway decoration-2 underline-offset-[6px] hover:decoration-navy"
              >
                {p.cta} <Arrow />
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="divide-y divide-line border-y border-line">
                {p.points.map((point) => (
                  <li key={point} className="relative py-4 pl-9 text-[#2a333d] before:absolute before:top-4 before:left-0 before:font-extrabold before:text-fairway-deep before:content-['✓']">
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>
      ))}

      <section className="bg-navy-ink py-16 text-white sm:py-24" aria-labelledby="enquire-title">
        {/* Anchors for the "Talk about …" links; the form preselects the matching option. */}
        <span id="enquire-venue" className="block" />
        <span id="enquire-sponsor" className="block" />
        <span id="enquire-company" className="block" />
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div id="enquire">
            <Eyebrow className="text-fairway">Get in touch</Eyebrow>
            <SectionTitle className="text-white">
              <span id="enquire-title">Start the conversation</span>
            </SectionTitle>
            <p className="max-w-[40ch] text-lg text-white/80">Tell us a little about your venue or business and what you have in mind. We&apos;ll come back to you with ideas, not a sales pitch.</p>
          </div>
          <div className="rounded-lg bg-paper px-5 py-7 text-ink sm:px-9 sm:py-10">
            <PartnerForm />
          </div>
        </Container>
      </section>
    </>
  );
}
