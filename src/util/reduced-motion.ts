import { matchesMedia } from "./media-query";

export const prefersReducedMotion = () =>
  matchesMedia("(prefers-reduced-motion: reduce)");
