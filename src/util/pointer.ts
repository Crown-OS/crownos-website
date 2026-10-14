import { matchesMedia } from "./media-query";
import { prefersReducedMotion } from "./reduced-motion";

export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export const canFollowPointer = () =>
  matchesMedia(FINE_POINTER) && !prefersReducedMotion();
