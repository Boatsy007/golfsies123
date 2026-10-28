import type { Metadata, Viewport } from "next";
import { Archivo, Barlow_Condensed, Yellowtail } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MotionProvider } from "@/components/Reveal";
import { siteUrl } from "@/lib/site";
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
  metadataBase: new URL(siteUrl),
  title: {
    default: "Golfsies | The Gold Coast's 6-Hole Social Golf League",
    template: "%s | Golfsies",
  },
  description:
    "3 Clubs. 6 Holes. 1 Hour. Then the Party Hole. Own a Golfsies team, enter 6-hole tournaments on the Gold Coast and climb the rankings.",
  openGraph: {
    siteName: "Golfsies",
    type: "website",
    locale: "en_AU",
  },
};

export const viewport: Viewport = {
  themeColor: "#10233a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${archivo.variable} ${barlow.variable} ${yellowtail.variable}`}>
      <body className="flex min-h-screen flex-col">
        <MotionProvider>
          <a
            href="#main"
            className="sr-only z-[60] rounded bg-navy px-4 py-2 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <SiteHeader />
          <AnnouncementBar />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
