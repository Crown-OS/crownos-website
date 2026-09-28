"use client";

import { useEffect, useRef, useState } from "react";
import { mountMetalText } from "@/util/metal-text";

export function MetalText({ text }: { text: string }) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shaded, setShaded] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    return mountMetalText(host, canvas, text, () => setShaded(true));
  }, [text]);

  return (
    <span ref={hostRef} className="relative inline-block">
      <span className={shaded ? "text-transparent" : "text-metal"}>{text}</span>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute"
      />
    </span>
  );
}
