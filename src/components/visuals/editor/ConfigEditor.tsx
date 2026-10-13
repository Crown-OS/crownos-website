import { useId } from "react";
import { VisualSvg } from "../primitives";
import { CodePane } from "./CodePane";
import { Sidebar } from "./Sidebar";
import { Titlebar } from "./Titlebar";
import { EDITOR_COLOR, EDITOR_SIZE, LAYOUT } from "./theme";

const { width, height, radius } = EDITOR_SIZE;

export function ConfigEditor() {
  const clipId = useId();
  return (
    <VisualSvg
      viewBox={`-1 -1 ${width + 2} ${height + 2}`}
      label="A code editor open on ~/.config/crownos, editing appearance.ron"
    >
      <clipPath id={clipId}>
        <rect width={width} height={height} rx={radius} />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width={width} height={height} fill={EDITOR_COLOR.surface} />
        <Titlebar />
        <rect
          y={LAYOUT.titlebarHeight}
          width={width}
          height={1}
          fill={EDITOR_COLOR.divider}
        />
        <Sidebar />
        <CodePane />
      </g>
      <rect
        x={-0.5}
        y={-0.5}
        width={width + 1}
        height={height + 1}
        rx={radius + 0.5}
        fill="none"
        stroke={EDITOR_COLOR.frame}
      />
    </VisualSvg>
  );
}
