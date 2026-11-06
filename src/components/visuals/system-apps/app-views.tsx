import type { ReactNode } from "react";
import type { SystemAppId } from "@/data/system-apps/stack";
import { SettingsWindow } from "../settings/SettingsWindow";
import { DisksApp } from "./apps/DisksApp";
import { FilesApp } from "./apps/FilesApp";
import { MonitorApp } from "./apps/MonitorApp";
import { RecorderApp } from "./apps/RecorderApp";
import { StoreApp } from "./apps/StoreApp";

export const APP_VIEWS = {
  files: <FilesApp />,
  settings: <SettingsWindow />,
  store: <StoreApp />,
  monitor: <MonitorApp />,
  disks: <DisksApp />,
  recorder: <RecorderApp />,
} as const satisfies Record<SystemAppId, ReactNode>;
