"use client";

import * as m from "motion/react-m";
import { type KeyboardEvent, useRef } from "react";

const UNDERLINE_SPRING = {
  type: "spring",
  stiffness: 400,
  damping: 34,
} as const;

type Option<Id extends string> = { id: Id; label: string };

type TabsProps<Id extends string> = {
  label: string;
  options: readonly Option<Id>[];
  value: Id;
  onChange: (id: Id) => void;
  idPrefix: string;
  panelId: string;
  className?: string;
};

export function Tabs<Id extends string>({
  label,
  options,
  value,
  onChange,
  idPrefix,
  panelId,
  className = "",
}: TabsProps<Id>) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const moveSelection = (event: KeyboardEvent, index: number) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (index + step + options.length) % options.length;
    onChange(options[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className={`flex gap-2 border-border border-b md:gap-4 ${className}`}
    >
      {options.map(({ id, label: optionLabel }, index) => {
        const selected = id === value;
        return (
          <button
            key={id}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-${id}`}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(id)}
            onKeyDown={(event) => moveSelection(event, index)}
            className={`relative h-12 shrink-0 px-3 text-ui transition-colors duration-300 md:h-14 md:px-4 ${
              selected ? "text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            {selected && (
              <m.span
                layoutId={`${idPrefix}-underline`}
                transition={UNDERLINE_SPRING}
                className="absolute inset-x-0 -bottom-px h-0.5 bg-paper"
              />
            )}
            <span className="relative">{optionLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
