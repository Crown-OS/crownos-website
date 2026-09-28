"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

const LENIS_OPTIONS = { lerp: 0.09, anchors: true, autoRaf: true } as const;

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      {children}
    </ReactLenis>
  );
}
