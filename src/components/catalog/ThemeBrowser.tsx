"use client";

import type { ThemeMeta } from "@/data/catalog";
import { CatalogBrowser } from "./CatalogBrowser";
import { ThemeCard } from "./ThemeCard";

export function ThemeBrowser({ themes }: { themes: readonly ThemeMeta[] }) {
  return (
    <CatalogBrowser
      id="themes"
      label="Search themes"
      noun="themes"
      entries={themes}
      columns={2}
      gridClassName="grid gap-x-6 gap-y-24 lg:grid-cols-2"
      renderCard={(theme, index) => <ThemeCard theme={theme} index={index} />}
    />
  );
}
