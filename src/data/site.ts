import { discordInviteUrl } from "./community";
import { latestIsoUrl } from "./download";

export const site = {
  name: "CrownOS",
  url: "https://crownos.org",
  title: "CrownOS: the agent native desktop OS",
  description:
    "CrownOS is an open source, agent native desktop operating system built on Arch Linux and the CachyOS kernel. It installs in under five minutes and idles under 1.2 GB of memory.",
  locale: "en_US",
  keywords: [
    "CrownOS",
    "Linux distribution",
    "Arch Linux",
    "CachyOS kernel",
    "AI desktop",
    "agent native OS",
    "open source operating system",
    "Wayland compositor",
    "Linux desktop",
  ],
  repository: "https://github.com/Crown-OS",
  community: discordInviteUrl,
  download: latestIsoUrl,
  license: "https://www.gnu.org/licenses/gpl-3.0.html",
  creatorId: "rama-krishnan",
  ogAlt: "CrownOS, an agent native desktop OS built on the CachyOS kernel",
} as const;
