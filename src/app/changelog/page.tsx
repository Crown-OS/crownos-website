import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
  DownloadIcon,
  FlameIcon,
  PackageIcon,
  PlusIcon,
  RocketIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "@/components/icons";
import {
  btnGhost,
  btnPrimary,
  btnSecondary,
  cardDesc,
  cardGrid3,
  cardTitle,
  ctaBanner,
  ctaBannerHeading,
  ctaBannerText,
  Footer,
  iconBox,
  Navbar,
  pageActions,
  pageBadge,
  pageDescription,
  pageHero,
  pageOrbA,
  pageOrbB,
  pageOrbsWrap,
  pageTitle,
  SectionHeader,
  section,
  subCard,
} from "@/components/landing";

export const metadata: Metadata = {
  title: "Changelog · CrownOS",
  description: "Release notes, breaking changes and roadmap for CrownOS.",
};

const releases = [
  {
    tag: "v1.0",
    date: "2026-04-22",
    title: "CrownOS goes stable",
    highlights: [
      "Stable release of the monochromatic desktop and ecosystem stack.",
      "Local AI runtime with on-device assist enabled by default.",
      "Atomic btrfs snapshots wired into the bootloader for one-click rollback.",
      "GPG-signed reproducible builds across all editions.",
    ],
  },
  {
    tag: "v0.9",
    date: "2026-03-04",
    title: "Ecosystem RC",
    highlights: [
      "All eight ecosystem features (Clipboard, Camera, Call Bridge…) shipped.",
      "Smart shell promoted out of preview.",
      "Hardened compositor with adaptive refresh.",
      "Reduced cold boot to under 5 seconds on reference hardware.",
    ],
  },
  {
    tag: "v0.8",
    date: "2026-01-18",
    title: "Performance pass",
    highlights: [
      "BORE-EEVDF scheduler tuned for foreground apps.",
      "Composited shell switched to Wayland-only.",
      "Pacman cache cleanup integrated into the system upgrade flow.",
    ],
  },
  {
    tag: "v0.7",
    date: "2025-11-30",
    title: "Theming & layouts",
    highlights: [
      "Light, dark and high-contrast monochrome variants.",
      "Three layout profiles: tiling, floating, stage.",
      "Iconography refreshed to a consistent stroke style.",
    ],
  },
  {
    tag: "v0.6",
    date: "2025-09-12",
    title: "First public preview",
    highlights: [
      "Initial public preview built on the Arch base.",
      "CrownOS CLI scaffolded with sync, snapshot and rollback subcommands.",
      "Documentation site launched.",
    ],
  },
];

const upcoming = [
  {
    icon: ZapIcon,
    title: "v1.1 · Performance polish",
    desc: "Latency improvements for input-to-pixel under heavy IO and a new io_uring-backed file manager.",
  },
  {
    icon: ShieldCheckIcon,
    title: "v1.2 · Verified boot",
    desc: "Optional secure boot keys ship out of the box, with one-command enrollment.",
  },
  {
    icon: RocketIcon,
    title: "v2.0 · Multi-device pairing",
    desc: "Pair an unlimited number of devices and route calls, files and notifications between any of them.",
  },
];

export default function ChangelogPage() {
  return (
    <div className="relative z-[1] mx-auto w-[min(1200px,100%-3rem)] pt-[5rem] pb-12 max-[720px]:w-[min(1200px,100%-1.25rem)] max-[720px]:pt-[4.5rem]">
      <Navbar />

      <main className="grid gap-[clamp(5rem,11vw,9rem)] pt-[clamp(3rem,8vw,6rem)]">
        <section className={pageHero}>
          <div aria-hidden className={pageOrbsWrap}>
            <span className={pageOrbA} />
            <span className={pageOrbB} />
          </div>
          <span className={pageBadge}>
            <PackageIcon /> Changelog · 5 releases
          </span>
          <h1 className={pageTitle}>Every change, in plain language.</h1>
          <p className={pageDescription}>
            We ship small, predictable updates and write them up the way we'd
            want them written. No marketing fluff — just what changed.
          </p>
          <div className={pageActions}>
            <Link href="/download" className={btnPrimary}>
              <DownloadIcon /> Get the latest
            </Link>
            <a href="/feed.xml" className={btnSecondary}>
              Subscribe via RSS
            </a>
          </div>
        </section>

        <section className={section}>
          <SectionHeader
            eyebrow="Releases"
            eyebrowIcon={PackageIcon}
            title="Release history."
            subtitle="Each release is GPG signed, snapshot-rollback ready and reproducible from source."
          />
          <div className="relative grid gap-4">
            {releases.map((r) => (
              <article
                key={r.tag}
                className="relative isolate grid gap-3 overflow-hidden rounded-2xl border border-border bg-card p-6"
              >
                <header className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="flex items-center gap-[0.6rem]">
                    <span className="inline-flex items-center gap-[0.4rem] rounded-full border border-border bg-[color-mix(in_srgb,var(--color-foreground)_4%,transparent)] px-[0.6rem] py-[0.2rem] font-mono text-[0.8rem] text-muted-strong">
                      {r.tag}
                    </span>
                    <h3 className="text-[1.2rem] tracking-[-0.025em]">
                      {r.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[0.85rem] text-muted">
                    {r.date}
                  </span>
                </header>
                <ul className="grid gap-[0.55rem] text-[0.95rem] leading-[1.6] text-muted-strong">
                  {r.highlights.map((h) => (
                    <li
                      key={h}
                      className="grid list-none grid-cols-[1.1rem_1fr] items-start gap-[0.65rem] [&>svg]:mt-[0.2rem] [&>svg]:size-4 [&>svg]:text-muted-strong"
                    >
                      <CheckIcon />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={section}>
          <SectionHeader
            eyebrow="Roadmap"
            eyebrowIcon={FlameIcon}
            title="What's coming next."
            subtitle="Roadmap items in active development. Dates are intentionally absent — we ship when ready."
          />
          <div className={cardGrid3}>
            {upcoming.map((u) => {
              const Icon = u.icon;
              return (
                <article key={u.title} className={subCard}>
                  <div className={iconBox}>
                    <Icon />
                  </div>
                  <h3 className={cardTitle}>{u.title}</h3>
                  <p className={cardDesc}>{u.desc}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={ctaBanner}>
          <h3 className={ctaBannerHeading}>Have a feature in mind?</h3>
          <p className={ctaBannerText}>
            Open a discussion on GitHub or drop in on Discord. The roadmap is
            shaped by the community — every well-argued issue has a chance.
          </p>
          <div className={pageActions}>
            <Link href="/community" className={btnPrimary}>
              <PlusIcon /> Suggest a feature
            </Link>
            <Link href="/features" className={btnGhost}>
              See what already ships <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
