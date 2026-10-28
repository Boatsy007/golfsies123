import { Reveal } from "../Reveal";
import { Arrow, ButtonLink, Container, SectionTitle } from "../ui";

const shirtPath = "M70 20 L40 32 L10 70 L36 88 L50 74 L50 186 L150 186 L150 74 L164 88 L190 70 L160 32 L130 20 C 124 36, 76 36, 70 20 Z";

function Shirt({ color, badge, badgeBg, badgeText, caption, logo }: {
  color: string;
  badge?: string;
  badgeBg?: string;
  badgeText?: string;
  caption: string;
  logo?: boolean;
}) {
  return (
    <figure className="relative m-0 grid aspect-[4/5] place-items-center bg-[#d9dadc]">
      <svg viewBox="0 0 200 200" aria-hidden="true" className="h-auto w-[82%] transition-transform duration-300 hover:-translate-y-1 hover:rotate-[-2deg]">
        <path d={shirtPath} fill={color} />
        {badge && (
          <>
            <rect x="110" y="62" width="22" height="22" rx="4" fill={badgeBg} />
            <text x="121" y="78" fontFamily="var(--font-barlow)" fontWeight="800" fontSize="12" textAnchor="middle" fill={badgeText}>
              {badge}
            </text>
          </>
        )}
        {logo && (
          <>
            <rect x="66" y="90" width="68" height="30" rx="4" fill="none" stroke="#f5f0eb" strokeWidth="2" strokeDasharray="4 4" />
            <text x="100" y="110" fontFamily="var(--font-barlow)" fontWeight="800" fontSize="12" textAnchor="middle" fill="#f5f0eb">
              YOUR LOGO
            </text>
          </>
        )}
      </svg>
      <figcaption className="display absolute inset-x-0 bottom-0 bg-white/90 p-1.5 text-center text-[15px] font-bold">{caption}</figcaption>
    </figure>
  );
}

export function Kits() {
  return (
    <section id="kits" className="bg-cream py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="display mb-3 text-[15px] font-bold tracking-[0.12em] text-fairway-deep">Team kits</p>
            <SectionTitle>Look the part</SectionTitle>
            <p className="my-4 max-w-[40ch] text-[#2a333d]">
              Every team plays in a matching kit with its own name and crest. Company teams can put their logo on the front. Kits are made to
              order, with member pricing for team owners.
            </p>
            <ButtonLink href="/claim">
              Get your team kitted out <Arrow />
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
            <Shirt color="#3e8e4e" badge="DB" badgeBg="#f5f0eb" badgeText="#3e8e4e" caption="Drop Bears" />
            <Shirt color="#f27fb2" badge="GA" badgeBg="#1b3550" badgeText="#f27fb2" caption="Galahs" />
            <div className="hidden sm:block">
              <Shirt color="#1b3550" caption="Company team" logo />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
