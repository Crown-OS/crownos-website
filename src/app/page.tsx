import {
  AIShowcaseSection,
  ArchitectureSection,
  DownloadSection,
  EcosystemSection,
  ecosystemFeatures,
  FAQSection,
  Footer,
  HeroSection,
  heroMetrics,
  MarqueeSection,
  marqueeItems,
  Navbar,
  PrinciplesSection,
  principles,
  TestimonialsSection,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="relative z-[1] mx-auto w-[min(1200px,100%-3rem)] pt-[5rem] pb-12 max-[720px]:w-[min(1200px,100%-1.25rem)] max-[720px]:pt-[4.5rem]">
      <Navbar />

      <main className="grid gap-[clamp(5rem,11vw,9rem)] pt-[clamp(3rem,8vw,6rem)]">
        <HeroSection metrics={heroMetrics} />
        <MarqueeSection items={marqueeItems} />
        <PrinciplesSection principles={principles} />
        <AIShowcaseSection />
        <EcosystemSection features={ecosystemFeatures} />
        <ArchitectureSection />
        <TestimonialsSection />
        <FAQSection />
        <DownloadSection />
      </main>

      <Footer />
    </div>
  );
}
