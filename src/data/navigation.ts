import { latestIsoUrl } from "./download";
import type { NavLink } from "./footer";

export const primaryCta = {
  label: "Download",
  href: latestIsoUrl,
} satisfies NavLink;
