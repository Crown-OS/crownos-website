export type VisualKey =
  | "agent-window"
  | "link-window"
  | "migration-terminal"
  | "config-editor"
  | "settings-window"
  | "accessory-hub"
  | "tiling-toggle"
  | "physics-drag"
  | "second-screen"
  | "remote-agents"
  | "compositor-layers"
  | "crownui-blocks"
  | "processor-chip";

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
  title?: string;
  description: string;
  icon?: IconKey;
  visual?: VisualKey;
  tone?: Tone;
};

export type SectionCopy = {
  title: string;
  lead?: string;
};
