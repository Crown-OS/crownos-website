import type { CSSProperties, ReactNode } from "react";
import { Glyph, type GlyphName } from "./Glyph";

type WindowTheme = "light" | "dark";

export type WindowTab = {
  title: string;
  icon?: GlyphName;
  active?: boolean;
  pinned?: boolean;
};

const TRAFFIC_LIGHTS = ["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"];

const THEME = {
  light: {
    frame: "window-light",
    activeTab: "bg-white text-neutral-900",
    idleTab: "text-neutral-600",
    divider: "bg-neutral-400/50",
    pinned: "bg-black/6 text-neutral-800",
  },
  dark: {
    frame: "window-dark",
    activeTab: "bg-[#1c1c1f] text-white/90",
    idleTab: "text-white/45",
    divider: "bg-white/12",
    pinned: "bg-white/8 text-white/80",
  },
} as const;

function TabStrip({
  tabs,
  theme,
}: {
  tabs: readonly WindowTab[];
  theme: (typeof THEME)[WindowTheme];
}) {
  return (
    <div className="flex h-10 shrink-0 items-end gap-1 pr-3 pl-4">
      <div className="flex gap-2 self-center pr-3">
        {TRAFFIC_LIGHTS.map((color) => (
          <span
            key={color}
            className={`size-3 rounded-full shadow-[inset_0_0_0_0.5px_rgb(0_0_0/0.18)] ${color}`}
          />
        ))}
      </div>
      {tabs.map(({ title, icon, active, pinned }, index) => (
        <div
          key={title}
          className={`flex min-w-0 items-center gap-1.5 text-xs ${
            pinned
              ? `mb-1.5 h-6.5 self-end rounded-md px-2.5 ${theme.pinned}`
              : `relative h-8 max-w-36 rounded-t-lg px-3 ${active ? theme.activeTab : theme.idleTab}`
          }`}
        >
          {icon && <Glyph name={icon} className="size-3.5 text-brand" />}
          <span className="truncate">{title}</span>
          {!pinned && !active && !tabs[index + 1]?.active && (
            <span
              className={`absolute top-2.5 right-0 h-3 w-px ${theme.divider}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function AppWindow({
  label,
  width,
  height,
  theme = "light",
  tabs,
  toolbar,
  children,
}: {
  label: string;
  width: number;
  height: number;
  theme?: WindowTheme;
  tabs: readonly WindowTab[];
  toolbar?: ReactNode;
  children: ReactNode;
}) {
  const palette = THEME[theme];
  return (
    <div
      role="img"
      aria-label={label}
      className="window-stage select-none"
      style={
        {
          "--frame-width": width,
          aspectRatio: `${width} / ${height}`,
        } as CSSProperties
      }
    >
      <div
        className={`flex size-full flex-col overflow-hidden rounded-xl text-sm ${palette.frame}`}
      >
        <TabStrip tabs={tabs} theme={palette} />
        {toolbar}
        <div className="flex min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
