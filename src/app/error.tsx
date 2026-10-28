"use client";

import { useEffect } from "react";
import { Arrow, buttonClass, ButtonLink, Container } from "@/components/ui";
import { contactEmail } from "@/lib/site";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-navy-deep py-20 text-white sm:py-28">
      <Container>
        <p className="display text-[15px] font-bold tracking-[0.12em] text-fairway">Something went wrong</p>
        <h1 className="display mt-3 text-[clamp(48px,8vw,104px)] leading-[0.9] font-extrabold">Mulligan?</h1>
        <p className="mt-6 max-w-[48ch] text-lg text-white/80">
          This page didn&apos;t load properly. Try again, and if it keeps happening, email{" "}
          <a href={`mailto:${contactEmail}`} className="text-white underline decoration-fairway underline-offset-4">
            {contactEmail}
          </a>
          .
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button type="button" onClick={() => retry()} className={buttonClass("fairway")}>
            Try again <Arrow />
          </button>
          <ButtonLink href="/" variant="ghost">
            Back to home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
