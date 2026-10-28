"use client";

import { useState } from "react";
import { foundingSpots } from "@/lib/site";
import { Container } from "./ui";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-coral text-white" role="region" aria-label="Announcement">
      <Container className="relative flex min-h-[46px] flex-col items-center justify-center gap-1.5 px-10 py-2 sm:flex-row sm:gap-4">
        <p className="display m-0 text-center text-base font-bold sm:text-[19px]">
          Founding Teams · Gold Coast · Only {foundingSpots.total} spots | Reserve your team name free
        </p>
        <a
          href="#register"
          className="rounded-full bg-white px-3.5 py-1 text-[13px] font-bold whitespace-nowrap text-navy uppercase tracking-wide hover:bg-cream"
        >
          Claim your team
        </a>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => setVisible(false)}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-[22px] leading-none"
        >
          ×
        </button>
      </Container>
    </div>
  );
}
