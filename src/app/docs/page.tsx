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
import {
  btnGhost,
  btnPrimary,
  btnSecondary,
  cardDesc,
  cardHeader,
  cardTitle,
  code,
  commentToken,
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
  promptToken,
  SectionHeader,
  section,
  subCard,
} from "@/components/landing";

export const metadata: Metadata = {
  title: "Docs · CrownOS",
  description:
    "Documentation for CrownOS — install guide, configuration, AI runtime, ecosystem features and contributing.",
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
    desc: "Pacman, AUR, Flatpak — and what CrownOS adds on top.",
    links: [
      "Package management",
      "The crownos CLI",
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
      "CrownOS SDK",
      "Plugin API",
      "Shell extensions",
      "Configuration schema",
    ],
  },
];

const tocLinks = sections.map((s) => s.title);

export default function DocsPage() {
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
            <BookIcon /> Documentation · v1.0
          </span>
          <h1 className={pageTitle}>Learn CrownOS, one calm page at a time.</h1>
          <p className={pageDescription}>
            Concise, opinionated documentation for installing, configuring and
            extending CrownOS. Every page links straight to the source.
          </p>
          <div className={pageActions}>
            <a href="#getting-started" className={btnPrimary}>
              <RocketIcon /> Start with the basics
            </a>
            <Link href="/community" className={btnSecondary}>
              Ask the community
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-[240px_1fr] items-start gap-8 max-[1024px]:grid-cols-1">
          <aside className="sticky top-24 grid gap-1 rounded-2xl border border-border bg-card p-4 max-[1024px]:static">
            <p className="px-2 pb-2 pt-1 text-[0.78rem] uppercase tracking-[0.16em] text-muted-strong">
              Sections
            </p>
            {tocLinks.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-md px-[0.6rem] py-[0.45rem] text-[0.92rem] text-muted transition-[color,background] duration-150 hover:bg-[color-mix(in_srgb,var(--color-foreground)_5%,transparent)] hover:text-foreground hover:opacity-100"
              >
                {label}
              </a>
            ))}
          </aside>

          <div className={section}>
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.title}
                  id={s.title.toLowerCase().replace(/\s+/g, "-")}
                  className={subCard}
                >
                  <div className={cardHeader}>
                    <div className={iconBox}>
                      <Icon />
                    </div>
                    <h3 className={cardTitle}>{s.title}</h3>
                  </div>
                  <p className={cardDesc}>{s.desc}</p>
                  <div className="mt-1 grid gap-[0.4rem]">
                    {s.links.map((link) => (
                      <Link
                        key={link}
                        href="/docs"
                        className="inline-flex items-center gap-2 text-[0.9rem] text-muted hover:text-foreground hover:opacity-100 [&>svg]:size-[0.85rem] [&>svg]:text-muted-strong"
                      >
                        <ArrowRightIcon /> {link}
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <section className={section}>
          <SectionHeader
            eyebrow="Cheatsheet"
            eyebrowIcon={KeyIcon}
            title="The five commands you'll use most."
            subtitle="A pocket reference for everyday CrownOS work."
          />
          <pre className={code}>
            <span className={commentToken}># Update everything</span>
            {"\n"}
            <span className={promptToken}>$</span> crownos sync
            {"\n\n"}
            <span className={commentToken}>
              # Create a snapshot before a risky change
            </span>
            {"\n"}
            <span className={promptToken}>$</span> crownos snapshot
            "before-experiment"
            {"\n\n"}
            <span className={commentToken}>
              # Roll back to the previous snapshot
            </span>
            {"\n"}
            <span className={promptToken}>$</span> crownos rollback
            {"\n\n"}
            <span className={commentToken}>
              # Pair a new phone for ecosystem features
            </span>
            {"\n"}
            <span className={promptToken}>$</span> crownos pair
            {"\n\n"}
            <span className={commentToken}>
              # Ask the local AI a quick question
            </span>
            {"\n"}
            <span className={promptToken}>$</span> crownos ask "free up disk on
            my dev partition"
          </pre>
        </section>

        <section className={ctaBanner}>
          <h3 className={ctaBannerHeading}>Looking for the API reference?</h3>
          <p className={ctaBannerText}>
            The SDK and plugin reference covers every public surface of CrownOS,
            generated from source on every release.
          </p>
          <div className={pageActions}>
            <Link href="/docs" className={btnPrimary}>
              <CodeIcon /> Open the SDK reference
            </Link>
            <Link href="/changelog" className={btnGhost}>
              See what changed <ArrowUpRightIcon />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
