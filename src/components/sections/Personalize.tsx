import { Section, SectionHeading } from "@/components/ui";
import { personalize } from "@/data/personalize";
import { FlipCard } from "./FlipCard";

const STAGGER_MS = 90;

export function Personalize() {
  return (
    <Section labelledBy="personalize-title">
      <SectionHeading id="personalize-title" {...personalize.heading} />
      <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {personalize.cards.map((card, index) => (
          <FlipCard key={card.title} {...card} delay={index * STAGGER_MS} />
        ))}
      </div>
    </Section>
  );
}
