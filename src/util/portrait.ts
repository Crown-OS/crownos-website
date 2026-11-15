const PORTRAIT_WIDTHS = {
  card: { widths: [480, 640, 960], aspect: 4 / 3 },
  avatar: { widths: [64, 96, 128, 192], aspect: 1 },
} as const;

export type PortraitKind = keyof typeof PORTRAIT_WIDTHS;

export function portraitSources(basePath: string, kind: PortraitKind) {
  const { widths, aspect } = PORTRAIT_WIDTHS[kind];
  const largest = widths[widths.length - 1];
  const pathFor = (width: number) => `${basePath}/${kind}-${width}.webp`;
  return {
    src: pathFor(largest),
    srcSet: widths.map((width) => `${pathFor(width)} ${width}w`).join(", "),
    width: largest,
    height: Math.round(largest * aspect),
  };
}
