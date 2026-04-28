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
import { Footer, Navbar, SectionHeader } from "@/components/landing";
import pageStyles from "../page.module.css";
import sub from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Changelog · Crowncrate OS",
  description: "Release notes, breaking changes and roadmap for Crowncrate OS.",
};

const releases = [
  {
    tag: "v1.0",
    date: "2026-04-22",
    title: "Crowncrate goes stable",
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
      "Crowncrate CLI scaffolded with sync, snapshot and rollback subcommands.",
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
    <div className={pageStyles.container}>
      <Navbar />

      <main className={pageStyles.main}>
        <section className={sub.pageHero}>
          <div className={sub.pageOrbs} aria-hidden>
            <span className={`${sub.pageOrb} ${sub.pageOrbA}`} />
            <span className={`${sub.pageOrb} ${sub.pageOrbB}`} />
          </div>
          <span className={sub.pageBadge}>
            <PackageIcon /> Changelog · 5 releases
          </span>
          <h1 className={sub.pageTitle}>Every change, in plain language.</h1>
          <p className={sub.pageDescription}>
            We ship small, predictable updates and write them up the way we'd
            want them written. No marketing fluff — just what changed.
          </p>
          <div className={sub.pageActions}>
            <Link href="/download" className={pageStyles.btnPrimary}>
              <DownloadIcon /> Get the latest
            </Link>
            <a href="/feed.xml" className={pageStyles.btnSecondary}>
              Subscribe via RSS
            </a>
          </div>
        </section>

        <section className={sub.section}>
          <SectionHeader
            eyebrow="Releases"
            eyebrowIcon={PackageIcon}
            title="Release history."
            subtitle="Each release is GPG signed, snapshot-rollback ready and reproducible from source."
          />
          <div className={sub.timeline}>
            {releases.map((r) => (
              <article key={r.tag} className={sub.release}>
                <header className={sub.releaseHeader}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                    }}
                  >
                    <span className={sub.releaseTag}>{r.tag}</span>
                    <h3 className={sub.releaseTitle}>{r.title}</h3>
                  </div>
                  <span className={sub.releaseDate}>{r.date}</span>
                </header>
                <ul className={sub.releaseBody}>
                  {r.highlights.map((h) => (
                    <li key={h}>
                      <CheckIcon />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={sub.section}>
          <SectionHeader
            eyebrow="Roadmap"
            eyebrowIcon={FlameIcon}
            title="What's coming next."
            subtitle="Roadmap items in active development. Dates are intentionally absent — we ship when ready."
          />
          <div className={sub.cardGrid3}>
            {upcoming.map((u) => {
              const Icon = u.icon;
              return (
                <article key={u.title} className={sub.card}>
                  <div className={sub.iconBox}>
                    <Icon />
                  </div>
                  <h3 className={sub.cardTitle}>{u.title}</h3>
                  <p className={sub.cardDesc}>{u.desc}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={sub.ctaBanner}>
          <h3>Have a feature in mind?</h3>
          <p>
            Open a discussion on GitHub or drop in on Discord. The roadmap is
            shaped by the community — every well-argued issue has a chance.
          </p>
          <div className={sub.pageActions}>
            <Link href="/community" className={pageStyles.btnPrimary}>
              <PlusIcon /> Suggest a feature
            </Link>
            <Link href="/features" className={pageStyles.btnGhost}>
              See what already ships <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
