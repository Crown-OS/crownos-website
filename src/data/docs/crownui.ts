import type { DocsProject } from "./types";

export const crownui: DocsProject = {
  id: "crownui",
  name: "CrownUI",
  summary: "The declarative Rust UI toolkit behind every CrownOS app.",
  repository: "https://github.com/Crown-OS/crownui",
  icon: "layers",
  tabs: [
    {
      label: "Guides",
      template: "product",
      groups: [
        { title: "Get started", pages: ["introduction", "quickstart"] },
        { title: "Core concepts", pages: ["state", "styling"] },
      ],
    },
    {
      label: "API Reference",
      template: "api",
      groups: [
        { title: "Overview", pages: ["api"] },
        { title: "Runtime", pages: ["api/run", "api/signal"] },
      ],
    },
    {
      label: "Changelog",
      template: "changelog",
      groups: [{ title: "Releases", pages: ["changelog"] }],
    },
  ],
};
