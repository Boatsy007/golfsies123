"use client";

import { motion } from "motion/react";
import { foundingSpots, plans } from "@/lib/site";
import { Reveal } from "./Reveal";
import { Arrow, buttonClass, cn, Container, SectionTitle } from "./ui";

export function OwnATeam() {
  const pct = (foundingSpots.left / foundingSpots.total) * 100;

  return (
    <section id="own" className="py-16 sm:py-24">
      <Container>
        <Reveal className="mx-auto mb-11 max-w-[720px] text-center">
          <SectionTitle>Own a team</SectionTitle>
          <p className="text-[#2a333d]">
            Your team name, your crest, your roster, your ranking. Founding Teams lock in the lowest price for as long as they stay members.
          </p>
          <div className="display mt-5.5 inline-flex items-center gap-3 rounded-full border-[1.5px] border-navy bg-cream px-4.5 py-2 text-base font-bold text-navy sm:text-lg">
            <span data-testid="spots-text">
              {foundingSpots.left} of {foundingSpots.total} Founding spots left
            </span>
            <span className="h-2 w-[120px] overflow-hidden rounded-full bg-navy/15">
              <motion.i
                className="block h-full bg-fairway-deep"
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
              />
            </span>
          </div>
        </Reveal>

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
                <p className="mt-1.5 mb-4.5 text-[13px] opacity-75">{plan.note}</p>
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
                <a href={plan.cta.href} className={buttonClass(plan.featured ? "fairway" : "outline")}>
                  {plan.cta.label} <Arrow />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-6.5 max-w-[70ch] text-center text-sm text-muted">
          Founding prices will be confirmed before the first event. Reserving a team name is free and doesn&apos;t commit you to anything. Full
          membership terms, including how to cancel, will be sent before any payment is taken.
        </p>
      </Container>
    </section>
  );
}
