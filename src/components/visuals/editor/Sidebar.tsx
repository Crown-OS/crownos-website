import { configEditor } from "@/data/config-editor";
import { EditorIcon, type IconName, RonGlyph } from "./icons";
import { UiText } from "./text";
import { EDITOR_COLOR, EDITOR_SIZE, LAYOUT } from "./theme";

const TABS_TOP = LAYOUT.titlebarHeight + 1;
const TABS_CENTER = (TABS_TOP + LAYOUT.tabsBottom) / 2;
const PANEL_TABS: {
  label: string;
  icon: IconName;
  iconX: number;
  textX: number;
}[] = [
  { label: "Files", icon: "folder", iconX: 15.5, textX: 27.5 },
  { label: "Git", icon: "branch", iconX: 82, textX: 94.5 },
  { label: "History", icon: "history", iconX: 139, textX: 151.5 },
];
const ACTIVE_TAB_WIDTH = 66;

const ROOT_Y = 78;
const ROW_HEIGHT = 20;
const MARKER_X = 15.5;
const LABEL_X = 29.5;

export function Sidebar() {
  const selectedRow = configEditor.tree.findIndex(
    ({ name }) => name === configEditor.openFile,
  );
  const rowY = (index: number) => ROOT_Y + (index + 1) * ROW_HEIGHT;

  return (
    <g>
      <rect
        y={TABS_TOP}
        width={LAYOUT.sidebarWidth}
        height={LAYOUT.tabsBottom - TABS_TOP}
        fill={EDITOR_COLOR.chrome}
      />
      <rect
        y={TABS_TOP}
        width={ACTIVE_TAB_WIDTH}
        height={LAYOUT.tabsBottom - TABS_TOP}
        fill={EDITOR_COLOR.surface}
      />
      {PANEL_TABS.map(({ label, icon, iconX, textX }) => (
        <g key={label}>
          <EditorIcon name={icon} x={iconX} y={TABS_CENTER} size={14} />
          <UiText x={textX} y={TABS_CENTER}>
            {label}
          </UiText>
        </g>
      ))}

      <rect
        y={rowY(selectedRow) - ROW_HEIGHT / 2}
        width={LAYOUT.sidebarWidth}
        height={ROW_HEIGHT}
        fill={EDITOR_COLOR.selection}
      />
      <UiText x={7.5} y={ROOT_Y} bold>
        {configEditor.project}
      </UiText>
      {configEditor.tree.map(({ name, kind }, index) => (
        <g key={name}>
          {kind === "folder" ? (
            <EditorIcon
              name="chevronRight"
              x={MARKER_X}
              y={rowY(index)}
              size={14}
              color={EDITOR_COLOR.icon}
            />
          ) : (
            <RonGlyph x={MARKER_X} y={rowY(index)} />
          )}
          <UiText x={LABEL_X} y={rowY(index)}>
            {name}
          </UiText>
        </g>
      ))}

      <rect
        x={LAYOUT.sidebarWidth}
        y={TABS_TOP}
        width={1}
        height={EDITOR_SIZE.height}
        fill={EDITOR_COLOR.divider}
      />
    </g>
  );
}
