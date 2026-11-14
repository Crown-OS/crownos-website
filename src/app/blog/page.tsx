import type { Metadata } from "next";
import { BlogHeader, PostList } from "@/components/blog";
import { blogCopy } from "@/data/blog";
import { loadPosts } from "@/util/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: blogCopy.lead,
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await loadPosts();
  return (
    <>
      <BlogHeader count={posts.length} />
      <section
        aria-label="Posts"
        className="mx-auto w-full max-w-[90rem] px-gutter pb-section"
      >
        <PostList posts={posts.map(({ meta }) => meta)} />
      </section>
    </>
  );
}
