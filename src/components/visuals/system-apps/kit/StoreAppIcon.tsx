const STORE_ICON = "/showcase/app-icons/v1/store.svg";
const TILE_SHARE = 0.9;

export function StoreAppIcon({ size }: { size: number }) {
  const tile = Math.round(size * TILE_SHARE);
  return (
    <span
      className="grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
    >
      {/* biome-ignore lint/performance/noImgElement: static vector app icon from the Figma design */}
      <img
        src={STORE_ICON}
        alt=""
        width={tile}
        height={tile}
        draggable={false}
      />
    </span>
  );
}
