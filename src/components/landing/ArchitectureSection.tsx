import {
  CpuIcon,
  CustomizabilityIcon,
  DatabaseIcon,
  LayersIcon,
  LinuxIcon,
  ServerIcon,
} from "../icons";
import { SectionHeader } from "./SectionHeader";
import { archChip, iconTile } from "./styles";

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
    chips: ["Hyprcrown", "GTK + Qt", "fractional scale"],
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
        subtitle="CrownOS keeps the powerful parts of Arch and removes the friction. Performance and openness, top to bottom."
      />

      <div className="grid grid-cols-3 gap-4 max-[1024px]:grid-cols-1">
        {stack.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="relative isolate grid gap-[0.85rem] overflow-hidden rounded-2xl border border-border bg-card p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-foreground)_25%,transparent)] after:absolute after:inset-x-[-1px] after:top-[-1px] after:h-px after:opacity-50 after:bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-foreground)_35%,transparent),transparent)]"
            >
              <div className="flex items-center gap-3">
                <div className={iconTile}>
                  <Icon className="size-5" />
                </div>
                <h3 className="text-[1.05rem]">{item.title}</h3>
              </div>
              <p className="text-[0.93rem] leading-[1.55] text-muted">
                {item.description}
              </p>
              <div className="mt-1 flex flex-wrap gap-[0.4rem]">
                {item.chips.map((chip) => (
                  <span key={chip} className={archChip}>
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
