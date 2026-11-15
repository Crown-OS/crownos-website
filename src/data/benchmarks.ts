export type Competitor = { id: string; name: string; value: number };

export type BenchmarkMetric = {
  id: string;
  label: string;
  unit: string;
  crownos: number;
  summary: string;
  note: string;
  competitors: readonly Competitor[];
};

export const benchmarkCopy = {
  headline: "Engineered for Performance",
  subline:
    "Built on the CachyOS kernel, with our own compositor and our own memory efficient UI toolkit, CrownUI, to keep the system light and smooth.",
} as const;

export const benchmarkMetrics: readonly BenchmarkMetric[] = [
  {
    id: "memory",
    label: "Memory usage",
    unit: "GB",
    crownos: 1.1,
    summary: "after login",
    note: "Memory usage at idle after login on a fresh install. Average of 10 runs on a Lenovo Legion 5 Slim, 16 GB RAM.",
    competitors: [
      { id: "windows", name: "Windows 11", value: 3.6 },
      { id: "ubuntu", name: "Ubuntu GNOME", value: 2.4 },
      { id: "fedora", name: "Fedora KDE", value: 2.1 },
    ],
  },
];

export function savingShare(crownos: number, competitor: number) {
  return Math.round((1 - crownos / competitor) * 100);
}

export function formatAmount(value: number, unit: string) {
  return `${Number.isInteger(value) ? value : value.toFixed(1)} ${unit}`;
}
