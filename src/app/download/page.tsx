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
import {
  archChip,
  btnPrimary,
  btnSecondary,
  cardDesc,
  cardGrid2,
  cardGrid3,
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
  title: "Download · CrownOS",
  description:
    "Download the latest CrownOS ISO. GPG-signed builds, mirrors close to you, and verified system images.",
};

const editions = [
  {
    name: "CrownOS Desktop",
    desc: "Full monochromatic desktop with the ecosystem stack pre-wired.",
    size: "2.4 GB",
    arch: "x86_64",
    icon: PackageIcon,
    primary: true,
  },
  {
    name: "CrownOS Minimal",
    desc: "Headless base with the kernel, scheduler and package tooling only.",
    size: "780 MB",
    arch: "x86_64",
    icon: TerminalIcon,
  },
  {
    name: "CrownOS ARM",
    desc: "Same desktop tuned for aarch64 hardware including dev boards.",
    size: "2.1 GB",
    arch: "aarch64",
    icon: CpuIcon,
  },
];

const mirrors = [
  { region: "Global CDN", host: "dl.crownos.org", speed: "Fastest" },
  { region: "Europe", host: "eu.mirror.crownos.org", speed: "Very fast" },
  {
    region: "North America",
    host: "na.mirror.crownos.org",
    speed: "Very fast",
  },
  { region: "Asia Pacific", host: "ap.mirror.crownos.org", speed: "Fast" },
  { region: "South America", host: "sa.mirror.crownos.org", speed: "Fast" },
];

const requirements = [
  "64-bit CPU (x86_64 or ARMv8) with 2 cores or more",
  "4 GB RAM minimum, 8 GB recommended for AI features",
  "20 GB free disk space (50 GB recommended)",
  "UEFI or BIOS firmware, optional secure boot support",
  "Wired or wireless network for first-time updates",
];

const reqItem =
  "grid grid-cols-[1.5rem_1fr] items-start gap-[0.6rem] text-muted-strong [&>svg]:mt-1 [&>svg]:size-4 [&>svg]:text-foreground";

