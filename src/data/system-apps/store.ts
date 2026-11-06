import type { IconName } from "@/components/visuals/system-apps/kit/icon-paths";

export type StoreApp = {
  id: string;
  name: string;
  summary: string;
  sources: string;
  installed?: true;
};

type StoreNavItem = { label: string; icon: IconName; count?: number };

export const STORE_ICON_PATH = "/showcase/store-icons/v1";

export const store = {
  brand: "App Store",
  title: "Discover",
  subtitle: "36 apps",
  search: "Search apps",
  navigation: [
    {
      caption: "Store",
      items: [
        { label: "Discover", icon: "compass" },
        { label: "Installed", icon: "hard-drive-download", count: 3 },
        { label: "Updates", icon: "refresh-cw", count: 1 },
        { label: "Queue", icon: "list-ordered" },
      ],
    },
    {
      caption: "Categories",
      items: [
        { label: "Internet", icon: "globe" },
        { label: "Communication", icon: "message-circle" },
        { label: "Development", icon: "code" },
        { label: "Graphics", icon: "palette" },
        { label: "Audio & Video", icon: "film" },
        { label: "Office", icon: "briefcase" },
        { label: "Games", icon: "gamepad-2" },
        { label: "Education", icon: "graduation-cap" },
        { label: "Utilities", icon: "wrench" },
        { label: "System", icon: "shield" },
      ],
    },
  ],
  apps: [
    {
      id: "anki",
      name: "Anki",
      summary: "Powerful, intelligent flash cards",
      sources: "Repo · Flathub",
    },
    {
      id: "audacity",
      name: "Audacity",
      summary: "Record and edit audio",
      sources: "Repo · Flathub · Snap",
    },
    {
      id: "bitwarden",
      name: "Bitwarden",
      summary: "Open-source password manager",
      sources: "Repo · Flathub · Snap",
      installed: true,
    },
    {
      id: "blender",
      name: "Blender",
      summary: "Free and open 3D creation suite",
      sources: "Repo · Flathub · Snap",
      installed: true,
    },
    {
      id: "brave",
      name: "Brave",
      summary: "Privacy-first web browser with a built-in ad blocker",
      sources: "AUR · Flathub · Snap",
    },
    {
      id: "chromium",
      name: "Chromium",
      summary: "The open-source web browser behind Chrome",
      sources: "Repo · Flathub · Snap",
    },
    {
      id: "discord",
      name: "Discord",
      summary: "Voice, video and text chat for communities",
      sources: "Repo · Flathub · Snap",
    },
    {
      id: "element",
      name: "Element",
      summary: "Secure collaboration on the Matrix network",
      sources: "Repo · Flathub · Snap",
    },
    {
      id: "firefox",
      name: "Firefox",
      summary: "Fast, private and free web browser",
      sources: "Repo · Flathub · Snap",
      installed: true,
    },
    {
      id: "flatseal",
      name: "Flatseal",
      summary: "Manage Flatpak permissions",
      sources: "Repo · Flathub",
    },
    {
      id: "gimp",
      name: "GIMP",
      summary: "GNU Image Manipulation Program",
      sources: "Repo · Flathub · Snap",
    },
    {
      id: "godot",
      name: "Godot Engine",
      summary: "Free and open-source 2D and 3D game engine",
      sources: "Repo · Flathub",
    },
  ],
} as const satisfies {
  brand: string;
  title: string;
  subtitle: string;
  search: string;
  navigation: readonly { caption: string; items: readonly StoreNavItem[] }[];
  apps: readonly StoreApp[];
};
