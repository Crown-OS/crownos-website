import type { NavLink } from "./footer";

export const beta = {
  title: "A full desktop in under five minutes",
  lead: "Installs, configures and boots to a working desktop that runs in under 1.2 GB of memory.",
  cta: {
    label: "Try out beta",
    href: "https://github.com/Crown-OS/crownos-iso/releases",
  } satisfies NavLink,
} as const;
