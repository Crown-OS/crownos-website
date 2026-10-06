export const LAPTOP_ASSET = {
  model: "/models/macbook.glb",
  /** Set to a 2048×1024 CrownOS desktop render (e.g. "/models/crownos-screen.webp") to replace the stock wallpaper. */
  screen: null as string | null,
  lidNode: "RcexTyyhpuJYATQ",
  screenMaterial: "HlQwFCAPWzetDQy",
} as const;

/**
 * Hinge axis (X) in the lid's parent space, solved from the mesh so the closed
 * lid rests flush on the deck instead of sinking into it.
 */
export const LAPTOP_HINGE = {
  y: -10.745,
  z: -0.023,
  modeledOpenDeg: 110.38,
} as const;

export type LaptopPose = {
  /** Screen position of the laptop's origin in normalized device coords (-1 left … 1 right). */
  ndcX: number;
  ndcY: number;
  /** Distance behind the focal plane, in camera distances (0 = settled). */
  depth: number;
  /** Laptop width at the focal plane as a fraction of the viewport width. */
  width: number;
  yawDeg: number;
  lidDeg: number;
};

/**
 * The camera always faces the laptop head-on; a lens shift places it on screen.
 * `distance` is in laptop widths and sets perspective strength — the field of
 * view is derived so the laptop keeps its fitted size.
 */
export const LAPTOP_CAMERA = { distance: 2.4, pitchDeg: 17 } as const;

/** Live-tunable view settings; see `?tune-laptop`. */
export type LaptopView = {
  scale: number;
  pitchDeg: number;
  yawDeg: number;
  lidDeg: number;
  distance: number;
};

export const LAPTOP_TUNE_PARAM = "tune-laptop";

export const LAPTOP_SLOT_SELECTOR = "[data-laptop-slot]";

/** Multiplier on the slot-fitted size; above 1 lets the laptop overflow its slot. */
export const LAPTOP_SCALE = 1.03;

export const LAPTOP_MOTION = {
  /** Final yaw per layout; 0 keeps the screen facing straight out. */
  yawDeg: { wide: 0, compact: 0 },
  turnDeg: 360,
  /** Entrance starts this many camera distances further back (≈ half size). */
  startDepth: -0.85,
  /** Start this many laptop widths past the left edge so the spin never peeks in early. */
  offscreen: 1.2,
  /** Lid angle to the deck (`90 + pitchDeg` would hold the screen square to the camera). */
  openDeg: 99,
} as const;

/** Mirrors the `split` variant in theme.css: the laptop sits beside the headline instead of below it. */
export const LAPTOP_SPLIT_QUERY =
  "(min-width: 64rem), (min-width: 48rem) and (orientation: landscape)";
