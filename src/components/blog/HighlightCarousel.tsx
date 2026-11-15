"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { blogHighlightCopy, type PostMeta } from "@/data/blog";
import { HighlightSlide } from "./HighlightSlide";

const EDGE_TOLERANCE = 4;

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-6 ${direction === "left" ? "rotate-180" : ""}`}
    >
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function HighlightCarousel({ posts }: { posts: readonly PostMeta[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const updateEdges = () =>
      setEdges({
        atStart: track.scrollLeft <= EDGE_TOLERANCE,
        atEnd:
          track.scrollLeft + track.clientWidth >=
          track.scrollWidth - EDGE_TOLERANCE,
      });
    updateEdges();
    track.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      track.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const scrollByOneSlide = (direction: 1 | -1) => {
    const track = trackRef.current;
    const slide = track?.querySelector("li");
    if (!track || !slide) return;
    track.scrollBy({
      left: direction * (slide.getBoundingClientRect().width + 8),
      behavior: "smooth",
    });
  };

  return (
    <div className="grid gap-8">
      <div className="flex items-center justify-between px-gutter">
        <span className="flex gap-3">
          <button
            type="button"
            aria-label={blogHighlightCopy.previous}
            disabled={edges.atStart}
            onClick={() => scrollByOneSlide(-1)}
            className="btn btn-dark size-12 rounded-full disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label={blogHighlightCopy.next}
            disabled={edges.atEnd}
            onClick={() => scrollByOneSlide(1)}
            className="btn btn-dark size-12 rounded-full disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowIcon direction="right" />
          </button>
        </span>
        <ArrowButton href="/blog" variant="dark" arrow="right">
          {blogHighlightCopy.allPosts}
        </ArrowButton>
      </div>
      <ul
        ref={trackRef}
        className="flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory gap-2 overflow-x-auto scroll-px-(--spacing-gutter) px-gutter"
      >
        {posts.map((post, index) => (
          <li key={post.slug} className="flex">
            <HighlightSlide post={post} isFeatured={index === 0} />
          </li>
        ))}
      </ul>
    </div>
  );
}
