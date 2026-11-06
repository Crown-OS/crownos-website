import { Section } from "@/components/ui";
import { showcase } from "@/data/showcase";
import { PocketCard } from "./pocket/PocketCard";

const STAGGER_MS = 90;

type RailEdge = "top" | "bottom";

function Rail({ edge }: { edge: RailEdge }) {
  const placement = edge === "top" ? "bottom-full" : "top-full hidden md:block";
  return (
    <span
      aria-hidden
      className={`absolute left-1/2 h-frame-y w-px -translate-x-1/2 bg-border-strong ${placement}`}
    />
  );
}

export function Showcase() {
  return (
    <Section labelledBy="showcase-title">
      <h2 id="showcase-title" className="sr-only">
        Highlights
      </h2>
      <div className="grid gap-grid md:grid-cols-2">
        <div className="relative grid md:col-span-2">
          <Rail edge="top" />
          <Rail edge="bottom" />
          <PocketCard {...showcase.spotlight} size="wide" />
        </div>
        {showcase.pair.map((feature, index) => (
          <div key={feature.title} className="relative grid">
            <Rail edge="bottom" />
            <PocketCard
              {...feature}
              size="tall"
              delay={(index + 1) * STAGGER_MS}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
