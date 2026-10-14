import type { CatalogKind } from "@/data/catalog";
import { loadPlugins, loadThemes } from "./catalog";

export async function loadCatalogCounts(): Promise<
  Record<CatalogKind, number>
> {
  const [plugins, themes] = await Promise.all([loadPlugins(), loadThemes()]);
  return { plugins: plugins.length, themes: themes.length };
}
