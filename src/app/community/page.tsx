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
import {
  btnPrimary,
  btnSecondary,
  cardDesc,
  cardGrid2,
  cardGrid4,
  cardHeader,
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
  statCard,
  statLabel,
  statRow,
  statValue,
  subCard,
} from "@/components/landing";

export const metadata: Metadata = {
  title: "Community · CrownOS",
  description:
    "Join the CrownOS community on GitHub, Discord and beyond. Contribute, get help and shape the roadmap.",
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
    desc: "Source, issues and discussions. Every line of CrownOS is open and reviewable.",
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
    desc: "CrownOS is fully community-funded. Sponsoring keeps mirrors and signing infra running.",
  },
];

export default function CommunityPage() {
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
            <UsersIcon /> Community-built, since day one
          </span>
          <h1 className={pageTitle}>
            A calm community around an opinionated OS.
          </h1>
          <p className={pageDescription}>
            CrownOS is built in the open by people who care about how their
            systems feel. Drop in, ask questions, ship a patch — every voice
            shapes the roadmap.
          </p>
          <div className={pageActions}>
            <a
              href="https://discord.com"
              className={btnPrimary}
              target="_blank"
              rel="noreferrer"
            >
              <DiscordIcon /> Join Discord
            </a>
            <a
              href="https://github.com"
              className={btnSecondary}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon /> Star on GitHub
            </a>
          </div>
        </section>

        <section className={section}>
          <div className={statRow}>
            {stats.map((s) => (
              <div key={s.label} className={statCard}>
                <span className={statValue}>{s.value}</span>
                <span className={statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={section}>
          <SectionHeader
            eyebrow="Channels"
            eyebrowIcon={MessageIcon}
            title="Where the community lives."
            subtitle="Pick the room that suits you. We're active across all of them."
          />
          <div className={cardGrid2}>
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.title}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className={subCard}
                >
                  <div className={cardHeader}>
                    <div className={iconBox}>
                      <Icon />
                    </div>
                    <h3 className={cardTitle}>{c.title}</h3>
                  </div>
                  <p className={cardDesc}>{c.desc}</p>
                  <span className="inline-flex w-fit items-center gap-2 py-2 text-foreground hover:opacity-100 [&>svg]:size-4">
                    {c.cta} <ArrowUpRightIcon />
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        <section className={section}>
          <SectionHeader
            eyebrow="Get involved"
            eyebrowIcon={StarIcon}
            title="Four ways to make CrownOS better."
            subtitle="Code is one of many. Documentation, support and sponsorship matter just as much."
          />
          <div className={cardGrid4}>
            {ways.map((w) => {
              const Icon = w.icon;
              return (
                <article key={w.title} className={subCard}>
                  <div className={iconBox}>
                    <Icon />
                  </div>
                  <h3 className={cardTitle}>{w.title}</h3>
                  <p className={cardDesc}>{w.desc}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={ctaBanner}>
          <h3 className={ctaBannerHeading}>
            Read the contributor guide before sending your first PR.
          </h3>
          <p className={ctaBannerText}>
            We keep things friendly: small PRs, tight scopes, kind reviews. The
            contributor guide covers the workflow, code style and the release
            cadence.
          </p>
          <div className={pageActions}>
            <Link href="/docs" className={btnPrimary}>
              Open contributor docs <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
