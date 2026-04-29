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

const aiIconTile =
  "relative inline-flex size-[2.25rem] items-center justify-center rounded-md border border-border bg-icon-tile text-foreground shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-foreground)_12%,transparent)]";

const aiMsg =
  "rounded-2xl border border-border bg-[color-mix(in_srgb,var(--color-background)_50%,transparent)] px-[0.95rem] py-3 text-[0.9rem] leading-[1.5] text-muted-strong backdrop-blur-[12px]";

export function AIShowcaseSection() {
  return (
    <section id="ai">
      <SectionHeader
        eyebrow="AI Native"
        eyebrowIcon={SparklesIcon}
        title="Intelligence woven through the desktop, not bolted on."
        subtitle="CrownOS brings AI capabilities to every layer — from the shell to the file manager — while staying local-first by default."
      />

      <div className="grid grid-cols-[1.1fr_1fr] items-center gap-8 max-[1024px]:grid-cols-1">
        <div className="grid gap-4">
          <div className="mt-2 grid gap-3">
            {points.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="grid grid-cols-[2.25rem_1fr] items-start gap-[0.85rem]"
                >
                  <div className={aiIconTile}>
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h4 className="mb-[0.15rem] text-[1rem] tracking-[-0.015em]">
                      {point.title}
                    </h4>
                    <p className="text-[0.92rem] leading-[1.55] text-muted">
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          aria-hidden
          className="relative isolate grid min-h-[22rem] content-between overflow-hidden rounded-2xl border border-border p-5 bg-ai-visual"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-[color-mix(in_srgb,var(--color-foreground)_4%,transparent)] px-[0.8rem] py-[0.4rem] text-[0.82rem] text-muted-strong backdrop-blur-[6px] [&>svg]:size-[0.85rem]">
            <BrainIcon /> CrownOS Assist · Local model
          </div>
          <div className="grid gap-2">
            <div
              className={`${aiMsg} justify-self-end bg-cta border-[color-mix(in_srgb,var(--color-foreground)_35%,transparent)] text-accent-fg`}
            >
              Free up disk on the dev partition without touching projects.
            </div>
            <div className={aiMsg}>
              Found 14.2 GB recoverable: pacman cache (4.8 GB), build artifacts
              (6.1 GB), unused flatpaks (3.3 GB). Preview the plan?
            </div>
            <div
              className={`${aiMsg} inline-flex w-fit items-center gap-1 [&>span]:size-[0.4rem] [&>span]:rounded-full [&>span]:bg-muted [&>span]:animate-pulse-glow [&>span:nth-child(2)]:[animation-delay:0.2s] [&>span:nth-child(3)]:[animation-delay:0.4s]`}
            >
              <span /> <span /> <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
