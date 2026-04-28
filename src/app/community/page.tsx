import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BookIcon,
  CodeIcon,
  DiscordIcon,
  GitHubIcon,
  HeartIcon,
  MessageIcon,
  RssIcon,
  StarIcon,
  TwitterIcon,
  UsersIcon,
} from "@/components/icons";
import { Footer, Navbar, SectionHeader } from "@/components/landing";
import pageStyles from "../page.module.css";
import sub from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Community · Crowncrate OS",
  description:
    "Join the Crowncrate community on GitHub, Discord and beyond. Contribute, get help and shape the roadmap.",
};

const channels = [
  {
    icon: DiscordIcon,
    title: "Discord",
    desc: "Real-time chat with maintainers and 8k+ members across help, dev and ecosystem channels.",
    cta: "Join the server",
    href: "https://discord.com",
  },
  {
    icon: GitHubIcon,
    title: "GitHub",
    desc: "Source, issues and discussions. Every line of Crowncrate is open and reviewable.",
    cta: "Open the repo",
    href: "https://github.com",
  },
  {
    icon: TwitterIcon,
    title: "Twitter / X",
    desc: "Release notes, tips and the occasional design teardown.",
    cta: "Follow updates",
    href: "https://twitter.com",
  },
  {
    icon: RssIcon,
    title: "RSS / Atom",
    desc: "Plain-text feed of releases and blog posts. Privacy-friendly, zero tracking.",
    cta: "Subscribe",
    href: "/feed.xml",
  },
];

const stats = [
  { value: "12.4k", label: "GitHub stars" },
  { value: "8.2k", label: "Discord members" },
  { value: "320+", label: "contributors" },
  { value: "0", label: "telemetry endpoints" },
];

const ways = [
  {
    icon: CodeIcon,
    title: "Contribute code",
    desc: "Pick a good-first-issue, send a patch, ship a feature. Reviews are kind and fast.",
  },
  {
    icon: BookIcon,
    title: "Improve the docs",
    desc: "Spotted something unclear? Docs PRs are merged within 24 hours.",
  },
  {
    icon: MessageIcon,
    title: "Answer questions",
    desc: "Help the next person finding their way through Arch — every answer counts.",
  },
  {
    icon: HeartIcon,
    title: "Sponsor the project",
    desc: "Crowncrate is fully community-funded. Sponsoring keeps mirrors and signing infra running.",
  },
];

export default function CommunityPage() {
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
            <UsersIcon /> Community-built, since day one
          </span>
          <h1 className={sub.pageTitle}>
            A calm community around an opinionated OS.
          </h1>
          <p className={sub.pageDescription}>
            Crowncrate is built in the open by people who care about how their
            systems feel. Drop in, ask questions, ship a patch — every voice
            shapes the roadmap.
          </p>
          <div className={sub.pageActions}>
            <a
              href="https://discord.com"
              className={pageStyles.btnPrimary}
              target="_blank"
              rel="noreferrer"
            >
              <DiscordIcon /> Join Discord
            </a>
            <a
              href="https://github.com"
              className={pageStyles.btnSecondary}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon /> Star on GitHub
            </a>
          </div>
        </section>

        <section className={sub.section}>
          <div className={sub.statRow}>
            {stats.map((s) => (
              <div key={s.label} className={sub.statCard}>
                <span className={sub.statValue}>{s.value}</span>
                <span className={sub.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={sub.section}>
          <SectionHeader
            eyebrow="Channels"
            eyebrowIcon={MessageIcon}
            title="Where the community lives."
            subtitle="Pick the room that suits you. We're active across all of them."
          />
          <div className={sub.cardGrid2}>
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.title}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className={sub.card}
                >
                  <div className={sub.cardHeader}>
                    <div className={sub.iconBox}>
                      <Icon />
                    </div>
                    <h3 className={sub.cardTitle}>{c.title}</h3>
                  </div>
                  <p className={sub.cardDesc}>{c.desc}</p>
                  <span
                    className={pageStyles.btnGhost}
                    style={{ width: "fit-content", padding: "0.5rem 0" }}
                  >
                    {c.cta} <ArrowUpRightIcon />
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        <section className={sub.section}>
          <SectionHeader
            eyebrow="Get involved"
            eyebrowIcon={StarIcon}
            title="Four ways to make Crowncrate better."
            subtitle="Code is one of many. Documentation, support and sponsorship matter just as much."
          />
          <div className={sub.cardGrid4}>
            {ways.map((w) => {
              const Icon = w.icon;
              return (
                <article key={w.title} className={sub.card}>
                  <div className={sub.iconBox}>
                    <Icon />
                  </div>
                  <h3 className={sub.cardTitle}>{w.title}</h3>
                  <p className={sub.cardDesc}>{w.desc}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={sub.ctaBanner}>
          <h3>Read the contributor guide before sending your first PR.</h3>
          <p>
            We keep things friendly: small PRs, tight scopes, kind reviews. The
            contributor guide covers the workflow, code style and the release
            cadence.
          </p>
          <div className={sub.pageActions}>
            <Link href="/docs" className={pageStyles.btnPrimary}>
              Open contributor docs <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
