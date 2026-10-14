import type { CatalogMeta } from "@/data/catalog";

export function pickRelated<Meta extends CatalogMeta>(
  entries: readonly Meta[],
  current: Meta,
  limit: number,
) {
  return entries
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => entry.slug !== current.slug)
    .sort(
      (left, right) =>
        Number(right.entry.category === current.category) -
        Number(left.entry.category === current.category),
    )
    .slice(0, limit);
}
