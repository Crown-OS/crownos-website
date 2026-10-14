import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CatalogDetail,
  CatalogFrame,
  RelatedEntries,
  ThemeCard,
  ThemePreview,
} from "@/components/catalog";
import { findDocument, loadThemes } from "@/util/catalog";
import { pickRelated } from "@/util/related";

const RELATED_LIMIT = 2;

type ThemePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const themes = await loadThemes();
  return themes.map(({ meta }) => ({ slug: meta.slug }));
}

export async function generateMetadata({
  params,
}: ThemePageProps): Promise<Metadata> {
  const theme = findDocument(await loadThemes(), (await params).slug);
  return theme
    ? {
        title: theme.meta.name,
        description: theme.meta.description,
        alternates: { canonical: `/themes/${theme.meta.slug}` },
      }
    : {};
}

export default async function ThemePage({ params }: ThemePageProps) {
  const themes = await loadThemes();
  const theme = findDocument(themes, (await params).slug);
  if (!theme) notFound();
  const { meta, Content } = theme;
  const metas = themes.map((document) => document.meta);

  return (
    <CatalogDetail
      kind="themes"
      meta={meta}
      visual={
        <CatalogFrame className="group p-3 md:p-4">
          <div className="squircle overflow-hidden rounded-window ring-1 ring-white/10">
            <ThemePreview theme={meta} />
          </div>
        </CatalogFrame>
      }
      related={
        <RelatedEntries title="More *themes*">
          <ul className="grid gap-x-6 gap-y-24 lg:grid-cols-2">
            {pickRelated(metas, meta, RELATED_LIMIT).map(({ entry, index }) => (
              <li key={entry.slug} data-reveal>
                <ThemeCard theme={entry} index={index} />
              </li>
            ))}
          </ul>
        </RelatedEntries>
      }
    >
      <Content />
    </CatalogDetail>
  );
}
