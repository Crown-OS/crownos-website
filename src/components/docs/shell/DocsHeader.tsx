import Link from "next/link";
import type { ReactNode } from "react";
import { GitHubIcon, SearchIcon } from "@/components/icons";
import { type DocsProject, docsProjects } from "@/data/docs";
import { primaryCta } from "@/data/navigation";
import { firstPageHref, type SearchEntry } from "@/util/docs-navigation";
import { DocIcon } from "../DocIcon";
import { DocsSearch } from "./DocsSearch";
import { ProjectSwitcher } from "./ProjectSwitcher";
import { SidebarDrawer } from "./SidebarDrawer";

type DocsHeaderProps = {
  project?: DocsProject;
  activeTab?: string;
  search: SearchEntry[];
  drawer?: ReactNode;
};

const projectOptions = docsProjects.map((project) => ({
  id: project.id,
  name: project.name,
  summary: project.summary,
  href: firstPageHref(project),
  icon: <DocIcon name={project.icon} className="size-4" />,
}));

function TabBar({
  project,
  activeTab,
}: {
  project: DocsProject;
  activeTab?: string;
}) {
  return (
    <nav
      aria-label={`${project.name} sections`}
      className="-mb-px flex h-12 gap-6 overflow-x-auto"
    >
      {project.tabs.map((tab) => (
        <Link
          key={tab.label}
          href={firstPageHref(project, tab)}
          aria-current={tab.label === activeTab ? "page" : undefined}
          className="flex shrink-0 items-center border-transparent border-b text-muted text-ui transition-colors hover:text-foreground aria-[current=page]:border-foreground aria-[current=page]:font-medium aria-[current=page]:text-foreground"
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}

export function DocsHeader({
  project,
  activeTab,
  search,
  drawer,
}: DocsHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-border border-b bg-background/85 backdrop-blur-xl">
      <div className="mx-auto max-w-[96rem] px-gutter">
        <div className="flex h-16 items-center gap-3">
          <Link
            href="/docs"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="CrownOS docs home"
          >
            <DocIcon name="crown" className="h-5 w-auto" />
            <span className="font-display text-lead max-sm:sr-only">Docs</span>
          </Link>
          {project && (
            <>
              <span aria-hidden className="text-faint">
                /
              </span>
              <ProjectSwitcher
                current={project.id}
                options={projectOptions}
                chevron={
                  <DocIcon
                    name="chevron-down"
                    className="size-3.5 text-faint"
                  />
                }
              />
            </>
          )}
          <div className="ml-auto flex flex-1 justify-end md:justify-center">
            <div className="w-auto md:w-full md:max-w-sm">
              <DocsSearch
                entries={search}
                searchIcon={<SearchIcon className="size-4" />}
              />
            </div>
          </div>
          <a
            href={project?.repository ?? "https://github.com/Crown-OS"}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="grid size-9 shrink-0 place-items-center rounded-control text-muted transition-colors hover:text-foreground"
          >
            <GitHubIcon className="size-[1.125rem]" />
          </a>
          <Link
            href={primaryCta.href}
            className="btn btn-primary h-9 shrink-0 px-4 text-ui max-md:hidden"
          >
            {primaryCta.label}
          </Link>
          {drawer && (
            <SidebarDrawer
              menuIcon={<DocIcon name="menu" className="size-5" />}
              closeIcon={<DocIcon name="close" className="size-5" />}
            >
              {drawer}
            </SidebarDrawer>
          )}
        </div>
        {project && <TabBar project={project} activeTab={activeTab} />}
      </div>
    </header>
  );
}
