import type { ThemePalette } from "@/data/catalog";

const SWATCH_ORDER: (keyof ThemePalette)[] = [
  "background",
  "surface",
  "text",
  "accent",
];

export function ThemeSwatches({ palette }: { palette: ThemePalette }) {
  return (
    <ul aria-label="Palette" className="flex -space-x-1.5">
      {SWATCH_ORDER.map((role) => (
        <li
          key={role}
          title={`${role} ${palette[role]}`}
          className="size-6 rounded-full border border-white/20 shadow-[0_0_0_2px_var(--color-background)]"
          style={{ background: palette[role] }}
        />
      ))}
    </ul>
  );
}
