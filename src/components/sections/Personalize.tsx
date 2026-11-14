import { Section, SectionHeading } from "@/components/ui";
import { personalize } from "@/data/personalize";
import type { CatalogCount, PocketReadout } from "@/data/pocket";
import { loadPlugins } from "@/util/catalog";
import { PocketCard } from "./pocket/PocketCard";

const STAGGER_MS = 90;

async function loadCounts(): Promise<Record<CatalogCount, number>> {
  return { plugins: (await loadPlugins()).length };
}

function resolveReadout(
  readout: PocketReadout,
  counts: Record<CatalogCount, number>,
) {
  if ("value" in readout) return readout;
  const { count, ...rest } = readout;
  return { ...rest, value: String(counts[count]) };
}

export async function Personalize() {
  const counts = await loadCounts();
  return (
    <Section labelledBy="personalize-title">
      <SectionHeading
        id="personalize-title"
        {...personalize.heading}
        pattern="cross"
      />
      <div className="mt-stack grid grid-cols-1 gap-grid md:grid-cols-2 lg:grid-cols-3">
        {personalize.cards.map((card, index) => (
          <PocketCard
            key={card.title}
            {...card}
            readout={resolveReadout(card.readout, counts)}
            delay={index * STAGGER_MS}
          />
        ))}
      </div>
    </Section>
  );
}
