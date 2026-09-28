"use client";

import { useEffect, useRef, useState } from "react";
import { CrownLogo } from "@/components/brand/CrownLogo";
import { CROWN_BOUNDS, CROWN_LETTER } from "@/data/brand";
import { mountMetalText } from "@/util/metal-text";

const CROWN_ASPECT = `${CROWN_BOUNDS.width} / ${CROWN_BOUNDS.height}`;

export function MetalText({ text }: { text: string }) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shaded, setShaded] = useState(false);
  const crownAt = text.indexOf(CROWN_LETTER);
  const lead = crownAt < 0 ? text : text.slice(0, crownAt);
  const trail = text.slice(crownAt + 1);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    return mountMetalText(host, canvas, () => setShaded(true));
  }, []);

  return (
    <span ref={hostRef} className="relative inline-block">
      <span className="sr-only">{text}</span>
      <span aria-hidden className={shaded ? "text-transparent" : "text-metal"}>
        <span data-mask="text">{lead}</span>
        {crownAt >= 0 && (
          <>
            <span
              data-mask="crown"
              className="mx-[0.03em] inline-block h-[0.6em]"
              style={{ aspectRatio: CROWN_ASPECT }}
            >
              <CrownLogo
                className={`block size-full ${shaded ? "invisible" : ""}`}
              />
            </span>
            <span data-mask="text">{trail}</span>
          </>
        )}
      </span>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute"
      />
    </span>
  );
}
