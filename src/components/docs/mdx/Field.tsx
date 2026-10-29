import type { ReactNode } from "react";
import { Badge } from "./Badge";

type FieldProps = {
  name: string;
  type?: string;
  required?: boolean;
  deprecated?: boolean;
  default?: string;
  children?: ReactNode;
};

function Field({
  name,
  type,
  required,
  deprecated,
  default: fallback,
  children,
}: FieldProps) {
  return (
    <div className="grid gap-3 border-border border-b py-5 first:pt-0 last:border-b-0 in-[details]:py-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-micro">
        <span className="text-foreground text-ui">{name}</span>
        {type && <span className="text-muted">{type}</span>}
        {required && <Badge>required</Badge>}
        {deprecated && <Badge>deprecated</Badge>}
        {fallback !== undefined && (
          <span className="text-faint">
            default: <span className="text-muted">{fallback}</span>
          </span>
        )}
      </div>
      {children && (
        <div className="docs-flow text-ui leading-relaxed [--flow:0.75rem]">
          {children}
        </div>
      )}
    </div>
  );
}

export const ParamField = (props: FieldProps) => <Field {...props} />;
export const ResponseField = (props: FieldProps) => <Field {...props} />;
