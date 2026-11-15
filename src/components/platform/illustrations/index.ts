import type { ComponentType } from "react";
import type { PlatformIllustration } from "@/data/platform";
import { AskIllustration } from "./AskIllustration";
import { CompatibilityIllustration } from "./CompatibilityIllustration";
import { CompositorIllustration } from "./CompositorIllustration";
import { KernelIllustration } from "./KernelIllustration";
import { UpdatesIllustration } from "./UpdatesIllustration";

export const PLATFORM_ILLUSTRATIONS: Record<
  PlatformIllustration,
  ComponentType
> = {
  ask: AskIllustration,
  updates: UpdatesIllustration,
  compositor: CompositorIllustration,
  compatibility: CompatibilityIllustration,
  kernel: KernelIllustration,
};
