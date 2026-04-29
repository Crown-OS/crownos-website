import { LayersIcon } from "../icons";
import { SectionHeader } from "./SectionHeader";
import { iconTile } from "./styles";
import type { Principle } from "./types";

type PrinciplesSectionProps = {
  principles: Principle[];
};

export function PrinciplesSection({ principles }: PrinciplesSectionProps) {
  return (
    <section id="principles">
      <SectionHeader
        eyebrow="Core Principles"
        eyebrowIcon={LayersIcon}
        title="Built on first principles, refined for daily use."
        subtitle="High performance, true openness, and deep control with a calm, minimal surface."
      />
      <div className="grid grid-cols-3 gap-4 max-[1024px]:grid-cols-1">
        {principles.map((principle) => {
          const Icon = principle.icon;
          return (
            <div
              key={principle.title}
              className="relative isolate grid gap-[0.85rem] overflow-hidden rounded-xl border border-border bg-card p-[1.4rem] transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-foreground)_30%,transparent)] hover:shadow-pop before:absolute before:inset-0 before:-z-10 before:bg-card-radial before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
            >
              <div className={iconTile}>
                <Icon className="size-5" />
              </div>
              <h3 className="text-[1.08rem] tracking-[-0.02em]">
                {principle.title}
              </h3>
              <p className="text-[0.95rem] leading-[1.55] text-muted">
                {principle.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
