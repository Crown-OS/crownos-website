import {
  Beta,
  Comparison,
  Foundation,
  Hero,
  Interactions,
  Personalize,
  Showcase,
  Trust,
} from "@/components/sections";
import { Footer, Navbar } from "@/components/site";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="font-content">
          <Showcase />
          <Personalize />
          <Interactions />
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
