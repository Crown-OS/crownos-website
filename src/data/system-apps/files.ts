import type { IconName } from "@/components/visuals/system-apps/kit/icon-paths";

export type FileArt = "aurora" | "silver" | "dusk";

export type FileThumbKind =
  | { kind: "folder"; glyph?: IconName }
  | { kind: "image"; art: FileArt }
  | { kind: "video"; art: FileArt; duration: string }
  | { kind: "disc" }
  | { kind: "archive" }
  | { kind: "page"; badge: string; color: string }
  | { kind: "code"; badge: string; color: string }
  | { kind: "vector"; badge: string; color: string }
  | { kind: "sheet"; badge: string; color: string }
  | { kind: "audio"; badge: string; color: string };

export type FileItem = { name: string; meta: string; thumb: FileThumbKind };

type NavItem = { label: string; icon: IconName; trailing?: string };

export const files = {
  brand: "Files",
  favorites: [
    { label: "Recents", icon: "clock" },
    { label: "Home", icon: "house" },
    { label: "Desktop", icon: "monitor" },
    { label: "Documents", icon: "file-text" },
    { label: "Downloads", icon: "download", trailing: "3" },
    { label: "Pictures", icon: "image" },
    { label: "Videos", icon: "video" },
  ],
  devices: [
    { label: "CrownBook", icon: "hard-drive" },
    { label: "Pixel 9 Pro", icon: "smartphone" },
  ],
  current: "Documents",
  storage: { label: "Storage", percent: "58%", caption: "588 GB of 1 TB used" },
  path: ["Documents", "Launch"],
  status: "16 items, 1 selected",
  free: "412 GB available",
  selected: 4,
  items: [
    { name: "Brand", meta: "24 items", thumb: { kind: "folder" } },
    {
      name: "Renders",
      meta: "186 items",
      thumb: { kind: "folder", glyph: "image" },
    },
    {
      name: "Press Kit",
      meta: "12 items",
      thumb: { kind: "folder", glyph: "share" },
    },
    {
      name: "Soundtrack",
      meta: "9 items",
      thumb: { kind: "folder", glyph: "music" },
    },
    {
      name: "aurora-wallpaper.avif",
      meta: "3.8 MB",
      thumb: { kind: "image", art: "aurora" },
    },
    {
      name: "crownbook-hero.png",
      meta: "6.1 MB",
      thumb: { kind: "image", art: "silver" },
    },
    {
      name: "launch-film.webm",
      meta: "84.2 MB",
      thumb: { kind: "video", art: "dusk", duration: "1:24" },
    },
    {
      name: "crownos-2026.11-x86_64.iso",
      meta: "2.4 GB",
      thumb: { kind: "disc" },
    },
    {
      name: "keynote.pdf",
      meta: "18.4 MB",
      thumb: { kind: "page", badge: "PDF", color: "#e5484d" },
    },
    {
      name: "release-notes.md",
      meta: "12 KB",
      thumb: { kind: "page", badge: "MD", color: "#6e6e78" },
    },
    {
      name: "compositor.rs",
      meta: "48 KB",
      thumb: { kind: "code", badge: "RS", color: "#ce5a2b" },
    },
    {
      name: "palette.svg",
      meta: "4 KB",
      thumb: { kind: "vector", badge: "SVG", color: "#8f6dfb" },
    },
    {
      name: "benchmarks.csv",
      meta: "220 KB",
      thumb: { kind: "sheet", badge: "CSV", color: "#2f9e59" },
    },
    {
      name: "interview.flac",
      meta: "42.6 MB",
      thumb: { kind: "audio", badge: "FLAC", color: "#d97706" },
    },
    {
      name: "launch-assets.tar.zst",
      meta: "640 MB",
      thumb: { kind: "archive" },
    },
    {
      name: "launch-plan.odt",
      meta: "86 KB",
      thumb: { kind: "page", badge: "ODT", color: "#3b82f6" },
    },
  ],
  details: {
    kind: "AVIF image · 3.8 MB",
    info: [
      { label: "Dimensions", value: "5120 × 3200" },
      { label: "Modified", value: "Today, 09:14" },
      { label: "Created", value: "Oct 28, 2026" },
      { label: "Where", value: "Documents › Launch" },
    ],
    tags: [
      { label: "Brand", color: "#8f6dfb" },
      { label: "Final", color: "#4ade80" },
    ],
    open: "Open",
    send: "Send to Pixel",
  },
} as const satisfies {
  brand: string;
  favorites: readonly NavItem[];
  devices: readonly NavItem[];
  current: string;
  storage: { label: string; percent: string; caption: string };
  path: readonly string[];
  status: string;
  free: string;
  selected: number;
  items: readonly FileItem[];
  details: {
    kind: string;
    info: readonly { label: string; value: string }[];
    tags: readonly { label: string; color: string }[];
    open: string;
    send: string;
  };
};
