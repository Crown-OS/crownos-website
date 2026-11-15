import type { SVGProps } from "react";
import { CROWN_PATH, CROWN_VIEWBOX } from "@/data/brand";

export function CrownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      viewBox={CROWN_VIEWBOX}
      fill="currentColor"
      {...props}
    >
      <path d={CROWN_PATH} />
    </svg>
  );
}
