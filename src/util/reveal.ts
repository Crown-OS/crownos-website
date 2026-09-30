export const REVEALED_ATTRIBUTE = "data-shown";

const revealTimes = new WeakMap<Element, number>();

export function markRevealed(element: Element) {
  revealTimes.set(element, performance.now());
  element.setAttribute(REVEALED_ATTRIBUTE, "");
}

export function onRevealed(
  element: Element,
  reveal: (revealedAt: number) => void,
): () => void {
  const target = element.closest("[data-reveal]");
  const revealedAt = () =>
    (target && revealTimes.get(target)) ?? performance.now();
  if (!target || target.hasAttribute(REVEALED_ATTRIBUTE)) {
    reveal(revealedAt());
    return () => {};
  }

  const observer = new MutationObserver(() => {
    if (!target.hasAttribute(REVEALED_ATTRIBUTE)) return;
    observer.disconnect();
    reveal(revealedAt());
  });
  observer.observe(target, {
    attributes: true,
    attributeFilter: [REVEALED_ATTRIBUTE],
  });
  return () => observer.disconnect();
}
