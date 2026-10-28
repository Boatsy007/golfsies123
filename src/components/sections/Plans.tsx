"use client";

import { motion } from "motion/react";
import { foundingSpots, plans } from "@/lib/site";
import { Reveal } from "../Reveal";
import { Arrow, ButtonLink, cn } from "../ui";

export function FoundingMeter({ tone = "light" }: { tone?: "light" | "dark" }) {
  const pct = (foundingSpots.left / foundingSpots.total) * 100;
  return (
    <div
      className={cn(
        "display inline-flex items-center gap-3 rounded-full border-[1.5px] px-4.5 py-2 text-base font-bold sm:text-lg",
        tone === "light" ? "border-navy bg-cream text-navy" : "border-white/30 bg-white/5 text-white",
      )}
    >
      <span data-testid="spots-text">
        {foundingSpots.left} of {foundingSpots.total} Founding spots left
      </span>
      <span className={cn("h-2 w-[110px] overflow-hidden rounded-full", tone === "light" ? "bg-navy/15" : "bg-white/15")} aria-hidden="true">
        <motion.i
          className={cn("block h-full", tone === "light" ? "bg-fairway-deep" : "bg-fairway")}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
        />
      </span>
    </div>
  );
}

export function Plans() {
  return (
    <div className="mx-auto grid max-w-[520px] gap-5.5 lg:max-w-none lg:grid-cols-3">
      {plans.map((plan, i) => (
        <Reveal key={plan.title} delay={i * 0.1}>
          <div
            className={cn(
              "flex h-full flex-col rounded-lg border-[1.5px] px-6 py-7",
              plan.featured ? "border-navy bg-navy text-white shadow-[8px_8px_0_var(--color-fairway)]" : "border-line bg-white",
            )}
          >
            <span className={cn("display text-[15px] font-bold tracking-wider", plan.featured ? "text-fairway" : "text-fairway-deep")}>
              {plan.kicker}
            </span>
            <h3 className="display mt-1.5 mb-3.5 text-[34px] leading-none font-extrabold">{plan.title}</h3>
            <div className="display text-[60px] leading-none font-extrabold normal-case">
              {plan.price}
              {plan.unit && <small className="text-xl font-bold opacity-80">{plan.unit}</small>}
            </div>
            <p className="mt-1.5 mb-4.5 text-[13px] opacity-80">{plan.note}</p>
            <ul className="mb-6 flex-1">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className={cn(
                    "relative border-t py-2 pl-7 text-[15px] before:absolute before:top-2 before:left-0.5 before:font-extrabold before:content-['✓']",
                    plan.featured ? "border-white/15 before:text-fairway" : "border-line before:text-fairway-deep",
                  )}
                >
                  {f}
                </li>
              ))}
            </ul>
            <ButtonLink href={plan.cta.href} variant={plan.featured ? "fairway" : "outline"}>
              {plan.cta.label} <Arrow />
            </ButtonLink>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
