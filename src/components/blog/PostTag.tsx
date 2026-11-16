import { POST_CATEGORIES, type PostCategory } from "@/data/blog";

const TONE_CLASSES = {
  glass: "border-white/10 bg-white/6 text-white/85 backdrop-blur-md",
  solid: "border-transparent bg-white text-ink",
} as const;

type PostTagProps = {
  category: PostCategory;
  tone?: keyof typeof TONE_CLASSES;
};

export function PostTag({ category, tone = "glass" }: PostTagProps) {
  return (
    <span
      className={`inline-flex h-9 items-center rounded-full border px-3.5 text-[0.8125rem] ${TONE_CLASSES[tone]}`}
    >
      {POST_CATEGORIES[category]}
    </span>
  );
}
