"use client";

import { motion } from "motion/react";
import { type CSSProperties, type ReactNode, useState } from "react";
import { IconTile } from "@/components/ui";
import { Visual } from "@/components/visuals";
import type { Feature } from "@/data/feature";

type FlipCardProps = Feature & { detail: string; delay: number };

const FLIP_SPRING = { type: "spring", stiffness: 110, damping: 17 } as const;
const FACE =
  "glow squircle rounded-card absolute inset-0 flex flex-col gap-6 overflow-hidden p-6 backface-hidden md:p-8";

function FaceHeader({
  icon,
  action,
  onToggle,
}: Pick<Feature, "icon"> & { action: string; onToggle: () => void }) {
  return (
    <div className="flex items-start justify-between">
      {icon && <IconTile icon={icon} />}
      <button
        type="button"
        onClick={onToggle}
        className="h-11 rounded-full bg-white/12 px-5 text-ui transition-colors duration-300 hover:bg-white/20"
      >
        {action}
      </button>
    </div>
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
      className={`${FACE} ${back ? "rotate-y-180" : ""}`}
    >
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
      className="relative aspect-[4/5] perspective-[1800px] sm:aspect-[3/4] lg:aspect-[4/5]"
    >
      <motion.div
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={FLIP_SPRING}
        className="relative size-full transform-3d"
      >
        <Face hidden={flipped}>
          <FaceHeader icon={icon} action="Learn more" onToggle={toggle} />
          <div className="grid gap-4">
            <h3 className="text-balance text-title text-trim">{title}</h3>
            <p className="font-normal text-lead text-muted">{description}</p>
          </div>
          <div className="mt-auto border-border border-t pt-6">
            {visual && <Visual name={visual} />}
          </div>
        </Face>
        <Face hidden={!flipped} back>
          <FaceHeader icon={icon} action="Close" onToggle={toggle} />
          <h3 className="text-balance text-title text-trim">{title}</h3>
          <p className="font-normal text-lead text-muted-strong">{detail}</p>
        </Face>
      </motion.div>
    </article>
  );
}
