"use client";

import * as m from "motion/react-m";
import { useState } from "react";
import { RevealText } from "@/components/motion";
import { Section } from "@/components/ui";
import { comparison } from "@/data/comparison";
import { ComparisonMatrix } from "./ComparisonMatrix";
import { ComparisonMeters } from "./ComparisonMeters";

type TabId = (typeof comparison.tabs)[number]["id"];

const TAB_SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;
const PANEL_ID = "comparison-panel";

export function Comparison() {
  const [activeId, setActiveId] = useState<TabId>(comparison.tabs[0].id);
  const active =
    comparison.tabs.find(({ id }) => id === activeId) ?? comparison.tabs[0];

  return (
    <Section labelledBy="comparison-title">
      <div className="flex flex-wrap items-center gap-6 md:gap-x-8">
        <RevealText
          id="comparison-title"
          text={comparison.title}
          className="text-headline text-trim"
        />
        <div
          data-reveal
          role="tablist"
          aria-label="Comparison"
          className="flex flex-wrap gap-2"
        >
          {comparison.tabs.map(({ id, label }) => {
            const selected = id === activeId;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`comparison-tab-${id}`}
                aria-selected={selected}
                aria-controls={PANEL_ID}
                onClick={() => setActiveId(id)}
                className={`relative h-12 rounded-full px-6 text-lead transition-colors duration-300 md:h-14 ${
                  selected
                    ? "text-ink"
                    : "bg-gray-800 text-foreground hover:bg-gray-750"
                }`}
              >
                {selected && (
                  <m.span
                    layoutId="comparison-tab-indicator"
                    transition={TAB_SPRING}
                    className="absolute inset-0 rounded-full bg-paper"
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <m.div
        key={active.id}
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={`comparison-tab-${active.id}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-stack"
      >
        {active.kind === "meter" ? (
          <ComparisonMeters tab={active} />
        ) : (
          <ComparisonMatrix tab={active} />
        )}
        <p className="mt-8 max-w-3xl font-normal text-faint text-sm">
          {active.note}
        </p>
      </m.div>
    </Section>
  );
}
