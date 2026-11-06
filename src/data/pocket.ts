import type { IconKey, VisualKey } from "./feature";

export type CatalogCount = "plugins";

export type PocketSize = "compact" | "tall" | "wide";

export type PocketValue = {
  label: string;
  prefix?: string;
  suffix?: string;
  value: string;
};

export type PocketReadout = Omit<PocketValue, "value"> &
  ({ value: string } | { count: CatalogCount });

export type PocketFeature = {
  icon: IconKey;
  title: string;
  description?: string;
  visual: VisualKey;
  readout: PocketReadout;
  action: { label: string; href: string };
};
