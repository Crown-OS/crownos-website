"use client";

import { useEffect } from "react";
import { matchesMedia } from "@/util/media-query";
import { FINE_POINTER } from "@/util/pointer";

const SPOTLIGHT = "[data-spotlight]";

export function PointerSpotlight() {
  useEffect(() => {
    if (!matchesMedia(FINE_POINTER)) return;
    let pending: PointerEvent | undefined;
    let frame = 0;

    const paint = () => {
      frame = 0;
      const target = (pending?.target as Element | null)?.closest<HTMLElement>(
        SPOTLIGHT,
      );
      if (!pending || !target) return;
      const bounds = target.getBoundingClientRect();
      target.style.setProperty(
        "--spot-x",
        `${pending.clientX - bounds.left}px`,
      );
      target.style.setProperty("--spot-y", `${pending.clientY - bounds.top}px`);
    };
    const track = (event: PointerEvent) => {
      pending = event;
      frame ||= requestAnimationFrame(paint);
    };

    document.addEventListener("pointermove", track, { passive: true });
    return () => {
      document.removeEventListener("pointermove", track);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
