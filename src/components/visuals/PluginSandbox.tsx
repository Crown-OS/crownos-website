import { Mono, Pane, Pill, Sans, SkeletonLine, VisualSvg } from "./primitives";

const MANIFEST = [
  { text: "[plugin]", heading: true },
  { text: 'name     = "focus-dim"' },
  { text: 'runs_in  = "sandbox"' },
  { text: "" },
  { text: "[grants]", heading: true },
  { text: "windows.style = true" },
  { text: "windows.focus = true" },
  { text: "network       = false" },
  { text: "files.home    = false" },
];

const GRANTS = [
  { scope: "windows.style", decision: "Allowed" },
  { scope: "windows.focus", decision: "Allowed" },
  { scope: "network", decision: "Denied" },
] as const;

export function PluginSandbox() {
  return (
    <VisualSvg
      viewBox="0 0 720 440"
      label="Crown Agent writing a sandboxed plugin and asking for permissions"
    >
      <Pane x={24} y={24} width={300} height={392} title="Crown Agent">
        <rect
          x={64}
          y={68}
          width={240}
          height={58}
          rx={14}
          className="fill-white/8"
        />
        <Sans x={80} y={92} size={13}>
          Dim every window except
        </Sans>
        <Sans x={80} y={111} size={13}>
          the one I'm focused on
        </Sans>
        <Mono x={44} y={156}>
          Writing plugin focus-dim
        </Mono>
        <SkeletonLine x={44} y={170} width={230} />
        <SkeletonLine x={44} y={184} width={170} />
        <Mono x={44} y={222} className="fill-white/45">
          Requesting permissions
        </Mono>
        {GRANTS.map(({ scope, decision }, index) => (
          <g key={scope}>
            <rect
              x={44}
              y={236 + index * 42}
              width={260}
              height={34}
              rx={10}
              className="fill-transparent stroke-white/12"
            />
            <Mono x={58} y={257 + index * 42}>
              {scope}
            </Mono>
            <Pill
              x={260}
              y={253 + index * 42}
              centered
              label={decision}
              tone={decision === "Allowed" ? "solid" : "outline"}
            />
          </g>
        ))}
        <rect
          x={44}
          y={370}
          width={260}
          height={30}
          rx={15}
          className="fill-gray-800 stroke-white/10"
        />
        <Sans x={60} y={389} size={12} className="fill-white/35">
          Describe a change…
        </Sans>
      </Pane>

      <Pane
        x={348}
        y={64}
        width={348}
        height={320}
        title="focus-dim / plugin.toml"
      >
        {MANIFEST.map(({ text, heading }, index) => (
          <g key={text || index}>
            <Mono x={366} y={122 + index * 22} className="fill-white/25">
              {String(index + 1).padStart(2, "0")}
            </Mono>
            <Mono
              x={396}
              y={122 + index * 22}
              size={12}
              className={heading ? "fill-white/45" : "fill-white/85"}
            >
              {text}
            </Mono>
          </g>
        ))}
        <circle cx={372} cy={356} r={4} className="pulse-dot fill-white" />
        <Mono x={386} y={360} className="fill-white/55">
          Running in sandbox · 0.4 MB
        </Mono>
      </Pane>
    </VisualSvg>
  );
}
