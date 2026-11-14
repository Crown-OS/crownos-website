type ShotSet = { path: string; widths: readonly number[] };

export const shotUrl = ({ path }: ShotSet, width: number) =>
  `${path}-${width}.avif`;

export const shotSrcSet = (set: ShotSet) =>
  set.widths.map((width) => `${shotUrl(set, width)} ${width}w`).join(", ");
