import Link from "next/link";
import { RollText } from "@/components/motion";
import { CATALOG_KINDS, type CatalogKind } from "@/data/catalog";

const LABELS: Record<CatalogKind, string> = {
  plugins: "Plugins",
  themes: "Themes",
};

export function KindSwitch({
  active,
  counts,
}: {
  active: CatalogKind;
  counts: Record<CatalogKind, number>;
}) {
  return (
    <nav aria-label="Catalog" className="flex gap-8">
      {CATALOG_KINDS.map((kind) => {
        const current = kind === active;
        return (
          <Link
            key={kind}
            href={`/${kind}`}
            aria-current={current ? "page" : undefined}
            className={`relative flex items-baseline gap-2 pb-3 text-lead transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-paper after:transition-[scale] after:duration-700 after:ease-out-expo ${
              current
                ? "text-foreground"
                : "text-muted after:scale-x-0 hover:text-foreground hover:after:scale-x-100"
            }`}
          >
            <RollText text={LABELS[kind]} />
            <sup className="font-mono text-micro text-faint tabular-nums">
              {String(counts[kind]).padStart(2, "0")}
            </sup>
          </Link>
        );
      })}
    </nav>
  );
}
