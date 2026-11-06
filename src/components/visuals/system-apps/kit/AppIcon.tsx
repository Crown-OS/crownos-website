import type { CSSProperties } from "react";
import type { SystemApp, SystemAppId } from "@/data/system-apps/stack";
import { FilesAppIcon } from "./FilesAppIcon";
import { Icon } from "./Icon";
import { StoreAppIcon } from "./StoreAppIcon";

const APP_ARTWORK: Partial<
  Record<SystemAppId, (props: { size: number }) => React.JSX.Element>
> = { files: FilesAppIcon, store: StoreAppIcon };

export function AppIcon({ app, size }: { app: SystemApp; size: number }) {
  const Artwork = APP_ARTWORK[app.id];
  if (Artwork) return <Artwork size={size} />;
  return (
    <span
      className="app-icon-tile grid shrink-0 place-items-center rounded-[24%]"
      style={{ "--tint": app.tint, width: size, height: size } as CSSProperties}
    >
      <Icon name={app.glyph} size={Math.round(size * 0.56)} stroke={1.7} />
    </span>
  );
}
