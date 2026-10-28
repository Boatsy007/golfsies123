"use client";

import { motion } from "motion/react";
import { photos } from "@/lib/site";
import { Arrow, buttonClass, Container, Wordmark } from "./ui";

const lightXs = [60, 140, 220, 300, 380, 460, 540, 620, 700, 780, 860, 940, 1020, 1100, 1180];
const lightYs = [78, 96, 108, 112, 106, 92, 77, 70, 72, 80, 88, 93, 94, 92, 90];

const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background: [
          "linear-gradient(90deg, rgba(11,26,43,0.92) 0%, rgba(11,26,43,0.6) 55%, rgba(11,26,43,0.25) 100%)",
          photos.hero && `url('${photos.hero}') center / cover no-repeat`,
          "radial-gradient(120% 90% at 80% 10%, #2b4d70 0%, #10233a 55%, #0b1a2b 100%)",
        ]
          .filter(Boolean)
          .join(", "),
      }}
    >
      <svg className="pointer-events-none absolute top-0 left-0 h-3/5 w-full" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60 Q 300 140 600 70 T 1200 90" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        {lightXs.map((x, i) => (
          <motion.circle
            key={x}
            cx={x}
            cy={lightYs[i]}
            r="3"
            fill="#ffe7a8"
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: (i % 5) * 0.35 }}
          />
        ))}
      </svg>
      <svg className="pointer-events-none absolute right-0 bottom-0 left-0 h-auto w-full" viewBox="0 0 1440 170" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 110 C 240 60, 420 70, 640 100 S 1060 150, 1440 80 L 1440 170 L 0 170 Z" fill="#14304f" />
        <path d="M0 140 C 300 110, 520 120, 760 135 S 1180 150, 1440 125 L 1440 170 L 0 170 Z" fill="#0b1a2b" />
        <line x1="1130" y1="118" x2="1130" y2="40" stroke="#f5f0eb" strokeWidth="3" />
        <path d="M1130 40 L1172 52 L1130 64 Z" fill="#f27fb2" />
      </svg>

      <Container className="relative z-10 pt-16 pb-28 sm:pt-24 sm:pb-36">
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.12 }}>
          <motion.div
            variants={rise}
            className="mb-7 inline-flex -skew-x-[8deg] items-center gap-3.5 rounded-md bg-cream py-2.5 pr-4.5 pl-3.5 text-navy"
          >
            <Wordmark className="skew-x-[8deg] text-[34px]" />
            <span className="display skew-x-[8deg] border-l-2 border-tan pl-3.5 text-xl leading-none font-extrabold">
              <small className="block text-[13px] tracking-widest text-tan">Founding Teams</small>
              Gold Coast
            </span>
          </motion.div>

          <motion.h1 variants={rise} className="display mb-6 text-[clamp(56px,10vw,128px)] leading-[0.88] font-extrabold">
            3 Clubs.
            <br />6 Holes.
            <br />1 Hour.
          </motion.h1>

          <motion.div variants={rise} className="display text-[clamp(24px,3.4vw,38px)] leading-none font-bold">
            <span className="bg-cream px-3 py-1.5 text-navy">Then the</span>
            <em className="pl-2.5 text-fairway not-italic">Party Hole</em>
          </motion.div>

          <motion.p variants={rise} className="display mt-6 text-[clamp(20px,2.4vw,26px)] font-semibold text-white/85">
            Own a team · Enter tournaments · Climb the rankings
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap gap-3">
            <a href="#register" className={buttonClass("fairway")}>
              Claim your team name <Arrow />
            </a>
            <a href="#own" className={buttonClass("ghost")}>
              Own a team
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
