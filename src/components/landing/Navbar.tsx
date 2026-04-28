"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import { ArrowRightIcon, CloseIcon, DownloadIcon, MenuIcon } from "../icons";

const navItems = [
  { label: "Features", href: "/features" },
  { label: "Ecosystem", href: "/#ecosystem" },
  { label: "Community", href: "/community" },
  { label: "Docs", href: "/docs" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <nav className={styles.nav} aria-label="Primary">
        <Link href="/" className={styles.navBrand} aria-label="Crowncrate home">
          <div className={styles.logo} aria-hidden />
          <span className={styles.brandName}>Crowncrate</span>
        </Link>

        <div className={styles.navLinks}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
          <Link href="/download" className={styles.navCta}>
            <DownloadIcon /> Download
          </Link>
        </div>

        <button
          type="button"
          className={styles.navMenuButton}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {open ? (
        <div className={styles.mobileMenu} role="dialog" aria-modal="true">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/download"
            onClick={() => setOpen(false)}
            className={styles.navCta}
            style={{ justifyContent: "center" }}
          >
            Download <ArrowRightIcon />
          </Link>
        </div>
      ) : null}
    </>
  );
}
