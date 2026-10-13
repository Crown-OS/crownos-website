import type { Feature, SectionCopy } from "./feature";

export const trust = {
  heading: {
    title: "Your system answers to *you*",
    lead: "Power without giving up control. Every layer can be inspected, limited and undone.",
  },
  points: [
    {
      icon: "shield",
      title: "Plugins only touch what you allow",
      description:
        "Each plugin and agent declares the capabilities it needs: files, network, windows, devices. You approve them one by one and revoke any of them from Settings.",
    },
    {
      icon: "code",
      title: "Every line is open to read",
      description:
        "CrownOS is open source under the GPL. The compositor, CrownUI and every system app are public, so anyone can audit how they work.",
    },
    {
      icon: "link",
      title: "Your devices talk only to each other",
      description:
        "Crown Link pairs devices with keys that never leave them and encrypts every packet end to end. No account, no cloud relay.",
    },
    {
      icon: "rewind",
      title: "Any update can be undone",
      description:
        "A Btrfs snapshot is taken before every update and plugin install. If something breaks, roll back from the boot menu in seconds.",
    },
  ],
} as const satisfies { heading: SectionCopy; points: readonly Feature[] };
