import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CpuIcon,
  DownloadIcon,
  GlobeIcon,
  PackageIcon,
  ShieldCheckIcon,
  TerminalIcon,
} from "@/components/icons";
import { Footer, Navbar, SectionHeader } from "@/components/landing";
import pageStyles from "../page.module.css";
import sub from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Download · Crowncrate OS",
  description:
    "Download the latest Crowncrate ISO. GPG-signed builds, mirrors close to you, and verified system images.",
};

const editions = [
  {
    name: "Crowncrate Desktop",
    desc: "Full monochromatic desktop with the ecosystem stack pre-wired.",
    size: "2.4 GB",
    arch: "x86_64",
    icon: PackageIcon,
    primary: true,
  },
  {
    name: "Crowncrate Minimal",
    desc: "Headless base with the kernel, scheduler and package tooling only.",
    size: "780 MB",
    arch: "x86_64",
    icon: TerminalIcon,
  },
  {
    name: "Crowncrate ARM",
    desc: "Same desktop tuned for aarch64 hardware including dev boards.",
    size: "2.1 GB",
    arch: "aarch64",
    icon: CpuIcon,
  },
];

const mirrors = [
  { region: "Global CDN", host: "dl.crowncrate.org", speed: "Fastest" },
  { region: "Europe", host: "eu.mirror.crowncrate.org", speed: "Very fast" },
  {
    region: "North America",
    host: "na.mirror.crowncrate.org",
    speed: "Very fast",
  },
  { region: "Asia Pacific", host: "ap.mirror.crowncrate.org", speed: "Fast" },
  { region: "South America", host: "sa.mirror.crowncrate.org", speed: "Fast" },
];

const requirements = [
  "64-bit CPU (x86_64 or ARMv8) with 2 cores or more",
  "4 GB RAM minimum, 8 GB recommended for AI features",
  "20 GB free disk space (50 GB recommended)",
  "UEFI or BIOS firmware, optional secure boot support",
  "Wired or wireless network for first-time updates",
];

export default function DownloadPage() {
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
            <DownloadIcon /> Latest release · v1.0
          </span>
          <h1 className={sub.pageTitle}>Download Crowncrate.</h1>
          <p className={sub.pageDescription}>
            Choose the edition that matches your hardware. Every build is
            GPG-signed, reproducible from source and served from regional
            mirrors close to you.
          </p>
          <div className={sub.pageActions}>
            <a href="#editions" className={pageStyles.btnPrimary}>
              <DownloadIcon /> Pick an edition
            </a>
            <a href="#verify" className={pageStyles.btnSecondary}>
              <ShieldCheckIcon /> Verify your ISO
            </a>
          </div>
        </section>

        <section id="editions" className={sub.section}>
          <SectionHeader
            eyebrow="Editions"
            eyebrowIcon={PackageIcon}
            title="Three flavours, one Arch core."
            subtitle="All editions share the same Crowncrate Core, scheduler and update pipeline."
          />
          <div className={sub.cardGrid3}>
            {editions.map((ed) => {
              const Icon = ed.icon;
              return (
                <article key={ed.name} className={sub.card}>
                  <div className={sub.cardHeader}>
                    <div className={sub.iconBox}>
                      <Icon />
                    </div>
                    <h3 className={sub.cardTitle}>{ed.name}</h3>
                  </div>
                  <p className={sub.cardDesc}>{ed.desc}</p>
                  <div className={pageStyles.archMeta}>
                    <span className={pageStyles.archChip}>{ed.arch}</span>
                    <span className={pageStyles.archChip}>{ed.size}</span>
                    <span className={pageStyles.archChip}>ISO + qcow2</span>
                  </div>
                  <div className={sub.pageActions}>
                    <Link
                      href="/download"
                      className={
                        ed.primary
                          ? pageStyles.btnPrimary
                          : pageStyles.btnSecondary
                      }
                    >
                      <DownloadIcon /> Download
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className={sub.section}>
          <SectionHeader
            eyebrow="Mirrors"
            eyebrowIcon={GlobeIcon}
            title="Pick the mirror closest to you."
            subtitle="Mirrors are operated by community partners and refreshed every 15 minutes."
          />
          <div className={sub.mirrorList}>
            {mirrors.map((m) => (
              <div key={m.host} className={sub.mirrorRow}>
                <span>{m.region}</span>
                <span className={sub.mirrorRegion}>{m.host}</span>
                <span className={pageStyles.archChip}>{m.speed}</span>
                <a href={`https://${m.host}`} className={sub.mirrorBtn}>
                  Open <ArrowUpRightIcon />
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="verify" className={sub.section}>
          <SectionHeader
            eyebrow="Verify"
            eyebrowIcon={ShieldCheckIcon}
            title="Make sure your ISO is the real thing."
            subtitle="Each release ships with SHA256 checksums and a GPG signature. Verify before you flash."
          />
          <pre className={sub.code}>
            <span className={sub.commentToken}>
              # 1. Verify the SHA256 checksum
            </span>
            {"\n"}
            <span className={sub.promptToken}>$</span> sha256sum -c
            crowncrate-1.0-x86_64.iso.sha256
            {"\n\n"}
            <span className={sub.commentToken}>
              # 2. Verify the GPG signature
            </span>
            {"\n"}
            <span className={sub.promptToken}>$</span> gpg --verify
            crowncrate-1.0-x86_64.iso.sig crowncrate-1.0-x86_64.iso
            {"\n\n"}
            <span className={sub.commentToken}>
              # 3. (Optional) confirm reproducible build
            </span>
            {"\n"}
            <span className={sub.promptToken}>$</span> crowncrate verify-build
            ./crowncrate-1.0-x86_64.iso
          </pre>
        </section>

        <section className={sub.section}>
          <SectionHeader
            eyebrow="System requirements"
            eyebrowIcon={CpuIcon}
            title="What you need to run Crowncrate."
          />
          <div className={sub.cardGrid2}>
            <div className={sub.card}>
              <h3 className={sub.cardTitle}>Minimum</h3>
              <ul className={sub.reqList}>
                {requirements.map((req) => (
                  <li key={req} className={sub.reqItem}>
                    <CheckIcon />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={sub.card}>
              <h3 className={sub.cardTitle}>Recommended</h3>
              <ul className={sub.reqList}>
                <li className={sub.reqItem}>
                  <CheckIcon />
                  <span>4-core CPU with vector extensions for local AI</span>
                </li>
                <li className={sub.reqItem}>
                  <CheckIcon />
                  <span>16 GB RAM for comfortable multitasking</span>
                </li>
                <li className={sub.reqItem}>
                  <CheckIcon />
                  <span>NVMe storage for fastest atomic snapshots</span>
                </li>
                <li className={sub.reqItem}>
                  <CheckIcon />
                  <span>
                    Discrete GPU (NVIDIA / AMD / Intel) for accelerated AI
                  </span>
                </li>
                <li className={sub.reqItem}>
                  <CheckIcon />
                  <span>USB drive ≥ 8 GB for installer media</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className={sub.ctaBanner}>
          <h3>Need help getting Crowncrate onto your machine?</h3>
          <p>
            The install guide walks you through preparing media, partitioning
            and the first boot — start to finish in under twenty minutes.
          </p>
          <div className={sub.pageActions}>
            <Link href="/docs" className={pageStyles.btnPrimary}>
              Open install guide <ArrowRightIcon />
            </Link>
            <Link href="/community" className={pageStyles.btnSecondary}>
              Ask the community
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
