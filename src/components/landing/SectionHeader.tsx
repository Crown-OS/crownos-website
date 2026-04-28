import type { ComponentType, SVGProps } from "react";
import styles from "@/app/page.module.css";

type SectionHeaderProps = {
  eyebrow: string;
  eyebrowIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  subtitle?: string;
};

export function SectionHeader({
  eyebrow,
  eyebrowIcon: Icon,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <p className={styles.sectionEyebrow}>
        {Icon ? <Icon /> : null}
        {eyebrow}
      </p>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {subtitle ? <p className={styles.sectionSubtitle}>{subtitle}</p> : null}
    </div>
  );
}
