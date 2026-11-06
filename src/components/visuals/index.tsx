import type { ComponentType } from "react";
import type { VisualKey } from "@/data/feature";
import { AgentWindow } from "./AgentWindow";
import { ConfigEditor } from "./editor/ConfigEditor";
import { illustrationOf } from "./Illustration";
import { CompositorLayers, CrownUIBlocks } from "./LineArt";
import { ProcessorChip } from "./ProcessorChip";
import { InstalledPlugins } from "./plugins/InstalledPlugins";
import { SettingsWindow } from "./settings/SettingsWindow";
import { SystemAppsLineup } from "./system-apps/SystemAppsLineup";

const VISUALS = {
  "agent-window": AgentWindow,
  "system-apps": SystemAppsLineup,
  crownlink: illustrationOf("crownlink"),
  "migration-assistant": illustrationOf("migration-assistant"),
  "config-editor": ConfigEditor,
  "settings-window": SettingsWindow,
  "installed-plugins": InstalledPlugins,
  "compositor-layers": CompositorLayers,
  "crownui-blocks": CrownUIBlocks,
  "processor-chip": ProcessorChip,
} satisfies Record<VisualKey, ComponentType>;

export function Visual({ name }: { name: VisualKey }) {
  const Component = VISUALS[name];
  return <Component />;
}
