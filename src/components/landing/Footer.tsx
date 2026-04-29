import Link from "next/link";
import { DiscordIcon, GitHubIcon, RssIcon, TwitterIcon } from "../icons";

const productLinks = [
  { label: "Features", href: "/features" },
  { label: "Download", href: "/download" },
  { label: "Changelog", href: "/changelog" },
  { label: "Roadmap", href: "/changelog" },
];

const resourceLinks = [
  { label: "Documentation", href: "/docs" },
  { label: "Community", href: "/community" },
  { label: "Source", href: "https://github.com" },
  { label: "Status", href: "/" },
];

const companyLinks = [
  { label: "About", href: "/" },
  { label: "Manifesto", href: "/" },
  { label: "Privacy", href: "/" },
  { label: "License", href: "/" },
];

const socialClass =
  "inline-flex size-[2.1rem] items-center justify-center rounded-full border border-border text-muted-strong transition-[color,border-color] duration-150 hover:border-[color-mix(in_srgb,var(--color-foreground)_35%,transparent)] hover:text-foreground hover:opacity-100 [&>svg]:size-4";

const colHeading =
  "mb-1 text-[0.78rem] uppercase tracking-[0.16em] text-muted-strong";

const colLinkClass = "text-[0.93rem] text-muted hover:text-foreground";

function ColumnLinks({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="grid content-start gap-[0.6rem]">
      <p className={colHeading}>{heading}</p>
      {links.map((link) => (
        <Link key={link.label} href={link.href} className={colLinkClass}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative z-[1] mt-20 border-t border-border pt-10">
      <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] gap-8 max-[1024px]:grid-cols-2 max-[720px]:grid-cols-1">
        <div className="grid content-start gap-[0.65rem]">
          <div className="inline-flex items-center gap-[0.625rem]">
            <span className="relative inline-block size-6 overflow-hidden rounded-full logo-conic">
              <span className="absolute inset-1/4 rounded-full bg-background" />
            </span>
            <span className="font-semibold tracking-[-0.02em]">CrownOS</span>
          </div>
          <p className="max-w-[28ch] text-[0.92rem] text-muted">
            Monochrome UX. Open system. AI-ready Arch core, tuned for everyday
            speed.
          </p>
          <div className="mt-2 flex gap-[0.4rem]">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={socialClass}
            >
              <GitHubIcon />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
              className={socialClass}
            >
              <DiscordIcon />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className={socialClass}
            >
              <TwitterIcon />
            </a>
            <a href="/feed.xml" aria-label="RSS feed" className={socialClass}>
              <RssIcon />
            </a>
          </div>
        </div>

        <ColumnLinks heading="Product" links={productLinks} />
        <ColumnLinks heading="Resources" links={resourceLinks} />
        <ColumnLinks heading="Project" links={companyLinks} />
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-border py-5 text-[0.85rem] text-muted max-[720px]:flex-col max-[720px]:items-start max-[720px]:gap-2">
        <span>© {new Date().getFullYear()} CrownOS Project</span>
        <span>Built with care on Arch · GPL-3.0</span>
      </div>
    </footer>
  );
}
