import type { Metadata } from "next";
import { CatalogHeader, ThemeBrowser } from "@/components/catalog";
import { catalogCopy } from "@/data/catalog";
import { loadThemes } from "@/util/catalog";
import { loadCatalogCounts } from "@/util/catalog-counts";

export const metadata: Metadata = {
  title: "Themes",
  description: catalogCopy.themes.lead,
  alternates: { canonical: "/themes" },
};

export default async function ThemesPage() {
  const [themes, counts] = await Promise.all([
    loadThemes(),
    loadCatalogCounts(),
  ]);

  return (
    <>
      <CatalogHeader kind="themes" counts={counts} />
      <section
        aria-label="Theme catalog"
        className="mx-auto w-full max-w-[90rem] px-gutter pb-section"
      >
        <ThemeBrowser themes={themes.map(({ meta }) => meta)} />
      </section>
    </>
  );
}
