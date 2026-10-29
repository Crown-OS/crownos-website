import { Children, isValidElement, type ReactNode } from "react";
import { TabbedPanels } from "./TabbedPanels";

type TabProps = { title: string; children: ReactNode };

export function Tab({ children }: TabProps) {
  return <div className="docs-flow pt-6">{children}</div>;
}

export function Tabs({ children }: { children: ReactNode }) {
  const tabs = Children.toArray(children).filter((child) =>
    isValidElement<TabProps>(child),
  );
  return (
    <TabbedPanels
      label="Content options"
      labels={tabs.map((tab) => tab.props.title)}
      panels={tabs}
    />
  );
}
