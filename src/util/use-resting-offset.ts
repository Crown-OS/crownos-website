import type { MotionValue } from "motion/react";
import { type RefObject, useEffect } from "react";
import { type FrameSequence, restingOffset } from "./frame-sequence";

export function useRestingOffset(
  stageRef: RefObject<HTMLElement | null>,
  copyRef: RefObject<HTMLElement | null>,
  targetRefs: readonly RefObject<HTMLElement | null>[],
  sequence: FrameSequence,
  progress: MotionValue<number>,
) {
  useEffect(() => {
    const stage = stageRef.current;
    const copy = copyRef.current;
    const targets = targetRefs.map((ref) => ref.current);
    if (!stage || !copy || targets.some((target) => !target)) return;

    let resting = 0;
    const settle = () => {
      const translate = `0 ${resting * (1 - progress.get())}px`;
      for (const target of targets) {
        if (target) target.style.translate = translate;
      }
    };
    const measure = () => {
      resting = restingOffset(
        sequence,
        { width: stage.clientWidth, height: stage.clientHeight },
        copy.offsetTop + copy.offsetHeight,
      );
      settle();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(stage);
    resize.observe(copy);
    const unsubscribe = progress.on("change", settle);
    return () => {
      resize.disconnect();
      unsubscribe();
    };
  }, [stageRef, copyRef, targetRefs, sequence, progress]);
}
