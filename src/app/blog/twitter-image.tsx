import { blogCopy } from "@/data/blog";
import { site } from "@/data/site";
import { OG_SIZE } from "@/og/ogTheme";
import { pageOgImage } from "@/og/pageOgImage";

export const alt = `${site.name} ${blogCopy.metaTitle}`;
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamic = "force-static";

export default function TwitterImage() {
  return pageOgImage({
    eyebrow: site.name,
    title: blogCopy.metaTitle,
    subtitle: blogCopy.metaDescription,
  });
}
