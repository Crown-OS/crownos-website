import { site } from "@/data/site";
import { homeOgImage } from "@/og/homeOgImage";
import { OG_SIZE } from "@/og/ogTheme";

export const alt = site.ogAlt;
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export default function TwitterImage() {
  return homeOgImage();
}
