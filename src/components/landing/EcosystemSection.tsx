import styles from "@/app/page.module.css";
import { RefreshIcon } from "../icons";
import { SectionHeader } from "./SectionHeader";
import type { EcosystemFeature } from "./types";

type EcosystemSectionProps = {
  features: EcosystemFeature[];
};

export function EcosystemSection({ features }: EcosystemSectionProps) {
  return (
    <section id="ecosystem">
      <SectionHeader
        eyebrow="Ecosystem Stack"
        eyebrowIcon={RefreshIcon}
        title="A seamless ecosystem that follows you between devices."
        subtitle="One coherent system to keep your phone, tablet and desktop in lockstep — without breaking your focus."
      />
      <div className={styles.featureGrid}>
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article key={feature.name} className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Icon className={styles.icon} />
              </div>
              <h3 className={styles.featureName}>{feature.name}</h3>
              <p className={styles.featureDesc}>{feature.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
