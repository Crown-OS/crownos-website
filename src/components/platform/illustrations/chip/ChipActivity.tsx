import { useId } from "react";
import {
  CHIP_VIEWBOX,
  chipTraces,
  coreBox,
  HOT_CORE,
  PACKAGE_TRANSFORM,
} from "./chipLayout";
import { SIZE } from "./geometry";
import { SweepGradient } from "./SweepGradient";

const flowingTraces = chipTraces.filter(({ flowing }) => flowing);

export function ChipActivity() {
  const gradientId = useId();
  const sweep = `url(#${gradientId})`;
  return (
    <svg
      aria-hidden="true"
      viewBox={CHIP_VIEWBOX}
      className="absolute inset-0 size-full will-change-transform"
    >
      <g transform={PACKAGE_TRANSFORM}>
        <defs>
          <SweepGradient id={gradientId} from={[0, 0]} to={[SIZE, SIZE]} />
        </defs>
        <g fill="none" stroke={sweep} strokeWidth={0.18}>
          {flowingTraces.map(({ key, path }) => (
            <path
              key={key}
              d={path}
              strokeDasharray="0.75 1.5"
              className="animate-[chip-trace-flow_1.6s_linear_infinite] motion-reduce:animate-[compositor-layer-drift_6s_var(--ease-in-out-sine)_infinite_alternate]"
            />
          ))}
        </g>
        <rect
          {...coreBox(HOT_CORE)}
          rx={0.2}
          fill={sweep}
          stroke={sweep}
          strokeWidth={0.18}
          className="animate-[chip-core-pulse_2.4s_var(--ease-in-out-sine)_infinite] motion-reduce:animate-none"
        />
      </g>
    </svg>
  );
}
