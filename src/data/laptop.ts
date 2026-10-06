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
  /** Horizontal position in normalized device coords (-1 left … 1 right). */
  ndcX: number;
  ndcY: number;
  /** Depth relative to the focal plane; negative is further away. */
  depth: number;
  /** Laptop width as a fraction of the viewport width. */
  width: number;
  yawDeg: number;
  lidDeg: number;
};

export const LAPTOP_CAMERA = { fov: 28, distance: 7, pitchDeg: 22 } as const;

export const LAPTOP_SLOT_SELECTOR = "[data-laptop-slot]";

/**
 * On-screen footprint of the settled laptop, in laptop widths, measured at its
 * final angle. Used to fit it inside the layout slot.
 */
export const LAPTOP_FOOTPRINT = {
  /** Visible extent with the lid open (perspective and yaw make it exceed one width). */
  width: 1.28,
  height: 1.11,
  /** Rig origin (front-center of the base) offset from the footprint's center. */
  originX: 0.041,
  originY: 0.477,
} as const;

export const LAPTOP_MOTION = {
  /** Final yaw toward the headline, per layout. */
  yawDeg: { wide: 24, compact: 17 },
  turnDeg: 360,
  startDepth: -6,
  /** Start this many laptop widths past the left edge so the spin never peeks in early. */
  offscreen: 1.2,
  openDeg: 90,
} as const;

/** Mirrors the `split` variant in theme.css: the laptop sits beside the headline instead of below it. */
export const LAPTOP_SPLIT_QUERY =
  "(min-width: 64rem), (min-width: 48rem) and (orientation: landscape)";
