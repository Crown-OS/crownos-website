import { Children, isValidElement, type ReactNode } from "react";
import { codeLabel } from "./CodeBlock";
import { TabbedPanels } from "./TabbedPanels";

type CodeGroupProps = { children: ReactNode; label?: string };

export function CodeGroup({
  children,
  label = "Code examples",
}: CodeGroupProps) {
  const blocks = Children.toArray(children).filter(isValidElement);
  return (
    <TabbedPanels
      label={label}
      labels={blocks.map(codeLabel)}
      panels={blocks}
      className="docs-code-group squircle overflow-hidden rounded-tile border border-border bg-gray-950"
      listClassName="px-2 [&_button]:h-11 [&_button]:text-micro [&_button]:font-mono"
    />
  );
}
