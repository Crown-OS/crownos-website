import Link from "next/link";
import {
  ArrowRightIcon,
  BookIcon,
  DownloadIcon,
  PackageIcon,
  ShieldCheckIcon,
} from "../icons";
import { btnGhost, btnPrimary, btnSecondary } from "./styles";

export function DownloadSection() {
  return (
    <section
      id="download"
      className="relative isolate grid gap-5 overflow-hidden rounded-[2rem] border border-border bg-download p-[clamp(2rem,4vw,3rem)]"
    >
      <h2 className="max-w-[24ch] text-[clamp(1.75rem,3.4vw,2.75rem)] tracking-[-0.035em] text-gradient">
        Ready to run a calm, AI-ready Arch experience?
      </h2>
      <p className="max-w-[60ch] leading-[1.6] text-muted-strong">
        Get the latest CrownOS ISO and bring up a stable, beautifully tuned
        system in minutes. Verified builds, transparent source, no telemetry.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/download" className={btnPrimary}>
          <DownloadIcon /> Get CrownOS
        </Link>
        <Link href="/docs" className={btnSecondary}>
          <BookIcon /> Read Documentation
        </Link>
        <Link href="/changelog" className={btnGhost}>
          What's new <ArrowRightIcon />
        </Link>
      </div>
      <div className="mt-1 flex flex-wrap gap-4 font-mono text-[0.85rem] text-muted [&>span]:inline-flex [&>span]:items-center [&>span]:gap-[0.4rem] [&_svg]:size-[0.85rem]">
        <span>
          <PackageIcon /> v1.0 · 2.4 GB
        </span>
        <span>
          <ShieldCheckIcon /> SHA256 · GPG signed
        </span>
        <span>x86_64 · aarch64</span>
      </div>
    </section>
  );
}
