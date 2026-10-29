import type { ReactNode } from "react";
import { DocIcon, type DocIconName } from "../DocIcon";

type CalloutKind = "note" | "info" | "tip" | "check" | "warning" | "danger";

const CALLOUTS: Record<CalloutKind, { icon: DocIconName; surface: string }> = {
  note: { icon: "pencil", surface: "border-border bg-white/[0.02]" },
  info: { icon: "info", surface: "border-border bg-white/[0.02]" },
  tip: { icon: "lightbulb", surface: "border-border bg-white/[0.02]" },
  check: { icon: "check-circle", surface: "border-border bg-white/[0.02]" },
  warning: { icon: "alert", surface: "border-white/20 bg-white/[0.04]" },
  danger: { icon: "octagon", surface: "border-white/40 bg-white/[0.07]" },
};

type CalloutProps = { title?: string; children: ReactNode };

function Callout({
  kind,
  title,
  children,
}: CalloutProps & { kind: CalloutKind }) {
  const { icon, surface } = CALLOUTS[kind];
  return (
    <aside
      role="note"
      aria-label={kind}
      className={`squircle flex gap-3 rounded-tile border px-4 py-3.5 text-ui leading-relaxed ${surface}`}
    >
      <DocIcon name={icon} className="mt-0.5 size-4 shrink-0 text-foreground" />
      <div className="docs-flow min-w-0 [--flow:0.5rem]">
        {title && <p className="font-medium text-foreground">{title}</p>}
        {children}
      </div>
    </aside>
  );
}

export const Note = (props: CalloutProps) => <Callout kind="note" {...props} />;
export const Info = (props: CalloutProps) => <Callout kind="info" {...props} />;
export const Tip = (props: CalloutProps) => <Callout kind="tip" {...props} />;
export const Check = (props: CalloutProps) => (
  <Callout kind="check" {...props} />
);
export const Warning = (props: CalloutProps) => (
  <Callout kind="warning" {...props} />
);
export const Danger = (props: CalloutProps) => (
  <Callout kind="danger" {...props} />
);
