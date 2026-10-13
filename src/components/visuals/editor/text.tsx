import type { ReactNode } from "react";
import { EDITOR_COLOR, LAYOUT } from "./theme";

type TextProps = {
  x: number;
  y: number;
  color?: string;
  anchor?: "start" | "end";
  bold?: boolean;
  children: ReactNode;
};

export function UiText({
  x,
  y,
  color = EDITOR_COLOR.text,
  anchor,
  bold,
  children,
}: TextProps) {
  return (
    <text
      x={x}
      y={y}
      fill={color}
      fontSize={LAYOUT.uiFontSize}
      fontWeight={bold ? 600 : 400}
      textAnchor={anchor}
      dominantBaseline="central"
      className="font-inter"
    >
      {children}
    </text>
  );
}

export function CodeText({
  x,
  y,
  color = EDITOR_COLOR.text,
  anchor,
  children,
}: TextProps) {
  return (
    <text
      x={x}
      y={y}
      fill={color}
      fontSize={LAYOUT.codeFontSize}
      textAnchor={anchor}
      dominantBaseline="central"
      className="font-mono"
    >
      {children}
    </text>
  );
}
