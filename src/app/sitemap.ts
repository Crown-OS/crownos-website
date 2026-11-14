import type { MetadataRoute } from "next";
import { CATALOG_KINDS } from "@/data/catalog";
import { site } from "@/data/site";
import { loadPosts } from "@/util/blog";
import { loadPlugins, loadThemes } from "@/util/catalog";
import { loadAllDocs } from "@/util/docs";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const [plugins, themes, docs, posts] = await Promise.all([
    loadPlugins(),
    loadThemes(),
    loadAllDocs(),
    loadPosts(),
  ]);
  const entryPaths = [
    ...plugins.map(({ meta }) => `/plugins/${meta.slug}`),
    ...themes.map(({ meta }) => `/themes/${meta.slug}`),
    ...docs.map(({ meta }) => meta.href),
    ...posts.map(({ meta }) => `/blog/${meta.slug}`),
  ];

  return [
    { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
    ...[...CATALOG_KINDS, "docs", "blog"].map((kind) => ({
      url: `${site.url}/${kind}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...entryPaths.map((path) => ({
      url: `${site.url}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
