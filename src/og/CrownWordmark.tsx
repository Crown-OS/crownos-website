import { CROWN_PATH, CROWN_VIEWBOX } from "@/data/brand";

const CROWN_ASPECT = 272 / 213;
const CROWN_HEIGHT_EM = 0.52;
const CROWN_TUCK_EM = -0.045;
const CROWN_BASELINE_EM = 0.19;

export function CrownWordmark({ fontSize }: { fontSize: number }) {
  const crownHeight = fontSize * CROWN_HEIGHT_EM;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        fontFamily: "Clash Display",
        fontWeight: 500,
        fontSize,
        lineHeight: 1,
        letterSpacing: "-0.045em",
      }}
    >
      <span>Cro</span>
      <svg
        aria-hidden="true"
        viewBox={CROWN_VIEWBOX}
        width={crownHeight * CROWN_ASPECT}
        height={crownHeight}
        style={{
          marginBottom: fontSize * CROWN_BASELINE_EM,
          marginRight: fontSize * CROWN_TUCK_EM,
        }}
      >
        <path d={CROWN_PATH} fill="#ffffff" />
      </svg>
      <span>nOS</span>
    </div>
  );
}
