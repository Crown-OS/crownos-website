import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostContents } from "@/components/blog/PostContents";
import { PostHeader } from "@/components/blog/PostHeader";
import { proseComponents } from "@/components/blog/proseComponents";
import { JsonLd } from "@/components/seo/JsonLd";
import { findAuthor, POST_CATEGORIES } from "@/data/blog";
import { postStructuredData } from "@/data/structured-data";
import { findPost, loadPosts } from "@/util/blog";
import { pageMetadata } from "@/util/page-metadata";

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
  const author = findAuthor(meta.author);
  return {
    ...pageMetadata({
      title: meta.title,
      description: meta.description,
      path: `/blog/${meta.slug}`,
      openGraph: {
        type: "article",
        publishedTime: meta.date,
        section: POST_CATEGORIES[meta.category],
        authors: author.links.portfolio ? [author.links.portfolio] : [],
      },
    }),
    authors: [{ name: author.name, url: author.links.portfolio }],
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = findPost(await loadPosts(), (await params).slug);
  if (!post) notFound();
  const { meta, headings, Content } = post;
  return (
    <article className="mx-auto max-w-360 px-gutter pt-10 pb-24">
      <JsonLd data={postStructuredData(meta)} />
      <PostHeader meta={meta} />
      <div className="grid gap-16 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-22 min-[1500px]:grid-cols-[1fr_minmax(0,44rem)_1fr] min-[1500px]:gap-12">
        <PostContents headings={headings} />
        <div className="min-w-0 min-[1500px]:col-start-2">
          <Content components={proseComponents} />
        </div>
      </div>
    </article>
  );
}
