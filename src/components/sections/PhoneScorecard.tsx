"use client";

import { motion } from "motion/react";
import { exampleScorecard } from "@/lib/site";
import { cn } from "../ui";

export function PhoneScorecard() {
  const { team, position, field, holes } = exampleScorecard;
  const total = holes.reduce((sum, h) => sum + h.points, 0);

  return (
    <motion.div
      aria-label="Example Golfsies tournament scorecard"
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-[300px] max-w-full rounded-[40px] bg-[#111] p-3 text-left shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
    >
      <div className="overflow-hidden rounded-[30px] border-[3px] border-white bg-navy-ink">
        <div className="bg-gradient-to-b from-[#0f2238] to-[#132b45] px-4 pt-5.5 pb-3.5">
          <div className="display text-[11px] font-bold tracking-widest text-fairway">Golfsies Cup · Example scorecard</div>
          <div className="display mt-2 flex items-center justify-between text-[22px] leading-none font-extrabold">
            <div>
              {team}
              <small className="block text-[11px] font-semibold tracking-wider text-white/60">Team scramble</small>
            </div>
            <div className="text-right">
              {position}
              <small className="block text-[11px] font-semibold tracking-wider text-white/60">of {field} teams</small>
            </div>
          </div>
        </div>

        <motion.div
          className="px-3 pt-2 pb-1"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.4 }}
        >
          {holes.map((h) => (
            <motion.div
              key={h.label}
              variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}
              className={cn(
                "display mb-1.5 grid grid-cols-[48px_1fr_1fr_30px] items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] font-semibold text-white/85 sm:grid-cols-[54px_1fr_1fr_34px] sm:text-sm",
                h.party ? "border border-pink bg-pink/20" : "bg-white/5",
              )}
            >
              <b className={cn("font-extrabold", h.party ? "text-pink" : "text-white")}>{h.label}</b>
              <span>{h.party ? "2× pts" : `Par ${h.par}`}</span>
              <span>{h.metres}m</span>
              <span
                className={cn(
                  "rounded py-0.5 text-center text-xs font-extrabold",
                  h.points >= 2 ? "bg-fairway text-navy-ink" : "bg-white/15 text-white",
                )}
              >
                {h.points}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="display mx-3 mt-1.5 mb-4 flex items-baseline justify-between border-t border-white/15 px-2 pt-2.5 text-base font-extrabold text-white">
          <span>Total points</span>
          <b className="text-[26px] text-fairway">{total}</b>
        </div>
        <p className="mx-5 mb-5 text-[11px] leading-snug text-white/70">Birdie 3 · Par 2 · Bogey 1. The Party Hole doubles it.</p>
      </div>
    </motion.div>
  );
}
