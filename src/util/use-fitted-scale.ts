import { useMotionValue } from "motion/react";
import { type RefObject, useEffect } from "react";
import { containRect, type Size } from "./frame-sequence";

const SIDE_MARGIN_SHARE = 0.92;

export function useFittedScale(
  stageRef: RefObject<HTMLElement | null>,
  frame: Size,
  heightShare: number,
  lineupWidth: number,
) {
  const scale = useMotionValue(heightShare);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const measure = () => {
      const box = { width: stage.clientWidth, height: stage.clientHeight };
      const fitted = containRect(frame, box);
      scale.set(
        Math.min(
          1,
          (heightShare * box.height) / fitted.height,
          (SIDE_MARGIN_SHARE * box.width) / (lineupWidth * fitted.width),
        ),
      );
    };
    const resize = new ResizeObserver(measure);
    resize.observe(stage);
    return () => resize.disconnect();
  }, [stageRef, frame, heightShare, lineupWidth, scale]);

  return scale;
}
