import { DashedRows, FIELD, Marks, STROKE, Verticals } from "./guides";

const COLUMNS = [
  [300, 372],
  [380, 452],
  [460, 560],
] as const;
const ROWS = [
  [-20, 110],
  [118, 216],
  [224, 360],
] as const;
const ARC = { cx: 600, cy: 300, radii: [210, 222], guide: 262 } as const;
const POSTER_LEFT = COLUMNS[0][0];
const GUIDE_X = 220;

export function PosterPattern() {
  return (
    <>
      <clipPath id="poster-clip">
        <rect
          x={POSTER_LEFT}
          y={0}
          width={FIELD.width - POSTER_LEFT}
          height={FIELD.height}
        />
      </clipPath>
      <Verticals xs={[GUIDE_X]} />
      <DashedRows ys={[60, 270]} />
      {ROWS.flatMap(([y0, y1]) =>
        COLUMNS.map(([x0, x1]) => (
          <rect
            key={`${x0}-${y0}`}
            x={x0}
            y={y0}
            width={x1 - x0}
            height={y1 - y0}
            rx={10}
            className={STROKE.shape}
            vectorEffect="non-scaling-stroke"
          />
        )),
      )}
      <g clipPath="url(#poster-clip)">
        {ARC.radii.map((radius) => (
          <circle
            key={radius}
            cx={ARC.cx}
            cy={ARC.cy}
            r={radius}
            className={STROKE.shape}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      <circle
        cx={ARC.cx}
        cy={ARC.cy}
        r={ARC.guide}
        strokeDasharray="6 4"
        className={STROKE.guide}
        vectorEffect="non-scaling-stroke"
      />
      <Marks
        at={[
          [GUIDE_X, 60],
          [GUIDE_X, 270],
          [POSTER_LEFT, 270],
        ]}
      />
    </>
  );
}
