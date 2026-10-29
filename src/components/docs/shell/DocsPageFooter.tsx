import Link from "next/link";
import { type DocsProject, docsSource } from "@/data/docs";
import type { DocMeta } from "@/util/docs";
import { DocIcon } from "../DocIcon";

type DocsPageFooterProps = {
  project: DocsProject;
  meta: DocMeta;
  previous?: DocMeta;
  next?: DocMeta;
};

function PagerLink({
  meta,
  direction,
}: {
  meta: DocMeta;
  direction: "previous" | "next";
}) {
  const isNext = direction === "next";
  return (
    <Link
      href={meta.href}
      className={`group squircle grid gap-1.5 rounded-tile border border-border p-5 transition-colors hover:border-white/25 ${isNext ? "text-right sm:col-start-2" : ""}`}
    >
      <span
        className={`flex items-center gap-1.5 font-mono text-faint text-micro uppercase ${isNext ? "justify-end" : ""}`}
      >
        {!isNext && <DocIcon name="chevron" className="size-3.5 rotate-180" />}
        {direction}
        {isNext && <DocIcon name="chevron" className="size-3.5" />}
      </span>
      <span className="font-medium text-foreground">{meta.sidebarTitle}</span>
    </Link>
  );
}

export function DocsPageFooter({
  project,
  meta,
  previous,
  next,
}: DocsPageFooterProps) {
  const links = [
    {
      label: "Suggest edits",
      href: `${docsSource.edit}/${meta.project}/${meta.slug}.mdx`,
      icon: "pencil",
    },
    {
      label: "Raise issue",
      href: `${project.repository}/issues/new`,
      icon: "external",
    },
  ];

  return (
    <footer className="mt-20 grid gap-10">
      <div className="flex flex-wrap gap-x-6 gap-y-3 border-border border-t pt-6">
        {links.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-muted text-ui transition-colors hover:text-foreground"
          >
            <DocIcon name={icon} className="size-4" />
            {label}
          </a>
        ))}
      </div>
      {(previous || next) && (
        <nav aria-label="Pagination" className="grid gap-4 sm:grid-cols-2">
          {previous && <PagerLink meta={previous} direction="previous" />}
          {next && <PagerLink meta={next} direction="next" />}
        </nav>
      )}
    </footer>
  );
}
