import type { CSSProperties, ReactNode } from "react";
import { OperatingSystemIcon } from "@/components/icons/OperatingSystemIcon";
import { AppIcon } from "./AppIcon";
import {
  type AppWindowSpec,
  boxStyle,
  DOCK_APPS,
  launchOrigin,
} from "./layout";

const WINDOW_CONTROLS = ["maximise", "minimise", "close"] as const;

export function AppWindow({
  spec,
  children,
}: {
  spec: AppWindowSpec;
  children: ReactNode;
}) {
  const style = {
    ...boxStyle(spec.box),
    transformOrigin: launchOrigin(spec),
    "--launch-delay": `${spec.launchDelaySeconds}s`,
  } as CSSProperties;
  return (
    <div
      style={style}
      className="app-launch-motion absolute flex flex-col gap-1 rounded-xl bg-[#0f0f10] p-1 shadow-[0_0_0_1px_#000,inset_0_1px_0_rgb(255_255_255/0.06),0_18px_40px_rgb(0_0_0/0.6)]"
    >
      <header className="flex h-5 shrink-0 items-center gap-1.5 px-0.5">
        <AppIcon app={DOCK_APPS[spec.dockIndex]} className="size-4" />
        <span className="flex items-center gap-1 rounded-sm bg-white/6 py-0.5 pr-1.5 pl-1 font-mono text-[calc(var(--u)*9)] leading-none text-white/55">
          <OperatingSystemIcon system={spec.origin} className="size-2.5" />
          {spec.packageExtension}
        </span>
        <span className="ml-auto flex gap-1">
          {WINDOW_CONTROLS.map((control) => (
            <span key={control} className="size-2.5 rounded-full bg-white/16" />
          ))}
        </span>
      </header>
      <div className="relative min-h-0 grow overflow-hidden rounded-lg bg-[#0f0f10] shadow-[inset_0_0_0_1px_#27272a]">
        {children}
      </div>
    </div>
  );
}
