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
import { Footer, Navbar, StructuredData } from "@/components/site";

export default function Home() {
  return (
    <>
      <StructuredData />
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
