import type { Metadata } from "next";
import { CatalogHeader, PluginBrowser } from "@/components/catalog";
import { catalogCopy } from "@/data/catalog";
import { loadPlugins } from "@/util/catalog";
import { loadCatalogCounts } from "@/util/catalog-counts";

export const metadata: Metadata = {
  title: "Plugins",
  description: catalogCopy.plugins.lead,
  alternates: { canonical: "/plugins" },
};

export default async function PluginsPage() {
  const [plugins, counts] = await Promise.all([
    loadPlugins(),
    loadCatalogCounts(),
  ]);

  return (
    <>
      <CatalogHeader kind="plugins" counts={counts} />
      <section
        aria-label="Plugin catalog"
        className="mx-auto w-full max-w-[90rem] px-gutter pb-section"
      >
        <PluginBrowser plugins={plugins.map(({ meta }) => meta)} />
      </section>
    </>
  );
}
