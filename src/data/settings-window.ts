import type { SettingsIconName } from "@/components/visuals/settings/icons";

export type SidebarGroup = {
  label: string;
  pages: { title: string; icon: SettingsIconName }[];
};

export type Wallpaper = {
  name: string;
  tone: string;
  mirrored?: boolean;
};

export const settingsWindow = {
  page: { title: "Appearance", icon: "palette" },
  sidebar: [
    {
      label: "Connectivity",
      pages: [
        { title: "Wi-Fi", icon: "wifi" },
        { title: "Bluetooth", icon: "bluetooth" },
        { title: "Cross-device", icon: "monitorSmartphone" },
      ],
    },
    {
      label: "Personalization",
      pages: [
        { title: "Appearance", icon: "palette" },
        { title: "Plugins & Themes", icon: "puzzle" },
        { title: "Display", icon: "monitor" },
        { title: "Sound", icon: "volume" },
        { title: "Input", icon: "mic" },
      ],
    },
    {
      label: "System",
      pages: [
        { title: "Keybinds", icon: "keyboard" },
        { title: "Notifications", icon: "bell" },
        { title: "Battery & Power", icon: "battery" },
      ],
    },
  ],
  theme: { darkMode: true, accent: "Purple", transparency: 0.4 },
  selectedWallpaper: 1,
  wallpapers: [
    { name: "first-light", tone: "dawn" },
    { name: "violet-haze", tone: "violet" },
    { name: "ember-dunes", tone: "ember", mirrored: true },
    { name: "deep-tide", tone: "tide", mirrored: true },
    { name: "crimson-silk", tone: "crimson" },
    { name: "lagoon", tone: "lagoon", mirrored: true },
    { name: "iris", tone: "iris" },
    { name: "indigo-night", tone: "indigo", mirrored: true },
    { name: "dusk", tone: "dusk" },
    { name: "graphite", tone: "mono", mirrored: true },
  ],
} as const satisfies {
  page: { title: string; icon: SettingsIconName };
  sidebar: readonly SidebarGroup[];
  theme: { darkMode: boolean; accent: string; transparency: number };
  selectedWallpaper: number;
  wallpapers: readonly Wallpaper[];
};
