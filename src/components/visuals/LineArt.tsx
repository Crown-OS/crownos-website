import { VisualSvg } from "./primitives";

const LINE = "fill-none stroke-white/80";

const PLANE_COUNT = 5;
const PLANE_STEP = { x: 17, y: 9 };

export function CompositorLayers() {
  return (
    <VisualSvg viewBox="0 0 240 240" label="Stacked compositor surface layers">
      {Array.from({ length: PLANE_COUNT }, (_, index) => {
        const dx = index * PLANE_STEP.x;
        const dy = index * PLANE_STEP.y;
        return (
          <path
            key={dx}
            d={`M${32 + dx} ${76 + dy}L${122 + dx} ${28 + dy}V${148 + dy}L${32 + dx} ${196 + dy}Z`}
            className={`${LINE} layer-drift`}
            style={{ animationDelay: `${index * -0.6}s` }}
            strokeWidth={1}
          />
        );
      })}
    </VisualSvg>
  );
}

function isoCube(x: number, y: number, size: number) {
  const half = size / 2;
  return {
    top: `M${x} ${y}l${size} ${-half}l${size} ${half}l${-size} ${half}Z`,
    left: `M${x} ${y}l${size} ${half}v${size}l${-size} ${-half}Z`,
    right: `M${x + size} ${y + half}l${size} ${-half}v${size}l${-size} ${half}Z`,
  };
}

const CUBES = [
  { x: 136, y: 52, size: 30 },
  { x: 26, y: 78, size: 32 },
  { x: 64, y: 136, size: 56 },
];

export function CrownUIBlocks() {
  return (
    <VisualSvg viewBox="0 0 240 240" label="Isometric CrownUI building blocks">
      {CUBES.map(({ x, y, size }) => {
        const faces = isoCube(x, y, size);
        return (
          <g
            key={`${x}-${y}`}
            className="fill-background stroke-white/80"
            strokeWidth={1}
          >
            <path d={faces.left} />
            <path d={faces.right} />
            <path d={faces.top} />
            <path
              d={`M${x + size} ${y - size / 4}v${size / 2}`}
              className="fill-none stroke-white/20"
            />
          </g>
        );
      })}
    </VisualSvg>
  );
}
