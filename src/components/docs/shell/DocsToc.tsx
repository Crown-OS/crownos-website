"use client";

import { useEffect, useState } from "react";
import type { DocHeading } from "@/util/docs-headings";

const ACTIVE_BAND = "-140px 0px -65% 0px";

export function DocsToc({
  headings,
  title,
}: {
  headings: DocHeading[];
  title: string;
}) {
  const [activeId, setActiveId] = useState(headings[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const topmost = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (topmost) setActiveId(topmost.target.id);
      },
      { rootMargin: ACTIVE_BAND },
    );
    for (const { id } of headings) {
      const target = document.getElementById(id);
      if (target) observer.observe(target);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label={title} className="grid gap-4">
      <p className="font-mono text-faint text-micro uppercase">{title}</p>
      <ul className="grid border-border border-l text-ui">
        {headings.map(({ id, text, depth }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={id === activeId ? "location" : undefined}
              className={`-ml-px block border-transparent border-l py-1.5 leading-snug text-muted transition-colors hover:text-foreground aria-[current=location]:border-foreground aria-[current=location]:text-foreground ${depth === 3 ? "pl-7" : "pl-4"}`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
