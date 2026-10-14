const EASING = 0.06;
const RESTING = 0.5;

export function createEasedPointer(bounds: () => DOMRect) {
  const target = { x: RESTING, y: RESTING };
  const current = { ...target };

  const track = (event: PointerEvent) => {
    const { left, top, width, height } = bounds();
    target.x = (event.clientX - left) / width;
    target.y = 1 - (event.clientY - top) / height;
  };

  window.addEventListener("pointermove", track, { passive: true });

  return {
    step() {
      current.x += (target.x - current.x) * EASING;
      current.y += (target.y - current.y) * EASING;
      return current;
    },
    dispose: () => window.removeEventListener("pointermove", track),
  };
}
