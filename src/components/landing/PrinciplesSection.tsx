import styles from "@/app/page.module.css";
import { LayersIcon } from "../icons";
import { SectionHeader } from "./SectionHeader";
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
      <div className={styles.philosophyGrid}>
        {principles.map((principle) => {
          const Icon = principle.icon;
          return (
            <div key={principle.title} className={styles.philosophyCard}>
              <div className={styles.philosophyIcon}>
                <Icon className={styles.icon} />
              </div>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
