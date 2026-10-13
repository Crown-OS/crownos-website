import { Check, FlowLine, Mono, Progress, Sans, VisualSvg } from "./primitives";

const ITEMS = [
  { name: "Documents & photos", size: "18.4 GB" },
  { name: "Dotfiles & settings", size: "214 files" },
  { name: "Packages to pacman", size: "312 mapped" },
  { name: "Browser profiles", size: "3 profiles" },
];

const MACHINES = [
  { x: 32, title: "Old desktop", meta: "ubuntu · 412 GB" },
  { x: 328, title: "CrownOS", meta: "fresh install" },
];

const PROGRESS = 0.86;

export function Migration() {
  return (
    <VisualSvg
      viewBox="0 0 560 360"
      label="Migration assistant copying files, dotfiles and packages to CrownOS"
    >
      {MACHINES.map(({ x, title, meta }) => (
        <g key={title}>
          <rect
            x={x}
            y={24}
            width={200}
            height={58}
            rx={12}
            className="fill-gray-850 stroke-white/14"
          />
          <Sans x={x + 18} y={50} size={14}>
            {title}
          </Sans>
          <Mono x={x + 18} y={68} size={10} className="fill-white/45">
            {meta}
          </Mono>
        </g>
      ))}
      <FlowLine d="M240 53h80" />
      <path d="m314 48 6 5-6 5" fill="none" className="stroke-white/50" />

      {ITEMS.map(({ name, size }, index) => (
        <g key={name}>
          <path d={`M32 ${136 + index * 40}h496`} className="stroke-white/8" />
          <Sans x={32} y={124 + index * 40} size={13} className="fill-white/85">
            {name}
          </Sans>
          <Mono
            x={400}
            y={124 + index * 40}
            anchor="end"
            className="fill-white/45"
          >
            {size}
          </Mono>
          <Check x={518} y={120 + index * 40} />
        </g>
      ))}
      <Sans x={32} y={284} size={13} className="fill-white/55">
        Verifying checksums
      </Sans>
      <circle
        cx={518}
        cy={280}
        r={8}
        fill="none"
        strokeWidth={1.5}
        strokeDasharray="30 20"
        className="spin-slow stroke-white/60"
      />

      <Mono x={32} y={318} className="fill-white/45">
        04:12 elapsed
      </Mono>
      <Mono x={528} y={318} anchor="end">
        {`${Math.round(PROGRESS * 100)}%`}
      </Mono>
      <Progress x={32} y={330} width={496} ratio={PROGRESS} />
    </VisualSvg>
  );
}
