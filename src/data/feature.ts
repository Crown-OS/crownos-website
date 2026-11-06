import type { NavLink } from "./footer";

export type VisualKey =
  | "agent-window"
  | "system-apps"
  | "crownlink"
  | "migration-assistant"
  | "config-editor"
  | "settings-window"
  | "installed-plugins"
  | "compositor-layers"
  | "crownui-blocks"
  | "processor-chip";

export type IconKey =
  | "folder"
  | "swatches"
  | "plug"
  | "layout"
  | "shield"
  | "code"
  | "link"
  | "rewind";

export type Tone = "mono" | "horizon";

export type Feature = {
  label?: string;
  title?: string;
  description: string;
  icon?: IconKey;
  visual?: VisualKey;
  tone?: Tone;
  actions?: { primary: NavLink; secondary?: NavLink };
};

export type SectionCopy = {
  title: string;
  lead?: string;
};
