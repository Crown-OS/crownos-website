export type IntroPhase = "pending" | "dropping" | "leaving" | "done";

const REVEAL_EVENT = "crownos:intro-reveal";
let revealsReleased = false;

export function setIntroPhase(phase: IntroPhase) {
  const loader = document.querySelector<HTMLElement>(".intro");
  if (loader) loader.dataset.phase = phase;
}

export function releaseReveals() {
  revealsReleased = true;
  window.dispatchEvent(new Event(REVEAL_EVENT));
}

export function onRevealsReleased(start: () => () => void) {
  if (revealsReleased) return start();
  let stop: (() => void) | undefined;
  const begin = () => {
    stop = start();
  };
  window.addEventListener(REVEAL_EVENT, begin, { once: true });
  return () => {
    window.removeEventListener(REVEAL_EVENT, begin);
    stop?.();
  };
}

export const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3;
