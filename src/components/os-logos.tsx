import type { JSX, SVGProps } from "react";
import { OS_MARKS, type OSKey } from "@/data/os-marks";

const logoProps = {
  "aria-hidden": true,
  focusable: false,
};

export const WindowsLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox={OS_MARKS.windows.viewBox} {...logoProps} {...props}>
    <title>Windows</title>
    {OS_MARKS.windows.shapes.map((shape) => (
      <path key={shape.d} d={shape.d} fill={shape.color} />
    ))}
  </svg>
);

export const AppleLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox={OS_MARKS.macos.viewBox} {...logoProps} {...props}>
    <title>macOS</title>
    {OS_MARKS.macos.shapes.map((shape) => (
      <path key={shape.d} d={shape.d} fill={shape.color} />
    ))}
  </svg>
);

export const TuxLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox={OS_MARKS.linux.viewBox} fill="none" {...logoProps} {...props}>
    <title>Linux</title>
    {OS_MARKS.linux.shapes.map((shape) => (
      <path key={shape.d} d={shape.d} fill={shape.color} />
    ))}
  </svg>
);

type OSIcon = (props: SVGProps<SVGSVGElement>) => JSX.Element;

export const OS_LOGOS: Record<OSKey, OSIcon> = {
  windows: WindowsLogo,
  macos: AppleLogo,
  linux: TuxLogo,
};
