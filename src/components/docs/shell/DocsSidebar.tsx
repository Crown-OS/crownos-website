import Link from "next/link";
import type { DocsTab } from "@/data/docs";
import type { DocMeta } from "@/util/docs";

type DocsSidebarProps = { tab: DocsTab; pages: DocMeta[]; current: string };

export function DocsSidebar({ tab, pages, current }: DocsSidebarProps) {
  const pageBySlug = new Map(pages.map((page) => [page.slug, page]));

  return (
    <nav aria-label={`${tab.label} navigation`} className="grid gap-8">
      {tab.groups.map((group) => (
        <div key={group.title} className="grid gap-3">
          <p className="px-3 font-medium text-faint text-sm">{group.title}</p>
          <ul className="grid gap-0.5">
            {group.pages.flatMap((slug) => {
              const page = pageBySlug.get(slug);
              if (!page) return [];
              return (
                <li key={slug}>
                  <Link
                    href={page.href}
                    aria-current={slug === current ? "page" : undefined}
                    className="flex items-center justify-between gap-3 rounded-full px-4 py-1.5 text-muted text-ui leading-snug transition-colors hover:bg-white/[0.03] hover:text-foreground aria-[current=page]:bg-white/[0.07] aria-[current=page]:font-normal aria-[current=page]:text-foreground"
                  >
                    {page.sidebarTitle}
                    {page.api && (
                      <span className="font-mono text-[0.625rem] text-faint">
                        {page.api.kind}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
