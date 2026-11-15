import { HighlightCarousel } from "@/components/blog/HighlightCarousel";
import { blogHighlightCopy } from "@/data/blog";
import { loadPostMetas } from "@/util/blog";

export async function BlogHighlights() {
  const posts = await loadPostMetas();
  if (posts.length === 0) return null;
  return (
    <section
      aria-labelledby="blog-highlights-title"
      className="py-24 font-inter md:py-36"
    >
      <h2
        id="blog-highlights-title"
        className="scroll-reveal mx-auto max-w-[14em] px-gutter text-center text-[2.25rem] leading-[1.1] font-medium tracking-[-0.025em] text-white md:text-5xl md:leading-[1.1]"
      >
        {blogHighlightCopy.headline}
      </h2>
      <div className="scroll-reveal mt-16 md:mt-20">
        <HighlightCarousel posts={posts} />
      </div>
    </section>
  );
}
