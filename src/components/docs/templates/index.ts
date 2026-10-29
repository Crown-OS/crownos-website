import type { ComponentType } from "react";
import type { DocTemplate } from "@/data/docs";
import { ApiTemplate } from "./ApiTemplate";
import { ChangelogTemplate } from "./ChangelogTemplate";
import { HelpTemplate } from "./HelpTemplate";
import { ProductTemplate } from "./ProductTemplate";
import type { TemplateProps } from "./types";

export const DOC_LAYOUTS: Record<DocTemplate, ComponentType<TemplateProps>> = {
  product: ProductTemplate,
  help: HelpTemplate,
  api: ApiTemplate,
  changelog: ChangelogTemplate,
};
