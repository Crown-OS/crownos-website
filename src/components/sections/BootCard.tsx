import { type CSSProperties, Fragment } from "react";
import { CrownLogo } from "@/components/brand/CrownLogo";
import { bootLines } from "@/data/crownos";

const ROW_DELAY_MS = 90;
const FIRST_ROW_DELAY_MS = 500;

export function BootCard({ className = "" }: { className?: string }) {
  return (
    <figure
      data-reveal
      className={`relative flex w-full max-w-[26rem] flex-col justify-between gap-5 md:aspect-[16/10] md:gap-0 overflow-clip border border-border bg-ink/70 p-4 font-mono text-micro backdrop-blur-sm ${className}`}
    >
      <CrownLogo className="absolute top-4 right-4 w-14 drop-shadow-[4px_6px_10px_rgb(0_0_0/0.45)]" />
      <figcaption className="text-muted">crown@os ~ $ crownfetch</figcaption>

      <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5">
        {bootLines.map(([key, value], index) => {
          const stagger = {
            "--delay": `${FIRST_ROW_DELAY_MS + index * ROW_DELAY_MS}ms`,
          } as CSSProperties;
          return (
            <Fragment key={key}>
              <dt data-reveal style={stagger} className="text-faint">
                {key}
              </dt>
              <dd data-reveal style={stagger} className="text-muted-strong">
                {value}
              </dd>
            </Fragment>
          );
        })}
      </dl>

      <p className="flex items-center gap-2 text-muted">
        [ ready ]
        <span className="inline-block h-3 w-1.5 animate-caret bg-foreground" />
      </p>
    </figure>
  );
}
