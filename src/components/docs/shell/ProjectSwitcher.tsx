"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";

export type ProjectOption = {
  id: string;
  name: string;
  summary: string;
  href: string;
  icon: ReactNode;
};

type ProjectSwitcherProps = {
  current: string;
  options: ProjectOption[];
  chevron: ReactNode;
};

export function ProjectSwitcher({
  current,
  options,
  chevron,
}: ProjectSwitcherProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.id === current);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className="flex h-9 items-center gap-2 rounded-control px-3 font-medium text-foreground text-ui transition-colors hover:bg-white/[0.06]"
      >
        {selected?.name ?? "Projects"}
        <span
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          {chevron}
        </span>
      </button>
      {open && (
        <ul className="squircle absolute top-full left-0 z-50 mt-2 grid w-80 gap-1 rounded-tile border border-border-strong bg-gray-950 p-2 shadow-2xl shadow-black/60">
          {options.map((option) => (
            <li key={option.id}>
              <Link
                href={option.href}
                onClick={() => setOpen(false)}
                aria-current={option.id === current ? "page" : undefined}
                className="flex gap-3 rounded-lg p-3 transition-colors hover:bg-white/[0.05] aria-[current=page]:bg-white/[0.06]"
              >
                <span className="squircle grid size-9 shrink-0 place-items-center rounded-lg border border-border-strong text-foreground">
                  {option.icon}
                </span>
                <span className="grid gap-1">
                  <span className="font-medium text-foreground text-ui">
                    {option.name}
                  </span>
                  <span className="text-micro text-muted leading-snug">
                    {option.summary}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
