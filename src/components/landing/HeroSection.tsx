import Link from "next/link";
import styles from "@/app/page.module.css";
import {
  ArrowRightIcon,
  DownloadIcon,
  GitHubIcon,
  SparklesIcon,
} from "../icons";
import type { Metric } from "./types";

type HeroSectionProps = {
  metrics: Metric[];
};

export function HeroSection({ metrics }: HeroSectionProps) {
  return (
    <section className={styles.heroWrap}>
      <div className={styles.heroOrbs} aria-hidden>
        <span className={`${styles.orb} ${styles.orbA}`} />
        <span className={`${styles.orb} ${styles.orbB}`} />
        <span className={`${styles.orb} ${styles.orbC}`} />
      </div>

      <div className={styles.hero}>
        <div className={styles.heroBadge}>
          <SparklesIcon />
          AI-ready Arch Linux distribution
        </div>

        <h1 className={styles.heroTitle}>
          A monochromatic OS, sharpened for the AI era.
        </h1>

        <p className={styles.heroDescription}>
          Crowncrate is a beautiful, minimalistic Arch-based Linux distribution
          for people who care about performance, open source values and a calm,
          consumer-friendly desktop. Stable fundamentals, every layer
          customizable.
        </p>

        <div className={styles.heroActions}>
          <Link href="/download" className={styles.btnPrimary}>
            <DownloadIcon /> Download ISO
          </Link>
          <a
            href="https://github.com"
            className={styles.btnSecondary}
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon /> View on GitHub
          </a>
          <Link href="/features" className={styles.btnGhost}>
            Explore features <ArrowRightIcon />
          </Link>
        </div>

        <div className={styles.metrics}>
          {metrics.map((metric) => (
            <div key={metric.value} className={styles.metric}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.terminal} aria-hidden>
          <div className={styles.terminalBar}>
            <span className={styles.terminalDot} />
            <span className={styles.terminalDot} />
            <span className={styles.terminalDot} />
            <span className={styles.terminalTitle}>~ crowncrate@archcore</span>
          </div>
          <div className={styles.terminalBody}>
            <span className={styles.terminalPrompt}>$</span> sudo pacman -Syu
            crowncrate-core{"\n"}
            <span className={styles.terminalDim}>
              :: Synchronizing package databases…
            </span>
            {"\n"}
            <span className={styles.terminalDim}>
              :: Verifying signatures…{" "}
            </span>
            <span className={styles.terminalAccent}>OK</span>
            {"\n"}
            <span className={styles.terminalDim}>
              :: Installing Crowncrate Core 1.0
            </span>
            {"\n"}
            <span className={styles.terminalPrompt}>$</span>{" "}
            <span className={styles.terminalCaret} />
          </div>
        </div>
      </div>
    </section>
  );
}
