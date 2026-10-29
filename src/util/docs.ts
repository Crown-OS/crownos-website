import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { MDXContent } from "mdx/types";
import { cache } from "react";
import {
  API_KINDS,
  type ApiKind,
  type DocsGroup,
  type DocsProject,
  type DocsTab,
  type DocTemplate,
  docsProjects,
} from "@/data/docs";
import { type DocHeading, extractHeadings } from "./docs-headings";
import { FrontmatterError, readFrontmatter } from "./frontmatter";

const DOCS_ROOT = path.join(process.cwd(), "src", "content", "docs");
const MDX_EXTENSION = ".mdx";
const API_SIGNATURE = /^(\S+)\s+(.+)$/;

export type ApiSignature = { kind: ApiKind; target: string };

export type DocMeta = {
  project: string;
  slug: string;
  href: string;
  title: string;
  sidebarTitle: string;
  description: string;
  tab: string;
  group: string;
  template: DocTemplate;
  api?: ApiSignature;
  updated?: string;
};

export type DocPage = {
  meta: DocMeta;
  Content: MDXContent;
  headings: DocHeading[];
};

type NavEntry = { tab: DocsTab; group: DocsGroup; slug: string };

export const docHref = (project: string, slug: string) =>
  `/docs/${project}/${slug}`;

const navEntries = (project: DocsProject): NavEntry[] =>
  project.tabs.flatMap((tab) =>
    tab.groups.flatMap((group) =>
      group.pages.map((slug) => ({ tab, group, slug })),
    ),
  );

function parseApi(source: string, value: string | undefined) {
  if (!value) return undefined;
  const [, kind, target] = API_SIGNATURE.exec(value) ?? [];
  if (!API_KINDS.includes(kind as ApiKind)) {
    throw new FrontmatterError(
      `${source}: "api" must start with one of ${API_KINDS.join(", ")}`,
    );
  }
  return { kind: kind as ApiKind, target };
}

async function loadPage(project: DocsProject, { tab, group, slug }: NavEntry) {
  const source = `docs/${project.id}/${slug}${MDX_EXTENSION}`;
  const [{ default: Content, frontmatter }, raw] = await Promise.all([
    import(`@/content/docs/${project.id}/${slug}.mdx`),
    readFile(
      path.join(DOCS_ROOT, project.id, `${slug}${MDX_EXTENSION}`),
      "utf8",
    ),
  ]);
  const reader = readFrontmatter(source, frontmatter);
  const title = reader.text("title");

  const meta: DocMeta = {
    project: project.id,
    slug,
    href: docHref(project.id, slug),
    title,
    sidebarTitle: reader.optionalText("sidebarTitle") ?? title,
    description: reader.text("description"),
    tab: tab.label,
    group: group.title,
    template: tab.template,
    api: parseApi(source, reader.optionalText("api")),
    updated: reader.optionalText("updated"),
  };

  return {
    meta,
    Content: Content as MDXContent,
    headings: extractHeadings(raw, tab.template),
  };
}

async function assertNavigationCoversFiles(
  project: DocsProject,
  entries: NavEntry[],
) {
  const files = await readdir(path.join(DOCS_ROOT, project.id), {
    recursive: true,
  });
  const listed = new Set(entries.map((entry) => entry.slug));
  const onDisk = files
    .filter((file) => file.endsWith(MDX_EXTENSION))
    .map((file) => file.slice(0, -MDX_EXTENSION.length).replaceAll("\\", "/"));

  const unlisted = onDisk.filter((slug) => !listed.has(slug));
  if (unlisted.length > 0 || listed.size !== entries.length) {
    throw new Error(
      `docs/${project.id}: every page must appear exactly once in src/data/docs/${project.id}.ts (unlisted: ${unlisted.join(", ") || "none"})`,
    );
  }
}

export const loadProjectDocs = cache(async (project: DocsProject) => {
  const entries = navEntries(project);
  await assertNavigationCoversFiles(project, entries);
  return Promise.all(entries.map((entry) => loadPage(project, entry)));
});

export const loadAllDocs = cache(async () =>
  (await Promise.all(docsProjects.map(loadProjectDocs))).flat(),
);

export const findDocPage = (pages: DocPage[], slug: string) =>
  pages.find((page) => page.meta.slug === slug);

export const tabPages = (pages: DocPage[], tab: string) =>
  pages.filter((page) => page.meta.tab === tab);
