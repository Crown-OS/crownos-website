import type { IconName } from "@/components/visuals/system-apps/kit/icon-paths";

export type VolumeState = "mounted" | "unmounted" | "locked";

type DiskVolume = { label: string; filesystem: string; state: VolumeState };

type DiskEntry = {
  label: string;
  size: string;
  icon: IconName;
  volumes: readonly DiskVolume[];
};

type Partition = {
  label: string;
  detail: string;
  share: number;
  used: number;
};

type InfoRow = { label: string; value: string };

export const PARTITION_COLORS = [
  "#6d48e8",
  "#4ade80",
  "#fbbf24",
  "#8f6dfb",
  "#8a8a93",
] as const;

export const disks = {
  brand: "Disk Manager",
  overview: "Overview",
  openImage: "Open Image…",
  toolbar: [
    { label: "Check & Repair", icon: "stethoscope" },
    { label: "Resize", icon: "move-horizontal" },
    { label: "Format", icon: "eraser" },
  ],
  sections: [
    {
      caption: "Internal",
      disks: [
        {
          label: "CT500P3PSSD8",
          size: "500 GB",
          icon: "hard-drive",
          volumes: [
            { label: "Workspace", filesystem: "ext4", state: "mounted" },
          ],
        },
        {
          label: "SAMSUNG MZVL2512HDJD",
          size: "512 GB",
          icon: "hard-drive",
          volumes: [
            { label: "Partition 5", filesystem: "FAT32", state: "mounted" },
            { label: "Partition 6", filesystem: "ext4", state: "mounted" },
          ],
        },
      ],
    },
    {
      caption: "External",
      disks: [
        {
          label: "Samsung PSSD T7",
          size: "1.0 TB",
          icon: "usb",
          volumes: [
            { label: "Vault", filesystem: "LUKS2", state: "locked" },
            { label: "Photos", filesystem: "ext4", state: "mounted" },
          ],
        },
      ],
    },
    {
      caption: "Disk Images",
      disks: [
        {
          label: "crownos-2026.11-x86_64.iso",
          size: "2.1 GB",
          icon: "disc-3",
          volumes: [],
        },
      ],
    },
  ],
  selected: { disk: "SAMSUNG MZVL2512HDJD", volume: "Partition 6" },
  page: {
    title: "SAMSUNG MZVL2512HDJD-00BL2",
    caption: "512 GB · NVMe SSD",
    status: "Good",
    partitions: [
      {
        label: "Partition 5",
        detail: "FAT32 · 1.1 GB",
        share: 0.0022,
        used: 0.16,
      },
      {
        label: "Partition 6",
        detail: "ext4 · 511 GB",
        share: 0.9978,
        used: 0.62,
      },
    ],
    selection: {
      title: "Partition 6",
      caption: "ext4 · 511 GB · mounted at /",
      action: "Open in Files",
      usage: "312 GB used of 503 GB · 191 GB free",
      used: 0.62,
    },
    healthSummary: "This disk is working normally.",
    health: [
      { label: "Temperature", value: "48 °C" },
      { label: "Life used", value: "7 %" },
      { label: "Available spare", value: "100 %" },
      { label: "Powered on", value: "1,547 hours" },
      { label: "Unsafe shutdowns", value: "2,141" },
      { label: "Media errors", value: "0" },
    ],
  },
} as const satisfies {
  brand: string;
  overview: string;
  openImage: string;
  toolbar: readonly { label: string; icon: IconName }[];
  sections: readonly { caption: string; disks: readonly DiskEntry[] }[];
  selected: { disk: string; volume: string };
  page: {
    title: string;
    caption: string;
    status: string;
    partitions: readonly Partition[];
    selection: {
      title: string;
      caption: string;
      action: string;
      usage: string;
      used: number;
    };
    healthSummary: string;
    health: readonly InfoRow[];
  };
};
