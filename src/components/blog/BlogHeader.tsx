import { Eyebrow } from "@/components/catalog/CatalogHeader";
import { ShaderCanvas, SplitLetters } from "@/components/motion";
import { blogCopy } from "@/data/blog";
import { TOPOGRAPHY_SHADER } from "@/shaders/topography";

const TOPOGRAPHY_RESOLUTION = 0.75;

export function BlogHeader({ count }: { count: number }) {
  return (
    <header className="relative isolate overflow-clip">
      <div aria-hidden className="fade-y absolute inset-0 -z-10 opacity-90">
        <ShaderCanvas
          fragment={TOPOGRAPHY_SHADER}
          resolutionScale={TOPOGRAPHY_RESOLUTION}
        />
      </div>
      <div className="mx-auto grid w-full max-w-[90rem] gap-12 px-gutter pt-32 pb-16 md:gap-16 md:pt-48 md:pb-24">
        <Eyebrow>({blogCopy.eyebrow}) · CrownOS Blog</Eyebrow>
        <div className="flex items-start gap-3 md:gap-6">
          <SplitLetters
            lines={blogCopy.title}
            className="font-display text-mega text-trim"
          />
          <span className="font-mono text-lead text-muted tabular-nums">
            ({String(count).padStart(2, "0")})
          </span>
        </div>
        <p
          data-reveal
          className="max-w-md text-balance font-inter font-normal text-lead text-muted leading-normal"
        >
          {blogCopy.lead}
        </p>
      </div>
    </header>
  );
}
