import Link from "next/link";
import { Tilt } from "@/components/motion";
import type { PluginMeta } from "@/data/catalog";
import { formatOrdinal } from "@/util/catalog-search";
import { CatalogFrame } from "./CatalogFrame";
import { PluginShape } from "./PluginShape";

export function PluginCard({
  plugin,
  index,
}: {
  plugin: PluginMeta;
  index: number;
}) {
  return (
    <CatalogFrame className="h-full">
      <Tilt className="h-full">
        <Link
          href={`/plugins/${plugin.slug}`}
          data-cursor="View"
          data-spotlight
          className="group relative flex aspect-[3/4] h-full flex-col bg-linear-to-b from-white/[0.04] to-transparent p-6 md:p-8"
        >
          <span className="flex justify-between font-mono text-micro text-faint uppercase">
            <span>{formatOrdinal(index)}</span>
            <span>{plugin.category}</span>
          </span>
          <span className="grid flex-1 place-items-center py-8">
            <PluginShape
              shape={plugin.shape}
              className="w-3/4 max-w-64 drop-shadow-[0_24px_32px_rgb(0_0_0/0.6)]"
            />
          </span>
          <h3 className="text-balance font-medium text-lead text-trim">
            {plugin.name}
          </h3>
          <p className="mt-4 line-clamp-3 text-pretty font-normal text-muted text-ui leading-snug">
            {plugin.description}
          </p>
        </Link>
      </Tilt>
    </CatalogFrame>
  );
}
