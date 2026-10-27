import { Section } from "@/components/ui";
import { showcase } from "@/data/showcase";
import { ShowcaseCard } from "./ShowcaseCard";

export function Showcase() {
  return (
    <Section labelledBy="showcase-title">
      <h2 id="showcase-title" className="sr-only">
        Highlights
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <ShowcaseCard
          feature={showcase.spotlight}
          size="wide"
          rails={["top", "bottom"]}
        />
        {showcase.pair.map((feature, index) => (
          <ShowcaseCard
            key={feature.label}
            feature={feature}
            size="compact"
            rails={["bottom"]}
            delay={index * 90}
          />
        ))}
      </div>
    </Section>
  );
}
