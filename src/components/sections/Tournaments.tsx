import { foundingSpots, tournaments, type EventBadge } from "@/lib/site";
import { Arrow, BarTitle, ButtonLink, cn } from "../ui";

const badgeStyles: Record<EventBadge, string> = {
  free: "bg-pink text-navy-ink",
  members: "bg-fairway text-navy-ink",
  coming: "border-[1.5px] border-navy text-navy",
  top: "border-[1.5px] border-navy text-navy",
};

export function TournamentCalendar({ limit, title = "Tournament calendar" }: { limit?: number; title?: string }) {
  const items = limit ? tournaments.slice(0, limit) : tournaments;
  return (
    <div>
      <BarTitle>{title}</BarTitle>
      <ul className="bg-white">
        {items.map((t) => (
          <li
            key={t.name}
            className="grid grid-cols-[72px_1fr] items-center gap-4 border-b border-line px-3.5 py-4 last:border-b-0 even:bg-cream sm:grid-cols-[92px_1fr_auto]"
          >
            <div className="display rounded-md border-2 border-navy px-1 py-2 text-center text-lg leading-none font-extrabold text-navy">
              {t.when}
              <small className="mt-1 block text-xs text-muted">{t.tag}</small>
            </div>
            <div>
              <h3 className="display text-[21px] leading-tight font-extrabold text-navy">{t.name}</h3>
              <p className="mt-1 text-sm text-muted">{t.blurb}</p>
            </div>
            <span
              className={cn(
                "display col-start-2 justify-self-start rounded-full px-2.5 py-1 text-[13px] font-bold whitespace-nowrap sm:col-start-auto",
                badgeStyles[t.badge],
              )}
            >
              {t.badgeLabel}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Empty state until the first tournament has been played.
export function RankingsBoard() {
  return (
    <div id="rankings">
      <BarTitle>Golfsies Rankings</BarTitle>
      <div className="border-2 border-t-0 border-dashed border-navy/30 bg-white px-6 py-10 text-center">
        <svg viewBox="0 0 48 48" aria-hidden="true" className="mx-auto mb-4 h-12 w-12">
          <path d="M14 6h20v10a10 10 0 0 1-20 0z" fill="#b8c76e" stroke="#1b3550" strokeWidth="2.5" />
          <path d="M14 10H7v3a7 7 0 0 0 7 7M34 10h7v3a7 7 0 0 1-7 7" fill="none" stroke="#1b3550" strokeWidth="2.5" />
          <path d="M24 26v8M16 42h16l-2-8H18z" fill="#1b3550" stroke="#1b3550" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
        <h3 className="display text-[26px] leading-none font-extrabold text-navy">The board is empty. For now.</h3>
        <p className="mx-auto mt-3 mb-6 max-w-[34ch] text-muted">
          Rankings go live after the first Golfsies Cup. Every team starts on zero, and Founding Teams are on the board from day one.
        </p>
        <ButtonLink href="/claim">
          Claim a spot <Arrow />
        </ButtonLink>
        <p className="mt-4 text-[13px] text-muted">
          {foundingSpots.left} of {foundingSpots.total} Founding spots left
        </p>
      </div>
    </div>
  );
}
