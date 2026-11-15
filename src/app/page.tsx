import type { Metadata } from "next";
import { IntroLoader } from "@/components/intro/IntroLoader";
import { Agent } from "@/components/sections/Agent";
import { Benchmarks } from "@/components/sections/Benchmarks";
import { BlogHighlights } from "@/components/sections/BlogHighlights";
import { CrownLink } from "@/components/sections/CrownLink";
import { Hero } from "@/components/sections/Hero";
import { Platform } from "@/components/sections/Platform";
import { Team } from "@/components/sections/Team";
import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/site/Footer";
import { homeStructuredData } from "@/data/structured-data";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <JsonLd data={homeStructuredData} />
      <main>
        <IntroLoader />
        <Hero />
        <Benchmarks />
        <Agent />
        <Platform />
        <CrownLink />
        <BlogHighlights />
        <Team />
      </main>
      <Footer />
    </>
  );
}
