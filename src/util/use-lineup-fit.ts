import { useMotionValue } from "motion/react";
import { type RefObject, useEffect } from "react";
import type { Lineup } from "./device-still";
import { containRect, type Size } from "./frame-sequence";

const SIDE_MARGIN_SHARE = 0.92;

export function useLineupFit(
  stageRef: RefObject<HTMLElement | null>,
  captionRef: RefObject<HTMLElement | null>,
  frame: Size,
  lineup: Lineup,
  maxHeightShare: number,
) {
  const scale = useMotionValue(maxHeightShare);
  const lift = useMotionValue(0);

  useEffect(() => {
    const stage = stageRef.current;
    const caption = captionRef.current;
    if (!stage || !caption) return;

    const measure = () => {
      const box = { width: stage.clientWidth, height: stage.clientHeight };
      const fitted = containRect(frame, box);
      const gap = Number.parseFloat(getComputedStyle(caption).paddingTop);
      const floor = caption.offsetTop;
      const fittedScale = Math.min(
        1,
        (maxHeightShare * box.height) / fitted.height,
        (SIDE_MARGIN_SHARE * box.width) / (lineup.centeredWidth * fitted.width),
        (floor - gap) / ((lineup.bottom - lineup.top) * fitted.height),
      );
      const restingBottom =
        box.height / 2 + fittedScale * fitted.height * (lineup.bottom - 0.5);
      scale.set(fittedScale);
      lift.set(floor - restingBottom);
    };
    const resize = new ResizeObserver(measure);
    resize.observe(stage);
    resize.observe(caption);
    return () => resize.disconnect();
  }, [stageRef, captionRef, frame, lineup, maxHeightShare, scale, lift]);

  return { scale, lift };
}
