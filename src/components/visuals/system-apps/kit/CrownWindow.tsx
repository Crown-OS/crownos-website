import type { ReactNode } from "react";
import { Icon } from "./Icon";
import type { IconName } from "./icon-paths";

const WINDOW_CONTROLS = [
  "square",
  "minus",
  "x",
] as const satisfies readonly IconName[];

function WindowControls() {
  return (
    <div className="flex shrink-0 self-start">
      {WINDOW_CONTROLS.map((glyph) => (
        <span key={glyph} className="grid size-7 place-items-center">
          <span className="grid size-4 place-items-center rounded-full bg-white/16 text-white/82">
            <Icon name={glyph} size={9} stroke={2.6} />
          </span>
        </span>
      ))}
    </div>
  );
}

export function CrownWindow({
  sidebar,
  toolbar,
  children,
}: {
  sidebar: ReactNode;
  toolbar?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="crownui flex size-full bg-(--cu-frame) p-1.5">
      <aside className="flex w-65 shrink-0 flex-col gap-1.5 p-3">
        {sidebar}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <header className="flex min-h-7 shrink-0 items-center gap-2">
          {toolbar ?? <span className="flex-1" />}
          <WindowControls />
        </header>
        <main className="crownui-pane relative min-h-0 flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
