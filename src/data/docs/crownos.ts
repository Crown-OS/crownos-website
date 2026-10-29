import type { DocsProject } from "./types";

export const crownos: DocsProject = {
  id: "crownos",
  name: "CrownOS",
  summary: "Install, configure and get help with the CrownOS desktop.",
  repository: "https://github.com/Crown-OS/crownos-iso",
  icon: "crown",
  tabs: [
    {
      label: "Guides",
      template: "product",
      groups: [
        { title: "Get started", pages: ["introduction", "installation"] },
        { title: "Desktop", pages: ["ecosystem", "configuration"] },
      ],
    },
    {
      label: "Help Center",
      template: "help",
      groups: [
        { title: "Help Center", pages: ["help"] },
        {
          title: "Everyday use",
          pages: ["help/update-system", "help/reset-desktop"],
        },
      ],
    },
    {
      label: "Changelog",
      template: "changelog",
      groups: [{ title: "Releases", pages: ["changelog"] }],
    },
  ],
};
