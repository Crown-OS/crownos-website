import { POST_CATEGORIES, type PostCategory } from "@/data/blog";

export function PostTag({ category }: { category: PostCategory }) {
  return (
    <span className="inline-flex h-9 items-center rounded-full border border-white/10 bg-white/6 px-3.5 text-[0.8125rem] text-white/85 backdrop-blur-md">
      {POST_CATEGORIES[category]}
    </span>
  );
}
