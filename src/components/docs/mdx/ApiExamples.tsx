import type { ReactNode } from "react";
import { CodeGroup } from "./CodeGroup";

export function ApiExamples({ children }: { children: ReactNode }) {
  return (
    <div data-api-examples className="grid gap-6">
      {children}
    </div>
  );
}

export const RequestExample = ({ children }: { children: ReactNode }) => (
  <CodeGroup label="Request example">{children}</CodeGroup>
);

export const ResponseExample = ({ children }: { children: ReactNode }) => (
  <CodeGroup label="Response example">{children}</CodeGroup>
);
