import type { NavLink } from "./footer";

export const beta = {
  status: "Beta release soon",
  title: "A full desktop in under five minutes",
  lead: "Installs, configures and boots to a working desktop that runs in under 1.2 GB of memory.",
  cta: { label: "Join the beta", href: "/download" } satisfies NavLink,
  platforms: "x86_64 first · ARM to follow",
} as const;
