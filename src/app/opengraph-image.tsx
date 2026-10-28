import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Golfsies: 3 clubs, 6 holes, 1 hour. Then the Party Hole.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read once at module scope; the image doesn't depend on the request.
const barlow = readFile(join(process.cwd(), "assets/og/barlow-condensed-latin-800-normal.woff"));
const yellowtail = readFile(join(process.cwd(), "assets/og/yellowtail-latin-400-normal.woff"));

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#10233a", color: "#ffffff", padding: "64px 72px", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", background: "#f5f0eb", color: "#1b3550", fontFamily: "Yellowtail", fontSize: 64, padding: "4px 28px 12px", borderRadius: 10 }}>Golfsies</div>
          <div style={{ display: "flex", fontFamily: "Barlow", fontSize: 30, color: "#b8c76e", letterSpacing: 2 }}>GOLD COAST · FOUNDING TEAMS</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Barlow", fontSize: 128, lineHeight: 0.9 }}>
          <div>3 CLUBS. 6 HOLES. 1 HOUR.</div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 64 }}>
            <span style={{ background: "#f5f0eb", color: "#1b3550", padding: "4px 16px" }}>THEN THE</span>
            <span style={{ color: "#b8c76e", paddingLeft: 18 }}>PARTY HOLE</span>
          </div>
        </div>
        <svg width="1200" height="140" viewBox="0 0 1200 140" style={{ position: "absolute", left: 0, bottom: 0 }}>
          <path d="M0 90 C 200 50, 350 60, 540 85 S 880 125, 1200 65 L 1200 140 L 0 140 Z" fill="#14304f" />
          <line x1="1040" y1="98" x2="1040" y2="24" stroke="#f5f0eb" strokeWidth="4" />
          <path d="M1040 24 L1084 37 L1040 50 Z" fill="#f27fb2" />
        </svg>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Barlow", data: await barlow, weight: 800, style: "normal" },
        { name: "Yellowtail", data: await yellowtail, weight: 400, style: "normal" },
      ],
    },
  );
}
