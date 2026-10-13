export const REVEALED_ATTRIBUTE = "data-shown";

export function markRevealed(element: Element) {
  element.setAttribute(REVEALED_ATTRIBUTE, "");
}
