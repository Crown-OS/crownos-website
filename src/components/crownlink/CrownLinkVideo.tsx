"use client";

import { useEffect, useRef } from "react";
import { crownLinkFeatures, crownLinkReelSources } from "@/data/crownlink";

type CrownLinkVideoProps = {
  activeIndex: number;
  isOnScreen: boolean;
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function CrownLinkVideo({
  activeIndex,
  isOnScreen,
}: CrownLinkVideoProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const nextIndex = (activeIndex + 1) % crownLinkFeatures.length;

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index !== activeIndex) {
        video.pause();
        return;
      }
      video.currentTime = 0;
    });
  }, [activeIndex]);

  useEffect(() => {
    const video = videoRefs.current[activeIndex];
    if (!video) return;
    if (isOnScreen && !prefersReducedMotion()) video.play().catch(() => {});
    else video.pause();
  }, [activeIndex, isOnScreen]);

  return (
    <div className="relative aspect-square overflow-hidden rounded-xl border border-white/8 bg-surface lg:aspect-auto lg:self-stretch">
      {crownLinkFeatures.map((feature, index) => {
        const sources = crownLinkReelSources(feature.id);
        const isActive = index === activeIndex;
        return (
          <video
            key={feature.id}
            ref={(video) => {
              videoRefs.current[index] = video;
            }}
            aria-label={`${feature.title} in use`}
            aria-hidden={!isActive}
            poster={sources.poster}
            muted
            loop
            playsInline
            preload={isActive || index === nextIndex ? "auto" : "none"}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ease-out motion-reduce:transition-none ${isActive ? "opacity-100" : "opacity-0"}`}
          >
            <source
              src={sources.webm}
              type={'video/webm; codecs="av01.0.08M.10"'}
            />
            <source src={sources.mp4} type="video/mp4" />
          </video>
        );
      })}
    </div>
  );
}
