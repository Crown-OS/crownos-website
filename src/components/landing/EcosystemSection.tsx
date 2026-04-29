import { RefreshIcon } from "../icons";
import { SectionHeader } from "./SectionHeader";
import type { EcosystemFeature } from "./types";

type EcosystemSectionProps = {
  features: EcosystemFeature[];
};

const featureIconTile =
  "relative inline-flex size-[2.6rem] items-center justify-center rounded-md border border-border bg-icon-tile text-foreground shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-foreground)_12%,transparent)]";

export function EcosystemSection({ features }: EcosystemSectionProps) {
  return (
    <section id="ecosystem">
      <SectionHeader
        eyebrow="Ecosystem Stack"
        eyebrowIcon={RefreshIcon}
        title="A seamless ecosystem that follows you between devices."
        subtitle="One coherent system to keep your phone, tablet and desktop in lockstep — without breaking your focus."
      />
      <div className="grid grid-cols-4 gap-4 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article
              key={feature.name}
              className="relative isolate grid gap-3 overflow-hidden rounded-xl border border-border bg-card p-5 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-foreground)_30%,transparent)] hover:shadow-pop before:absolute before:inset-0 before:-z-10 before:bg-card-radial before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
            >
              <div className={featureIconTile}>
                <Icon className="size-5" />
              </div>
              <h3 className="text-[1.08rem] tracking-[-0.02em]">
                {feature.name}
              </h3>
              <p className="text-[0.95rem] leading-[1.55] text-muted">
                {feature.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
