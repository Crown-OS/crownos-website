import { useId } from "react";
import { SweepGradient } from "../chip/SweepGradient";

const TOOLS = ["select", "brush", "eraser", "fill", "text"] as const;
const ACTIVE_TOOL: (typeof TOOLS)[number] = "brush";
const CANVAS = { width: 160, height: 96 };

export function PaintAppContent() {
  const strokeGradientId = useId();
  return (
    <div className="flex size-full">
      <ul className="grid w-6 shrink-0 content-start justify-items-center gap-1.5 border-r border-[#27272a] pt-2">
        {TOOLS.map((tool) => (
          <li
            key={tool}
            className={`size-3 rounded-[calc(var(--u)*3)] ${tool === ACTIVE_TOOL ? "bg-white/45" : "bg-white/10"}`}
          />
        ))}
      </ul>
      <div className="relative m-2 grow overflow-hidden rounded-md bg-[#161618] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.05)]">
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 size-full"
        >
          <defs>
            <SweepGradient id={strokeGradientId} from={[10, 0]} to={[150, 0]} />
          </defs>
          <path
            d="M14 70C34 22 58 20 72 48s38 30 54-6 20-20 22-8"
            fill="none"
            stroke={`url(#${strokeGradientId})`}
            strokeWidth={9}
            strokeLinecap="round"
            className="[filter:saturate(1.3)_drop-shadow(0_0_6px_rgb(56_182_255/0.35))]"
          />
        </svg>
      </div>
    </div>
  );
}
