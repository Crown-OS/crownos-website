import { FeaturedPostCard } from "@/components/blog/FeaturedPostCard";
import { PostGrid } from "@/components/blog/PostGrid";
import { blogCopy } from "@/data/blog";
import { loadPostMetas } from "@/util/blog";
import { pageMetadata } from "@/util/page-metadata";

export const metadata = pageMetadata({
  title: blogCopy.metaTitle,
  description: blogCopy.metaDescription,
  path: "/blog",
});

export default async function BlogPage() {
  const [featuredPost, ...latestPosts] = await loadPostMetas();
  return (
    <div className="relative isolate mx-auto max-w-360 px-gutter pt-28 pb-24 md:pt-36">
      <span aria-hidden="true" className="blog-hero-grid" />
      <header className="relative grid justify-items-center gap-6 text-center">
        <span className="flex items-center gap-2.5 text-[1.0625rem] tracking-[-0.011em] text-muted md:text-lg">
          <span aria-hidden="true" className="size-1.5 bg-sweep-sky" />
          {blogCopy.eyebrow}
        </span>
        <h1 className="text-[3rem] leading-[1] font-medium tracking-[-0.045em] text-white md:text-[4.5rem]">
          {blogCopy.title}
        </h1>
      </header>
      {featuredPost && (
        <div className="mt-14">
          <FeaturedPostCard post={featuredPost} />
        </div>
      )}
      {latestPosts.length > 0 && (
        <section aria-labelledby="latest-title" className="mt-28 grid gap-12">
          <h2
            id="latest-title"
            className="text-center text-[2.5rem] font-medium tracking-[-0.03em] text-white"
          >
            {blogCopy.latest}
          </h2>
          <PostGrid posts={latestPosts} />
        </section>
      )}
    </div>
  );
}
