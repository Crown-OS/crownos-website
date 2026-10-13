import type { ComponentType } from "react";
import type { VisualKey } from "@/data/feature";
import { AccessoryHub } from "./AccessoryHub";
import { ConfigTree } from "./ConfigTree";
import { DeviceMesh } from "./DeviceMesh";
import { SchedulerLanes } from "./KernelArt";
import { CompositorLayers, CrownUIBlocks } from "./LineArt";
import { Migration } from "./Migration";
import { PhysicsDrag } from "./PhysicsDrag";
import { PluginSandbox } from "./PluginSandbox";
import { RemoteAgents } from "./RemoteAgents";
import { SecondScreen } from "./SecondScreen";
import { ThemedApps } from "./ThemedApps";
import { TilingToggle } from "./TilingToggle";

const VISUALS = {
  "plugin-sandbox": PluginSandbox,
  "device-mesh": DeviceMesh,
  migration: Migration,
  "config-tree": ConfigTree,
  "themed-apps": ThemedApps,
  "accessory-hub": AccessoryHub,
  "tiling-toggle": TilingToggle,
  "physics-drag": PhysicsDrag,
  "second-screen": SecondScreen,
  "remote-agents": RemoteAgents,
  "compositor-layers": CompositorLayers,
  "crownui-blocks": CrownUIBlocks,
  "scheduler-lanes": SchedulerLanes,
} satisfies Record<VisualKey, ComponentType>;

export function Visual({ name }: { name: VisualKey }) {
  const Component = VISUALS[name];
  return <Component />;
}
