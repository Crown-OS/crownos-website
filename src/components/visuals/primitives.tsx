import type { ReactNode } from "react";

const MONO_CHAR_WIDTH = 0.6;
const PILL_PADDING = 12;

type Point = { x: number; y: number };
type Box = Point & { width: number; height: number };

export function VisualSvg({
  viewBox,
  label,
  children,
}: {
  viewBox: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      className="block size-full select-none"
    >
      {children}
    </svg>
  );
}

export function Pane({
  title,
  children,
  ...box
}: Box & { title: string; children?: ReactNode }) {
  const { x, y, width, height } = box;
  return (
    <g>
      <rect
        {...box}
        rx={12}
        className="fill-gray-850 stroke-white/12"
        strokeWidth={1}
      />
      <path
        d={`M${x} ${y + 28}h${width}`}
        className="stroke-white/8"
        strokeWidth={1}
      />
      {[0, 1, 2].map((dot) => (
        <circle
          key={dot}
          cx={x + 16 + dot * 12}
          cy={y + 14}
          r={3.5}
          className="fill-white/18"
        />
      ))}
      <Mono x={x + 60} y={y + 18} className="fill-white/45">
        {title}
      </Mono>
      {height > 28 && children}
    </g>
  );
}

export function Mono({
  x,
  y,
  size = 11,
  anchor,
  className = "fill-white/70",
  children,
}: Point & {
  size?: number;
  anchor?: "start" | "middle" | "end";
  className?: string;
  children: ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      textAnchor={anchor}
      className={`font-mono ${className}`}
    >
      {children}
    </text>
  );
}

export function Sans({
  x,
  y,
  size = 14,
  className = "fill-white/90",
  children,
}: Point & { size?: number; className?: string; children: ReactNode }) {
  return (
    <text x={x} y={y} fontSize={size} className={`font-inter ${className}`}>
      {children}
    </text>
  );
}

export function pillWidth(label: string, size = 11) {
  return label.length * size * MONO_CHAR_WIDTH + PILL_PADDING * 2;
}

export function Pill({
  x,
  y,
  label,
  tone = "muted",
  centered = false,
}: Point & {
  label: string;
  tone?: "muted" | "solid" | "outline";
  centered?: boolean;
}) {
  const width = pillWidth(label);
  const left = centered ? x - width / 2 : x;
  const rectClass = {
    muted: "fill-gray-750 stroke-white/12",
    solid: "fill-paper stroke-transparent",
    outline: "fill-transparent stroke-white/22",
  }[tone];
  return (
    <g>
      <rect
        x={left}
        y={y - 12}
        width={width}
        height={24}
        rx={12}
        className={rectClass}
      />
      <Mono
        x={left + width / 2}
        y={y + 4}
        anchor="middle"
        className={tone === "solid" ? "fill-ink" : "fill-white/75"}
      >
        {label}
      </Mono>
    </g>
  );
}

export function SkeletonLine({
  x,
  y,
  width,
  className = "fill-white/10",
}: Point & { width: number; className?: string }) {
  return (
    <rect x={x} y={y} width={width} height={6} rx={3} className={className} />
  );
}

export function Progress({
  x,
  y,
  width,
  ratio,
}: Point & { width: number; ratio: number }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={4}
        rx={2}
        className="fill-white/10"
      />
      <rect
        x={x}
        y={y}
        width={width * ratio}
        height={4}
        rx={2}
        className="fill-white/85"
      />
    </g>
  );
}

export function FlowLine({ d }: { d: string }) {
  return (
    <path
      d={d}
      fill="none"
      strokeWidth={1}
      strokeDasharray="3 6"
      className="link-flow stroke-white/35"
    />
  );
}

export function Check({ x, y }: Point) {
  return (
    <g transform={`translate(${x - 9} ${y - 9})`}>
      <circle cx={9} cy={9} r={9} className="fill-white/90" />
      <path
        d="m5.2 9.3 2.6 2.6 5-5.2"
        fill="none"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-ink"
      />
    </g>
  );
}
