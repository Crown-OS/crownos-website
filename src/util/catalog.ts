import { readdir } from "node:fs/promises";
import path from "node:path";
import type { MDXContent } from "mdx/types";
import { cache } from "react";
import {
  type CatalogKind,
  type CatalogMeta,
  PLUGIN_SHAPES,
  type PluginMeta,
  THEME_MODES,
  type ThemeMeta,
} from "@/data/catalog";
import { type FrontmatterReader, readFrontmatter } from "./frontmatter";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");
const MDX_EXTENSION = ".mdx";

export type CatalogDocument<Meta extends CatalogMeta> = {
  meta: Meta;
  Content: MDXContent;
};

type MetaParser<Meta extends CatalogMeta> = (
  reader: FrontmatterReader,
  slug: string,
) => Meta;

const readEntry = (reader: FrontmatterReader, slug: string) => ({
  slug,
  name: reader.text("name"),
  description: reader.text("description"),
  category: reader.text("category"),
  author: reader.text("author"),
  version: reader.version("version"),
  tags: reader.list("tags"),
});

const parsePlugin: MetaParser<PluginMeta> = (reader, slug) => ({
  ...readEntry(reader, slug),
  shape: reader.oneOf("shape", PLUGIN_SHAPES),
});

const parseTheme: MetaParser<ThemeMeta> = (reader, slug) => {
  const palette = reader.group("palette");
  const [start, mid, end] = reader.colors("wallpaper", 3);
  return {
    ...readEntry(reader, slug),
    mode: reader.oneOf("mode", THEME_MODES),
    palette: {
      background: palette.color("background"),
      surface: palette.color("surface"),
      text: palette.color("text"),
      accent: palette.color("accent"),
    },
    wallpaper: [start, mid, end],
  };
};

async function loadDocuments<Meta extends CatalogMeta>(
  kind: CatalogKind,
  parse: MetaParser<Meta>,
): Promise<CatalogDocument<Meta>[]> {
  const files = await readdir(path.join(CONTENT_ROOT, kind));
  const slugs = files
    .filter((file) => file.endsWith(MDX_EXTENSION))
    .map((file) => path.basename(file, MDX_EXTENSION));

  const documents = await Promise.all(
    slugs.map(async (slug) => {
      const { default: Content, frontmatter } = await import(
        `@/content/${kind}/${slug}.mdx`
      );
      const reader = readFrontmatter(`${kind}/${slug}.mdx`, frontmatter);
      return { meta: parse(reader, slug), Content };
    }),
  );

  return documents.sort((left, right) =>
    left.meta.name.localeCompare(right.meta.name),
  );
}

export const loadPlugins = cache(() => loadDocuments("plugins", parsePlugin));
export const loadThemes = cache(() => loadDocuments("themes", parseTheme));

export const findDocument = <Meta extends CatalogMeta>(
  documents: CatalogDocument<Meta>[],
  slug: string,
) => documents.find((document) => document.meta.slug === slug);
