import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  AuraNetIcon,
  BrainIcon,
  CanvasExtensionIcon,
  ContinuumBoardIcon,
  CpuIcon,
  CustomizabilityIcon,
  DatabaseIcon,
  DownloadIcon,
  EchoAlertsIcon,
  FilterIcon,
  GlassCastIcon,
  HeadphonesIcon,
  ImageIcon,
  LayoutIcon,
  LensLinkIcon,
  LinuxIcon,
  LockIcon,
  MonitorIcon,
  NexusCallIcon,
  PaletteIcon,
  PerformanceIcon,
  PuzzleIcon,
  QuantumDropIcon,
  RefreshIcon,
  RocketIcon,
  ServerIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  SparklesIcon,
  TabletIcon,
  TerminalIcon,
  WandIcon,
  ZapIcon,
} from "@/components/icons";
import {
  btnGhost,
  btnPrimary,
  btnSecondary,
  cardDesc,
  cardGrid4,
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
  title: "Features · CrownOS",
  description:
    "Every capability that ships with CrownOS — performance, AI, ecosystem sync, theming and security.",
};

const featureGroups = [
  {
    title: "Performance",
    icon: ZapIcon,
    eyebrow: "Speed",
    description:
      "Sub-frame input latency, lean services, and a kernel scheduler tuned for foreground work.",
    items: [
      {
        icon: CpuIcon,
        title: "Latency-tuned scheduler",
        desc: "Foreground apps get priority on the CPU and IO queue.",
      },
      {
        icon: ServerIcon,
        title: "Tiny init footprint",
        desc: "Boots to desktop in under 5 seconds on modern hardware.",
      },
      {
        icon: PerformanceIcon,
        title: "Frame-perfect compositor",
        desc: "Adaptive refresh and zero-tear by default.",
      },
      {
        icon: DatabaseIcon,
        title: "Atomic snapshots",
        desc: "Every upgrade creates a btrfs rollback point.",
      },
    ],
  },
  {
    title: "AI Native",
    icon: BrainIcon,
    eyebrow: "Intelligence",
    description:
      "Local-first AI threaded through the shell, file manager and search.",
    items: [
      {
        icon: WandIcon,
        title: "Native assist",
        desc: "On-device summary, rewrite and answer across any app.",
      },
      {
        icon: TerminalIcon,
        title: "Smart shell",
        desc: "Natural language commands compile to safe shell intent.",
      },
      {
        icon: ImageIcon,
        title: "Generative tooling",
        desc: "Image, audio and document workflows wired into the file manager.",
      },
      {
        icon: FilterIcon,
        title: "Semantic search",
        desc: "Spotlight that understands context, fully local.",
      },
    ],
  },
  {
    title: "Ecosystem",
    icon: RefreshIcon,
    eyebrow: "Continuity",
    description:
      "Eight ecosystem features that keep your phone, tablet and desktop in lockstep.",
    items: [
      {
        icon: ContinuumBoardIcon,
        title: "Clipboard Sync",
        desc: "Copy on phone, paste on desktop.",
      },
      {
        icon: LensLinkIcon,
        title: "Camera Share",
        desc: "Phone camera as a desktop webcam.",
      },
      {
        icon: GlassCastIcon,
        title: "Remote Phone Access",
        desc: "Low-latency mirroring for demos.",
      },
      {
        icon: QuantumDropIcon,
        title: "Quick File Sharing",
        desc: "Peer-to-peer, no accounts.",
      },
      {
        icon: EchoAlertsIcon,
        title: "Notification Sync",
        desc: "One unified notification surface.",
      },
      {
        icon: CanvasExtensionIcon,
        title: "Second Screen",
        desc: "Tablet as a responsive monitor.",
      },
      {
        icon: AuraNetIcon,
        title: "Instant Hotspot",
        desc: "One-tap encrypted hotspot.",
      },
      {
        icon: NexusCallIcon,
        title: "Call Bridge",
        desc: "Mobile calls on the desktop.",
      },
    ],
  },
  {
    title: "Customization",
    icon: PaletteIcon,
    eyebrow: "Make it yours",
    description:
      "Every layer is replaceable. The defaults are calm, the controls are deep.",
    items: [
      {
        icon: LayoutIcon,
        title: "Layout profiles",
        desc: "Switch between tiling, floating and stage layouts.",
      },
      {
        icon: PuzzleIcon,
        title: "Modular shell",
        desc: "Replace the panel, launcher or compositor entirely.",
      },
      {
        icon: PaletteIcon,
        title: "Monochrome theming",
        desc: "Light, dark and high-contrast variants.",
      },
      {
        icon: CustomizabilityIcon,
        title: "Declarative config",
        desc: "TOML profiles versioned in git.",
      },
    ],
  },
  {
    title: "Privacy & security",
    icon: LockIcon,
    eyebrow: "Trust",
    description:
      "CrownOS ships with strong defaults so you don't have to harden it yourself.",
    items: [
      {
        icon: ShieldCheckIcon,
        title: "Signed builds",
        desc: "Every release reproducible and GPG signed.",
      },
      {
        icon: LockIcon,
        title: "Sandboxed apps",
        desc: "Flatpak and bubblewrap by default.",
      },
      {
        icon: LinuxIcon,
        title: "Hardened kernel",
        desc: "KSPP options enabled out of the box.",
      },
      {
        icon: RocketIcon,
        title: "No telemetry",
        desc: "Zero outbound endpoints unless you opt in.",
      },
    ],
  },
  {
    title: "Devices",
    icon: MonitorIcon,
    eyebrow: "Hardware",
    description: "Tested on a wide range of laptops, desktops and ARM devices.",
    items: [
      {
        icon: MonitorIcon,
        title: "Desktops",
        desc: "x86_64 with NVIDIA, AMD and Intel GPUs.",
      },
      {
        icon: SmartphoneIcon,
        title: "Phones",
        desc: "Companion app for Android and iOS.",
      },
      {
        icon: TabletIcon,
        title: "Tablets",
        desc: "Touch-first second-screen mode.",
      },
      {
        icon: HeadphonesIcon,
        title: "Audio",
        desc: "Pro-audio low-latency stack ready by default.",
      },
    ],
  },
];

