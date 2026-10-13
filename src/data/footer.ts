export type NavLink = { label: string; href: string };

export const footer = {
  wordmark: "CrownOS",
  location: "Arch Linux · Rolling release",
  reach: ["Open source", "worldwide"],
  license: "GPL",
  copyright: "©2026 CrownOS, all rights reserved",
  columns: [
    [
      { label: "Features", href: "/features" },
      { label: "Download", href: "/download" },
    ],
    [
      { label: "Docs", href: "/docs" },
      { label: "Changelog", href: "/changelog" },
    ],
    [
      { label: "Community", href: "/community" },
      { label: "GitHub", href: "https://github.com" },
    ],
  ] satisfies NavLink[][],
} as const;
