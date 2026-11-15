import { type PortraitKind, portraitSources } from "@/util/portrait";

type PortraitImageProps = {
  basePath: string;
  kind: PortraitKind;
  sizes: string;
  className?: string;
};

export function PortraitImage({
  basePath,
  kind,
  sizes,
  className,
}: PortraitImageProps) {
  return (
    // biome-ignore lint/performance/noImgElement: static export serves pre-encoded size tiers
    <img
      {...portraitSources(basePath, kind)}
      sizes={sizes}
      alt=""
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}
