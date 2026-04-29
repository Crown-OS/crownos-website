import Link from "next/link";
import {
  ArrowRightIcon,
  DownloadIcon,
  GitHubIcon,
  SparklesIcon,
} from "../icons";
import { btnGhost, btnPrimary, btnSecondary } from "./styles";
import type { Metric } from "./types";

type HeroSectionProps = {
  metrics: Metric[];
};

export function HeroSection({ metrics }: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-border bg-hero p-[clamp(2rem,5vw,4rem)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -top-32 -left-24 size-[22rem] rounded-full opacity-55 blur-[70px] bg-orb-strong animate-float" />
        <span className="absolute -bottom-40 -right-16 size-[28rem] rounded-full opacity-55 blur-[70px] bg-orb-medium animate-float-slow" />
        <span className="absolute right-[30%] top-[30%] size-[14rem] rounded-full opacity-40 blur-[50px] bg-orb-soft animate-pulse-glow-slow" />
      </div>

      <div className="relative grid max-w-[60rem] gap-7">
        <div className="inline-flex w-fit items-center gap-[0.55rem] rounded-full border border-border bg-[color-mix(in_srgb,var(--color-foreground)_4%,transparent)] px-[0.85rem] py-[0.4rem] text-[0.85rem] text-muted-strong backdrop-blur-[6px] [&>svg]:size-[0.9rem]">
          <SparklesIcon />
          AI-ready Arch Linux distribution
        </div>

        <h1 className="max-w-[18ch] text-[clamp(2.5rem,6vw,5.4rem)] leading-[0.98] tracking-[-0.05em] text-balance text-gradient">
          An Operating System that doesn't suck.
        </h1>

        <p className="max-w-[60ch] text-[clamp(1rem,1.5vw,1.18rem)] leading-[1.65] text-muted-strong">
          CrownOS is a beautiful, minimalistic Arch-based Linux for people who
          care about performance, open source values and a calm,
          consumer-friendly desktop. Stable fundamentals, every layer
          customizable.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="/download" className={btnPrimary}>
            <DownloadIcon /> Download ISO
          </Link>
          <a
            href="https://github.com"
            className={btnSecondary}
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon /> View on GitHub
          </a>
          <Link href="/features" className={btnGhost}>
            Explore features <ArrowRightIcon />
          </Link>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-[0.85rem] max-[720px]:grid-cols-1">
          {metrics.map((metric) => (
            <div
              key={metric.value}
              className="relative grid gap-[0.3rem] overflow-hidden rounded-2xl border border-border bg-[color-mix(in_srgb,var(--color-background)_60%,transparent)] px-[1.1rem] py-4 backdrop-blur-[12px] before:pointer-events-none before:absolute before:inset-0 before:bg-card-radial before:opacity-50"
            >
              <strong className="text-[1.05rem] tracking-[-0.01em]">
                {metric.value}
              </strong>
              <span className="text-[0.86rem] leading-[1.45] text-muted">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        <div
          aria-hidden
          className="mt-4 overflow-hidden rounded-2xl border border-border bg-[color-mix(in_srgb,var(--color-pitch)_60%,transparent)] backdrop-blur-[12px] shadow-pop"
        >
          <div className="flex items-center gap-[0.4rem] border-b border-border bg-[color-mix(in_srgb,var(--color-foreground)_4%,transparent)] px-[0.9rem] py-[0.65rem]">
            <span className="size-[0.625rem] rounded-full bg-gray-700" />
            <span className="size-[0.625rem] rounded-full bg-gray-700" />
            <span className="size-[0.625rem] rounded-full bg-gray-700" />
            <span className="ml-2 font-mono text-[0.78rem] text-muted">
              ~ crownos@archcore
            </span>
          </div>
          <div className="whitespace-pre-wrap px-[1.1rem] py-4 font-mono text-[0.83rem] leading-[1.7] text-muted-strong">
            <span className="text-foreground">$</span> sudo pacman -Syu
            crownos-core{"\n"}
            <span className="text-gray-500">
              :: Synchronizing package databases…
            </span>
            {"\n"}
            <span className="text-gray-500">:: Verifying signatures… </span>
            <span className="text-foreground">OK</span>
            {"\n"}
            <span className="text-gray-500">
              :: Installing CrownOS Core 1.0
            </span>
            {"\n"}
            <span className="text-foreground">$</span>{" "}
            <span className="inline-block h-4 w-2 align-text-bottom bg-foreground animate-caret" />
          </div>
        </div>
      </div>
    </section>
  );
}
