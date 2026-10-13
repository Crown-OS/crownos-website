export type VisualKey =
  | "plugin-sandbox"
  | "device-mesh"
  | "migration"
  | "config-tree"
  | "themed-apps"
  | "accessory-hub"
  | "tiling-toggle"
  | "physics-drag"
  | "second-screen"
  | "remote-agents"
  | "compositor-layers"
  | "crownui-blocks"
  | "scheduler-lanes";

export type IconKey =
  | "folder"
  | "swatches"
  | "plug"
  | "layout"
  | "spring"
  | "tablet"
  | "server"
  | "shield"
  | "code"
  | "link"
  | "rewind";

export type Tone =
  | "ember"
  | "iris"
  | "lagoon"
  | "violet"
  | "crimson"
  | "indigo";

export type Feature = {
  label?: string;
  title: string;
  description: string;
  icon?: IconKey;
  visual?: VisualKey;
  tone?: Tone;
};

export type SectionCopy = {
  title: string;
  lead?: string;
};