export default function FeaturesPage() {
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
            <SparklesIcon /> The full feature set
          </span>
          <h1 className={pageTitle}>
            Everything CrownOS ships with — without the bloat.
          </h1>
          <p className={pageDescription}>
            A curated, transparent feature set across performance, AI, the
            ecosystem stack, theming and security. No paywalls, no add-ons.
          </p>
          <div className={pageActions}>
            <Link href="/download" className={btnPrimary}>
              <DownloadIcon /> Try it now
            </Link>
            <Link href="/docs" className={btnSecondary}>
              Read the docs
            </Link>
          </div>
        </section>

        {featureGroups.map((group) => {
          const HeroIcon = group.icon;
          return (
            <section key={group.title} className={section}>
              <SectionHeader
                eyebrow={group.eyebrow}
                eyebrowIcon={HeroIcon}
                title={group.title}
                subtitle={group.description}
              />
              <div className={cardGrid4}>
                {group.items.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <article key={item.title} className={subCard}>
                      <div className={iconBox}>
                        <ItemIcon />
                      </div>
                      <h3 className={cardTitle}>{item.title}</h3>
                      <p className={cardDesc}>{item.desc}</p>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section className={ctaBanner}>
          <h3 className={ctaBannerHeading}>
            One ISO. Every feature. No hidden tier.
          </h3>
          <p className={ctaBannerText}>
            CrownOS ships every capability above in a single download. Nothing
            locked behind a paywall, nothing pinned to a specific cloud.
          </p>
          <div className={pageActions}>
            <Link href="/download" className={btnPrimary}>
              <DownloadIcon /> Download CrownOS
            </Link>
            <Link href="/community" className={btnGhost}>
              Talk to the community <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
