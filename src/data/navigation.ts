import { latestIsoUrl } from "./download";
import type { NavLink } from "./footer";

export const primaryCta = {
  label: "Download ISO",
  href: latestIsoUrl,
} satisfies NavLink;
