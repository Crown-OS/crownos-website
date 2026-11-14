import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostArticle } from "@/components/blog";
import { proseComponents } from "@/components/docs/mdx/Prose";
import { AUTHORS } from "@/data/blog";
import { findPost, loadPosts } from "@/util/blog";

type PostPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await loadPosts();
  return posts.map(({ meta }) => ({ slug: meta.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = findPost(await loadPosts(), (await params).slug);
  if (!post) return {};
  const { meta } = post;
  return {
    title: meta.title,
    description: meta.description,
    authors: [{ name: AUTHORS[meta.author].name }],
    alternates: { canonical: `/blog/${meta.slug}` },
    openGraph: { type: "article", publishedTime: meta.date },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = findPost(await loadPosts(), (await params).slug);
  if (!post) notFound();
  const { meta, Content } = post;
  return (
    <PostArticle meta={meta}>
      <Content components={proseComponents} />
    </PostArticle>
  );
}
