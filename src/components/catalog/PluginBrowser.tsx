"use client";

import type { PluginMeta } from "@/data/catalog";
import { CatalogBrowser } from "./CatalogBrowser";
import { PluginCard } from "./PluginCard";

export function PluginBrowser({ plugins }: { plugins: readonly PluginMeta[] }) {
  return (
    <CatalogBrowser
      id="plugins"
      label="Search plugins"
      noun="plugins"
      entries={plugins}
      columns={3}
      gridClassName="grid gap-x-6 gap-y-24 sm:grid-cols-2 lg:grid-cols-3"
      renderCard={(plugin, index) => (
        <PluginCard plugin={plugin} index={index} />
      )}
    />
  );
}
