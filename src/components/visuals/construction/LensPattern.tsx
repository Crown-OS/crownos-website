import { Crown, DashedRows, Marks, STROKE, Verticals } from "./guides";

const CELL = { left: 96, right: 176, top: 196, bottom: 276 } as const;
const LENS = { left: 196, right: 476, centerX: 336, radius: 150 } as const;
const LENS_CENTERS_Y = [100, 290] as const;

export function LensPattern() {
  return (
    <>
      <clipPath id="lens-clip">
        <rect x={LENS.left} y={0} width={LENS.right - LENS.left} height={320} />
      </clipPath>
      <Verticals xs={[CELL.left, CELL.right, LENS.left, LENS.right]} />
      <DashedRows ys={[44, 84, CELL.top, CELL.bottom]} />
      <g clipPath="url(#lens-clip)">
        {LENS_CENTERS_Y.map((centerY) => (
          <circle
            key={centerY}
            cx={LENS.centerX}
            cy={centerY}
            r={LENS.radius}
            className={STROKE.shape}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      <Crown center={[136, 236]} width={44} />
      <Marks
        at={[
          [CELL.left, CELL.top],
          [CELL.right, CELL.bottom],
          [LENS.left, 84],
          [LENS.right, CELL.top],
        ]}
      />
    </>
  );
}
