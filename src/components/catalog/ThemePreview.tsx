import type { CSSProperties } from "react";
import type { ThemeMeta } from "@/data/catalog";

const DOCK_APPS = 5;
const SIDEBAR_ROWS = [72, 54, 64, 48];
const BODY_ROWS = [92, 78, 86];

function previewVariables({ palette, wallpaper }: ThemeMeta): CSSProperties {
  return {
    "--theme-bg": palette.background,
    "--theme-surface": palette.surface,
    "--theme-text": palette.text,
    "--theme-accent": palette.accent,
    "--tone-start": wallpaper[0],
    "--tone-mid": wallpaper[1],
    "--tone-end": wallpaper[2],
  };
}

function Bar({ width, strong }: { width: number; strong?: boolean }) {
  return (
    <span
      className={`block h-[0.9cqw] rounded-full bg-(--theme-text) ${strong ? "opacity-80" : "opacity-25"}`}
      style={{ width: `${width}%` }}
    />
  );
}

function SettingsWindow() {
  return (
    <div className="absolute top-[14%] left-[8%] flex h-[62%] w-[58%] overflow-hidden rounded-[1.2cqw] bg-(--theme-surface) shadow-[0_2cqw_5cqw_-1cqw_rgb(0_0_0/0.55)] ring-1 ring-(--theme-text)/10">
      <div className="grid w-[32%] content-start gap-[1.6cqw] bg-(--theme-bg)/60 p-[2cqw]">
        <span className="mb-[1cqw] flex gap-[0.7cqw]">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="size-[1cqw] rounded-full bg-(--theme-text)/25"
            />
          ))}
        </span>
        {SIDEBAR_ROWS.map((width, row) => (
          <Bar key={width} width={width} strong={row === 1} />
        ))}
      </div>
      <div className="grid flex-1 content-start gap-[2cqw] p-[2.6cqw]">
        <span className="block h-[1.6cqw] w-[46%] rounded-full bg-(--theme-text)/85" />
        {BODY_ROWS.map((width) => (
          <Bar key={width} width={width} />
        ))}
        <div className="mt-[1cqw] flex items-center justify-between rounded-[0.8cqw] bg-(--theme-bg)/50 p-[1.6cqw]">
          <Bar width={40} strong />
          <span className="flex h-[2.2cqw] w-[4.2cqw] items-center justify-end rounded-full bg-(--theme-accent) p-[0.3cqw]">
            <span className="aspect-square h-full rounded-full bg-(--theme-bg)" />
          </span>
        </div>
        <span className="h-[3cqw] w-[30%] rounded-full bg-(--theme-accent)" />
      </div>
    </div>
  );
}

function PlayerWindow() {
  return (
    <div className="absolute top-[34%] right-[7%] grid w-[30%] gap-[1.6cqw] rounded-[1.2cqw] bg-(--theme-surface) p-[2cqw] shadow-[0_2cqw_5cqw_-1cqw_rgb(0_0_0/0.6)] ring-1 ring-(--theme-text)/10">
      <span className="wallpaper aspect-square w-full rounded-[0.8cqw]" />
      <Bar width={70} strong />
      <Bar width={44} />
      <span className="h-[0.6cqw] overflow-hidden rounded-full bg-(--theme-text)/15">
        <span className="block h-full w-[58%] bg-(--theme-accent)" />
      </span>
    </div>
  );
}

export function ThemePreview({ theme }: { theme: ThemeMeta }) {
  return (
    <div
      aria-hidden
      style={previewVariables(theme)}
      className="wallpaper relative aspect-[16/10] overflow-hidden [container-type:inline-size]"
    >
      <div className="absolute inset-x-0 top-0 flex h-[4.5%] items-center justify-between bg-(--theme-bg)/70 px-[2cqw] backdrop-blur-sm">
        <span className="size-[1.4cqw] rounded-full bg-(--theme-text)/80" />
        <span className="h-[0.9cqw] w-[8%] rounded-full bg-(--theme-text)/50" />
      </div>
      <div className="transition-[translate] duration-1000 ease-out-expo group-hover:-translate-y-[1.5%]">
        <SettingsWindow />
      </div>
      <div className="transition-[translate] duration-1000 ease-out-expo group-hover:-translate-y-[4%]">
        <PlayerWindow />
      </div>
      <div className="absolute bottom-[4%] left-1/2 flex -translate-x-1/2 gap-[1.2cqw] rounded-[1.6cqw] bg-(--theme-bg)/60 p-[1cqw] ring-1 ring-(--theme-text)/10 backdrop-blur-sm">
        {Array.from({ length: DOCK_APPS }, (_, app) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: dock slots are positional
            key={app}
            className={`size-[3.6cqw] rounded-[1cqw] ${app === 0 ? "bg-(--theme-accent)" : "bg-(--theme-text)/20"}`}
          />
        ))}
      </div>
    </div>
  );
}
