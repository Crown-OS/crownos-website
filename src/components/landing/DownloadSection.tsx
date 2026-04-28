import Link from "next/link";
import styles from "@/app/page.module.css";
import {
  ArrowRightIcon,
  BookIcon,
  DownloadIcon,
  PackageIcon,
  ShieldCheckIcon,
} from "../icons";

export function DownloadSection() {
  return (
    <section id="download" className={styles.download}>
      <h2>Ready to run a calm, AI-ready Arch experience?</h2>
      <p>
        Get the latest Crowncrate ISO and bring up a stable, beautifully tuned
        system in minutes. Verified builds, transparent source, no telemetry.
      </p>
      <div className={styles.downloadActions}>
        <Link href="/download" className={styles.btnPrimary}>
          <DownloadIcon /> Get Crowncrate
        </Link>
        <Link href="/docs" className={styles.btnSecondary}>
          <BookIcon /> Read Documentation
        </Link>
        <Link href="/changelog" className={styles.btnGhost}>
          What's new <ArrowRightIcon />
        </Link>
      </div>
      <div className={styles.downloadMeta}>
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
