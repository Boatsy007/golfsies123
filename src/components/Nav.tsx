"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { navLinks } from "@/lib/site";
import { buttonClass, Container, Reg, Wordmark } from "./ui";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <Container className="relative flex h-[72px] items-center justify-between">
        {/* To use the real logo: swap the Wordmark for <Image src="/logo.png" alt="Golfsies" width={...} height={42} /> */}
        <a href="#top" aria-label="Golfsies home" className="flex items-center text-[36px] text-navy no-underline">
          <Wordmark />
          <Reg />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="display text-lg font-bold text-navy hover:text-fairway-deep">
              {link.label}
            </a>
          ))}
          <a href="#register" className={buttonClass("solid", "sm")}>
            Claim your team
          </a>
        </nav>

        <button
          type="button"
          className="p-2 text-navy lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-line bg-white lg:hidden"
          >
            <Container className="flex flex-col pb-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="display border-b border-line py-3 text-lg font-bold text-navy"
                >
                  {link.label}
                </a>
              ))}
              <a href="#register" onClick={() => setOpen(false)} className={buttonClass("solid") + " mt-4"}>
                Claim your team
              </a>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
