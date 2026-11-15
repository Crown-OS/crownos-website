"use client";

import { useState } from "react";
import type { TeamMember } from "@/data/team";
import { TeamBadgeBack } from "./TeamBadgeBack";
import { TeamBadgeFront } from "./TeamBadgeFront";

type TeamBadgeProps = {
  member: TeamMember;
};

export function TeamBadge({ member }: TeamBadgeProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const toggleFlip = () => setIsFlipped((flipped) => !flipped);
  return (
    <div
      className="relative transform-3d [transition:transform_0.9s_var(--ease-out-expo)] data-[flipped=true]:[transform:rotateY(180deg)] motion-reduce:[transition:none]"
      data-flipped={isFlipped}
    >
      <TeamBadgeFront
        member={member}
        isHidden={isFlipped}
        onFlip={toggleFlip}
      />
      <TeamBadgeBack
        member={member}
        isHidden={!isFlipped}
        onFlip={toggleFlip}
      />
    </div>
  );
}
