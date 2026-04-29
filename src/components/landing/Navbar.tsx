"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon, CloseIcon, DownloadIcon, MenuIcon } from "../icons";

const navItems = [
  { label: "Features", href: "/features" },
  { label: "Ecosystem", href: "/#ecosystem" },
  { label: "Community", href: "/community" },
  { label: "Docs", href: "/docs" },
];

const navLinkClass =
  "rounded-full px-3 py-[0.45rem] transition-[color,background] duration-150 hover:bg-[color-mix(in_srgb,var(--color-foreground)_6%,transparent)] hover:text-foreground hover:opacity-100";

const ctaClass =
  "inline-flex items-center gap-[0.4rem] rounded-full border border-[color-mix(in_srgb,var(--color-foreground)_20%,transparent)] bg-cta px-[0.95rem] py-[0.45rem] font-medium text-accent-fg shadow-glow-cta transition-[transform,box-shadow] duration-150 hover:-translate-y-px hover:opacity-100";

const brandLogo = (
  <span className="relative inline-block size-6 overflow-hidden rounded-full logo-conic">
    <span className="absolute inset-1/4 rounded-full bg-background" />
  </span>
);

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
      <nav
        aria-label="Primary"
        className="fixed top-4 left-1/2 z-50 flex w-[min(1200px,100%-3rem)] -translate-x-1/2 items-center justify-between gap-4 rounded-full border border-[color-mix(in_srgb,var(--color-foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--color-background)_45%,transparent)] py-[0.6rem] pr-[0.6rem] pl-4 shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--color-foreground)_6%,transparent),0_18px_48px_-18px_rgba(0,0,0,0.65)] backdrop-blur-[40px] backdrop-saturate-[180%] max-[720px]:top-[0.6rem] max-[720px]:w-[min(1200px,100%-1.25rem)] max-[720px]:py-[0.55rem] max-[720px]:pr-[0.55rem] max-[720px]:pl-[0.85rem]"
      >
        <Link
          href="/"
          aria-label="CrownOS home"
          className="inline-flex items-center gap-[0.625rem]"
        >
          {brandLogo}
          <span className="font-semibold tracking-[-0.02em]">CrownOS</span>
        </Link>

        <div className="flex items-center gap-[0.4rem] text-[0.92rem] text-muted max-[720px]:hidden">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
          <Link href="/download" className={ctaClass}>
            <DownloadIcon className="size-4" /> Download
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="hidden size-[2.4rem] items-center justify-center rounded-full border border-border bg-transparent text-foreground max-[720px]:inline-flex"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-x-4 top-20 z-40 grid gap-1 rounded-2xl border border-border bg-[color-mix(in_srgb,var(--color-background)_85%,transparent)] p-3 shadow-pop backdrop-blur-[40px] backdrop-saturate-[160%] animate-mobile-menu"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-[0.85rem] text-foreground hover:bg-[color-mix(in_srgb,var(--color-foreground)_6%,transparent)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/download"
            onClick={() => setOpen(false)}
            className={`${ctaClass} justify-center`}
          >
            Download <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      ) : null}
    </>
  );
}
