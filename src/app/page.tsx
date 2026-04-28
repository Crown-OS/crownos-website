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
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
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
