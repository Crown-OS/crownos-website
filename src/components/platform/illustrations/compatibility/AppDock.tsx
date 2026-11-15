import type { CSSProperties } from "react";
import { AppIcon } from "./AppIcon";
import { APP_WINDOWS, boxStyle, DOCK_APPS, DOCK_BOX } from "./layout";

const ALWAYS_RUNNING_APP = "files";

function launchDelayFor(dockIndex: number) {
  return APP_WINDOWS.find((spec) => spec.dockIndex === dockIndex)
    ?.launchDelaySeconds;
}

export function AppDock() {
  return (
    <ul
      style={boxStyle(DOCK_BOX)}
      className="absolute flex items-center gap-[calc(var(--u)*7)] rounded-full bg-white/10 p-[calc(var(--u)*7)] shadow-[inset_0_1px_0_rgb(255_255_255/0.08),inset_0_-1px_0_rgb(255_255_255/0.12),inset_0_-3px_0_rgb(255_255_255/0.03),inset_0_0_0_1px_rgb(255_255_255/0.05),0_6px_24px_rgb(0_0_0/0.4)]"
    >
      {DOCK_APPS.map((app, dockIndex) => {
        const launchDelay = launchDelayFor(dockIndex);
        const launches = launchDelay !== undefined;
        const motionStyle = launches
          ? ({ "--launch-delay": `${launchDelay}s` } as CSSProperties)
          : undefined;
        return (
          <li key={app.id} style={motionStyle} className="relative">
            <AppIcon
              app={app}
              className={`size-[calc(var(--u)*38)] ${launches ? "app-dock-bounce-motion" : ""}`}
            />
            {(launches || app.id === ALWAYS_RUNNING_APP) && (
              <span
                className={`absolute -bottom-[calc(var(--u)*5)] left-1/2 h-[calc(var(--u)*2.5)] w-[calc(var(--u)*4)] -translate-x-1/2 rounded-full bg-white/55 ${launches ? "app-dock-running-motion" : ""}`}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
