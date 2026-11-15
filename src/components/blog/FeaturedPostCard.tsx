import Link from "next/link";
import { blogCopy, formatPostDate, type PostMeta } from "@/data/blog";
import { PostCover } from "./PostCover";
import { PostTag } from "./PostTag";

export function FeaturedPostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative grid min-h-[31.5rem] overflow-hidden rounded-xl border border-white/8 bg-surface md:grid-cols-[1fr_1.1fr]"
    >
      <div className="relative z-1 flex flex-col gap-8 p-8 md:p-10">
        <span className="flex items-center gap-4">
          <PostTag category={post.category} />
          <span className="text-[0.875rem] text-white/70">
            {formatPostDate(post.date)}
          </span>
        </span>
        <h2 className="max-w-[16em] text-[2rem] leading-[1.1] font-medium tracking-[-0.025em] text-white md:text-[2.5rem]">
          {post.title}
        </h2>
        <p className="max-w-[32rem] text-[1rem] leading-[1.6] text-white/55">
          {post.description}
        </p>
        <span className="mt-auto text-[0.875rem] text-white underline underline-offset-4">
          {blogCopy.readMore}
        </span>
      </div>
      <PostCover
        seed={post.slug}
        className="min-h-64 md:mask-[linear-gradient(to_right,transparent,#000_35%)] transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-[1.02]"
      />
    </Link>
  );
}
