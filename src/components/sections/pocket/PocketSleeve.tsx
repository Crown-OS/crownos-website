import { FEATURE_ICONS } from "@/components/feature-icons";
import { Visual } from "@/components/visuals";
import { CROWN_PATH, CROWN_VIEWBOX } from "@/data/brand";
import type { PocketFeature, PocketSize } from "@/data/pocket";

type PocketSleeveProps = Pick<PocketFeature, "icon" | "title" | "visual"> & {
  size: PocketSize;
};

const SKY_HEIGHT: Record<PocketSize, string> = {
  compact: "h-60",
  tall: "h-80 md:h-96",
  wide: "h-80 md:h-[34rem]",
};

const SLEEVE_PADDING: Record<PocketSize, { header: string; visual: string }> = {
  compact: {
    header: "px-5 pt-4 md:px-6 md:pt-5",
    visual: "mt-5 px-6 md:mt-6 md:px-8",
  },
  tall: {
    header: "px-5 pt-4 md:px-7 md:pt-6",
    visual: "mt-5 px-6 md:mt-7 md:px-10",
  },
  wide: {
    header: "px-5 pt-4 md:px-7 md:pt-6",
    visual: "mt-5 px-6 md:mt-7 md:px-10",
  },
};

export function PocketSleeve({ icon, title, visual, size }: PocketSleeveProps) {
  const Icon = FEATURE_ICONS[icon];
  const padding = SLEEVE_PADDING[size];
  return (
    <div className={`pocket-sky relative overflow-hidden ${SKY_HEIGHT[size]}`}>
      <div className="p-3">
        <span className="icon-tile grid size-11 place-items-center rounded-full">
          <Icon className="size-5" />
        </span>
      </div>
      <span aria-hidden data-tone="horizon" className="pocket-halo" />
      <div className="pocket-sleeve absolute inset-x-4 top-18 -bottom-8 overflow-hidden rounded-2xl">
        <div
          className={`flex items-start justify-between gap-3 ${padding.header}`}
        >
          <h3 className="min-w-0 truncate text-left font-medium text-[1.0625rem] text-white tracking-[-0.02em]">
            {title}
          </h3>
          <svg
            viewBox={CROWN_VIEWBOX}
            aria-hidden="true"
            className="mt-0.5 h-4 shrink-0 fill-white/50"
          >
            <path d={CROWN_PATH} />
          </svg>
        </div>
        <div className={`text-left ${padding.visual}`}>
          <Visual name={visual} />
        </div>
      </div>
    </div>
  );
}
