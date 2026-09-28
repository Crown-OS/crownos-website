"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { RollText } from "@/components/motion";
import { downloadLink, footer, navLinks } from "@/data/crownos";

const EASE = [0.76, 0, 0.24, 1] as const;
const LINKS = [...navLinks, downloadLink];

const curtain = {
  closed: { clipPath: "inset(0 0 100% 0)" },
  open: { clipPath: "inset(0 0 0% 0)" },
};

const line = {
  closed: { y: "110%" },
  open: (index: number) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE, delay: 0.25 + index * 0.06 },
  }),
};

type MenuDrawerProps = { open: boolean; onClose: () => void };

export function MenuDrawer({ open, onClose }: MenuDrawerProps) {
  const lenis = useLenis();
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    closeButton.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      lenis?.start();
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, lenis, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[55] flex flex-col bg-background px-gutter"
          variants={curtain}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="flex h-[4.5rem] items-center justify-between text-ui uppercase">
            <span className="text-muted">({footer.wordmark})</span>
            <button ref={closeButton} type="button" onClick={onClose}>
              <RollText text="Close" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-auto mb-10">
            <ul className="grid gap-1">
              {LINKS.map(({ label, href }, index) => (
                <li key={href} className="overflow-clip">
                  <motion.div variants={line} custom={index}>
                    <Link
                      href={href}
                      onClick={onClose}
                      className="flex items-baseline gap-3 text-display"
                    >
                      <span className="font-mono text-micro text-muted">
                        0{index + 1}
                      </span>
                      {label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <p className="border-border border-t py-5 text-micro text-muted uppercase">
            {footer.location}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
