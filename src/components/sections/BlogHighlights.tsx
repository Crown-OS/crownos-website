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
      <header className="scroll-reveal px-gutter text-center">
        <h2
          id="blog-highlights-title"
          className="text-[2.25rem] leading-[1.1] font-medium tracking-[-0.025em] text-white md:text-5xl md:leading-[1.1]"
        >
          {blogHighlightCopy.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-[30em] text-balance text-lg leading-[1.5] tracking-[-0.011em] text-muted">
          {blogHighlightCopy.description}
        </p>
      </header>
      <div className="scroll-reveal mt-14">
        <HighlightCarousel posts={posts} />
      </div>
    </section>
  );
}
