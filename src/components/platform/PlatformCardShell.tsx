"use client";

import { type ComponentProps, useEffect, useRef, useState } from "react";

const RESUME_MARGIN = "200px 0px";

export function PlatformCardShell(props: ComponentProps<"li">) {
  const cardRef = useRef<HTMLLIElement>(null);
  const [isOffscreen, setIsOffscreen] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsOffscreen(!entry.isIntersecting),
      { rootMargin: RESUME_MARGIN },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={cardRef}
      data-offscreen={isOffscreen ? "" : undefined}
      {...props}
    />
  );
}
