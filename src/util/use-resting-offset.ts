import { useMotionValue } from "motion/react";
import { type RefObject, useEffect } from "react";
import { type FrameSequence, restingOffset } from "./frame-sequence";

export function useRestingOffset(
  stageRef: RefObject<HTMLElement | null>,
  copyRef: RefObject<HTMLElement | null>,
  sequence: FrameSequence,
) {
  const offset = useMotionValue(0);

  useEffect(() => {
    const stage = stageRef.current;
    const copy = copyRef.current;
    if (!stage || !copy) return;

    const measure = () =>
      offset.set(
        restingOffset(
          sequence,
          { width: stage.clientWidth, height: stage.clientHeight },
          copy.offsetTop + copy.offsetHeight,
        ),
      );
    const resize = new ResizeObserver(measure);
    resize.observe(stage);
    resize.observe(copy);
    return () => resize.disconnect();
  }, [stageRef, copyRef, sequence, offset]);

  return offset;
}
