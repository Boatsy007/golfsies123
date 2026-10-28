import { Fragment } from "react";
import { contactEmail, socials } from "@/lib/site";
import { Container, Wordmark } from "./ui";

const footerLinks = [
  { href: "#own", label: "Own a team" },
  { href: "#tournaments", label: "Tournaments" },
  { href: "#rankings", label: "Rankings" },
  { href: "#faq", label: "FAQ" },
  { href: "#partners", label: "Partnerships" },
  { href: `mailto:${contactEmail}`, label: "Contact" },
];

const icons = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 2c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.4-.6.7-.8 1.2-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.4.4.7.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.4.6-.7.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.3a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 7.4a2.9 2.9 0 1 0 0-5.8 2.9 2.9 0 0 0 0 5.8zm5.7-7.6a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z",
  tiktok: "M16.6 2h-3.3v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .8.1V9.2a6.3 6.3 0 1 0 5.4 6.2V8.6a7.9 7.9 0 0 0 4.6 1.5V6.8a4.6 4.6 0 0 1-4.6-4.6z",
  x: "M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.9 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z",
};

export function Footer() {
  return (
    <footer>
      <div className="bg-navy pt-[70px] pb-[54px] text-white">
        <Container>
          <div className="display mb-6.5 text-[clamp(48px,7vw,80px)] leading-[0.9] font-extrabold">See you at the Party Hole</div>
          <nav aria-label="Footer" className="display flex flex-wrap gap-x-2.5 gap-y-1.5 text-[21px] font-bold">
            {footerLinks.map((l, i) => (
              <Fragment key={l.label}>
                {i > 0 && (
                  <i aria-hidden="true" className="not-italic opacity-50">
                    /
                  </i>
                )}
                <a href={l.href} className="hover:text-fairway">
                  {l.label}
                </a>
              </Fragment>
            ))}
          </nav>
          <div className="mt-[54px] flex items-center gap-5.5">
            <Wordmark className="mr-3 text-[38px]" />
            {(Object.keys(icons) as (keyof typeof icons)[]).map((key) => (
              <a
                key={key}
                href={socials[key]}
                target="_blank"
                rel="noopener"
                aria-label={key === "x" ? "X" : key[0].toUpperCase() + key.slice(1)}
                className="opacity-85 hover:opacity-100"
              >
                <svg viewBox="0 0 24 24" className="h-6.5 w-6.5 fill-cream">
                  <path d={icons[key]} />
                </svg>
              </a>
            ))}
          </div>
        </Container>
      </div>
      <div className="bg-cream px-4 py-4.5 text-center text-[13px] text-muted">
        © 2026 Golfsies. Golfsies® is a registered trade mark. Gold Coast, Queensland.
      </div>
    </footer>
  );
}
