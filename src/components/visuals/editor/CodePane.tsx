import { configEditor } from "@/data/config-editor";
import { highlightRon } from "@/util/ron-highlight";
import { EditorIcon, MousePointer, RonGlyph } from "./icons";
import { CodeText, UiText } from "./text";
import { EDITOR_COLOR, EDITOR_SIZE, LAYOUT, SYNTAX_COLOR } from "./theme";

const PANE_X = LAYOUT.sidebarWidth + 1;
const TABS_TOP = LAYOUT.titlebarHeight + 1;
const TABS_CENTER = (TABS_TOP + LAYOUT.tabsBottom) / 2;
const TAB_WIDTH = 141;
const TAB_ACCENT = 1.5;

const FIRST_LINE_Y = 81;
const LINE_HEIGHT = 18;
const GUTTER_END = 270.5;
const CODE_X = 282.5;

const STATUS_Y = 653;
const STATUS_GAP = 13;
const SEPARATOR_GAP = 8;
const BREADCRUMB = configEditor.breadcrumb.flatMap((segment, index) =>
  index === 0 ? [segment] : ["/", segment],
);

function EditorTab() {
  const tabHeight = LAYOUT.tabsBottom - TABS_TOP;
  return (
    <g>
      <rect
        x={PANE_X}
        y={TABS_TOP}
        width={EDITOR_SIZE.width - PANE_X}
        height={tabHeight}
        fill={EDITOR_COLOR.chrome}
      />
      <rect
        x={PANE_X}
        y={TABS_TOP}
        width={TAB_WIDTH}
        height={tabHeight}
        fill={EDITOR_COLOR.surface}
      />
      <rect
        x={PANE_X}
        y={TABS_TOP}
        width={TAB_WIDTH}
        height={TAB_ACCENT}
        fill={EDITOR_COLOR.text}
      />
      <RonGlyph x={PANE_X + 15} y={TABS_CENTER} />
      <UiText x={PANE_X + 27.5} y={TABS_CENTER}>
        {configEditor.openFile}
      </UiText>
      <EditorIcon
        name="close"
        x={PANE_X + TAB_WIDTH - 11.5}
        y={TABS_CENTER}
        size={13}
        color={EDITOR_COLOR.icon}
      />
    </g>
  );
}

function SourceLines() {
  const lineY = (index: number) => FIRST_LINE_Y + index * LINE_HEIGHT;
  const activeIndex = configEditor.activeLine - 1;
  return (
    <g>
      <rect
        x={PANE_X}
        y={lineY(activeIndex) - LINE_HEIGHT / 2}
        width={EDITOR_SIZE.width - PANE_X}
        height={LINE_HEIGHT}
        fill={EDITOR_COLOR.activeLine}
      />
      {configEditor.source.map((line, index) => {
        const indent = line.length - line.trimStart().length;
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: source lines are static and positional
          <g key={index}>
            <CodeText
              x={GUTTER_END}
              y={lineY(index)}
              anchor="end"
              color={
                index === activeIndex ? EDITOR_COLOR.muted : EDITOR_COLOR.dim
              }
            >
              {index + 1}
            </CodeText>
            <CodeText
              x={CODE_X + indent * LAYOUT.codeCharWidth}
              y={lineY(index)}
            >
              {highlightRon(line.trimStart()).map(
                ({ text, kind }, tokenIndex) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: tokens are positional within a line
                  <tspan key={tokenIndex} fill={SYNTAX_COLOR[kind]}>
                    {text}
                  </tspan>
                ),
              )}
            </CodeText>
          </g>
        );
      })}
    </g>
  );
}

function StatusBar() {
  return (
    <g>
      <UiText x={PANE_X + 7.5} y={STATUS_Y} color={EDITOR_COLOR.muted}>
        {BREADCRUMB.map((part, index) => (
          <tspan key={`${index}-${part}`} dx={index === 0 ? 0 : SEPARATOR_GAP}>
            {part}
          </tspan>
        ))}
      </UiText>
      <UiText
        x={EDITOR_SIZE.width - 9.5}
        y={STATUS_Y}
        anchor="end"
        color={EDITOR_COLOR.muted}
      >
        {configEditor.status.map((item, index) => (
          <tspan key={item} dx={index === 0 ? 0 : STATUS_GAP}>
            {item}
          </tspan>
        ))}
      </UiText>
    </g>
  );
}

export function CodePane() {
  return (
    <g>
      <EditorTab />
      <SourceLines />
      <StatusBar />
      <MousePointer x={715.5} y={225} />
    </g>
  );
}
