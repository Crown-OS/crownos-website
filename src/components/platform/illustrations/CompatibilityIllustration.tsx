import { AppCursor } from "./compatibility/AppCursor";
import { AppDock } from "./compatibility/AppDock";
import { AppWindow } from "./compatibility/AppWindow";
import { ChatAppContent } from "./compatibility/ChatAppContent";
import { APP_WINDOWS, designUnits, STAGE_HEIGHT } from "./compatibility/layout";
import { PaintAppContent } from "./compatibility/PaintAppContent";

const WINDOW_CONTENT = {
  paint: PaintAppContent,
  chat: ChatAppContent,
} as const;

export function CompatibilityIllustration() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(44%_32%_at_38%_30%,color-mix(in_oklab,var(--color-sweep-blue)_14%,transparent),transparent),radial-gradient(40%_30%_at_70%_36%,color-mix(in_oklab,var(--color-sweep-pink)_10%,transparent),transparent)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 @container">
        <div
          className="app-stage relative mx-auto w-[calc(var(--u)*400)]"
          style={{ height: designUnits(STAGE_HEIGHT) }}
        >
          <div className="absolute top-[34%] left-1/2 aspect-[1.6] w-[62%] -translate-1/2 rounded-[50%] bg-[conic-gradient(from_200deg,var(--color-sweep-sky),var(--color-sweep-blue),var(--color-sweep-pink),var(--color-sweep-red),var(--color-sweep-orange),var(--color-sweep-sky))] opacity-20 [filter:blur(2.5rem)]" />
          {APP_WINDOWS.map((spec) => {
            const Content = WINDOW_CONTENT[spec.id];
            return (
              <AppWindow key={spec.id} spec={spec}>
                <Content />
              </AppWindow>
            );
          })}
          <AppDock />
          <AppCursor />
        </div>
      </div>
    </>
  );
}
