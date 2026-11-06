import type { IconName } from "@/components/visuals/system-apps/kit/icon-paths";

export type MonitorFigure = { label: string; value: string };

export type MonitorCard = {
  title: string;
  icon: IconName;
  tint: string;
  headline: string;
  detail?: string;
  figures: readonly MonitorFigure[];
  trend: { seed: number; mean: number; spread: number };
};

type MonitorNavItem = { label: string; icon: IconName; value: string };

const TINT = {
  cpu: "#0a84ff",
  memory: "#bf5af2",
  gpu: "#ff375f",
  disk: "#ff9f0a",
  network: "#64d2ff",
  power: "#30d158",
  temperature: "#ffd60a",
} as const;

export const monitor = {
  title: "Overview",
  caption: "Monitor",
  navigation: [
    { label: "Overview", icon: "layout-dashboard", value: "8" },
    { label: "CPU", icon: "cpu", value: "21%" },
    { label: "GPU", icon: "gpu", value: "35%" },
    { label: "Memory", icon: "memory-stick", value: "58%" },
    { label: "Disk", icon: "hard-drive", value: "1.8 MB/s" },
    { label: "Network", icon: "network", value: "2.4 MB/s" },
  ],
  cards: [
    {
      title: "CPU",
      icon: "cpu",
      tint: TINT.cpu,
      headline: "21%",
      figures: [
        { label: "User", value: "14%" },
        { label: "System", value: "5%" },
        { label: "Avg today", value: "18%" },
      ],
      trend: { seed: 11, mean: 0.36, spread: 0.3 },
    },
    {
      title: "Memory",
      icon: "memory-stick",
      tint: TINT.memory,
      headline: "8.70 GB",
      detail: "of 15.00 GB",
      figures: [
        { label: "Pressure", value: "Normal" },
        { label: "Apps", value: "6.1 GB" },
        { label: "Kernel", value: "1.2 GB" },
      ],
      trend: { seed: 23, mean: 0.58, spread: 0.06 },
    },
    {
      title: "Disk",
      icon: "hard-drive",
      tint: TINT.disk,
      headline: "612 GB",
      detail: "free of 1.00 TB",
      figures: [
        { label: "Read", value: "1.2 MB/s" },
        { label: "Write", value: "0.6 MB/s" },
        { label: "Today", value: "14.2 GB" },
      ],
      trend: { seed: 37, mean: 0.22, spread: 0.4 },
    },
    {
      title: "Network",
      icon: "network",
      tint: TINT.network,
      headline: "2.4 MB/s",
      figures: [
        { label: "Up", value: "0.3 MB/s" },
        { label: "Today", value: "3.8 GB" },
        { label: "7 days", value: "21.4 GB" },
      ],
      trend: { seed: 41, mean: 0.4, spread: 0.36 },
    },
    {
      title: "GPU",
      icon: "gpu",
      tint: TINT.gpu,
      headline: "35%",
      figures: [
        { label: "Radeon 780M", value: "256 MB VRAM" },
        { label: "Peak", value: "71%" },
      ],
      trend: { seed: 53, mean: 0.42, spread: 0.26 },
    },
    {
      title: "GPU 2",
      icon: "gpu",
      tint: TINT.gpu,
      headline: "Asleep",
      figures: [
        { label: "GeForce RTX 4050", value: "6 GB VRAM" },
        { label: "Peak", value: "0%" },
      ],
      trend: { seed: 59, mean: 0, spread: 0 },
    },
    {
      title: "Power",
      icon: "zap",
      tint: TINT.power,
      headline: "14 W",
      figures: [
        { label: "Battery", value: "82%" },
        { label: "Remaining", value: "4:12" },
        { label: "Health", value: "96%" },
      ],
      trend: { seed: 67, mean: 0.3, spread: 0.18 },
    },
    {
      title: "Sensors",
      icon: "thermometer",
      tint: TINT.temperature,
      headline: "66 °C",
      figures: [
        { label: "CPU", value: "61 °C" },
        { label: "GPU", value: "52 °C" },
        { label: "Fan", value: "2,600 rpm" },
      ],
      trend: { seed: 71, mean: 0.62, spread: 0.08 },
    },
  ],
} as const satisfies {
  title: string;
  caption: string;
  navigation: readonly MonitorNavItem[];
  cards: readonly MonitorCard[];
};
