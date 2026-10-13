import { Mono, Pill, VisualSvg } from "./primitives";

const ENTRIES = [
  "├─ appearance.toml",
  "├─ keybinds.toml",
  "├─ displays.toml",
  "├─ animations.toml",
  "├─ plugins/",
  "└─ crown.lock",
];

const EDITED_ROW = 1;
const ROW_HEIGHT = 28;
const FIRST_ROW = 74;

export function ConfigTree() {
  const editedY = FIRST_ROW + EDITED_ROW * ROW_HEIGHT;
  return (
    <VisualSvg viewBox="0 0 360 260" label="The ~/.config/crown folder tree">
      <path
        d="M24 24h22l6 6h40a6 6 0 0 1 6 6v10H24z"
        className="fill-gray-750 stroke-white/30"
      />
      <Mono x={110} y={40} size={13} className="fill-white/90">
        ~/.config/crown
      </Mono>
      <rect
        x={28}
        y={editedY - 18}
        width={304}
        height={26}
        rx={8}
        className="fill-white/8"
      />
      {ENTRIES.map((entry, index) => (
        <Mono
          key={entry}
          x={40}
          y={FIRST_ROW + index * ROW_HEIGHT}
          size={12}
          className={index === EDITED_ROW ? "fill-white" : "fill-white/60"}
        >
          {entry}
        </Mono>
      ))}
      <Pill x={286} y={editedY - 5} centered label="Settings" tone="solid" />
    </VisualSvg>
  );
}
