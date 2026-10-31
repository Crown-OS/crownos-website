import { latestIsoUrl } from "./download";
import type { NavLink } from "./footer";

export const beta = {
  title: "A full desktop in under five minutes",
  lead: "Installs, configures and boots to a working desktop that runs in under 1.2 GB of memory.",
  cta: {
    label: "Try out beta",
    href: latestIsoUrl,
  } satisfies NavLink,
} as const;
