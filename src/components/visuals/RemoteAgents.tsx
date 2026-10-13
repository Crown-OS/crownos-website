import { FlowLine, Mono, Pane, Progress, Sans, VisualSvg } from "./primitives";

const TASKS = [
  {
    name: "Tag 4,218 photos",
    host: "home-server",
    progress: 0.62,
    status: "62%",
  },
  {
    name: "Summarise this week's meetings",
    host: "cloud-box",
    progress: 0.28,
    status: "28%",
  },
  {
    name: "Audit nightly backups",
    host: "home-server",
    progress: 1,
    status: "Done",
  },
  {
    name: "Index research papers",
    host: "cloud-box",
    progress: 0,
    status: "Queued",
  },
];

const HOSTS = [
  { name: "home-server", y: 112, spec: "64 GB · GPU" },
  { name: "cloud-box", y: 322, spec: "128 GB · 4 GPU" },
];

const TASK_TOP = 72;
const TASK_GAP = 96;

export function RemoteAgents() {
  return (
    <VisualSvg
      viewBox="0 0 600 520"
      label="Agent tasks on the desktop running on a home server and a cloud machine"
    >
      {TASKS.map(({ name, host }, index) => {
        const target = HOSTS.find((candidate) => candidate.name === host);
        const fromY = TASK_TOP + index * TASK_GAP + 36;
        return (
          target && (
            <FlowLine
              key={name}
              d={`M344 ${fromY}C390 ${fromY} 390 ${target.y + 32} 424 ${target.y + 32}`}
            />
          )
        );
      })}

      <Pane x={20} y={24} width={344} height={472} title="Agents">
        {TASKS.map(({ name, host, progress, status }, index) => {
          const top = TASK_TOP + index * TASK_GAP;
          return (
            <g key={name}>
              <rect
                x={36}
                y={top - 12}
                width={312}
                height={84}
                rx={12}
                className="fill-gray-800 stroke-white/10"
              />
              <Sans x={52} y={top + 14} size={13}>
                {name}
              </Sans>
              <Mono x={52} y={top + 34} size={10} className="fill-white/45">
                {`on ${host}`}
              </Mono>
              <Mono
                x={332}
                y={top + 14}
                anchor="end"
                className={progress === 1 ? "fill-white" : "fill-white/55"}
              >
                {status}
              </Mono>
              <Progress x={52} y={top + 50} width={280} ratio={progress} />
            </g>
          );
        })}
      </Pane>

      {HOSTS.map(({ name, y, spec }) => (
        <g key={name}>
          {[0, 1, 2].map((unit) => (
            <g key={unit}>
              <rect
                x={424}
                y={y + unit * 22}
                width={156}
                height={18}
                rx={4}
                className="fill-gray-850 stroke-white/25"
              />
              <circle
                cx={436}
                cy={y + unit * 22 + 9}
                r={2}
                className={
                  unit === 0 ? "pulse-dot fill-white" : "fill-white/30"
                }
              />
              <path
                d={`M520 ${y + unit * 22 + 9}h48`}
                className="stroke-white/15"
                strokeDasharray="2 3"
              />
            </g>
          ))}
          <Sans x={424} y={y + 92} size={13}>
            {name}
          </Sans>
          <Mono x={424} y={y + 110} size={10} className="fill-white/45">
            {spec}
          </Mono>
        </g>
      ))}
    </VisualSvg>
  );
}
