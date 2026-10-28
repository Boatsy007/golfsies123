import type { Metadata } from "next";
import { Archivo, Barlow_Condensed, Yellowtail } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const yellowtail = Yellowtail({
  variable: "--font-yellowtail",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Golfsies | The Gold Coast's 6-Hole Social Golf League",
  description:
    "3 Clubs. 6 Holes. 1 Hour. Then the Party Hole. Own a Golfsies team, enter 6-hole tournaments on the Gold Coast and climb the rankings.",
  openGraph: {
    title: "Golfsies | 3 Clubs. 6 Holes. 1 Hour.",
    description: "Own a team, enter 6-hole tournaments and climb the Golfsies Rankings. Claim your Founding Team name free.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${archivo.variable} ${barlow.variable} ${yellowtail.variable}`}>
      <body>{children}</body>
    </html>
  );
}
