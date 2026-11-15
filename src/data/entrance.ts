import type { CSSProperties } from "react";

export const entranceDelay = {
  eyebrow: 0,
  headline: 350,
  slogan: 900,
  sloganSweep: 2200,
  actions: 1300,
  laptop: 1700,
} as const;

export const delayStyle = (delay: number, extra?: Record<string, string>) =>
  ({ "--delay": `${delay}ms`, ...extra }) as CSSProperties;
