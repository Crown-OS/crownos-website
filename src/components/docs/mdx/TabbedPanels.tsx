"use client";

import { type ReactNode, useId, useState } from "react";
import { Tabs } from "@/components/ui";

type TabbedPanelsProps = {
  label: string;
  labels: string[];
  panels: ReactNode[];
  className?: string;
  listClassName?: string;
};

export function TabbedPanels({
  label,
  labels,
  panels,
  className = "",
  listClassName = "",
}: TabbedPanelsProps) {
  const idPrefix = useId();
  const [active, setActive] = useState("0");
  const options = labels.map((text, index) => ({
    id: String(index),
    label: text,
  }));
  const panelId = `${idPrefix}-panel`;

  return (
    <div className={className}>
      <Tabs
        label={label}
        options={options}
        value={active}
        onChange={setActive}
        idPrefix={idPrefix}
        panelId={panelId}
        className={`flex-wrap ${listClassName}`}
      />
      {panels.map((panel, index) => {
        const selected = String(index) === active;
        return (
          <div
            key={options[index].id}
            role="tabpanel"
            id={selected ? panelId : undefined}
            aria-labelledby={`${idPrefix}-${index}`}
            hidden={!selected}
          >
            {panel}
          </div>
        );
      })}
    </div>
  );
}
