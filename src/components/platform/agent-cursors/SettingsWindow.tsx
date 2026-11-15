import type { ReactNode } from "react";
import { settingsSession } from "@/data/agent-cursors";
import { AgentCursor } from "./AgentCursor";
import { CrownWindow } from "./CrownWindow";
import { CURSORS, WINDOW_PLACEMENTS } from "./layout";
import { motionTrack } from "./motionTrack";
import { SettingsSidebar } from "./SettingsSidebar";

function SettingRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <span className="flex h-11 items-center justify-between px-3.5 text-base text-(--cu-body)">
      {label}
      {children}
    </span>
  );
}

export function SettingsWindow() {
  const { accents, activeAccent } = settingsSession;
  return (
    <CrownWindow
      placement={WINDOW_PLACEMENTS.settings}
      scale={0.82}
      sidebar={<SettingsSidebar />}
      cursor={<AgentCursor identity={CURSORS.codex} rest={[300, 290]} />}
    >
      <div className="grid content-start gap-3 p-3.5">
        <span className="flex h-7 items-center px-1">
          <span className="text-lg font-bold text-(--cu-primary)">
            Appearance
          </span>
        </span>
        <span className="px-1 pt-1 text-xs font-semibold text-(--cu-muted)">
          THEME
        </span>
        <span className="crownui-card grid divide-y divide-(--cu-border)">
          <SettingRow label="Night light">
            <span className="relative h-6 w-12 rounded-full bg-(--cu-track)">
              <span
                className="agent-motion absolute inset-0 rounded-full bg-(image:--cu-accent)"
                style={motionTrack("agent-settings-toggle-track")}
              />
              <span
                className="agent-motion absolute top-0.5 left-0.5 h-5 w-7 translate-x-4 rounded-full bg-(--cu-primary) shadow-[0_0_4px_rgb(0_0_0/0.14)]"
                style={motionTrack("agent-settings-toggle-knob")}
              />
            </span>
          </SettingRow>
          <SettingRow label="Accent">
            <span className="relative flex gap-1.5">
              {accents.map(({ name, from, to }) => (
                <span
                  key={name}
                  className="size-4 rounded-full"
                  style={{ backgroundImage: `linear-gradient(${from}, ${to})` }}
                />
              ))}
              <span
                className="agent-motion absolute -top-0.75 -left-0.75 size-5.5 rounded-full ring-[calc(var(--u)*1.5)] ring-white"
                style={{
                  ...motionTrack("agent-settings-accent"),
                  translate: `calc(var(--spacing) * ${activeAccent * 5.5})`,
                }}
              />
            </span>
          </SettingRow>
          <SettingRow label="Transparency">
            <span className="relative h-2 w-24 rounded-full bg-(--cu-track)">
              <span
                className="agent-motion absolute inset-0 origin-left scale-x-75 rounded-full bg-(image:--cu-accent)"
                style={motionTrack("agent-settings-slider-fill")}
              />
              <span
                className="agent-motion absolute -top-1.5 -left-3.25 h-5 w-6.5 translate-x-18 rounded-full bg-white/85 shadow-[1px_1px_2px_rgb(0_0_0/0.25)]"
                style={motionTrack("agent-settings-slider-thumb")}
              />
            </span>
          </SettingRow>
        </span>
        <span className="px-1 pt-1 text-xs font-semibold text-(--cu-muted)">
          DESKTOP
        </span>
        <span className="crownui-card grid">
          <SettingRow label="Wallpaper">
            <span className="text-(--cu-muted)">violet-haze</span>
          </SettingRow>
        </span>
      </div>
    </CrownWindow>
  );
}
