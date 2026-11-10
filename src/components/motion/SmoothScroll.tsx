"use client";

import type Lenis from "lenis";
import { useEffect } from "react";
import { mediaQuery } from "@/util/media-query";

const LENIS_OPTIONS = { lerp: 0.09, anchors: true, autoRaf: true } as const;
const CURSOR_POINTER = "(hover: hover) and (pointer: fine)";

export function SmoothScroll() {
  useEffect(() => {
    const cursor = mediaQuery(CURSOR_POINTER);
    let lenis: Lenis | undefined;
    let mounted = true;

    const sync = async () => {
      lenis?.destroy();
      lenis = undefined;
      if (!cursor.matches) return;
      const { default: SmoothScroller } = await import("lenis");
      if (mounted && cursor.matches && !lenis)
        lenis = new SmoothScroller(LENIS_OPTIONS);
    };

    sync();
    cursor.addEventListener("change", sync);
    return () => {
      mounted = false;
      cursor.removeEventListener("change", sync);
      lenis?.destroy();
    };
  }, []);

  return null;
}
