import { configEditor } from "@/data/config-editor";
import { EditorIcon, type IconName } from "./icons";
import { UiText } from "./text";
import { EDITOR_COLOR, EDITOR_SIZE, LAYOUT } from "./theme";

const CENTER_Y = LAYOUT.titlebarHeight / 2;
const LAYOUT_TOGGLES: IconName[] = [
  "panelLeft",
  "panelBottom",
  "panelRight",
  "grid",
];
const TOGGLE_START = 21.5;
const TOGGLE_GAP = 28;
const TOGGLE_HIGHLIGHT = 22;
const ACTIONS: IconName[] = ["broadcastOff", "play", "search", "bell"];
const ACTION_END = 879.5;
const ACTION_GAP = 28.2;

const PROJECT_X = 129.5;
const PROJECT_CHEVRON_X = 191.5;
const BRANCH_ICON_X = 219;
const BRANCH_X = 231.5;
const BRANCH_CHEVRON_X = 272.5;

export function Titlebar() {
  return (
    <g>
      <rect
        width={EDITOR_SIZE.width}
        height={LAYOUT.titlebarHeight}
        fill={EDITOR_COLOR.chrome}
      />
      <rect
        x={TOGGLE_START - TOGGLE_HIGHLIGHT / 2}
        y={CENTER_Y - TOGGLE_HIGHLIGHT / 2}
        width={TOGGLE_HIGHLIGHT}
        height={TOGGLE_HIGHLIGHT}
        rx={4}
        fill={EDITOR_COLOR.selection}
      />
      {LAYOUT_TOGGLES.map((name, index) => (
        <EditorIcon
          key={name}
          name={name}
          x={TOGGLE_START + index * TOGGLE_GAP}
          y={CENTER_Y}
        />
      ))}
      <UiText x={PROJECT_X} y={CENTER_Y}>
        {configEditor.project}
      </UiText>
      <EditorIcon
        name="chevronDown"
        x={PROJECT_CHEVRON_X}
        y={CENTER_Y}
        size={14}
        color={EDITOR_COLOR.muted}
      />
      <EditorIcon name="branch" x={BRANCH_ICON_X} y={CENTER_Y} size={14} />
      <UiText x={BRANCH_X} y={CENTER_Y}>
        {configEditor.branch}
      </UiText>
      <EditorIcon
        name="chevronDown"
        x={BRANCH_CHEVRON_X}
        y={CENTER_Y}
        size={14}
        color={EDITOR_COLOR.muted}
      />
      {ACTIONS.map((name, index) => (
        <EditorIcon
          key={name}
          name={name}
          x={ACTION_END - (ACTIONS.length - 1 - index) * ACTION_GAP}
          y={CENTER_Y}
          color={
            name === "broadcastOff" ? EDITOR_COLOR.alert : EDITOR_COLOR.text
          }
        />
      ))}
    </g>
  );
}
