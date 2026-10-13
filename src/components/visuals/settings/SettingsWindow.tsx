import { useId } from "react";
import { MousePointer } from "../editor/icons";
import { VisualSvg } from "../primitives";
import { AppearancePage } from "./AppearancePage";
import { Sidebar } from "./Sidebar";
import { BACKDROP_OPACITY, PANE, SETTINGS_COLOR, WINDOW_SIZE } from "./theme";

const { width, height, radius } = WINDOW_SIZE;
const TEXT_RESET = { fontFeatureSettings: "normal", letterSpacing: 0 };

function ContentPane({ clipId }: { clipId: string }) {
  return (
    <g>
      <clipPath id={clipId}>
        <rect
          x={PANE.x + 1}
          y={PANE.y + 1}
          width={PANE.width - 2}
          height={PANE.height - 2}
          rx={PANE.radius - 1}
        />
      </clipPath>
      <rect
        x={PANE.x + 0.5}
        y={PANE.y + 0.5}
        width={PANE.width - 1}
        height={PANE.height - 1}
        rx={PANE.radius - 0.5}
        fill={SETTINGS_COLOR.backdrop}
        fillOpacity={BACKDROP_OPACITY}
        stroke={SETTINGS_COLOR.border}
      />
      <g clipPath={`url(#${clipId})`}>
        <AppearancePage />
      </g>
    </g>
  );
}

export function SettingsWindow() {
  const windowClipId = useId();
  const paneClipId = useId();
  return (
    <VisualSvg
      viewBox={`-1 -1 ${width + 2} ${height + 2}`}
      label="The CrownOS Settings app open on Appearance: dark mode, accent color, transparency and a wallpaper gallery"
    >
      <clipPath id={windowClipId}>
        <rect width={width} height={height} rx={radius} />
      </clipPath>
      <g clipPath={`url(#${windowClipId})`} style={TEXT_RESET}>
        <rect
          width={width}
          height={height}
          fill={SETTINGS_COLOR.backdrop}
          fillOpacity={BACKDROP_OPACITY}
        />
        <Sidebar />
        <ContentPane clipId={paneClipId} />
        <MousePointer x={738} y={482} />
      </g>
      <rect
        x={-0.5}
        y={-0.5}
        width={width + 1}
        height={height + 1}
        rx={radius + 0.5}
        fill="none"
        stroke={SETTINGS_COLOR.frame}
      />
    </VisualSvg>
  );
}
