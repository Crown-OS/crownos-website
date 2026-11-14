import { type MotionValue, useMotionValueEvent } from "motion/react";
import { type RefObject, useEffect } from "react";

export function useFlagWhile<T>(
  ref: RefObject<HTMLElement | null>,
  value: MotionValue<T>,
  attribute: string,
  isFlagged: (latest: T) => boolean,
) {
  const sync = (latest: T) =>
    ref.current?.toggleAttribute(attribute, isFlagged(latest));
  useMotionValueEvent(value, "change", sync);
  useEffect(() => {
    ref.current?.toggleAttribute(attribute, isFlagged(value.get()));
  }, [ref, value, attribute, isFlagged]);
}
