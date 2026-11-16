import { appIconSource, type DockApp, type IconArtwork } from "./layout";

const DISC_SHARE_OF_FRAME = 103 / 128;
const TILE_SHARE_OF_FRAME = 224 / 256;

const FRAME_PER_SLOT: Record<IconArtwork, number> = {
  disc: 1 / DISC_SHARE_OF_FRAME,
  tile: 1 / TILE_SHARE_OF_FRAME,
};

function frameStyle({ artwork, artworkScale = 1 }: DockApp) {
  const frameScale = FRAME_PER_SLOT[artwork] * artworkScale;
  const size = `${frameScale * 100}%`;
  return {
    inset: `${((frameScale - 1) / 2) * -100}%`,
    width: size,
    height: size,
  };
}

export function AppIcon({
  app,
  className,
}: {
  app: DockApp;
  className: string;
}) {
  return (
    <span
      style={{ backgroundColor: app.backing }}
      className={`relative block shrink-0 ${app.artwork === "tile" ? "overflow-hidden rounded-full" : ""} ${className}`}
    >
      {/* biome-ignore lint/performance/noImgElement: static export serves pre-encoded AVIF icons */}
      <img
        src={appIconSource(app)}
        alt=""
        width={128}
        height={128}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute max-w-none select-none"
        style={frameStyle(app)}
      />
    </span>
  );
}
