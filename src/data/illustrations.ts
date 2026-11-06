export const ILLUSTRATIONS = {
  crownlink: {
    file: "crownlink-visual",
    width: 860,
    height: 430,
    alt: "A CrownOS laptop linked over a private network to a phone, a tablet and a remote server, sharing clipboard, notifications, files, calls and agents",
  },
  "migration-assistant": {
    file: "migration-assistant-visual",
    width: 860,
    height: 430,
    alt: "Files, dotfiles, app data and settings moving from an old computer through a checksum check into a CrownOS laptop, with installed apps mapped to Arch Linux packages",
  },
} as const satisfies Record<
  string,
  { file: string; width: number; height: number; alt: string }
>;

export type IllustrationName = keyof typeof ILLUSTRATIONS;

export const ILLUSTRATION_SOURCE_DIR = "assets-src/illustrations";
export const ILLUSTRATION_PUBLIC_DIR = "/showcase/illustrations/v1";
