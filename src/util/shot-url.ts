type ShotSet = { path: string; widths: readonly number[] };

export const shotUrl = ({ path }: ShotSet, id: string, width: number) =>
  `${path}-${id}-${width}.avif`;

export const shotSrcSet = (set: ShotSet, id: string) =>
  set.widths.map((width) => `${shotUrl(set, id, width)} ${width}w`).join(", ");
