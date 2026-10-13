import { CROWN_PATH } from "@/data/brand";
import { FlowLine, Mono, Pill, VisualSvg } from "./primitives";

const HUB = { x: 280, y: 182 };

const LINKS = [
  { from: { x: 92, y: 92 }, label: "Clipboard", at: { x: 170, y: 120 } },
  { from: { x: 470, y: 86 }, label: "Second screen", at: { x: 392, y: 118 } },
  { from: { x: 96, y: 292 }, label: "Agents", at: { x: 176, y: 252 } },
  { from: { x: 478, y: 290 }, label: "Calls", at: { x: 392, y: 252 } },
];

const DEVICE_CLASS = "fill-gray-850 stroke-white/30";

export function DeviceMesh() {
  return (
    <VisualSvg
      viewBox="0 0 560 360"
      label="A laptop linked to a phone, tablet, server and second phone"
    >
      {LINKS.map(({ from }) => (
        <FlowLine key={from.x} d={`M${from.x} ${from.y}L${HUB.x} ${HUB.y}`} />
      ))}

      <rect
        x={70}
        y={52}
        width={44}
        height={80}
        rx={10}
        className={DEVICE_CLASS}
      />
      <rect
        x={420}
        y={52}
        width={100}
        height={70}
        rx={8}
        className={DEVICE_CLASS}
      />
      <rect
        x={54}
        y={268}
        width={84}
        height={22}
        rx={4}
        className={DEVICE_CLASS}
      />
      <rect
        x={54}
        y={294}
        width={84}
        height={22}
        rx={4}
        className={DEVICE_CLASS}
      />
      <circle cx={66} cy={279} r={2} className="pulse-dot fill-white" />
      <circle cx={66} cy={305} r={2} className="fill-white/40" />
      <rect
        x={458}
        y={252}
        width={40}
        height={74}
        rx={9}
        className={DEVICE_CLASS}
      />

      <rect
        x={216}
        y={134}
        width={128}
        height={82}
        rx={7}
        className="fill-gray-800 stroke-white/40"
      />
      <path
        d="M200 216h160l-10 12H210z"
        className="fill-gray-750 stroke-white/40"
      />
      <g transform="translate(264 160) scale(0.118)">
        <path d={CROWN_PATH} className="fill-white" />
      </g>
      <Mono
        x={HUB.x}
        y={204}
        anchor="middle"
        size={10}
        className="fill-white/55"
      >
        CrownOS
      </Mono>

      {LINKS.map(({ label, at }) => (
        <Pill key={label} x={at.x} y={at.y} label={label} centered />
      ))}
      <Pill x={HUB.x} y={262} label="Files" centered tone="outline" />
      <Pill x={HUB.x} y={102} label="Notifications" centered tone="outline" />
    </VisualSvg>
  );
}
