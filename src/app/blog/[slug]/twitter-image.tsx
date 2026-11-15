import { notFound } from "next/navigation";
import { findAuthor, formatPostDate, POST_CATEGORIES } from "@/data/blog";
import { site } from "@/data/site";
import { OG_SIZE } from "@/og/ogTheme";
import { pageOgImage } from "@/og/pageOgImage";
import { findPost, loadPosts } from "@/util/blog";

export const alt = `${site.name} blog post`;
export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  const posts = await loadPosts();
  return posts.map(({ meta }) => ({ slug: meta.slug }));
}

export default async function TwitterImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = findPost(await loadPosts(), (await params).slug);
  if (!post) notFound();
  const { meta } = post;
  return pageOgImage({
    eyebrow: `${site.name} Blog · ${POST_CATEGORIES[meta.category]}`,
    title: meta.title,
    subtitle: `${findAuthor(meta.author).name} · ${formatPostDate(meta.date)} · ${meta.readingMinutes} min read`,
  });
}
