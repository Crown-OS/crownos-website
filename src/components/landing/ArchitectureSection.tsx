import styles from "@/app/page.module.css";
import {
  CpuIcon,
  CustomizabilityIcon,
  DatabaseIcon,
  LayersIcon,
  LinuxIcon,
  ServerIcon,
} from "../icons";
import { SectionHeader } from "./SectionHeader";

const stack = [
  {
    icon: LinuxIcon,
    title: "Arch Linux core",
    description:
      "Rolling-release base with hardened defaults, sane init and minimal cruft.",
    chips: ["Linux 6.x", "systemd", "Wayland"],
  },
  {
    icon: CpuIcon,
    title: "Custom scheduler",
    description:
      "Latency-tuned kernel scheduling that prioritises foreground responsiveness.",
    chips: ["BORE-EEVDF", "auto-nice", "low-latency audio"],
  },
  {
    icon: LayersIcon,
    title: "Composited shell",
    description:
      "Monochromatic compositor with smooth animations and zero forced motion.",
    chips: ["Hyprcrate", "GTK + Qt", "fractional scale"],
  },
  {
    icon: DatabaseIcon,
    title: "Atomic upgrades",
    description:
      "Snapshot every system change. Roll back from the boot menu in one click.",
    chips: ["btrfs", "snapper", "boot-rollback"],
  },
  {
    icon: ServerIcon,
    title: "Local AI runtime",
    description:
      "Bundled inference runtime — works offline, optionally bridges to remote models.",
    chips: ["ggml", "ONNX", "Vulkan / CUDA"],
  },
  {
    icon: CustomizabilityIcon,
    title: "Declarative config",
    description:
      "One config tree. Reproducible installs across all your machines.",
    chips: ["TOML profiles", "dotfile sync", "diffs"],
  },
];

export function ArchitectureSection() {
  return (
    <section id="architecture">
      <SectionHeader
        eyebrow="Under the hood"
        eyebrowIcon={CpuIcon}
        title="A measured stack — every layer chosen for clarity."
        subtitle="Crowncrate keeps the powerful parts of Arch and removes the friction. Performance and openness, top to bottom."
      />

      <div className={styles.archGrid}>
        {stack.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className={styles.archCard}>
              <div className={styles.archHeader}>
                <div className={styles.featureIconWrapper}>
                  <Icon className={styles.icon} />
                </div>
                <h3>{item.title}</h3>
              </div>
              <p className={styles.archDesc}>{item.description}</p>
              <div className={styles.archMeta}>
                {item.chips.map((chip) => (
                  <span key={chip} className={styles.archChip}>
                    {chip}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
