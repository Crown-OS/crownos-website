type Bounds = () => DOMRectReadOnly;

const viewportBounds: Bounds = () =>
  new DOMRect(0, 0, window.innerWidth, window.innerHeight);

export function createEasedPointer(bounds = viewportBounds, easing = 0.05) {
  const target = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };

  const track = (event: PointerEvent) => {
    const { left, top, width, height } = bounds();
    target.x = ((event.clientX - left) / width) * 2 - 1;
    target.y = 1 - ((event.clientY - top) / height) * 2;
  };

  window.addEventListener("pointermove", track, { passive: true });

  return {
    step() {
      eased.x += (target.x - eased.x) * easing;
      eased.y += (target.y - eased.y) * easing;
      return eased;
    },
    dispose: () => window.removeEventListener("pointermove", track),
  };
}
