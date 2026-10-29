import type { DocsProject, DocsTab } from "@/data/docs";
import { type DocMeta, type DocPage, docHref } from "./docs";

export type SearchEntry = Pick<DocMeta, "title" | "description" | "href"> & {
  section: string;
};

export const firstPageHref = (
  project: DocsProject,
  tab: DocsTab = project.tabs[0],
) => docHref(project.id, tab.groups[0].pages[0]);

export const searchEntries = (
  pages: DocPage[],
  projects: readonly DocsProject[],
  currentProject?: string,
): SearchEntry[] =>
  pages
    .map(({ meta }) => ({
      title: meta.title,
      description: meta.description,
      href: meta.href,
      section: `${projects.find((project) => project.id === meta.project)?.name} · ${meta.tab}`,
      current: meta.project === currentProject,
    }))
    .sort((left, right) => Number(right.current) - Number(left.current))
    .map(({ current: _, ...entry }) => entry);

export function neighbours(pages: DocPage[], meta: DocMeta) {
  const siblings = pages.filter((page) => page.meta.tab === meta.tab);
  const index = siblings.findIndex((page) => page.meta.slug === meta.slug);
  return {
    previous: siblings[index - 1]?.meta,
    next: siblings[index + 1]?.meta,
  };
}
