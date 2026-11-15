import type { CSSProperties, ReactNode } from "react";
import type { WindowPlacement } from "./layout";
import { WindowControls } from "./WindowControls";

type CrownWindowProps = {
  placement: WindowPlacement;
  scale?: number;
  toolbar?: ReactNode;
  sidebar?: ReactNode;
  cursor: ReactNode;
  children: ReactNode;
};

function placementVariables(
  { mobile, desktop }: WindowPlacement,
  scale: number,
) {
  return {
    "--window-scale": scale,
    "--mobile-x": mobile.x,
    "--mobile-y": mobile.y,
    "--mobile-width": mobile.width,
    "--mobile-height": mobile.height,
    "--desktop-x": desktop.x,
    "--desktop-y": desktop.y,
    "--desktop-width": desktop.width,
    "--desktop-height": desktop.height,
  } as CSSProperties;
}

export function CrownWindow({
  placement,
  scale = 1,
  toolbar,
  sidebar,
  cursor,
  children,
}: CrownWindowProps) {
  return (
    <div
      className="agent-window-placement"
      style={placementVariables(placement, scale)}
    >
      <div className="flex size-full origin-top-left scale-(--window-scale) gap-1.5 overflow-hidden rounded-xl bg-(--cu-frame) p-1.5 shadow-[0_0_0_1px_#000,inset_0_1px_0_rgb(255_255_255/0.06),0_24px_48px_rgb(0_0_0/0.55)]">
        {sidebar}
        <div className="flex min-w-0 grow flex-col gap-1.5">
          <header className="flex h-7 shrink-0 items-center gap-2">
            <span className="flex min-w-0 grow items-center gap-1">
              {toolbar}
            </span>
            <WindowControls />
          </header>
          <main className="crownui-pane relative min-h-0 grow overflow-hidden">
            {children}
          </main>
        </div>
      </div>
      {cursor}
    </div>
  );
}
