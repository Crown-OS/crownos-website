import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BookIcon,
  BrainIcon,
  CodeIcon,
  KeyIcon,
  PaletteIcon,
  PuzzleIcon,
  RefreshIcon,
  RocketIcon,
  ShieldCheckIcon,
  TerminalIcon,
} from "@/components/icons";
import { Footer, Navbar, SectionHeader } from "@/components/landing";
import pageStyles from "../page.module.css";
import sub from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Docs · Crowncrate OS",
  description:
    "Documentation for Crowncrate — install guide, configuration, AI runtime, ecosystem features and contributing.",
};

const sections = [
  {
    icon: RocketIcon,
    title: "Getting started",
    desc: "Flash the ISO, run the installer and reach your first desktop.",
    links: [
      "Install on bare metal",
      "Install in a virtual machine",
      "Dual-booting with another OS",
      "First boot checklist",
    ],
  },
  {
    icon: TerminalIcon,
    title: "The shell",
    desc: "Pacman, AUR, Flatpak — and what Crowncrate adds on top.",
    links: [
      "Package management",
      "The crowncrate CLI",
      "Service management",
      "Snapshots and rollback",
    ],
  },
  {
    icon: BrainIcon,
    title: "AI runtime",
    desc: "How the local model works, where prompts go and how to swap models.",
    links: [
      "Local-first principles",
      "Model selection",
      "Bridging to remote providers",
      "Smart shell reference",
    ],
  },
  {
    icon: RefreshIcon,
    title: "Ecosystem features",
    desc: "Set up Clipboard Sync, Camera Share, Call Bridge and the rest.",
    links: [
      "Pair your phone",
      "Configure Notification Sync",
      "Second Screen tuning",
      "Troubleshooting pairings",
    ],
  },
  {
    icon: PaletteIcon,
    title: "Theming",
    desc: "Themes, layouts, fonts — and how to author your own.",
    links: [
      "Monochrome variants",
      "Layout profiles",
      "Custom themes",
      "Iconography reference",
    ],
  },
  {
    icon: ShieldCheckIcon,
    title: "Privacy & security",
    desc: "Hardening notes, secure boot, signed builds and verification.",
    links: [
      "Verifying ISOs",
      "Secure boot setup",
      "Sandboxing applications",
      "Privacy defaults",
    ],
  },
  {
    icon: CodeIcon,
    title: "Contributing",
    desc: "How patches land, the release cadence, and code style.",
    links: [
      "Contributor workflow",
      "Code style",
      "Reviewing patches",
      "Release process",
    ],
  },
  {
    icon: PuzzleIcon,
    title: "Reference",
    desc: "API references for the SDK, plugins, and shell integrations.",
    links: [
      "Crowncrate SDK",
      "Plugin API",
      "Shell extensions",
      "Configuration schema",
    ],
  },
];

const tocLinks = sections.map((s) => s.title);

export default function DocsPage() {
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
            <BookIcon /> Documentation · v1.0
          </span>
          <h1 className={sub.pageTitle}>
            Learn Crowncrate, one calm page at a time.
          </h1>
          <p className={sub.pageDescription}>
            Concise, opinionated documentation for installing, configuring and
            extending Crowncrate. Every page links straight to the source.
          </p>
          <div className={sub.pageActions}>
            <a href="#getting-started" className={pageStyles.btnPrimary}>
              <RocketIcon /> Start with the basics
            </a>
            <Link href="/community" className={pageStyles.btnSecondary}>
              Ask the community
            </Link>
          </div>
        </section>

        <div className={sub.docsLayout}>
          <aside className={sub.docsToc}>
            <p className={sub.docsTocHeading}>Sections</p>
            {tocLinks.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                className={sub.docsTocLink}
              >
                {label}
              </a>
            ))}
          </aside>

          <div className={sub.section}>
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.title}
                  id={s.title.toLowerCase().replace(/\s+/g, "-")}
                  className={sub.card}
                >
                  <div className={sub.cardHeader}>
                    <div className={sub.iconBox}>
                      <Icon />
                    </div>
                    <h3 className={sub.cardTitle}>{s.title}</h3>
                  </div>
                  <p className={sub.cardDesc}>{s.desc}</p>
                  <div className={sub.docList}>
                    {s.links.map((link) => (
                      <Link key={link} href="/docs">
                        <ArrowRightIcon /> {link}
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <section className={sub.section}>
          <SectionHeader
            eyebrow="Cheatsheet"
            eyebrowIcon={KeyIcon}
            title="The five commands you'll use most."
            subtitle="A pocket reference for everyday Crowncrate work."
          />
          <pre className={sub.code}>
            <span className={sub.commentToken}># Update everything</span>
            {"\n"}
            <span className={sub.promptToken}>$</span> crowncrate sync
            {"\n\n"}
            <span className={sub.commentToken}>
              # Create a snapshot before a risky change
            </span>
            {"\n"}
            <span className={sub.promptToken}>$</span> crowncrate snapshot
            "before-experiment"
            {"\n\n"}
            <span className={sub.commentToken}>
              # Roll back to the previous snapshot
            </span>
            {"\n"}
            <span className={sub.promptToken}>$</span> crowncrate rollback
            {"\n\n"}
            <span className={sub.commentToken}>
              # Pair a new phone for ecosystem features
            </span>
            {"\n"}
            <span className={sub.promptToken}>$</span> crowncrate pair
            {"\n\n"}
            <span className={sub.commentToken}>
              # Ask the local AI a quick question
            </span>
            {"\n"}
            <span className={sub.promptToken}>$</span> crowncrate ask "free up
            disk on my dev partition"
          </pre>
        </section>

        <section className={sub.ctaBanner}>
          <h3>Looking for the API reference?</h3>
          <p>
            The SDK and plugin reference covers every public surface of
            Crowncrate, generated from source on every release.
          </p>
          <div className={sub.pageActions}>
            <Link href="/docs" className={pageStyles.btnPrimary}>
              <CodeIcon /> Open the SDK reference
            </Link>
            <Link href="/changelog" className={pageStyles.btnGhost}>
              See what changed <ArrowUpRightIcon />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
