import type { Metadata } from "next";
import Link from "next/link";
import { DocIcon, DocsFrame, DocsHeader } from "@/components/docs";
import { RevealText } from "@/components/motion";
import { docsProjects } from "@/data/docs";
import { loadAllDocs } from "@/util/docs";
import { firstPageHref, searchEntries } from "@/util/docs-navigation";
import { GitHubIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Guides, API references, help articles and release notes for every CrownOS project.",
  alternates: { canonical: "/docs" },
};

export default async function DocsHome() {
  const search = searchEntries(await loadAllDocs(), docsProjects);

  return (
    <DocsFrame>
      <DocsHeader search={search} />
      <main className="mx-auto grid max-w-[96rem] gap-16 px-gutter pt-20 pb-section md:gap-24 md:pt-32">
        <header className="grid max-w-3xl gap-6">
          <RevealText
            as="h1"
            text="Built for CrownOS"
            className="font-display text-display text-trim"
          />
          <p
            data-reveal
            className="max-w-xl text-pretty text-lead text-muted leading-normal"
          >
            Guides, API references, help articles and release notes for the
            desktop and every project that ships with it.
          </p>
        </header>
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {docsProjects.map((project) => (
            <li key={project.id} data-reveal>
              <article className="bg-neutral-950 p-2 border border-white/5 squircle rounded-2xl">
                <div className="group bg-neutral-800 squircle relative grid h-full content-start gap-8 rounded-xl border border-border bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/25 md:p-8">
                  <span className="squircle grid size-12 place-items-center rounded-tile border border-border-strong bg-white/[0.04]">
                    <DocIcon name={project.icon} className="size-6" />
                  </span>
                  <div className="grid gap-3">
                    <div className="flex justify-between">
                      <h2 className="font-display text-title">
                        <Link
                          href={firstPageHref(project)}
                          className="font-content after:absolute after:inset-0"
                        >
                          {project.name}
                        </Link>
                      </h2>
                    </div>
                    <p className="text-muted text-ui leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                  <ul className="relative z-10 flex flex-wrap gap-2">
                    {project.tabs.map((tab) => (
                      <li key={tab.label}>
                        <Link
                          href={firstPageHref(project, tab)}
                          className="flex h-8 items-center rounded-control border border-border px-3 text-micro text-muted transition-colors hover:border-white/30 hover:text-foreground"
                        >
                          {tab.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </main>
    </DocsFrame>
  );
}
