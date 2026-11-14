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
        {
          title: "Get started",
          pages: ["introduction", "quickstart", "tutorial", "why-crownui"],
        },
        {
          title: "Core concepts",
          pages: [
            "views",
            "state",
            "lists",
            "styling",
            "layout",
            "events",
            "animation",
          ],
        },
        {
          title: "Building apps",
          pages: [
            "windows",
            "async",
            "drawing",
            "clipboard-and-drag",
            "accessibility",
            "testing",
            "agents",
            "audio",
          ],
        },
        { title: "Extending", pages: ["custom-components"] },
        {
          title: "Reference",
          pages: ["naming", "errors", "contributing"],
        },
      ],
    },
    {
      label: "Kit",
      template: "product",
      groups: [
        {
          title: "CrownOS widgets",
          pages: [
            "kit",
            "kit-controls",
            "kit-inputs",
            "kit-feedback",
            "kit-layout",
            "kit-overlays",
          ],
        },
      ],
    },
    {
      label: "Architecture",
      template: "product",
      groups: [
        {
          title: "How CrownUI works",
          pages: [
            "architecture",
            "frame-pipeline",
            "reactivity",
            "rendering",
            "semantics",
            "backends",
            "performance",
          ],
        },
      ],
    },
    {
      label: "API Reference",
      template: "api",
      groups: [
        { title: "Overview", pages: ["api"] },
        {
          title: "Running apps",
          pages: [
            "api/run",
            "api/run-windows",
            "api/app-config",
            "api/layer-options",
          ],
        },
        {
          title: "State",
          pages: [
            "api/cx",
            "api/signal",
            "api/memo",
            "api/effect",
            "api/store",
            "api/bind",
            "api/provide",
          ],
        },
        {
          title: "Structure",
          pages: [
            "api/component",
            "api/show",
            "api/keyed",
            "api/for-each",
            "api/error-boundary",
          ],
        },
        {
          title: "Primitives",
          pages: [
            "api/stacks",
            "api/text",
            "api/button",
            "api/toggle",
            "api/text-field",
            "api/scroll-view",
            "api/lazy-list",
            "api/canvas",
            "api/image",
            "api/svg",
            "api/popover",
          ],
        },
        {
          title: "Modifiers",
          pages: [
            "api/styled",
            "api/variants",
            "api/listeners",
            "api/semantic",
          ],
        },
        {
          title: "Motion and kit",
          pages: ["api/spring-curve", "api/kit-theme"],
        },
        {
          title: "Testing and extending",
          pages: ["api/test-app", "api/kind", "api/draw-list"],
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
