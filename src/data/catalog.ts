export const CATALOG_KINDS = ["plugins", "themes"] as const;
export type CatalogKind = (typeof CATALOG_KINDS)[number];

export const PLUGIN_SHAPES = [
  "asterisk",
  "spark",
  "cross",
  "ring",
  "clover",
  "prism",
  "capsule",
  "orbit",
  "knot",
] as const;
export type PluginShape = (typeof PLUGIN_SHAPES)[number];

export const THEME_MODES = ["dark", "light"] as const;
export type ThemeMode = (typeof THEME_MODES)[number];

type CatalogEntry = {
  slug: string;
  name: string;
  description: string;
  category: string;
  author: string;
  version: string;
  tags: readonly string[];
};

export type PluginMeta = CatalogEntry & { shape: PluginShape };

export type ThemePalette = {
  background: string;
  surface: string;
  text: string;
  accent: string;
};

export type ThemeMeta = CatalogEntry & {
  mode: ThemeMode;
  palette: ThemePalette;
  wallpaper: readonly [string, string, string];
};

export type CatalogMeta = PluginMeta | ThemeMeta;

export const catalogCopy = {
  plugins: {
    eyebrow: "Extend",
    title: ["Plugins"],
    lead: "Sandboxed extensions for the agent, the shell and every app you run. Install with one click, revoke with another.",
    install: "crown plugin add",
  },
  themes: {
    eyebrow: "Personalize",
    title: ["Themes"],
    lead: "Complete looks for CrownUI: palette, wallpaper and window chrome, applied system wide in a single switch.",
    install: "crown theme apply",
  },
} as const satisfies Record<CatalogKind, unknown>;

export const ALL_CATEGORIES = "All";
