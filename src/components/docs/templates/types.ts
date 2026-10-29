import type { ReactNode } from "react";
import type { DocsProject } from "@/data/docs";
import type { DocHeading } from "@/util/docs-headings";

export type TemplateProps = {
  project: DocsProject;
  headings: DocHeading[];
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};
