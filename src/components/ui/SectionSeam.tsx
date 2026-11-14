import { Children, Fragment, type ReactNode } from "react";

type SeamJoin = "both" | "below";

const FRAME_CORNERS = [
  "top-0 left-0",
  "top-0 left-full",
  "top-full left-0",
  "top-full left-full",
] as const;

export function SectionSeam({ join = "both" }: { join?: SeamJoin }) {
  return (
    <div aria-hidden className="section-seam" data-join={join}>
      <div className="seam-frame">
        {FRAME_CORNERS.map((corner) => (
          <span key={corner} className={`corner-mark ${corner}`} />
        ))}
      </div>
    </div>
  );
}

export function SeamedSections({ children }: { children: ReactNode }) {
  return Children.toArray(children).map((section, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: sections are static and positional
    <Fragment key={index}>
      <SectionSeam join={index === 0 ? "below" : "both"} />
      {section}
    </Fragment>
  ));
}
