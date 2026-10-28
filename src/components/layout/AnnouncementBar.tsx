"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { foundingSpots } from "@/lib/site";
import { Container } from "../ui";

export function AnnouncementBar() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  if (dismissed || pathname === "/claim") return null;

  return (
    <div className="bg-coral text-white" role="region" aria-label="Announcement">
      <Container className="relative flex min-h-[44px] flex-col items-center justify-center gap-1.5 px-10 py-2 sm:flex-row sm:gap-4">
        <p className="display m-0 text-center text-base font-bold tracking-wide sm:text-lg">
          Founding Teams · {foundingSpots.left} of {foundingSpots.total} spots left · Reserve your name free
        </p>
        <Link href="/claim" className="rounded-full bg-white px-3.5 py-1 text-[13px] font-bold tracking-wide whitespace-nowrap text-navy uppercase hover:bg-cream">
          Claim your team
        </Link>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => setDismissed(true)}
          className="absolute top-1/2 right-2 grid h-9 w-9 -translate-y-1/2 place-items-center text-[22px] leading-none"
        >
          ×
        </button>
      </Container>
    </div>
  );
}
