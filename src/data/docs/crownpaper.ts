import type { DocsProject } from "./types";

export const crownpaper: DocsProject = {
  id: "crownpaper",
  name: "Crownpaper",
  summary: "The GPU wallpaper daemon for CrownOS and Wayland desktops.",
  repository: "https://github.com/Crown-OS/crownpaper",
  icon: "image",
  tabs: [
    {
      label: "Guides",
      template: "product",
      groups: [
        { title: "Get started", pages: ["introduction", "quickstart"] },
        { title: "Usage", pages: ["configuration"] },
      ],
    },
    {
      label: "API Reference",
      template: "api",
      groups: [
        { title: "Overview", pages: ["api"] },
        {
          title: "Protocol",
          pages: ["api/set", "api/preload", "api/ping", "api/changed"],
        },
      ],
    },
    {
      label: "Help Center",
      template: "help",
      groups: [
        { title: "Help Center", pages: ["help"] },
        { title: "Troubleshooting", pages: ["help/video-wallpapers"] },
      ],
    },
    {
      label: "Changelog",
      template: "changelog",
      groups: [{ title: "Releases", pages: ["changelog"] }],
    },
  ],
};
