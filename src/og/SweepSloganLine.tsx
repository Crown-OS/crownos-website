import type { SweepSloganCopy } from "@/components/ui/SweepSlogan";
import { OG_COLORS } from "./ogTheme";

export function SweepSloganLine({
  copy: { lead, emphasis, trail },
  fontSize,
}: {
  copy: SweepSloganCopy;
  fontSize: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        fontFamily: "Inter",
        fontWeight: 400,
        fontSize,
        letterSpacing: "-0.03em",
        lineHeight: 1.15,
        gap: "0.28em",
      }}
    >
      <span>{lead}</span>
      <span
        style={{
          fontFamily: "Instrument Serif",
          fontStyle: "italic",
          fontSize: "1.16em",
          letterSpacing: "-0.005em",
          lineHeight: 1,
          backgroundImage: OG_COLORS.sweep,
          backgroundClip: "text",
          color: "transparent",
          paddingRight: "0.05em",
        }}
      >
        {emphasis}
      </span>
      <span>{trail}</span>
    </div>
  );
}
