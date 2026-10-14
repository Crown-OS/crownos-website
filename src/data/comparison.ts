import type { SectionCopy } from "./feature";

export type OsId = "crownos" | "ubuntu" | "fedora" | "windows" | "macos";

type MeterRow = { os: OsId; name: string; value: number; display: string };

export type MeterTab = {
  id: string;
  label: string;
  kind: "meter";
  scale: number;
  rows: readonly MeterRow[];
  note: string;
};

export type MatrixTab = {
  id: string;
  label: string;
  kind: "matrix";
  columns: readonly { os: OsId; name: string }[];
  rows: readonly { feature: string; support: readonly boolean[] }[];
  note: string;
};

export type ComparisonTab = MeterTab | MatrixTab;

export const comparison = {
  heading: {
    title: "Feel the difference in everything",
    lead: "We kept the lean Arch base and cut what slows a desktop down. Measured on real hardware, not marketing slides.",
  },
  tabs: [
    {
      id: "memory",
      label: "Memory",
      kind: "meter",
      scale: 4,
      rows: [
        { os: "crownos", name: "CrownOS", value: 1.1, display: "1.1 GB" },
        { os: "fedora", name: "Fedora KDE", value: 2.1, display: "2.1 GB" },
        { os: "ubuntu", name: "Ubuntu GNOME", value: 2.4, display: "2.4 GB" },
        { os: "windows", name: "Windows 11", value: 3.6, display: "3.6 GB" },
      ],
      note: "Idle memory after login on a fresh install. Average of 10 runs on a Lenovo Legion 5 Slim, 16 GB RAM.",
    },
    {
      id: "setup",
      label: "Setup time",
      kind: "meter",
      scale: 35,
      rows: [
        { os: "crownos", name: "CrownOS", value: 4.6, display: "4.6 min" },
        { os: "ubuntu", name: "Ubuntu", value: 14, display: "14 min" },
        { os: "fedora", name: "Fedora", value: 16, display: "16 min" },
        { os: "windows", name: "Windows 11", value: 32, display: "32 min" },
      ],
      note: "From booting the USB installer to a working desktop with Wi-Fi, accounts and default apps ready. Same hardware, same network.",
    },
    {
      id: "features",
      label: "Features",
      kind: "matrix",
      columns: [
        { os: "crownos", name: "CrownOS" },
        { os: "ubuntu", name: "Ubuntu" },
        { os: "fedora", name: "Fedora" },
        { os: "windows", name: "Windows" },
        { os: "macos", name: "macOS" },
      ],
      rows: [
        {
          feature: "Open source",
          support: [true, true, true, false, false],
        },
        {
          feature: "One-click tiling",
          support: [true, false, false, false, false],
        },
        {
          feature: "Agent plugin system",
          support: [true, false, false, false, false],
        },
        {
          feature: "Scoped plugin permissions",
          support: [true, false, false, false, false],
        },
        {
          feature: "Device ecosystem",
          support: [true, false, false, true, true],
        },
        {
          feature: "Migration assistant",
          support: [true, false, false, false, true],
        },
        {
          feature: "Single config folder",
          support: [true, false, false, false, false],
        },
      ],
      note: "Built-in capabilities on a default install, without third-party extensions.",
    },
  ],
} as const satisfies { heading: SectionCopy; tabs: readonly ComparisonTab[] };
