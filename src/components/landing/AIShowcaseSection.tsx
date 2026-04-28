import styles from "@/app/page.module.css";
import {
  BrainIcon,
  FilterIcon,
  ImageIcon,
  SparklesIcon,
  TerminalIcon,
  WandIcon,
} from "../icons";
import { SectionHeader } from "./SectionHeader";

const points = [
  {
    icon: WandIcon,
    title: "On-device AI assist",
    description:
      "A native helper that summarises, rewrites and answers — running locally by default.",
  },
  {
    icon: TerminalIcon,
    title: "Smart shell",
    description:
      "Natural language commands compile to safe shell intent. Always preview, never blind-run.",
  },
  {
    icon: ImageIcon,
    title: "Generative tooling",
    description:
      "Image, audio and document workflows wired into the file manager — no extra installs.",
  },
  {
    icon: FilterIcon,
    title: "Search that understands",
    description:
      "Semantic spotlight across files, settings and apps. Privacy-first index, fully local.",
  },
];

export function AIShowcaseSection() {
  return (
    <section id="ai">
      <SectionHeader
        eyebrow="AI Native"
        eyebrowIcon={SparklesIcon}
        title="Intelligence woven through the desktop, not bolted on."
        subtitle="Crowncrate brings AI capabilities to every layer — from the shell to the file manager — while staying local-first by default."
      />

      <div className={styles.aiShowcase}>
        <div className={styles.aiCopy}>
          <div className={styles.aiPoints}>
            {points.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className={styles.aiPoint}>
                  <div className={styles.featureIconWrapper}>
                    <Icon className={styles.icon} />
                  </div>
                  <div>
                    <h4>{point.title}</h4>
                    <p>{point.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.aiVisual} aria-hidden>
          <div className={styles.aiVisualBubble}>
            <BrainIcon /> Crowncrate Assist · Local model
          </div>
          <div className={styles.aiChat}>
            <div className={`${styles.aiMsg} ${styles.aiMsgUser}`}>
              Free up disk on the dev partition without touching projects.
            </div>
            <div className={styles.aiMsg}>
              Found 14.2 GB recoverable: pacman cache (4.8 GB), build artifacts
              (6.1 GB), unused flatpaks (3.3 GB). Preview the plan?
            </div>
            <div className={`${styles.aiMsg} ${styles.aiMsgTyping}`}>
              <span /> <span /> <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
