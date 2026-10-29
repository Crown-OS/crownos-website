import type { ReactNode } from "react";

export function Frame({
  caption,
  children,
}: {
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="grid gap-3">
      <div className="squircle rounded-card border border-border bg-white/[0.02] p-2">
        <div className="squircle overflow-hidden rounded-tile [&_img]:w-full [&_img]:rounded-none">
          {children}
        </div>
      </div>
      {caption && (
        <figcaption className="text-center text-faint text-ui">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
