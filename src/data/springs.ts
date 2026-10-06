export type Spring = {
  readonly stiffness: number;
  readonly damping: number;
  readonly mass?: number;
};

export const SPRING_BOUNCY = {
  stiffness: 200,
  damping: 15,
  mass: 0.6,
} as const;
export const SPRING_TIGHT = {
  stiffness: 520,
  damping: 42,
  mass: 0.45,
} as const;
export const SPRING_MORPH = { stiffness: 380, damping: 26 } as const;

/** Same damping ratio (feel), period scaled by `factor` (tempo). */
export const stretch = (spring: Spring, factor: number): Spring => ({
  stiffness: spring.stiffness,
  damping: spring.damping * factor,
  mass: (spring.mass ?? 1) * factor * factor,
});

export const asTransition = (spring: Spring, delay = 0) => ({
  type: "spring" as const,
  ...spring,
  delay,
});
