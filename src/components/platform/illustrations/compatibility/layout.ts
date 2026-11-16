import type { OperatingSystemId } from "@/components/icons/OperatingSystemIcon";

type Box = { x: number; y: number; width: number; height: number };

export type AppWindowSpec = {
  id: "paint" | "chat";
  origin: OperatingSystemId;
  packageExtension: string;
  box: Box;
  dockIndex: number;
  launchDelaySeconds: number;
};

export type IconArtwork = "disc" | "tile";

export type DockApp = {
  id: string;
  name: string;
  artwork: IconArtwork;
  backing?: string;
  artworkScale?: number;
};

const APP_ICON_PATH = "/platform/app-icons/v4";

export const appIconSource = ({ id }: DockApp) => `${APP_ICON_PATH}/${id}.avif`;

export const DOCK_APPS: readonly DockApp[] = [
  { id: "files", name: "Files", artwork: "disc" },
  { id: "chrome", name: "Google Chrome", artwork: "disc" },
  { id: "kitty", name: "Kitty", artwork: "disc" },
  {
    id: "affinity",
    name: "Affinity",
    artwork: "tile",
    backing: "#8ff261",
    artworkScale: 0.78,
  },
  { id: "whatsapp", name: "WhatsApp", artwork: "disc" },
  { id: "settings", name: "Settings", artwork: "disc" },
];

const STAGE_WIDTH = 400;
const DOCK_TOP = 230;
const DOCK_TILE = 38;
const DOCK_GAP = 7;
const DOCK_PADDING = 7;

export const DOCK_BOX: Box = (() => {
  const width =
    DOCK_APPS.length * DOCK_TILE +
    (DOCK_APPS.length - 1) * DOCK_GAP +
    DOCK_PADDING * 2;
  return {
    x: (STAGE_WIDTH - width) / 2,
    y: DOCK_TOP,
    width,
    height: DOCK_TILE + DOCK_PADDING * 2,
  };
})();

export const STAGE_HEIGHT = DOCK_BOX.y + DOCK_BOX.height + 12;

export const APP_WINDOWS: readonly AppWindowSpec[] = [
  {
    id: "paint",
    origin: "windows",
    packageExtension: ".exe",
    box: { x: 30, y: 56, width: 198, height: 136 },
    dockIndex: 3,
    launchDelaySeconds: 0,
  },
  {
    id: "chat",
    origin: "android",
    packageExtension: ".apk",
    box: { x: 240, y: 30, width: 126, height: 186 },
    dockIndex: 4,
    launchDelaySeconds: -5,
  },
];

export const designUnits = (value: number) => `calc(var(--u) * ${value})`;

export function boxStyle({ x, y, width, height }: Box) {
  return {
    left: designUnits(x),
    top: designUnits(y),
    width: designUnits(width),
    height: designUnits(height),
  };
}

export function launchOrigin({ box, dockIndex }: AppWindowSpec) {
  const tileCentreX =
    DOCK_BOX.x +
    DOCK_PADDING +
    dockIndex * (DOCK_TILE + DOCK_GAP) +
    DOCK_TILE / 2;
  const tileCentreY = DOCK_BOX.y + DOCK_BOX.height / 2;
  const percentX = ((tileCentreX - box.x) / box.width) * 100;
  const percentY = ((tileCentreY - box.y) / box.height) * 100;
  return `${percentX.toFixed(1)}% ${percentY.toFixed(1)}%`;
}
