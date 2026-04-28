import type { ComponentType, SVGProps } from "react";
import styles from "@/app/page.module.css";

export type MarqueeItem = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
};

type MarqueeSectionProps = {
  items: MarqueeItem[];
};

export function MarqueeSection({ items }: MarqueeSectionProps) {
  const doubled = [...items, ...items];
  return (
    <section className={styles.marquee} aria-label="Project highlights">
      <div className={styles.marqueeTrack}>
        {doubled.map((item, idx) => {
          const Icon = item.icon;
          return (
            <span key={`${item.label}-${idx}`} className={styles.marqueeItem}>
              <Icon />
              <strong>{item.value}</strong> {item.label}
            </span>
          );
        })}
      </div>
    </section>
  );
}
