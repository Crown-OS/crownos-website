export const INTRO_ATTRIBUTE = "data-intro";

const INTRO_PATH = /^\/(index(\.html)?)?$/;

/** Inline boot snippet: flags the intro on hard loads of the landing, before first paint. */
export const INTRO_BOOT_SCRIPT = `if(${INTRO_PATH}.test(location.pathname))document.documentElement.setAttribute(${JSON.stringify(INTRO_ATTRIBUTE)},"loading")`;

export const INTRO_TIMING = {
  minLoadingMs: 1400,
  maxLoadingMs: 6000,
  /** One shake-then-rest loop; the drop waits for the next loop to begin. */
  vibrateMs: 1250,
  /** Crown pops up, then falls off-screen. */
  dropMs: 1150,
  /** The circle starts opening this long before the drop finishes. */
  revealOverlapMs: 200,
  revealMs: 1600,
} as const;

/** Entrance offsets in seconds, measured from the start of the circle reveal. */
export const INTRO_STAGGER = {
  laptop: 0.65,
  navbar: 0.7,
  heroText: 0.4,
} as const;
