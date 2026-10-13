import type { ReactNode } from "react";
import { FONT_SIZE, SETTINGS_COLOR } from "./theme";

const WEIGHT = { regular: 400, medium: 500, semibold: 600, bold: 700 };

export function SettingsText({
  x,
  y,
  size = FONT_SIZE.body,
  weight = "regular",
  color = SETTINGS_COLOR.body,
  anchor,
  children,
}: {
  x: number;
  y: number;
  size?: number;
  weight?: keyof typeof WEIGHT;
  color?: string;
  anchor?: "start" | "end";
  children: ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      fill={color}
      fontSize={size}
      fontWeight={WEIGHT[weight]}
      textAnchor={anchor}
      className="font-inter"
    >
      {children}
    </text>
  );
}
