"use client";

import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";
import { useMediaQuery } from "@/util/use-media-query";

type HorizontalTrackProps = {
  id: string;
  label: string;
  children: ReactNode;
};

export function HorizontalTrack({ id, label, children }: HorizontalTrackProps) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pinned = useMediaQuery("(min-width: 768px)");
  const travel = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const x = useTransform(() => -scrollYProgress.get() * travel.get());

  useEffect(() => {
    const host = section.current;
    const content = track.current;
    if (!host || !content) return;
    if (!pinned) {
      host.style.removeProperty("height");
      travel.set(0);
      return;
    }

    const measure = () => {
      const distance = Math.max(0, content.scrollWidth - window.innerWidth);
      travel.set(distance);
      host.style.height = `${window.innerHeight + distance}px`;
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned, travel]);

  return (
    <section ref={section} id={id} aria-label={label} className="relative">
      <div className="md:sticky md:top-0 md:h-svh md:overflow-clip">
        <motion.div
          ref={track}
          style={pinned ? { x } : undefined}
          className="flex flex-col md:h-full md:w-max md:flex-row"
        >
          {children}
        </motion.div>
        <motion.div
          aria-hidden
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-gutter bottom-4 h-px origin-left bg-foreground/40 max-md:hidden"
        />
      </div>
    </section>
  );
}
