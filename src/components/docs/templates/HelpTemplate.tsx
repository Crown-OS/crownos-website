import { DocIcon } from "../DocIcon";
import { TocColumn } from "./TocColumn";
import type { TemplateProps } from "./types";

function SupportPanel({ repository }: { repository: string }) {
  return (
    <section className="squircle mt-16 grid gap-6 rounded-card border border-border bg-white/[0.02] p-6 sm:grid-cols-[auto_minmax(0,1fr)] md:p-8">
      <span className="squircle grid size-12 place-items-center rounded-tile border border-border-strong bg-white/[0.04]">
        <DocIcon name="life-buoy" className="size-6" />
      </span>
      <div className="grid gap-2">
        <h2 className="font-medium text-foreground text-lead">
          Still need help?
        </h2>
        <p className="text-muted text-ui leading-relaxed">
          Ask the community or open an issue with your logs attached.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 sm:col-start-2">
        <a
          href={`${repository}/discussions`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary h-11 px-5 text-ui"
        >
          Ask the community
        </a>
        <a
          href={`${repository}/issues/new`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary h-11 px-5 text-ui"
        >
          Report a problem
        </a>
      </div>
    </section>
  );
}

export function HelpTemplate({
  project,
  headings,
  header,
  footer,
  children,
}: TemplateProps) {
  return (
    <div className="grid gap-16 xl:grid-cols-[minmax(0,1fr)_13rem]">
      <article className="min-w-0 max-w-2xl">
        {header}
        <div className="docs-flow mt-12 text-body text-muted-strong">
          {children}
        </div>
        <SupportPanel repository={project.repository} />
        {footer}
      </article>
      <TocColumn headings={headings} />
    </div>
  );
}
