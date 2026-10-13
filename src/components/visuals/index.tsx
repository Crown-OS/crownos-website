import type { ComponentType } from "react";
import type { VisualKey } from "@/data/feature";
import { AccessoryHub } from "./AccessoryHub";
import { AgentWindow } from "./AgentWindow";
import { ConfigTree } from "./ConfigTree";
import { CompositorLayers, CrownUIBlocks } from "./LineArt";
import { LinkWindow } from "./LinkWindow";
import { MigrationTerminal } from "./MigrationTerminal";
import { PhysicsDrag } from "./PhysicsDrag";
import { ProcessorChip } from "./ProcessorChip";
import { RemoteAgents } from "./RemoteAgents";
import { SecondScreen } from "./SecondScreen";
import { ThemedApps } from "./ThemedApps";
import { TilingToggle } from "./TilingToggle";

const VISUALS = {
  "agent-window": AgentWindow,
  "link-window": LinkWindow,
  "migration-terminal": MigrationTerminal,
  "config-tree": ConfigTree,
  "themed-apps": ThemedApps,
  "accessory-hub": AccessoryHub,
  "tiling-toggle": TilingToggle,
  "physics-drag": PhysicsDrag,
  "second-screen": SecondScreen,
  "remote-agents": RemoteAgents,
  "compositor-layers": CompositorLayers,
  "crownui-blocks": CrownUIBlocks,
  "processor-chip": ProcessorChip,
} satisfies Record<VisualKey, ComponentType>;

export function Visual({ name }: { name: VisualKey }) {
  const Component = VISUALS[name];
  return <Component />;
}
