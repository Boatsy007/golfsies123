import type { Metadata } from "next";
import { Arrow, ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-20 text-white sm:py-28">
      <svg aria-hidden="true" viewBox="0 0 1440 170" preserveAspectRatio="none" className="pointer-events-none absolute right-0 bottom-0 left-0 h-24 w-full">
        <path d="M0 110 C 240 60, 420 70, 640 100 S 1060 150, 1440 80 L 1440 170 L 0 170 Z" fill="#14304f" />
        <line x1="1130" y1="118" x2="1130" y2="40" stroke="#f5f0eb" strokeWidth="3" />
        <path d="M1130 40 L1172 52 L1130 64 Z" fill="#f27fb2" />
      </svg>
      <Container className="relative">
        <p className="display text-[15px] font-bold tracking-[0.12em] text-fairway">Error 404</p>
        <h1 className="display mt-3 text-[clamp(56px,10vw,128px)] leading-[0.88] font-extrabold">
          Lost ball.
        </h1>
        <p className="mt-6 max-w-[44ch] text-lg text-white/80">
          That page has gone into the water. Take a free drop and play on from one of these instead.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="fairway">
            Back to home <Arrow />
          </ButtonLink>
          <ButtonLink href="/claim" variant="ghost">
            Claim your team name
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
