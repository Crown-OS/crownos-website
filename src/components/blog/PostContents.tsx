"use client";

import { useEffect, useState } from "react";
import { blogCopy } from "@/data/blog";
import type { PostHeading } from "@/util/post-headings";

const ACTIVE_LINE_MARGIN = "0px 0px -70% 0px";

export function PostContents({
  headings,
}: {
  headings: readonly PostHeading[];
}) {
  const [activeId, setActiveId] = useState(headings[0]?.id);

  useEffect(() => {
    const targets = headings
      .map(({ id }) => document.getElementById(id))
      .filter((target): target is HTMLElement => target !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: ACTIVE_LINE_MARGIN },
    );
    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;
  return (
    <nav
      aria-label={blogCopy.contents}
      className="sticky top-10 hidden w-68 self-start justify-self-start lg:block"
    >
      <ul className="grid gap-3.5">
        {headings.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={id === activeId ? "location" : undefined}
              className={`block text-[0.9375rem] leading-[1.45] transition-colors duration-300 ${id === activeId ? "text-white" : "text-white/40 hover:text-white/75"}`}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
