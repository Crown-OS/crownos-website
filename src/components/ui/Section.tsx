import type { ReactNode } from "react";

type SectionProps = {
  labelledBy: string;
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ labelledBy, id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative mx-auto w-full max-w-[90rem] px-gutter py-24 md:py-32 ${className ?? ""}`}
    >
      {children}
    </section>
  );
}
