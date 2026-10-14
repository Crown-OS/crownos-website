import { prefersReducedMotion } from "./reduced-motion";

export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export const canFollowPointer = () =>
  window.matchMedia(FINE_POINTER).matches && !prefersReducedMotion();
