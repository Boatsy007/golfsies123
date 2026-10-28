"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { news, type NewsKind } from "@/lib/site";
import { BarTitle, cn, Container } from "./ui";

const filters: { key: NewsKind | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "announce", label: "Announcements" },
  { key: "venue", label: "Venues" },
  { key: "team", label: "Teams" },
];

export function NewsFeed() {
  const [filter, setFilter] = useState<NewsKind | "all">("all");
  const items = news.filter((n) => filter === "all" || n.kind === filter);

  return (
    <section id="news" className="bg-cream py-16 sm:py-24">
      <Container>
        <BarTitle className="bg-navy-ink">Latest activity</BarTitle>
        <div role="group" aria-label="Filter news" className="flex flex-wrap gap-2 bg-paper px-4 py-3.5">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-full border-[1.5px] px-3.5 py-1 text-[13px] font-semibold",
                filter === f.key ? "border-navy bg-navy text-white" : "border-ink",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <ul className="bg-white px-4 pb-1.5" data-testid="news-feed">
          <AnimatePresence initial={false}>
            {items.map((n) => (
              <motion.li
                key={n.strong}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden border-b border-line last:border-b-0"
              >
                <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 py-4.5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid h-[22px] w-[22px] flex-none place-items-center text-[15px] leading-none font-extrabold",
                      n.done ? "bg-navy text-white" : "border-[1.5px] border-navy text-navy",
                    )}
                  >
                    {n.done ? "+" : "…"}
                  </span>
                  <span className="text-sm text-muted sm:min-w-[76px]">{n.date}</span>
                  <span>
                    <b className="text-navy">{n.strong}</b>
                    {n.rest}
                  </span>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </Container>
    </section>
  );
}
