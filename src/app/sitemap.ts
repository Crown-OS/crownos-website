import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { loadPostMetas } from "@/util/blog";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await loadPostMetas();
  const latestPostDate = posts[0]?.date;
  const absolute = (pathname: string) => new URL(pathname, site.url).toString();
  return [
    {
      url: absolute("/"),
      changeFrequency: "weekly",
      priority: 1,
      ...(latestPostDate && { lastModified: latestPostDate }),
    },
    {
      url: absolute("/blog"),
      changeFrequency: "weekly",
      priority: 0.8,
      ...(latestPostDate && { lastModified: latestPostDate }),
    },
    ...posts.map(({ slug, date }) => ({
      url: absolute(`/blog/${slug}`),
      lastModified: date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
