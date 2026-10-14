import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CatalogDetail,
  CatalogFrame,
  PluginCard,
  PluginShape,
  RelatedEntries,
} from "@/components/catalog";
import { findDocument, loadPlugins } from "@/util/catalog";
import { pickRelated } from "@/util/related";

const RELATED_LIMIT = 3;

type PluginPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const plugins = await loadPlugins();
  return plugins.map(({ meta }) => ({ slug: meta.slug }));
}

export async function generateMetadata({
  params,
}: PluginPageProps): Promise<Metadata> {
  const plugin = findDocument(await loadPlugins(), (await params).slug);
  return plugin
    ? {
        title: plugin.meta.name,
        description: plugin.meta.description,
        alternates: { canonical: `/plugins/${plugin.meta.slug}` },
      }
    : {};
}

export default async function PluginPage({ params }: PluginPageProps) {
  const plugins = await loadPlugins();
  const plugin = findDocument(plugins, (await params).slug);
  if (!plugin) notFound();
  const { meta, Content } = plugin;
  const metas = plugins.map((document) => document.meta);

  return (
    <CatalogDetail
      kind="plugins"
      meta={meta}
      visual={
        <CatalogFrame className="group grid aspect-square place-items-center bg-linear-to-b from-white/[0.04] to-transparent">
          <PluginShape
            shape={meta.shape}
            className="w-1/2 drop-shadow-[0_40px_48px_rgb(0_0_0/0.6)]"
          />
        </CatalogFrame>
      }
      related={
        <RelatedEntries title="More *plugins*">
          <ul className="grid gap-x-6 gap-y-24 sm:grid-cols-2 lg:grid-cols-3">
            {pickRelated(metas, meta, RELATED_LIMIT).map(({ entry, index }) => (
              <li key={entry.slug} data-reveal>
                <PluginCard plugin={entry} index={index} />
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
