import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/docs";
import { docsProjects, findDocsProject } from "@/data/docs";
import { findDocPage, loadAllDocs, loadProjectDocs } from "@/util/docs";
import { searchEntries } from "@/util/docs-navigation";

type DocsPageProps = { params: Promise<{ project: string; slug?: string[] }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = await loadAllDocs();
  return [
    ...docsProjects.map((project) => ({ project: project.id, slug: [] })),
    ...pages.map(({ meta }) => ({
      project: meta.project,
      slug: meta.slug.split("/"),
    })),
  ];
}

async function resolvePage(params: DocsPageProps["params"]) {
  const { project: projectId, slug = [] } = await params;
  const project = findDocsProject(projectId);
  if (!project) return undefined;
  const pages = await loadProjectDocs(project);
  const page = slug.length > 0 ? findDocPage(pages, slug.join("/")) : pages[0];
  return page && { project, pages, page };
}

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const resolved = await resolvePage(params);
  if (!resolved) return {};
  const { project, page } = resolved;
  return {
    title: `${page.meta.title} – ${project.name} Docs`,
    description: page.meta.description,
    alternates: { canonical: page.meta.href },
  };
}

export default async function DocsPage({ params }: DocsPageProps) {
  const resolved = await resolvePage(params);
  if (!resolved) notFound();
  const { project, pages, page } = resolved;
  const search = searchEntries(await loadAllDocs(), docsProjects, project.id);

  return (
    <DocsShell project={project} pages={pages} page={page} search={search} />
  );
}
