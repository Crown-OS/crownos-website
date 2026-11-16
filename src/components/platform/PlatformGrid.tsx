"use client";

import {
  type ComponentProps,
  type PointerEvent,
  useEffect,
  useRef,
} from "react";

type ClientPoint = { x: number; y: number };

function paintCursorGlow(grid: HTMLElement, { x, y }: ClientPoint) {
  grid.setAttribute("data-glow-active", "");
  for (const card of grid.children) {
    const { left, top } = card.getBoundingClientRect();
    const { style } = card as HTMLElement;
    style.setProperty("--glow-x", `${x - left}px`);
    style.setProperty("--glow-y", `${y - top}px`);
  }
}

export function PlatformGrid(props: ComponentProps<"ul">) {
  const gridRef = useRef<HTMLUListElement>(null);
  const cursorRef = useRef<ClientPoint | null>(null);

  useEffect(() => {
    let frame = 0;
    const followScroll = () => {
      const grid = gridRef.current;
      const cursor = cursorRef.current;
      if (!grid || !cursor || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        paintCursorGlow(grid, cursor);
      });
    };
    window.addEventListener("scroll", followScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", followScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const trackCursor = ({ currentTarget, clientX, clientY }: PointerEvent) => {
    cursorRef.current = { x: clientX, y: clientY };
    paintCursorGlow(currentTarget as HTMLElement, cursorRef.current);
  };

  const releaseCursor = ({ currentTarget }: PointerEvent) => {
    cursorRef.current = null;
    currentTarget.removeAttribute("data-glow-active");
  };

  return (
    <ul
      ref={gridRef}
      onPointerMove={trackCursor}
      onPointerLeave={releaseCursor}
      {...props}
    />
  );
}
