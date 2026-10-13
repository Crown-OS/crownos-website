const IDLE_TIMEOUT_MS = 2000;
const FALLBACK_DELAY_MS = 300;

export function whenIdle(callback: () => void) {
  if ("requestIdleCallback" in window) {
    const handle = requestIdleCallback(callback, { timeout: IDLE_TIMEOUT_MS });
    return () => cancelIdleCallback(handle);
  }
  const handle = setTimeout(callback, FALLBACK_DELAY_MS);
  return () => clearTimeout(handle);
}
