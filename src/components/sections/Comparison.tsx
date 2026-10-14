"use client";

import * as m from "motion/react-m";
import { useState } from "react";
import { Section, SectionHeading, Tabs } from "@/components/ui";
import { comparison } from "@/data/comparison";
import { ComparisonMatrix } from "./ComparisonMatrix";
import { ComparisonMeters } from "./ComparisonMeters";

type TabId = (typeof comparison.tabs)[number]["id"];

const TAB_ID_PREFIX = "comparison-tab";
const PANEL_ID = "comparison-panel";

export function Comparison() {
  const [activeId, setActiveId] = useState<TabId>(comparison.tabs[0].id);
  const active =
    comparison.tabs.find(({ id }) => id === activeId) ?? comparison.tabs[0];

  return (
    <Section labelledBy="comparison-title">
      <SectionHeading
        id="comparison-title"
        align="center"
        {...comparison.heading}
      />
      <Tabs
        label="Comparison"
        options={comparison.tabs}
        value={activeId}
        onChange={setActiveId}
        idPrefix={TAB_ID_PREFIX}
        panelId={PANEL_ID}
        className="mt-12 justify-center md:mt-16"
      />

      <m.div
        key={active.id}
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={`${TAB_ID_PREFIX}-${active.id}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 md:mt-12"
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
