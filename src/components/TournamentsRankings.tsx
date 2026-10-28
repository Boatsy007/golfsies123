import { rankings, tournaments, type EventBadge } from "@/lib/site";
import { Reveal } from "./Reveal";
import { BarTitle, cn, Container, Crest } from "./ui";

const badgeStyles: Record<EventBadge, string> = {
  free: "bg-pink text-navy-ink",
  members: "bg-fairway text-navy-ink",
  coming: "border-[1.5px] border-navy text-navy",
  top: "border-[1.5px] border-navy text-navy",
};

export function TournamentsRankings() {
  return (
    <section id="tournaments" className="py-16 sm:py-24">
      <Container>
        <div className="mb-2.5 flex justify-between gap-3 text-sm text-muted">
          <span>Dates and venues will be announced to Founding Teams first.</span>
          <a href="#faq" className="text-ink underline">
            How ranking points work →
          </a>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <Reveal className="min-w-0">
            <BarTitle>Tournament Calendar</BarTitle>
            <ul className="bg-white">
              {tournaments.map((t) => (
                <li
                  key={t.name}
                  className="grid grid-cols-[72px_1fr] items-center gap-4 border-b border-line px-3.5 py-4 even:bg-cream sm:grid-cols-[92px_1fr_auto]"
                >
                  <div className="display rounded-md border-2 border-navy px-1 py-2 text-center text-lg leading-none font-extrabold text-navy">
                    {t.when}
                    <small className="mt-1 block text-xs text-muted">{t.tag}</small>
                  </div>
                  <div>
                    <h4 className="display text-[21px] leading-tight font-extrabold text-navy">{t.name}</h4>
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
          </Reveal>

          <Reveal delay={0.1} className="min-w-0">
            <div id="rankings">
              <BarTitle>Golfsies Rankings</BarTitle>
              <div className="overflow-x-auto bg-white">
                <table className="w-full min-w-[340px] border-collapse text-sm sm:text-[15px]">
                  <thead>
                    <tr className="display border-b border-line text-left text-[13px] font-bold tracking-wide">
                      <th className="px-2 py-3 sm:px-2.5">Pos</th>
                      <th className="px-2 py-3 sm:px-2.5">Team</th>
                      <th className="px-2 py-3 sm:px-2.5">Events</th>
                      <th className="px-2 py-3 sm:px-2.5">Wins</th>
                      <th className="px-2 py-3 sm:px-2.5">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankings.map((r) => (
                      <tr key={r.team.name} className="even:bg-cream">
                        <td className="px-2 py-2.5 sm:px-2.5">–</td>
                        <td className="px-2 py-2.5 sm:px-2.5">
                          <span className="flex items-center gap-2.5 font-semibold underline underline-offset-2">
                            <Crest short={r.team.short} color={r.team.color} text={r.team.text} />
                            {r.team.name}
                          </span>
                        </td>
                        <td className="px-2 py-2.5 sm:px-2.5">{r.events}</td>
                        <td className="px-2 py-2.5 sm:px-2.5">{r.wins}</td>
                        <td className="px-2 py-2.5 sm:px-2.5">{r.points}</td>
                      </tr>
                    ))}
                    <tr className="even:bg-cream">
                      <td className="px-2 py-2.5 sm:px-2.5">–</td>
                      <td className="px-2 py-2.5 sm:px-2.5">
                        <a href="#register" className="flex items-center gap-2.5 font-semibold underline underline-offset-2">
                          <span className="display grid h-[30px] w-[30px] place-items-center rounded-md border-2 border-dashed border-navy text-[13px] font-extrabold text-navy">
                            ?
                          </span>
                          Your team?
                        </a>
                      </td>
                      <td className="px-2 py-2.5 sm:px-2.5">–</td>
                      <td className="px-2 py-2.5 sm:px-2.5">–</td>
                      <td className="px-2 py-2.5 sm:px-2.5">–</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2.5 text-[13px] text-muted">Example teams shown. Every team starts on zero.</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
