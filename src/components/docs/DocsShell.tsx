import type { ReactNode } from "react";
import type { DocsProject } from "@/data/docs";
import type { DocPage } from "@/util/docs";
import { neighbours, type SearchEntry } from "@/util/docs-navigation";
import { docsMdxComponents } from "./mdx";
import { DocsHeader } from "./shell/DocsHeader";
import { DocsPageFooter } from "./shell/DocsPageFooter";
import { DocsPageHeader } from "./shell/DocsPageHeader";
import { DocsSidebar } from "./shell/DocsSidebar";
import { DOC_LAYOUTS } from "./templates";

type DocsShellProps = {
  project: DocsProject;
  pages: DocPage[];
  page: DocPage;
  search: SearchEntry[];
};

export function DocsFrame({ children }: { children: ReactNode }) {
  return (
    <div className="font-content [--docs-anchor:8.5rem] [--docs-header:7rem]">
      {children}
    </div>
  );
}

export function DocsShell({ project, pages, page, search }: DocsShellProps) {
  const { meta, Content, headings } = page;
  const tab =
    project.tabs.find((candidate) => candidate.label === meta.tab) ??
    project.tabs[0];
  const Layout = DOC_LAYOUTS[meta.template];
  const { previous, next } = neighbours(pages, meta);
  const sidebar = (
    <DocsSidebar
      tab={tab}
      pages={pages.map((entry) => entry.meta)}
      current={meta.slug}
    />
  );

  return (
    <DocsFrame>
      <DocsHeader
        project={project}
        activeTab={meta.tab}
        search={search}
        drawer={sidebar}
      />
      <div className="mx-auto max-w-[96rem] px-gutter lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-x-12 xl:gap-x-16">
        <aside className="max-lg:hidden">
          <div
            data-lenis-prevent
            className="sticky top-(--docs-header) h-[calc(100svh-var(--docs-header))] overflow-y-auto py-10 pr-2"
          >
            {sidebar}
          </div>
        </aside>
        <main className="min-w-0 py-10 md:py-14">
          <Layout
            project={project}
            headings={headings}
            header={<DocsPageHeader meta={meta} />}
            footer={
              <DocsPageFooter
                project={project}
                meta={meta}
                previous={previous}
                next={next}
              />
            }
          >
            <Content components={docsMdxComponents} />
          </Layout>
        </main>
      </div>
    </DocsFrame>
  );
}
