import type { TemplateProps } from "./types";

export function ApiTemplate({ header, footer, children }: TemplateProps) {
  return (
    <article className="min-w-0">
      <div className="max-w-3xl">{header}</div>
      <div className="docs-flow docs-api-grid mt-12 text-body text-muted-strong">
        {children}
      </div>
      {footer}
    </article>
  );
}
