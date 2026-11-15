const SWEEP_STOPS = ["sky", "blue", "pink", "red", "orange"] as const;

type SweepGradientProps = {
  id: string;
  from: readonly [number, number];
  to: readonly [number, number];
};

export function SweepGradient({ id, from, to }: SweepGradientProps) {
  return (
    <linearGradient
      id={id}
      gradientUnits="userSpaceOnUse"
      x1={from[0]}
      y1={from[1]}
      x2={to[0]}
      y2={to[1]}
    >
      {SWEEP_STOPS.map((tone, index) => (
        <stop
          key={tone}
          offset={index / (SWEEP_STOPS.length - 1)}
          stopColor={`var(--color-sweep-${tone})`}
        />
      ))}
    </linearGradient>
  );
}
