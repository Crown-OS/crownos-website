import { Mono, Pane, SkeletonLine, VisualSvg } from "./primitives";

const BACK_WINDOWS = [
  { x: 24, y: 24, title: "Files" },
  { x: 64, y: 56, title: "Terminal" },
];

const TOKENS = [
  { name: "radius", ratio: 0.62 },
  { name: "density", ratio: 0.34 },
  { name: "contrast", ratio: 0.8 },
];

export function ThemedApps() {
  return (
    <VisualSvg
      viewBox="0 0 360 260"
      label="System apps restyled from theme.toml"
    >
      {BACK_WINDOWS.map(({ x, y, title }) => (
        <Pane key={title} x={x} y={y} width={200} height={130} title={title}>
          <SkeletonLine x={x + 16} y={y + 48} width={120} />
          <SkeletonLine x={x + 16} y={y + 62} width={90} />
        </Pane>
      ))}
      <Pane x={120} y={92} width={216} height={148} title="theme.toml">
        {TOKENS.map(({ name, ratio }, index) => {
          const y = 150 + index * 32;
          return (
            <g key={name}>
              <Mono x={136} y={y + 4} className="fill-white/60">
                {name}
              </Mono>
              <rect
                x={210}
                y={y - 1}
                width={108}
                height={3}
                rx={1.5}
                className="fill-white/14"
              />
              <rect
                x={210}
                y={y - 1}
                width={108 * ratio}
                height={3}
                rx={1.5}
                className="fill-white/80"
              />
              <circle
                cx={210 + 108 * ratio}
                cy={y + 0.5}
                r={6}
                className="fill-paper"
              />
            </g>
          );
        })}
      </Pane>
    </VisualSvg>
  );
}
