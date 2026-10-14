import { type ReactNode, useId } from "react";
import type { PluginShape as ShapeKey } from "@/data/catalog";

const ROTATIONS = {
  asterisk: [0, 45, 90, 135],
  cross: [45, -45],
} as const;

const SHAPES: Record<ShapeKey, ReactNode> = {
  asterisk: ROTATIONS.asterisk.map((angle) => (
    <rect
      key={angle}
      x="52"
      y="16"
      width="16"
      height="88"
      rx="8"
      transform={`rotate(${angle} 60 60)`}
    />
  )),
  spark: (
    <path d="M60 12C63 47 73 57 108 60 73 63 63 73 60 108 57 73 47 63 12 60 47 57 57 47 60 12Z" />
  ),
  cross: ROTATIONS.cross.map((angle) => (
    <rect
      key={angle}
      x="49"
      y="14"
      width="22"
      height="92"
      rx="11"
      transform={`rotate(${angle} 60 60)`}
    />
  )),
  ring: <circle cx="60" cy="60" r="31" fill="none" strokeWidth="20" />,
  clover: (
    <>
      <circle cx="60" cy="38" r="21" />
      <circle cx="82" cy="60" r="21" />
      <circle cx="60" cy="82" r="21" />
      <circle cx="38" cy="60" r="21" />
    </>
  ),
  prism: <path d="M60 24 96 88H24Z" strokeWidth="18" strokeLinejoin="round" />,
  capsule: (
    <g transform="rotate(32 60 60)">
      <rect x="30" y="16" width="26" height="88" rx="13" />
      <rect x="64" y="30" width="26" height="60" rx="13" />
    </g>
  ),
  orbit: (
    <>
      <ellipse
        cx="60"
        cy="60"
        rx="46"
        ry="17"
        fill="none"
        strokeWidth="11"
        transform="rotate(-28 60 60)"
      />
      <circle cx="60" cy="60" r="19" />
    </>
  ),
  knot: (
    <path
      d="M60 60C47 38 20 40 20 60s27 22 40 0 40-22 40 0-27 22-40 0Z"
      fill="none"
      strokeWidth="15"
    />
  ),
};

export function PluginShape({
  shape,
  className,
}: {
  shape: ShapeKey;
  className?: string;
}) {
  const filterId = useId();

  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      focusable="false"
      className={className}
    >
      <title>{shape}</title>
      <filter
        id={filterId}
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur in="SourceAlpha" stdDeviation="4.5" result="height" />
        <feDiffuseLighting
          in="height"
          surfaceScale="8"
          diffuseConstant="1.15"
          lightingColor="#8e8e94"
          result="diffuse"
        >
          <feDistantLight azimuth="225" elevation="36" />
        </feDiffuseLighting>
        <feSpecularLighting
          in="height"
          surfaceScale="8"
          specularConstant="0.95"
          specularExponent="26"
          lightingColor="#ffffff"
          result="specular"
        >
          <feDistantLight azimuth="225" elevation="48" />
        </feSpecularLighting>
        <feComposite
          in="specular"
          in2="diffuse"
          operator="arithmetic"
          k2="1"
          k3="1"
          result="lit"
        />
        <feComposite in="lit" in2="SourceAlpha" operator="in" />
      </filter>
      <g filter={`url(#${filterId})`}>
        <g className="shape-spin" fill="#fff" stroke="#fff">
          {SHAPES[shape]}
        </g>
      </g>
    </svg>
  );
}
