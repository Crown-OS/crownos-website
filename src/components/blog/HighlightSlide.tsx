import Link from "next/link";
import type { PostMeta } from "@/data/blog";
import { AuthorLine } from "./AuthorLine";
import { OutwardArrow } from "./OutwardArrow";
import { PostTag } from "./PostTag";

type HighlightSlideProps = { post: PostMeta; isFeatured: boolean };

const READING_TIME_LABEL = "Reading time";

export function HighlightSlide({ post, isFeatured }: HighlightSlideProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group relative isolate flex h-[35.5rem] snap-start flex-col overflow-hidden rounded-[2rem] border p-8 ${isFeatured ? "highlight-featured w-[min(43.5rem,88vw)] border-transparent" : "w-[min(31.75rem,82vw)] border-white/8 bg-surface hover:border-white/20"} shrink-0 transition-colors duration-300`}
    >
      <span className="flex items-start justify-between">
        <PostTag category={post.category} tone="solid" />
        <OutwardArrow tone={isFeatured ? "solid" : "quiet"} />
      </span>
      <h3
        className={`mt-9 tracking-[-0.02em] text-white ${isFeatured ? "max-w-[18em] text-[1.875rem] leading-[1.15] font-medium" : "text-[1.5rem] leading-[1.3]"}`}
      >
        {post.title}
      </h3>
      {isFeatured ? (
        <div className="mt-8 grid gap-3 border-white/20 border-t pt-8">
          <span className="text-[2.75rem] leading-none font-medium tracking-[-0.03em] text-white">
            {post.readingMinutes} min
          </span>
          <span className="text-[1.0625rem] tracking-[-0.011em] text-white/75">
            {READING_TIME_LABEL}
          </span>
        </div>
      ) : (
        <p className="mt-5 line-clamp-4 text-[1rem] leading-[1.6] text-white/50">
          {post.description}
        </p>
      )}
      <AuthorLine
        authorId={post.author}
        className={`mt-auto text-[0.9375rem] ${isFeatured ? "text-white" : "text-white/75"}`}
      />
    </Link>
  );
}
