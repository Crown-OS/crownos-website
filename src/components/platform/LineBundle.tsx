import { useId } from "react";
import { roundCoordinate } from "@/util/round-coordinate";

type Coordinate = readonly [x: number, y: number];

export type LineCurve = {
  from: Coordinate;
  to: Coordinate;
  controls: readonly [Coordinate, Coordinate];
  spreadFrom: number;
  spreadTo: number;
  lineCount?: number;
};

type BundleViewBox = { width: number; height: number };

type LineBundleProps = {
  curves: readonly LineCurve[];
  lineCount?: number;
  className?: string;
};

const DEFAULT_VIEWBOX: BundleViewBox = { width: 1000, height: 400 };

const VERTICAL_SPREAD: Coordinate = [0, 1];

function blend(
  [fromX, fromY]: Coordinate,
  [toX, toY]: Coordinate,
  towardsTo: number,
): Coordinate {
  return [fromX + (toX - fromX) * towardsTo, fromY + (toY - fromY) * towardsTo];
}

function bundlePaths(curve: LineCurve, defaultLineCount: number) {
  const { from, to, controls, spreadFrom, spreadTo } = curve;
  const spreadVectorFrom: Coordinate = [
    VERTICAL_SPREAD[0] * spreadFrom,
    VERTICAL_SPREAD[1] * spreadFrom,
  ];
  const spreadVectorTo: Coordinate = [
    VERTICAL_SPREAD[0] * spreadTo,
    VERTICAL_SPREAD[1] * spreadTo,
  ];
  const lineCount = curve.lineCount ?? defaultLineCount;
  const centre = (lineCount - 1) / 2;
  const shift = ([x, y]: Coordinate, towardsTo: number, offset: number) => {
    const [spreadX, spreadY] = blend(
      spreadVectorFrom,
      spreadVectorTo,
      towardsTo,
    );
    return `${roundCoordinate(x + offset * spreadX)} ${roundCoordinate(y + offset * spreadY)}`;
  };
  return Array.from({ length: lineCount }, (_, line) => {
    const offset = line - centre;
    const start = shift(from, 0, offset);
    const first = shift(controls[0], 0.3, offset);
    const second = shift(controls[1], 0.7, offset);
    const end = shift(to, 1, offset);
    return `M${start} C${first} ${second} ${end}`;
  });
}

type BundleLayerProps = {
  paths: readonly string[];
  viewBox: BundleViewBox;
  className: string;
  groupClassName?: string;
  pathClassName: string;
};

function BundleLayer({
  paths,
  viewBox,
  className,
  groupClassName,
  pathClassName,
}: BundleLayerProps) {
  const gradientId = useId();
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      preserveAspectRatio="none"
      className={`line-bundle pointer-events-none absolute inset-0 size-full ${className}`}
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2={viewBox.width}
          y2="0"
        >
          <stop offset="0" stopColor="var(--color-sweep-sky)" />
          <stop offset="0.35" stopColor="var(--color-sweep-blue)" />
          <stop offset="0.65" stopColor="var(--color-sweep-pink)" />
          <stop offset="1" stopColor="var(--color-sweep-orange)" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${gradientId})`} fill="none" className={groupClassName}>
        {paths.map((path) => (
          <path key={path} d={path} pathLength={1} className={pathClassName} />
        ))}
      </g>
    </svg>
  );
}

export function LineBundle({
  curves,
  lineCount = 9,
  className = "",
}: LineBundleProps) {
  const paths = curves.flatMap((curve) => bundlePaths(curve, lineCount));
  return (
    <>
      <BundleLayer
        paths={paths}
        viewBox={DEFAULT_VIEWBOX}
        className={className}
        groupClassName="line-bundle-glow"
        pathClassName="line-bundle-stroke"
      />
      <BundleLayer
        paths={paths}
        viewBox={DEFAULT_VIEWBOX}
        className={`will-change-transform ${className}`}
        pathClassName="line-bundle-glint"
      />
    </>
  );
}
