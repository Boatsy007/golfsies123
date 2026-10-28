import { AnnouncementBar } from "@/components/AnnouncementBar";
import { ClaimForm } from "@/components/ClaimForm";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Intro } from "@/components/Intro";
import { Kits } from "@/components/Kits";
import { MotionProvider } from "@/components/Reveal";
import { Nav } from "@/components/Nav";
import { NewsFeed } from "@/components/NewsFeed";
import { OwnATeam } from "@/components/OwnATeam";
import { Partners } from "@/components/Partners";
import { Rules } from "@/components/Rules";
import { TeamsMap } from "@/components/TeamsMap";
import { TournamentsRankings } from "@/components/TournamentsRankings";

export default function Home() {
  return (
    <MotionProvider>
      <Nav />
      <AnnouncementBar />
      <main id="top">
        <Hero />
        <Intro />
        <HowItWorks />
        <OwnATeam />
        <TeamsMap />
        <TournamentsRankings />
        <Kits />
        <Rules />
        <NewsFeed />
        <Faq />
        <ClaimForm />
        <Partners />
      </main>
      <Footer />
    </MotionProvider>
  );
}
