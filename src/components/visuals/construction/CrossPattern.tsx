import { Crown, DashedRows, Marks, STROKE, Verticals } from "./guides";

const JUNCTION = { x: 330, y: 150 } as const;
const GAP = 18;
const TILE_RADIUS = 56;
const BLEED = 600;

const TILES = [
  { x: JUNCTION.x - GAP / 2 - BLEED, y: JUNCTION.y - GAP / 2 - BLEED },
  { x: JUNCTION.x + GAP / 2, y: JUNCTION.y - GAP / 2 - BLEED },
  { x: JUNCTION.x - GAP / 2 - BLEED, y: JUNCTION.y + GAP / 2 },
  { x: JUNCTION.x + GAP / 2, y: JUNCTION.y + GAP / 2 },
] as const;

export function CrossPattern() {
  return (
    <>
      <Verticals xs={[120]} />
      <DashedRows ys={[40, 268]} />
      {TILES.map(({ x, y }) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={BLEED}
          height={BLEED}
          rx={TILE_RADIUS}
          className={STROKE.shape}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <Crown center={[JUNCTION.x, JUNCTION.y]} width={22} />
      <Marks
        at={[
          [120, 40],
          [120, 268],
        ]}
      />
    </>
  );
}