export default function DownloadPage() {
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
            <DownloadIcon /> Latest release · v1.0
          </span>
          <h1 className={pageTitle}>Download CrownOS.</h1>
          <p className={pageDescription}>
            Choose the edition that matches your hardware. Every build is
            GPG-signed, reproducible from source and served from regional
            mirrors close to you.
          </p>
          <div className={pageActions}>
            <a href="#editions" className={btnPrimary}>
              <DownloadIcon /> Pick an edition
            </a>
            <a href="#verify" className={btnSecondary}>
              <ShieldCheckIcon /> Verify your ISO
            </a>
          </div>
        </section>

        <section id="editions" className={section}>
          <SectionHeader
            eyebrow="Editions"
            eyebrowIcon={PackageIcon}
            title="Three flavours, one Arch core."
            subtitle="All editions share the same CrownOS Core, scheduler and update pipeline."
          />
          <div className={cardGrid3}>
            {editions.map((ed) => {
              const Icon = ed.icon;
              return (
                <article key={ed.name} className={subCard}>
                  <div className={cardHeader}>
                    <div className={iconBox}>
                      <Icon />
                    </div>
                    <h3 className={cardTitle}>{ed.name}</h3>
                  </div>
                  <p className={cardDesc}>{ed.desc}</p>
                  <div className="mt-1 flex flex-wrap gap-[0.4rem]">
                    <span className={archChip}>{ed.arch}</span>
                    <span className={archChip}>{ed.size}</span>
                    <span className={archChip}>ISO + qcow2</span>
                  </div>
                  <div className={pageActions}>
                    <Link
                      href="/download"
                      className={ed.primary ? btnPrimary : btnSecondary}
                    >
                      <DownloadIcon /> Download
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className={section}>
          <SectionHeader
            eyebrow="Mirrors"
            eyebrowIcon={GlobeIcon}
            title="Pick the mirror closest to you."
            subtitle="Mirrors are operated by community partners and refreshed every 15 minutes."
          />
          <div className="grid gap-2 rounded-2xl border border-border bg-card p-3">
            {mirrors.map((m, idx) => (
              <div
                key={m.host}
                className={`grid grid-cols-[1.5fr_1fr_1fr_auto] items-center gap-4 rounded-md px-4 py-[0.85rem] text-[0.92rem] transition-[background] duration-150 hover:bg-[color-mix(in_srgb,var(--color-foreground)_4%,transparent)] max-[720px]:grid-cols-1 max-[720px]:gap-[0.4rem] ${idx < mirrors.length - 1 ? "border-b border-border" : ""}`}
              >
                <span>{m.region}</span>
                <span className="font-mono text-[0.85rem] text-muted">
                  {m.host}
                </span>
                <span className={archChip}>{m.speed}</span>
                <a
                  href={`https://${m.host}`}
                  className="inline-flex items-center gap-[0.35rem] rounded-full border border-border bg-[color-mix(in_srgb,var(--color-foreground)_4%,transparent)] px-[0.8rem] py-[0.4rem] text-[0.85rem] text-foreground transition-[border-color] duration-150 hover:border-[color-mix(in_srgb,var(--color-foreground)_35%,transparent)] hover:opacity-100 [&>svg]:size-[0.85rem]"
                >
                  Open <ArrowUpRightIcon />
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="verify" className={section}>
          <SectionHeader
            eyebrow="Verify"
            eyebrowIcon={ShieldCheckIcon}
            title="Make sure your ISO is the real thing."
            subtitle="Each release ships with SHA256 checksums and a GPG signature. Verify before you flash."
          />
          <pre className={code}>
            <span className={commentToken}>
              # 1. Verify the SHA256 checksum
            </span>
            {"\n"}
            <span className={promptToken}>$</span> sha256sum -c
            crownos-1.0-x86_64.iso.sha256
            {"\n\n"}
            <span className={commentToken}># 2. Verify the GPG signature</span>
            {"\n"}
            <span className={promptToken}>$</span> gpg --verify
            crownos-1.0-x86_64.iso.sig crownos-1.0-x86_64.iso
            {"\n\n"}
            <span className={commentToken}>
              # 3. (Optional) confirm reproducible build
            </span>
            {"\n"}
            <span className={promptToken}>$</span> crownos verify-build
            ./crownos-1.0-x86_64.iso
          </pre>
        </section>

        <section className={section}>
          <SectionHeader
            eyebrow="System requirements"
            eyebrowIcon={CpuIcon}
            title="What you need to run CrownOS."
          />
          <div className={cardGrid2}>
            <div className={subCard}>
              <h3 className={cardTitle}>Minimum</h3>
              <ul className="grid gap-[0.55rem]">
                {requirements.map((req) => (
                  <li key={req} className={reqItem}>
                    <CheckIcon />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={subCard}>
              <h3 className={cardTitle}>Recommended</h3>
              <ul className="grid gap-[0.55rem]">
                <li className={reqItem}>
                  <CheckIcon />
                  <span>4-core CPU with vector extensions for local AI</span>
                </li>
                <li className={reqItem}>
                  <CheckIcon />
                  <span>16 GB RAM for comfortable multitasking</span>
                </li>
                <li className={reqItem}>
                  <CheckIcon />
                  <span>NVMe storage for fastest atomic snapshots</span>
                </li>
                <li className={reqItem}>
                  <CheckIcon />
                  <span>
                    Discrete GPU (NVIDIA / AMD / Intel) for accelerated AI
                  </span>
                </li>
                <li className={reqItem}>
                  <CheckIcon />
                  <span>USB drive ≥ 8 GB for installer media</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className={ctaBanner}>
          <h3 className={ctaBannerHeading}>
            Need help getting CrownOS onto your machine?
          </h3>
          <p className={ctaBannerText}>
            The install guide walks you through preparing media, partitioning
            and the first boot — start to finish in under twenty minutes.
          </p>
          <div className={pageActions}>
            <Link href="/docs" className={btnPrimary}>
              Open install guide <ArrowRightIcon />
            </Link>
            <Link href="/community" className={btnSecondary}>
              Ask the community
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
