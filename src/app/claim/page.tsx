import type { Metadata } from "next";
import { ClaimForm } from "@/components/forms/ClaimForm";
import { FoundingMeter } from "@/components/sections/Plans";
import { Container } from "@/components/ui";
import { photos, pricing } from "@/lib/site";

export const metadata: Metadata = {
  title: "Claim your team name",
  description: "Reserve a Golfsies Founding Team name for free. First in, first served, with nothing to pay until the first event is confirmed.",
};

const nextSteps = [
  { title: "We confirm your name", body: "Names are first in, first served. We'll email to confirm yours, or offer your back-up if it's taken." },
  { title: "You get an invite", body: "Your crew is invited to the free Try Golfsies Day to play the format before committing." },
  { title: "You decide", body: `Before the first Golfsies Cup we'll send the membership terms. Join at the founding price of $${pricing.membershipMonthly} a month, or walk away. No charge either way until you choose.` },
];

export default function ClaimPage() {
  return (
    <section
      className="py-12 text-white sm:py-20"
      style={{
        background: photos.claim
          ? `linear-gradient(180deg, rgba(11,26,43,0.8), rgba(11,26,43,0.94)), url('${photos.claim}') center / cover no-repeat`
          : "#0b1a2b",
      }}
    >
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="display mb-4 text-[15px] font-bold tracking-[0.12em] text-fairway">Founding Teams</p>
          <h1 className="display text-[clamp(48px,6.5vw,84px)] leading-[0.9] font-extrabold">
            Claim your
            {" "}
            <br />
            team name
          </h1>
          <p className="mt-5 max-w-[42ch] text-lg text-white/80">It takes two minutes and it&apos;s free. There&apos;s no payment and no commitment.</p>
          <div className="mt-6">
            <FoundingMeter tone="dark" />
          </div>

          <h2 className="display mt-12 mb-5 text-[24px] font-extrabold">What happens next</h2>
          <ol className="space-y-6">
            {nextSteps.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[44px_1fr] gap-4">
                <span className="display grid h-11 w-11 place-items-center rounded-full border-2 border-fairway text-xl font-extrabold text-fairway">
                  {i + 1}
                </span>
                <div>
                  <h3 className="display text-[22px] leading-tight font-extrabold">{step.title}</h3>
                  <p className="mt-1 text-[15px] text-white/75">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-lg bg-paper px-5 py-7 text-ink sm:px-9 sm:py-10">
          <ClaimForm />
        </div>
      </Container>
    </section>
  );
}
