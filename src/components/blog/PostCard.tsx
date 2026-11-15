import Link from "next/link";
import { formatPostDate, type PostMeta } from "@/data/blog";
import { AuthorLine } from "./AuthorLine";
import { PostCover } from "./PostCover";
import { PostTag } from "./PostTag";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid h-full grid-rows-[auto_auto_1fr_auto] gap-4 rounded-xl border border-white/8 bg-surface p-4 transition-colors duration-300 hover:border-white/20"
    >
      <div className="relative">
        <PostCover
          seed={post.slug}
          className="aspect-[17/12] rounded-lg transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-[1.02]"
        />
        <span className="absolute top-5 left-5">
          <PostTag category={post.category} />
        </span>
      </div>
      <span className="pt-2 text-[0.8125rem] text-white/45">
        {formatPostDate(post.date)}
      </span>
      <h3 className="text-[1.375rem] leading-[1.25] font-medium tracking-[-0.02em] text-white">
        {post.title}
      </h3>
      <AuthorLine
        authorId={post.author}
        className="pt-6 text-[0.8125rem] text-white/70"
      />
    </Link>
  );
}
