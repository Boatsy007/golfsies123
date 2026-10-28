import Link from "next/link";
import { contactEmail, navLinks, socials } from "@/lib/site";
import { Container, Wordmark } from "../ui";

const icons = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 2c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.4-.6.7-.8 1.2-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.4.4.7.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.4.6-.7.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.3a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 7.4a2.9 2.9 0 1 0 0-5.8 2.9 2.9 0 0 0 0 5.8zm5.7-7.6a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z",
  tiktok: "M16.6 2h-3.3v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .8.1V9.2a6.3 6.3 0 1 0 5.4 6.2V8.6a7.9 7.9 0 0 0 4.6 1.5V6.8a4.6 4.6 0 0 1-4.6-4.6z",
  x: "M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.9 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z",
};

const socialLabels: Record<keyof typeof icons, string> = { instagram: "Instagram", tiktok: "TikTok", x: "X" };

const columns = [
  { title: "Play", links: [...navLinks.slice(0, 3), { href: "/claim", label: "Claim your team" }] },
  { title: "Golfsies", links: [{ href: "/partners", label: "Partners" }, { href: "/faq", label: "FAQ" }, { href: "/privacy", label: "Privacy" }] },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy-ink text-white">
      <Container className="grid gap-12 pt-16 pb-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" aria-label="Golfsies home" className="text-[44px] text-cream">
            <Wordmark />
          </Link>
          <p className="display mt-4 text-[28px] leading-none font-extrabold">
            3 clubs. 6 holes. 1 hour.
            {" "}
            <br />
            <span className="text-fairway">Then the Party Hole.</span>
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="display mb-4 text-sm font-bold tracking-[0.14em] text-white/60">{col.title}</h2>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/90 hover:text-fairway">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2 className="display mb-4 text-sm font-bold tracking-[0.14em] text-white/60">Get in touch</h2>
          <a href={`mailto:${contactEmail}`} className="break-all text-white/90 hover:text-fairway">
            {contactEmail}
          </a>
          <p className="mt-2 text-white/70">Gold Coast, Queensland</p>
          <div className="mt-5 flex gap-4">
            {(Object.keys(icons) as (keyof typeof icons)[]).map((key) => (
              <a
                key={key}
                href={socials[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Golfsies on ${socialLabels[key]} (opens in a new tab)`}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 hover:border-fairway hover:text-fairway"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d={icons[key]} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-[13px] text-white/60 sm:flex-row sm:justify-between">
          <span>© 2026 Golfsies. Golfsies® is a registered trade mark.</span>
          <span>Made on the Gold Coast.</span>
        </Container>
      </div>
    </footer>
  );
}
