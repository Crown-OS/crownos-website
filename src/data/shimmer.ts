import type { CSSProperties } from "react";

export const SHIMMER = {
  leadMs: 1800,
  cycleMs: 10000,
  brandSweepMs: 3000,
  handoffOverlapMs: 1100,
} as const;

export const PHRASE_SWEEP_VARS = {
  "--sweep-at": `${SHIMMER.leadMs + SHIMMER.brandSweepMs - SHIMMER.handoffOverlapMs}ms`,
  "--sweep-cycle": `${SHIMMER.cycleMs}ms`,
} as CSSProperties;
