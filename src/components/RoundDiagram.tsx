import { exampleScorecard } from "@/lib/site";

// Tee, green and label positions for each hole, laid out as a loop that finishes at the clubhouse.
const layout: { tee: [number, number]; green: [number, number]; label: [number, number] }[] = [
  { tee: [60, 310], green: [110, 180], label: [100, 260] },
  { tee: [150, 150], green: [270, 95], label: [200, 160] },
  { tee: [305, 125], green: [295, 245], label: [316, 195] },
  { tee: [335, 290], green: [430, 235], label: [378, 300] },
  { tee: [465, 215], green: [545, 95], label: [522, 175] },
  { tee: [600, 130], green: [565, 255], label: [588, 262] },
];

export function RoundDiagram() {
  const holes = exampleScorecard.holes;

  return (
    <figure className="m-0 bg-navy p-5 text-white sm:p-7">
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <span className="display text-2xl font-extrabold">A Golfsies round</span>
        <span className="display text-base font-semibold text-fairway">6 holes · about 60 minutes</span>
      </figcaption>
      <svg viewBox="0 0 680 360" role="img" aria-labelledby="round-desc" className="block h-auto w-full">
        <desc id="round-desc">
          Six short holes between 101 and 130 metres, played as a loop with a shotgun start. Hole 6, the Party Hole, finishes next to the
          clubhouse.
        </desc>
        <rect width="680" height="360" rx="8" fill="#14304f" />
        {/* walking path between holes */}
        <path
          d={layout
            .map((h, i) => (i === 0 ? `M ${h.green[0]} ${h.green[1]}` : `L ${h.tee[0]} ${h.tee[1]} M ${h.green[0]} ${h.green[1]}`))
            .join(" ")}
          stroke="#f5f0eb"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeDasharray="2 7"
          strokeLinecap="round"
          fill="none"
        />
        {layout.map((h, i) => {
          const hole = holes[i];
          const party = Boolean(hole.party);
          const [tx, ty] = h.tee;
          const [gx, gy] = h.green;
          const [lx, ly] = h.label;
          return (
            <g key={hole.label}>
              <line x1={tx} y1={ty} x2={gx} y2={gy} stroke="#b8c76e" strokeWidth="16" strokeLinecap="round" opacity="0.9" />
              <rect x={tx - 7} y={ty - 7} width="14" height="14" rx="3" fill="#f5f0eb" />
              <circle cx={gx} cy={gy} r="15" fill={party ? "#f27fb2" : "#7d9440"} stroke="#0b1a2b" strokeWidth="2" />
              <line x1={gx} y1={gy} x2={gx} y2={gy - 30} stroke="#f5f0eb" strokeWidth="2.5" />
              <path d={`M${gx} ${gy - 30} L ${gx + 16} ${gy - 25} L ${gx} ${gy - 20} Z`} fill={party ? "#f27fb2" : "#f5f0eb"} />
              <g className="display font-bold" transform={`translate(${lx} ${ly})`}>
                <text fontSize="22" fill={party ? "#f27fb2" : "#ffffff"}>
                  {party ? "6 · Party" : i + 1}
                </text>
                <text y="18" fontSize="14" fill="#c9d2dc">
                  {hole.metres}m
                </text>
              </g>
            </g>
          );
        })}
        {/* clubhouse */}
        <g transform="translate(440 304)">
          <rect width="96" height="40" rx="4" fill="#f5f0eb" />
          <path d="M-6 0 L 48 -22 L 102 0 Z" fill="#f5f0eb" />
          <text x="48" y="26" textAnchor="middle" fontSize="15" fill="#1b3550" className="display font-extrabold">
            Clubhouse
          </text>
        </g>
      </svg>
      <ul className="mt-4 grid gap-2 text-sm text-white/80 sm:grid-cols-3">
        <li>
          <b className="text-white">Shotgun start.</b> Every team tees off at once on a different hole.
        </li>
        <li>
          <b className="text-white">100–130m holes.</b> Short enough for a 7-iron, so anyone can play.
        </li>
        <li>
          <b className="text-white">Finish together.</b> The Party Hole ends at the clubhouse.
        </li>
      </ul>
    </figure>
  );
}
