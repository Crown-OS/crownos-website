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

export default function Home() {
  return (
    <>
      <IntroLoader />
      <StructuredData />
      <Navbar />
      <main>
        <Hero />
        <div className="font-content">
          <Showcase />
          <Personalize />
          <Foundation />
          <Comparison />
          <Trust />
          <Beta />
        </div>
      </main>
      <Footer />
    </>
  );
}
