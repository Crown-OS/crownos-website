"use client";

import { useState } from "react";
import {
  blogCopy,
  POST_CATEGORIES,
  POST_CATEGORY_IDS,
  type PostCategory,
  type PostMeta,
} from "@/data/blog";
import { PostCard } from "./PostCard";

type CategoryFilter = PostCategory | "all";

export function PostGrid({ posts }: { posts: readonly PostMeta[] }) {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const usedCategories = POST_CATEGORY_IDS.filter((category) =>
    posts.some((post) => post.category === category),
  );
  const tabs: { id: CategoryFilter; label: string }[] = [
    { id: "all", label: blogCopy.allCategories },
    ...usedCategories.map((category) => ({
      id: category,
      label: POST_CATEGORIES[category],
    })),
  ];
  const visiblePosts =
    filter === "all" ? posts : posts.filter((post) => post.category === filter);

  return (
    <div className="grid gap-12">
      <div
        role="tablist"
        aria-label="Filter posts by category"
        className="flex flex-wrap justify-center gap-x-2"
      >
        {tabs.map((tab) => {
          const isSelected = tab.id === filter;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setFilter(tab.id)}
              className={`cursor-pointer border-b px-4 pb-3.5 text-[1.0625rem] tracking-[-0.011em] transition-colors duration-300 ${isSelected ? "border-white text-white" : "border-transparent text-white/45 hover:text-white/80"}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
