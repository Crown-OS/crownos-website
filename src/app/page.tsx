import { IntroLoader } from "@/components/motion";
import {
  Beta,
  Comparison,
  Foundation,
  Hero,
  Personalize,
  Showcase,
  Trust,
} from "@/components/sections";
import { Footer, Navbar, StructuredData } from "@/components/site";
import { SeamedSections } from "@/components/ui";

export default function Home() {
  return (
    <>
      <IntroLoader />
      <StructuredData />
      <Navbar />
      <main>
        <Hero />
        <div className="landing-type">
          <SeamedSections>
            <Showcase />
            <Personalize />
            <Foundation />
            <Comparison />
            <Trust />
            <Beta />
          </SeamedSections>
        </div>
      </main>
      <Footer />
    </>
  );
}
