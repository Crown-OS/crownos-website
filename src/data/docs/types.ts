export const DOC_TEMPLATES = ["product", "help", "api", "changelog"] as const;
export type DocTemplate = (typeof DOC_TEMPLATES)[number];

export const API_KINDS = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "CALL",
  "NOTIFY",
  "EVENT",
  "FN",
] as const;
export type ApiKind = (typeof API_KINDS)[number];

export type DocsGroup = { title: string; pages: readonly string[] };

export type DocsTab = {
  label: string;
  template: DocTemplate;
  groups: readonly DocsGroup[];
};

export type DocsProject = {
  id: string;
  name: string;
  summary: string;
  repository: string;
  icon: string;
  tabs: readonly DocsTab[];
};
