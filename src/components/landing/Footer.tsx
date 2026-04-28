import Link from "next/link";
import styles from "@/app/page.module.css";
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

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrandCol}>
          <div className={styles.navBrand}>
            <div className={styles.logo} aria-hidden />
            <span className={styles.brandName}>Crowncrate OS</span>
          </div>
          <p className={styles.footerText}>
            Monochrome UX. Open system. AI-ready Arch core, tuned for everyday
            speed.
          </p>
          <div className={styles.footerSocials}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className={styles.footerSocial}
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className={styles.footerSocial}
              aria-label="Discord"
            >
              <DiscordIcon />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className={styles.footerSocial}
              aria-label="Twitter"
            >
              <TwitterIcon />
            </a>
            <a
              href="/feed.xml"
              className={styles.footerSocial}
              aria-label="RSS feed"
            >
              <RssIcon />
            </a>
          </div>
        </div>

        <div className={styles.footerCol}>
          <p className={styles.footerHeading}>Product</p>
          {productLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.footerCol}>
          <p className={styles.footerHeading}>Resources</p>
          {resourceLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.footerCol}>
          <p className={styles.footerHeading}>Project</p>
          {companyLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} Crowncrate Project</span>
        <span>Built with care on Arch · GPL-3.0</span>
      </div>
    </footer>
  );
}
