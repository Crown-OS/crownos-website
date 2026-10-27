import type { ReactNode } from "react";

export const STROKE = { bold: 0.8, detail: 0.55, hair: 0.35 } as const;
const LIFT = "translate(0.6 0.9)";

export function Lifted({
  children,
  strokeWidth = STROKE.bold,
}: {
  children: ReactNode;
  strokeWidth?: number;
}) {
  return (
    <g strokeWidth={strokeWidth} strokeLinejoin="round">
      <g transform={LIFT} className="fill-background stroke-white/30">
        {children}
      </g>
      <g className="fill-background stroke-white/80">{children}</g>
    </g>
  );
}

export function Detail({
  children,
  tone = "stroke-white/50",
  strokeWidth = STROKE.detail,
}: {
  children: ReactNode;
  tone?: string;
  strokeWidth?: number;
}) {
  return (
    <g
      className={`fill-none ${tone}`}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </g>
  );
}

export function Flow({ d }: { d: string }) {
  return (
    <path
      d={d}
      className="link-flow fill-none stroke-white/50"
      strokeDasharray="0.75 1.5"
      strokeWidth={STROKE.detail}
      strokeLinecap="round"
    />
  );
}

export function HotDot({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return <circle cx={cx} cy={cy} r={r} className="pulse-dot fill-white/80" />;
}
