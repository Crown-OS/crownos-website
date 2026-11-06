import { Children, Fragment, type ReactNode } from "react";

export function SectionSeam() {
  return <div aria-hidden className="section-seam" />;
}

export function SeamedSections({ children }: { children: ReactNode }) {
  return Children.toArray(children).map((section, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: sections are static and positional
    <Fragment key={index}>
      <SectionSeam />
      {section}
    </Fragment>
  ));
}
