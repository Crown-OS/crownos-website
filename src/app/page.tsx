import {
  Download,
  Ecosystem,
  Hero,
  Manifesto,
  MarqueeBand,
  Pillars,
  SystemShowcase,
} from "@/components/sections";
import { Footer, Navbar } from "@/components/site";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeBand />
        <Manifesto />
        <Pillars />
        <Ecosystem />
        <SystemShowcase />
        <Download />
      </main>
      <Footer />
    </>
  );
}
