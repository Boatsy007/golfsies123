import { teams } from "@/lib/site";
import { Reveal } from "../Reveal";
import { Arrow, ButtonLink, Container, Eyebrow, SectionTitle } from "../ui";

// Where each example team sits on the map: the dot on the coast and the label box.
const pins: Record<string, { dot: [number, number]; label: [number, number]; seaSide?: boolean }> = {
  "Birdie Bandits": { dot: [286, 60], label: [36, 30] },
  Hitters: { dot: [290, 130], label: [36, 112] },
  Stingers: { dot: [296, 205], label: [366, 166], seaSide: true },
  Barras: { dot: [300, 255], label: [36, 242] },
  "Drop Bears": { dot: [262, 300], label: [36, 316] },
  Galahs: { dot: [308, 330], label: [376, 330], seaSide: true },
  Strikers: { dot: [318, 410], label: [36, 400] },
};

const coast = "M318 0 C 312 60, 300 110, 296 150 C 292 190, 300 230, 304 270 C 310 330, 318 380, 326 430 C 334 480, 350 520, 372 560";

export function TeamsMap() {
  return (
    <section id="teams" className="bg-cream py-16 sm:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <Eyebrow>Teams</Eyebrow>
          <SectionTitle>Rep your suburb</SectionTitle>
          <p className="mb-6.5 max-w-[40ch] text-lg text-[#2a333d]">
            Pick a name, design a crest, get a kit and represent your suburb. Once a name is claimed it&apos;s yours, and no other team can use it.
          </p>
          <ButtonLink href="/claim">
            Claim your team <Arrow />
          </ButtonLink>
          <p className="mt-4 max-w-[40ch] text-[13px] text-muted">The map shows example team names. Founding Teams will appear here as names are confirmed.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <svg viewBox="0 0 520 560" role="img" aria-label="Map of the Gold Coast coastline with example team names placed in suburbs from Hope Island to Coolangatta" className="block h-auto w-full">
            <rect width="520" height="560" fill="#f5f0eb" />
            <path d={`${coast} L 520 560 L 520 0 Z`} fill="#dce4ec" />
            <path d="M300 30 C 286 60, 282 100, 290 140 C 294 120, 296 80, 304 40 Z" fill="#dce4ec" />
            <path d={coast} fill="none" stroke="#1b3550" strokeWidth="3" />
            <text x="496" y="190" fill="#8fa3b6" fontSize="20" letterSpacing="4" transform="rotate(90 496 190)" className="display font-bold">
              Coral Sea
            </text>

            <g className="display font-bold" fontSize="20">
              {teams.map((t) => {
                const p = pins[t.name];
                if (!p) return null;
                const [dx, dy] = p.dot;
                const [lx, ly] = p.label;
                const lineEnd = p.seaSide ? [lx - 6, ly + 24] : [lx + 140, ly + 22];
                return (
                  <g key={t.name}>
                    <path d={`M${dx} ${dy} L ${lineEnd[0]} ${lineEnd[1]}`} stroke="#1b3550" strokeDasharray="4 5" strokeWidth="1.4" fill="none" />
                    <circle cx={dx} cy={dy} r="6" fill="#1b3550" />
                    <g transform={`translate(${lx} ${ly})`}>
                      <rect width="40" height="40" rx="8" fill={t.color} />
                      <text x="20" y="27" fontSize="18" textAnchor="middle" fill={t.text}>
                        {t.short}
                      </text>
                      <text x="50" y="18" fill="#1b3550">
                        {t.name}
                      </text>
                      <text x="50" y="38" fontSize="14" fill={p.seaSide ? "#4d6175" : "#5d6670"}>
                        {t.suburb}
                      </text>
                    </g>
                  </g>
                );
              })}
              <path d="M344 515 L 400 500" stroke="#1b3550" strokeDasharray="4 5" strokeWidth="1.4" fill="none" />
              <circle cx="344" cy="515" r="6" fill="#1b3550" />
              <g transform="translate(366 480)">
                <rect width="40" height="40" rx="8" fill="none" stroke="#1b3550" strokeWidth="2" strokeDasharray="4 4" />
                <text x="20" y="27" fontSize="18" textAnchor="middle" fill="#1b3550">
                  ?
                </text>
                <text x="50" y="18" fill="#1b3550">
                  Your team
                </text>
                <text x="50" y="38" fontSize="14" fill="#4d6175">
                  Coolangatta
                </text>
              </g>
            </g>
          </svg>
        </Reveal>
      </Container>
    </section>
  );
}
