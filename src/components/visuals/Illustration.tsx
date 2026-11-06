import {
  ILLUSTRATION_PUBLIC_DIR,
  ILLUSTRATIONS,
  type IllustrationName,
} from "@/data/illustrations";

export function Illustration({ name }: { name: IllustrationName }) {
  const { file, width, height, alt } = ILLUSTRATIONS[name];
  return (
    // biome-ignore lint/performance/noImgElement: static export; vector art exported by scripts/export-illustrations.ts
    <img
      src={`${ILLUSTRATION_PUBLIC_DIR}/${file}.svg`}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="block h-auto w-full select-none"
    />
  );
}

export const illustrationOf = (name: IllustrationName) =>
  function NamedIllustration() {
    return <Illustration name={name} />;
  };
