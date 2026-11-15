import Link from "next/link";
import { blogCopy, formatPostDate, type PostMeta } from "@/data/blog";
import { AuthorLine } from "./AuthorLine";
import { PostTag } from "./PostTag";

export function PostHeader({ meta }: { meta: PostMeta }) {
  return (
    <header className="post-header relative isolate pb-24 md:pb-32">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-[0.9375rem] text-white/80 transition-colors hover:text-white"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <path d="m15 6-6 6 6 6" />
        </svg>
        {blogCopy.backLabel}
      </Link>
      <div className="mx-auto mt-20 grid max-w-4xl justify-items-center gap-10 text-center">
        <PostTag category={meta.category} />
        <h1 className="text-[2.5rem] leading-[1.03] font-medium tracking-[-0.035em] text-white md:text-[4rem]">
          {meta.title}
        </h1>
        <span className="text-[0.9375rem] text-white/85">
          {blogCopy.published} {formatPostDate(meta.date)}
        </span>
        <AuthorLine
          authorId={meta.author}
          className="text-[1rem] text-white/70"
        />
      </div>
    </header>
  );
}
