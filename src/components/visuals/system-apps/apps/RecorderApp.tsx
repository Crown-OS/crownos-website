import type { CSSProperties } from "react";
import { recorder } from "@/data/system-apps/recorder";
import { seededSeries } from "@/util/chart-path";
import { CrownWindow } from "../kit/CrownWindow";
import { SectionHeading, SelectField, StatusLabel } from "../kit/controls";
import { Icon } from "../kit/Icon";
import { SidebarItem, SidebarSection } from "../kit/Sidebar";

const WAVE = { height: 120, barWidth: 3, pitch: 5, minBar: 3 } as const;
const ENHANCED_GREEN = "#4ade80";

function waveMask() {
  const { bars, seed } = recorder.waveform;
  const levels = seededSeries({ seed, mean: 0.42, spread: 0.7 }, bars);
  const middle = WAVE.height / 2;
  const rects = levels
    .map((level, index) => {
      const height = Math.round(
        WAVE.minBar + (WAVE.height - WAVE.minBar) * level,
      );
      const opacity = (0.6 + 0.4 * level).toFixed(2);
      return `<rect x='${index * WAVE.pitch + 1}' y='${middle - height / 2}' width='${WAVE.barWidth}' height='${height}' rx='1.5' fill-opacity='${opacity}'/>`;
    })
    .join("");
  const width = bars * WAVE.pitch;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${WAVE.height}'>${rects}</svg>`;
  return {
    "--wave": `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    "--wave-width": `${width}px`,
  } as CSSProperties;
}

const WAVE_STYLE = waveMask();

function RecorderSidebar() {
  return (
    <>
      <SidebarItem icon="mic" label={recorder.newRecording} current />
      <SidebarSection caption={recorder.caption}>
        {recorder.recordings.map((recording) => (
          <div
            key={recording.title}
            className="grid gap-0.5 rounded-[14px] px-2.5 py-1.75"
          >
            <span className="truncate font-medium text-(--cu-sidebar-text) text-[14px]">
              {recording.title}
            </span>
            <span className="text-(--cu-caption) text-[12px]">
              {recording.detail}
            </span>
          </div>
        ))}
      </SidebarSection>
    </>
  );
}

function Controls() {
  return (
    <div className="flex items-center justify-center gap-7">
      <span className="size-7" />
      <span className="grid size-19 place-items-center rounded-full bg-(--cu-danger) text-white">
        <Icon name="pause" size={30} stroke={2.6} />
      </span>
      <span className="crownui-field grid size-7 place-items-center rounded-lg text-(--cu-body)">
        <Icon name="square" size={15} />
      </span>
    </div>
  );
}

export function RecorderApp() {
  return (
    <CrownWindow sidebar={<RecorderSidebar />}>
      <div className="mx-auto flex max-w-150 flex-col gap-6 p-8">
        <StatusLabel color={ENHANCED_GREEN}>{recorder.status}</StatusLabel>
        <p className="text-center font-semibold text-(--cu-primary) text-[56px] tabular-nums leading-none">
          {recorder.clock}
        </p>
        <div className="cu-live-wave h-30 w-full" style={WAVE_STYLE} />
        <div className="mx-auto h-2 w-80 overflow-hidden rounded-sm bg-(--cu-track)">
          <span className="cu-level block h-full w-[68%] origin-left rounded-sm bg-(--cu-accent-start)" />
        </div>
        <Controls />
        <section className="grid gap-2">
          <SectionHeading>{recorder.sectionTitle}</SectionHeading>
          <div className="crownui-card">
            {recorder.settings.map((setting) => (
              <div
                key={setting.label}
                className="flex h-15.5 items-center justify-between px-4.5 text-(--cu-body) text-[14px]"
              >
                {setting.label}
                <SelectField value={setting.value} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </CrownWindow>
  );
}
