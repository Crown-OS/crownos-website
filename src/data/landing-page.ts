import {
  AuraNetIcon,
  CanvasExtensionIcon,
  ContinuumBoardIcon,
  CustomizabilityIcon,
  EchoAlertsIcon,
  GitHubIcon,
  GlassCastIcon,
  HeartIcon,
  LensLinkIcon,
  LinuxIcon,
  NexusCallIcon,
  OpenSourceIcon,
  PackageIcon,
  PerformanceIcon,
  QuantumDropIcon,
  ShieldCheckIcon,
  StarIcon,
  UsersIcon,
} from "@/components/icons";
import type { MarqueeItem } from "@/components/landing/MarqueeSection";
import type {
  EcosystemFeature,
  Metric,
  Principle,
} from "../components/landing/types";

export const ecosystemFeatures: EcosystemFeature[] = [
  {
    name: "Clipboard Sync",
    description:
      "Clipboard that follows your flow across desktop, tablet and phone.",
    icon: ContinuumBoardIcon,
  },
  {
    name: "Camera Share",
    description:
      "Use your phone camera as a native desktop camera — zero setup friction.",
    icon: LensLinkIcon,
  },
  {
    name: "Remote Phone Access",
    description:
      "Low-latency screen mirroring tuned for presentations, demos and play.",
    icon: GlassCastIcon,
  },
  {
    name: "Quick File Sharing",
    description:
      "Instant peer-to-peer file sharing — no cables, accounts or walls.",
    icon: QuantumDropIcon,
  },
  {
    name: "Notification Sync",
    description:
      "Unified notifications so every important update arrives in one place.",
    icon: EchoAlertsIcon,
  },
  {
    name: "Second Screen",
    description:
      "Turn your tablet into a responsive second monitor in one gesture.",
    icon: CanvasExtensionIcon,
  },
  {
    name: "Instant Hotspot",
    description: "Bring every device online with a one-tap encrypted hotspot.",
    icon: AuraNetIcon,
  },
  {
    name: "Call Bridge",
    description:
      "Answer and place mobile calls directly from your desktop workspace.",
    icon: NexusCallIcon,
  },
];

export const principles: Principle[] = [
  {
    title: "Performance First",
    description:
      "Latency-focused defaults and streamlined services keep every interaction snappy.",
    icon: PerformanceIcon,
  },
  {
    title: "Open Source by Design",
    description:
      "No forced cloud lock-in, no hidden telemetry, and a stack you can fully inspect.",
    icon: OpenSourceIcon,
  },
  {
    title: "Stable + Customizable",
    description:
      "Reliable fundamentals with flexible layers for themes, workflows and tooling.",
    icon: CustomizabilityIcon,
  },
];

export const heroMetrics: Metric[] = [
  { value: "Sub-frame", label: "Input-to-pixel latency on the default shell" },
  { value: "100% Open", label: "Transparent source, reproducible builds" },
  { value: "Arch Core", label: "Rolling release base, atomic snapshots" },
];

export const marqueeItems: MarqueeItem[] = [
  { icon: StarIcon, value: "12.4k", label: "GitHub stars" },
  { icon: UsersIcon, value: "8.2k", label: "Discord members" },
  { icon: PackageIcon, value: "240+", label: "curated packages" },
  { icon: GitHubIcon, value: "320+", label: "contributors" },
  { icon: ShieldCheckIcon, value: "GPG", label: "signed releases" },
  { icon: LinuxIcon, value: "Arch", label: "rolling base" },
  { icon: HeartIcon, value: "0", label: "telemetry endpoints" },
];
