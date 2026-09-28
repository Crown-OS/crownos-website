export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function runWhileVisible(
  element: Element,
  frame: (time: number) => void,
): () => void {
  if (prefersReducedMotion()) {
    const still = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(still);
  }

  let handle = 0;
  let visible = false;

  const tick = (time: number) => {
    frame(time);
    handle = requestAnimationFrame(tick);
  };

  const sync = () => {
    cancelAnimationFrame(handle);
    handle = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
  };

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });

  observer.observe(element);
  document.addEventListener("visibilitychange", sync);

  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", sync);
    cancelAnimationFrame(handle);
  };
}
