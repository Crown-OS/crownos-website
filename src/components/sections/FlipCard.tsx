"use client";

import * as m from "motion/react-m";
import { type CSSProperties, type ReactNode, useState } from "react";
import { FEATURE_ICONS } from "@/components/feature-icons";
import { Magnetic } from "@/components/motion";
import { BeamBackdrop } from "@/components/ui";
import { Visual } from "@/components/visuals";
import type { Feature, IconKey } from "@/data/feature";

type FlipCardProps = Feature & { title: string; detail: string; delay: number };

const FLIP_SPRING = { type: "spring", stiffness: 110, damping: 17 } as const;
const FACE =
  "beam-surface squircle rounded-card col-start-1 row-start-1 flex flex-col items-center overflow-hidden px-6 pt-10 pb-6 text-center backface-hidden md:px-8 md:pt-12";

function FaceIntro({
  icon,
  title,
  children,
}: {
  icon?: IconKey;
  title: string;
  children: ReactNode;
}) {
  const Icon = icon && FEATURE_ICONS[icon];
  return (
    <div className="relative flex flex-col items-center">
      {Icon && (
        <span className="icon-tile-vivid squircle rounded-tile grid size-14 place-items-center">
          <Icon className="size-7" />
        </span>
      )}
      <h3 className="mt-8 text-balance text-title text-white text-trim">
        {title}
      </h3>
      <p className="mt-5 text-pretty font-normal text-lead text-white/70 leading-normal">
        {children}
      </p>
    </div>
  );
}

function FaceAction({
  label,
  onToggle,
}: {
  label: string;
  onToggle: () => void;
}) {
  return (
    <Magnetic pull={0.24} className="relative mt-6 inline-flex">
      <button
        type="button"
        onClick={onToggle}
        className="btn btn-secondary h-11 px-5 text-ui"
      >
        {label}
      </button>
    </Magnetic>
  );
}

function Face({
  hidden,
  back,
  children,
}: {
  hidden: boolean;
  back?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      aria-hidden={hidden}
      inert={hidden}
      data-spotlight
      className={`${FACE} ${back ? "rotate-y-180" : ""}`}
    >
      <BeamBackdrop />
      {children}
    </div>
  );
}

export function FlipCard({
  icon,
  title,
  description,
  detail,
  visual,
  tone,
  delay,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((current) => !current);

  return (
    <article
      data-reveal
      data-tone={tone}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
      className="beam-bezel squircle relative grid aspect-[4/5] w-full self-stretch perspective-[1800px] sm:aspect-[3/4] lg:aspect-[4/5]"
    >
      <m.div
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={FLIP_SPRING}
        className="relative grid transform-3d"
      >
        <Face hidden={flipped}>
          <FaceIntro icon={icon} title={title}>
            {description}
          </FaceIntro>
          <FaceAction label="Learn more" onToggle={toggle} />
          {visual && (
            <div className="relative mt-8 min-h-40 w-full flex-1 text-left">
              <div className="absolute inset-x-0 top-0">
                <Visual name={visual} />
              </div>
            </div>
          )}
        </Face>

        <div className="w-full squircle rounded-2xl h-44 bg-linear-to-b from-transparent to-black to-bg-neutral-800 absolute bottom-0"></div>
        <Face hidden={!flipped} back>
          <FaceIntro icon={icon} title={title}>
            {detail}
          </FaceIntro>
          <FaceAction label="Close" onToggle={toggle} />
        </Face>
      </m.div>
    </article>
  );
}
