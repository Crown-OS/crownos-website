import type { ComponentType, ReactNode, SVGProps } from "react";
import type { IconKey } from "@/data/feature";

type IconProps = SVGProps<SVGSVGElement>;

function StrokeIcon({
  children,
  ...props
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

const Folder = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h3.6l2 2.2h7.4A2.5 2.5 0 0 1 21 9.7v7.8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z" />
    <path d="M8 13.5h8" />
  </StrokeIcon>
);

const Swatches = (props: IconProps) => (
  <StrokeIcon {...props}>
    <rect x="3" y="3" width="7" height="18" rx="3.5" />
    <path d="m10 8.5 4.6-4.6a2.4 2.4 0 0 1 3.4 0l2.1 2.1a2.4 2.4 0 0 1 0 3.4L10 19.5" />
    <path d="M16.5 14H19a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6.5" />
    <circle cx="6.5" cy="17" r="1" fill="currentColor" />
  </StrokeIcon>
);

const Plug = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M9 3v4M15 3v4" />
    <path d="M6 7h12v3a6 6 0 0 1-12 0z" />
    <path d="M12 16v5" />
  </StrokeIcon>
);

const Layout = (props: IconProps) => (
  <StrokeIcon {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="M11 4v16M11 12h10" />
  </StrokeIcon>
);

const Shield = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </StrokeIcon>
);

const Code = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />
  </StrokeIcon>
);

const Link = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M10 14a4.5 4.5 0 0 0 6.4 0l2.8-2.8a4.5 4.5 0 0 0-6.4-6.4L11.6 6" />
    <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-2.8 2.8a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" />
  </StrokeIcon>
);

const Rewind = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M3.5 12a8.5 8.5 0 1 0 2.5-6" />
    <path d="M3 3.5V8h4.5" />
    <path d="M12 8v4.5l3 2" />
  </StrokeIcon>
);

export const FEATURE_ICONS = {
  folder: Folder,
  swatches: Swatches,
  plug: Plug,
  layout: Layout,
  shield: Shield,
  code: Code,
  link: Link,
  rewind: Rewind,
} satisfies Record<IconKey, ComponentType<IconProps>>;

export const CheckIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </StrokeIcon>
);

export const DashIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M7 12h10" />
  </StrokeIcon>
);
