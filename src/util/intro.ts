import { useSyncExternalStore } from "react";
import { INTRO_ATTRIBUTE as ATTRIBUTE } from "@/data/intro";

export type IntroPhase = "loading" | "revealing" | "done";

const listeners = new Set<() => void>();
const tasks: Promise<unknown>[] = [];

export const getIntroPhase = (): IntroPhase =>
  (document.documentElement.getAttribute(ATTRIBUTE) as IntroPhase | null) ??
  "done";

export function setIntroPhase(phase: IntroPhase) {
  document.documentElement.setAttribute(ATTRIBUTE, phase);
  for (const listener of listeners) listener();
}

export function onIntroChange(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const useIntroPhase = () =>
  useSyncExternalStore(onIntroChange, getIntroPhase, () => "done" as const);

/** Lets heavy assets (e.g. the hero laptop) hold the loader until they are ready. */
export function registerIntroTask(task: Promise<unknown>) {
  tasks.push(task.catch(() => undefined));
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const windowLoaded = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", () => resolve(), { once: true });
  });

async function settleTasks() {
  let settled = -1;
  while (settled !== tasks.length) {
    settled = tasks.length;
    await Promise.all(tasks);
  }
}

export function whenIntroReady(minMs: number, maxMs: number) {
  const ready = Promise.all([
    wait(minMs),
    document.fonts.ready,
    windowLoaded().then(settleTasks),
  ]);
  return Promise.race([ready, wait(maxMs)]);
}
