import type { Metadata } from "next";
import { Container, CtaBand, PageHeader } from "@/components/ui";
import { allFaqs, contactEmail, faqGroups } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about the Golfsies format, team membership and cost, owning a team and tournaments.",
};

// Structured data so search engines can show these answers directly.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHeader
        eyebrow="FAQ"
        title="Good questions"
        intro={
          <>
            Can&apos;t find what you&apos;re after? Email{" "}
            <a href={`mailto:${contactEmail}`} className="text-white underline decoration-fairway underline-offset-4">
              {contactEmail}
            </a>
            .
          </>
        }
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-0">
              {faqGroups.map((g) => (
                <li key={g.title}>
                  <a
                    href={`#${slug(g.title)}`}
                    className="display block rounded-full border border-line px-4 py-1.5 text-base font-bold text-navy hover:border-navy lg:rounded-none lg:border-0 lg:border-l-2 lg:px-4 lg:py-2.5 lg:text-lg lg:hover:border-fairway"
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-14">
            {faqGroups.map((g) => (
              <section key={g.title} id={slug(g.title)} aria-labelledby={`${slug(g.title)}-title`}>
                <h2 id={`${slug(g.title)}-title`} className="display mb-2 text-[clamp(32px,4vw,44px)] font-extrabold text-navy">
                  {g.title}
                </h2>
                {g.items.map((f) => (
                  <details key={f.q} className="group border-b border-line py-4">
                    <summary className="display flex cursor-pointer list-none items-center justify-between gap-4 text-[22px] font-bold text-navy [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span
                        aria-hidden="true"
                        className="grid h-8 w-8 flex-none place-items-center rounded-full border border-line font-body text-xl leading-none font-normal transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-[65ch] text-[#2a333d]">{f.a}</p>
                  </details>
                ))}
              </section>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title="Ready when you are." />
    </>
  );
}
