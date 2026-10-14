import type { ReactNode } from "react";
import { ShaderCanvas, SplitLetters } from "@/components/motion";
import { type CatalogKind, catalogCopy } from "@/data/catalog";
import { TOPOGRAPHY_SHADER } from "@/shaders/topography";
import { KindSwitch } from "./KindSwitch";

const TOPOGRAPHY_RESOLUTION = 0.75;

export function CatalogHeader({
  kind,
  counts,
}: {
  kind: CatalogKind;
  counts: Record<CatalogKind, number>;
}) {
  const copy = catalogCopy[kind];
  return (
    <header className="relative isolate overflow-clip">
      <div aria-hidden className="fade-y absolute inset-0 -z-10 opacity-90">
        <ShaderCanvas
          fragment={TOPOGRAPHY_SHADER}
          resolutionScale={TOPOGRAPHY_RESOLUTION}
        />
      </div>
      <div className="mx-auto grid w-full max-w-[90rem] gap-12 px-gutter pt-32 pb-16 md:gap-16 md:pt-48 md:pb-24">
        <Eyebrow>
          ({copy.eyebrow}) — CrownOS {kind === "plugins" ? "Store" : "Gallery"}
        </Eyebrow>
        <div className="flex items-start gap-3 md:gap-6">
          <SplitLetters
            lines={copy.title}
            className="font-display text-mega text-trim"
          />
          <span className="font-mono text-lead text-muted tabular-nums">
            ({String(counts[kind]).padStart(2, "0")})
          </span>
        </div>
        <div className="grid items-end gap-12 md:grid-cols-12">
          <p
            data-reveal
            className="max-w-md text-balance font-normal font-inter text-lead text-muted leading-normal md:col-span-6"
          >
            {copy.lead}
          </p>
          <div
            data-reveal
            className="md:col-span-5 md:col-start-8 md:justify-self-end"
          >
            <KindSwitch active={kind} counts={counts} />
          </div>
        </div>
      </div>
    </header>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p data-reveal className="font-mono text-micro text-muted uppercase">
      {children}
    </p>
  );
}
