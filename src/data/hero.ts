import type { HorizonGlowGeometry } from "@/shaders/horizon-glow";

export const hero = {
  eyebrow: "Introducing",
  headline: ["CrownOS"],
  slogan: {
    lead: "An",
    emphasis: "agent native",
    trail: "desktop OS built on the CachyOS kernel",
  },
  laptop: {
    label: "A CrownOS laptop, open to the desktop, seen from the front",
    path: "/hero/crownbook-front/v1",
    widths: [800, 1280, 1850],
    size: { width: 1850, height: 1266 },
    viewportShare: 0.8,
    horizon: 0.3,
    glowCut: 0.5,
  },
  glow: { span: 1.3, above: 0.8, below: 0.3 } satisfies HorizonGlowGeometry,
} as const;
