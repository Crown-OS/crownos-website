import { useId } from "react";
import { boardTraces } from "./boardLayout";
import { SweepGradient } from "./SweepGradient";

const flowingTraces = boardTraces.filter(({ flowing }) => flowing);

type BoardPulsesProps = {
  viewBox: string;
  sweepFrom: readonly [number, number];
  sweepTo: readonly [number, number];
};

export function BoardPulses({ viewBox, sweepFrom, sweepTo }: BoardPulsesProps) {
  const gradientId = useId();
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      className="absolute inset-0 size-full will-change-transform"
    >
      <defs>
        <SweepGradient id={gradientId} from={sweepFrom} to={sweepTo} />
      </defs>
      <g fill="none" stroke={`url(#${gradientId})`} strokeWidth={0.35}>
        {flowingTraces.map(({ key, path }) => (
          <path
            key={key}
            d={path}
            strokeDasharray="1.2 4.8"
            className="animate-[chip-trace-flow_2.4s_linear_infinite] motion-reduce:animate-none"
          />
        ))}
      </g>
    </svg>
  );
}
