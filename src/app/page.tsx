import { IntroOverlay } from "@/components/intro";
import {
  Download,
  Ecosystem,
  Hero,
  MarqueeBand,
  OurVision,
  Pillars,
  Solutions,
  SystemShowcase,
} from "@/components/sections";
import { Footer, Navbar } from "@/components/site";

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <Navbar />
      <main>
        <Hero />
        <MarqueeBand />
        <OurVision />
        <Solutions />
        <Pillars />
        <Ecosystem />
        <SystemShowcase />
        <Download />
      </main>
      <Footer />
    </>
  );
}
