import Link from "next/link";
import { Tilt } from "@/components/motion";
import type { ThemeMeta } from "@/data/catalog";
import { formatOrdinal } from "@/util/catalog-search";
import { CatalogFrame } from "./CatalogFrame";
import { ThemePreview } from "./ThemePreview";
import { ThemeSwatches } from "./ThemeSwatches";

export function ThemeCard({
  theme,
  index,
}: {
  theme: ThemeMeta;
  index: number;
}) {
  return (
    <CatalogFrame className="h-full">
      <Link
        href={`/themes/${theme.slug}`}
        data-cursor="Preview"
        data-spotlight
        className="group relative grid h-full content-start gap-8 bg-linear-to-b from-white/[0.04] to-transparent p-3 md:p-4"
      >
        <Tilt angle={3}>
          <div className="squircle overflow-hidden rounded-window ring-1 ring-white/10">
            <div className="transition-[scale] duration-1000 ease-out-expo group-hover:scale-[1.04]">
              <ThemePreview theme={theme} />
            </div>
          </div>
        </Tilt>
        <div className="grid gap-6 px-3 pb-5 md:px-4 md:pb-6">
          <div className="flex items-center justify-between font-mono text-micro text-faint uppercase">
            <span>
              {formatOrdinal(index)} · {theme.category}
            </span>
            <span>{theme.mode}</span>
          </div>
          <div className="flex items-end justify-between gap-6">
            <div className="grid gap-4">
              <h3 className="font-display text-title text-trim">
                {theme.name}
              </h3>
              <p className="max-w-md text-pretty font-normal text-muted text-ui leading-snug">
                {theme.description}
              </p>
            </div>
            <ThemeSwatches palette={theme.palette} />
          </div>
        </div>
      </Link>
    </CatalogFrame>
  );
}
