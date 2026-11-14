import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { AUTHORS, type PostMeta } from "@/data/blog";
import { formatLongDate } from "@/util/format-date";

export function PostList({ posts }: { posts: readonly PostMeta[] }) {
  return (
    <ul className="grid border-border border-t">
      {posts.map((post) => (
        <li key={post.slug} data-reveal className="border-border border-b">
          <Link
            href={`/blog/${post.slug}`}
            className="group grid gap-6 py-10 md:grid-cols-12 md:gap-6 md:py-14"
          >
            <p className="font-mono text-micro text-faint uppercase md:col-span-3">
              <time dateTime={post.date}>{formatLongDate(post.date)}</time>
              <span className="block pt-2">{post.tag}</span>
            </p>
            <div className="grid gap-4 md:col-span-7">
              <h2 className="text-balance font-display text-title text-trim transition-colors group-hover:text-foreground">
                {post.title}
              </h2>
              <p className="max-w-2xl text-pretty font-normal text-lead text-muted leading-normal">
                {post.description}
              </p>
              <p className="text-faint text-ui">{AUTHORS[post.author].name}</p>
            </div>
            <ArrowIcon className="hidden size-6 justify-self-end text-muted transition-transform duration-500 ease-out-expo group-hover:translate-x-1 md:col-span-2 md:block" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
