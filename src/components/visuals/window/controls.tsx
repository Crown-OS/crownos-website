import type { ReactNode } from "react";
import { Glyph, type GlyphName } from "./Glyph";

export function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={`flex h-4.5 w-8 shrink-0 items-center rounded-full p-0.5 ${
        on ? "justify-end bg-brand" : "justify-start bg-neutral-300"
      }`}
    >
      <span className="size-3.5 rounded-full bg-white shadow-[0_1px_2px_rgb(0_0_0/0.25)]" />
    </span>
  );
}

export function Chip({
  icon,
  children,
}: {
  icon?: GlyphName;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex h-6.5 items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-2.5 text-neutral-600 text-xs">
      {icon && <Glyph name={icon} className="size-3.5 text-neutral-500" />}
      {children}
    </span>
  );
}

export function GlyphTile({ icon }: { icon: GlyphName }) {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-neutral-100 text-neutral-700">
      <Glyph name={icon} className="size-4" />
    </span>
  );
}
