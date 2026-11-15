import type { HorizonGlowGeometry } from "@/shaders/horizon-glow";
import { discordInviteUrl } from "./community";
import { latestIsoUrl } from "./download";

export type NavLink = { label: string; href: string };
export type FooterColumn = { title: string; links: NavLink[] };

export const footer = {
  callToAction: {
    headline: "Install Now",
  },
  glow: { span: 3.6, above: 0.55, below: 0 } satisfies HorizonGlowGeometry,
  brand: {
    name: "CrownOS",
    description:
      "An open source, agent native desktop operating system built on Arch Linux. Light on memory, fast to install and in sync with your phone.",
  },
  location: "Arch Linux · Rolling release",
  reach: ["Open source", "worldwide"],
  license: "GPL",
  copyright: "© 2026 CrownOS | all rights reserved",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Benchmarks", href: "/#benchmarks" },
        { label: "Agents", href: "/#agent" },
        { label: "Platform", href: "/#platform" },
        { label: "CrownLink", href: "/#crownlink" },
        { label: "Download", href: latestIsoUrl },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Team", href: "/#team" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Discord", href: discordInviteUrl },
        { label: "GitHub", href: "https://github.com/Crown-OS" },
      ],
    },
  ] satisfies FooterColumn[],
} as const;
