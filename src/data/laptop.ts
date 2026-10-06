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

export const LAPTOP_POSES = {
  wide: {
    from: {
      ndcX: -1.35,
      ndcY: -0.58,
      depth: -6,
      width: 0.3,
      yawDeg: -336,
      lidDeg: 0,
    },
    to: {
      ndcX: -0.48,
      ndcY: -0.58,
      depth: 0,
      width: 0.3,
      yawDeg: 24,
      lidDeg: 90,
    },
  },
  compact: {
    from: {
      ndcX: -1.6,
      ndcY: -0.6,
      depth: -6,
      width: 0.68,
      yawDeg: -343,
      lidDeg: 0,
    },
    to: { ndcX: 0, ndcY: -0.6, depth: 0, width: 0.68, yawDeg: 17, lidDeg: 90 },
  },
} satisfies Record<string, { from: LaptopPose; to: LaptopPose }>;

export const LAPTOP_BREAKPOINT = "(min-width: 48rem)";
