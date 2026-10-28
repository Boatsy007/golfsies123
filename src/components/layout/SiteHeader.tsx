"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site";
import { ButtonLink, cn, Container, Reg, Wordmark } from "../ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <Container className="flex h-[72px] items-center justify-between gap-6">
        {/* To use the real logo: swap the Wordmark for <Image src="/logo.png" alt="Golfsies" width={...} height={42} /> */}
        <Link href="/" aria-label="Golfsies home" className="flex items-center text-[36px] text-navy" onClick={() => setOpen(false)}>
          <Wordmark />
          <Reg />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "display relative py-1 text-lg font-bold text-navy transition-colors hover:text-fairway-deep",
                    "after:absolute after:inset-x-0 after:-bottom-1 after:h-[3px] after:origin-left after:scale-x-0 after:bg-fairway after:transition-transform",
                    isActive(link.href) && "after:scale-x-100",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/claim" size="sm">
            Claim your team
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 text-navy lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
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
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <Container className="flex flex-col pt-2 pb-6">
              <ul>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        "display flex items-center justify-between border-b border-line py-3.5 text-2xl font-bold text-navy",
                        isActive(link.href) && "text-fairway-deep",
                      )}
                    >
                      {link.label}
                      <span aria-hidden="true" className="font-body text-lg">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/claim" onClick={() => setOpen(false)} className="display mt-5 rounded border-2 border-navy bg-navy px-6 py-3 text-center text-[19px] font-bold text-white">
                Claim your team
              </Link>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
