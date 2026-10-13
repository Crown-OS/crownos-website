import { CROWN_PATH } from "@/data/brand";
import { Pill, VisualSvg } from "./primitives";

const HUB = { x: 180, y: 130 };

const ACCESSORIES = [
  { label: "Printer", x: 66, y: 44 },
  { label: "Drawing tablet", x: 260, y: 36 },
  { label: "Controller", x: 56, y: 132 },
  { label: "Audio interface", x: 290, y: 126 },
  { label: "Webcam", x: 84, y: 222 },
  { label: "Dock", x: 270, y: 218 },
];

export function AccessoryHub() {
  return (
    <VisualSvg
      viewBox="0 0 360 260"
      label="Accessories connected and configured"
    >
      {ACCESSORIES.map(({ label, x, y }) => (
        <path
          key={label}
          d={`M${x} ${y}L${HUB.x} ${HUB.y}`}
          className="stroke-white/14"
        />
      ))}
      <circle
        cx={HUB.x}
        cy={HUB.y}
        r={30}
        className="fill-gray-750 stroke-white/30"
      />
      <g transform="translate(164 118) scale(0.115)">
        <path d={CROWN_PATH} className="fill-white" />
      </g>
      {ACCESSORIES.map(({ label, x, y }) => (
        <Pill key={label} x={x} y={y} label={label} centered />
      ))}
    </VisualSvg>
  );
}
