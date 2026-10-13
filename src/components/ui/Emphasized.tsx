import type { ReactNode } from "react";
import { splitEmphasis } from "@/util/emphasis";

export function Emphasis({ children }: { children: ReactNode }) {
  return <em className="pr-[0.06em] font-normal font-serif">{children}</em>;
}

export function Emphasized({ text }: { text: string }) {
  return splitEmphasis(text).map(({ text: part, emphasized }, index) =>
    emphasized ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: parts are static and positional
      <Emphasis key={index}>{part}</Emphasis>
    ) : (
      part
    ),
  );
}
