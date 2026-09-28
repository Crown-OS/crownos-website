import { useId } from "react";
import { CROWN_PATH, CROWN_VIEWBOX } from "@/data/brand";

type CrownLogoProps = { className?: string };

export function CrownLogo({ className }: CrownLogoProps) {
  const id = useId();
  const fill = `${id}-fill`;
  const edge = `${id}-edge`;

  return (
    <svg
      viewBox={CROWN_VIEWBOX}
      className={className}
      role="img"
      aria-label="CrownOS"
    >
      <defs>
        <linearGradient
          id={fill}
          x1="152.5"
          y1="30.7"
          x2="148"
          y2="198"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#c7c7c7" />
          <stop offset="1" stopColor="#6d6a6a" />
        </linearGradient>
        <linearGradient
          id={edge}
          x1="152"
          y1="18"
          x2="152"
          y2="198"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#2b2b2b" />
        </linearGradient>
      </defs>
      <path
        d={CROWN_PATH}
        fill={`url(#${fill})`}
        stroke={`url(#${edge})`}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
