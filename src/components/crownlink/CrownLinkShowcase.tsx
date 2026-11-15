"use client";

import { useEffect, useRef, useState } from "react";
import { crownLinkFeatures } from "@/data/crownlink";
import { CrownLinkFeatureList } from "./CrownLinkFeatureList";
import { CrownLinkVideo } from "./CrownLinkVideo";

export function CrownLinkShowcase() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    const showcase = showcaseRef.current;
    if (!showcase) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting),
    );
    observer.observe(showcase);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={showcaseRef}
      className="scroll-reveal mx-auto mt-16 grid max-w-255 gap-12 md:mt-20 lg:grid-cols-2 lg:gap-20"
    >
      <CrownLinkFeatureList
        activeIndex={activeIndex}
        isRunning={isOnScreen}
        onSelect={setActiveIndex}
        onAdvance={() =>
          setActiveIndex((index) => (index + 1) % crownLinkFeatures.length)
        }
      />
      <CrownLinkVideo activeIndex={activeIndex} isOnScreen={isOnScreen} />
    </div>
  );
}
