"use client";

import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRightIcon, CrownIcon } from "@/components/icons";
import { RollText } from "@/components/motion";
import { downloadLink, navLinks } from "@/data/crownos";
import { INTRO_STAGGER } from "@/data/intro";
import { asTransition, SPRING_MORPH, stretch } from "@/data/springs";
import { type IntroPhase, useIntroPhase } from "@/util/intro";
import { MenuDrawer } from "./MenuDrawer";

const HIDE_AFTER = 120;
const SLIDE = { duration: 0.6, ease: [0.16, 1, 0.3, 1] } as const;
const INTRO_TRANSITION = {
  loading: { duration: 0 },
  revealing: asTransition(stretch(SPRING_MORPH, 2), INTRO_STAGGER.navbar),
  done: SLIDE,
} satisfies Record<IntroPhase, object>;

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const intro = useIntroPhase();
  const tucked = intro === "loading" || (hidden && !menuOpen);

  useLenis(({ scroll, direction }) => {
    setHidden(scroll > HIDE_AFTER && direction === 1);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference"
        initial={false}
        animate={{ y: tucked ? "-110%" : "0%" }}
        transition={INTRO_TRANSITION[intro]}
      >
        <nav
          aria-label="Primary"
          className="grid h-[4.5rem] grid-cols-12 items-center gap-4 px-gutter"
        >
          <Link
            href="/"
            data-cursor="Home"
            className="col-span-6 flex items-center gap-2 text-ui lg:col-span-3"
          >
            <CrownIcon className="size-6" />
            <RollText text="CrownOS" />
          </Link>

          <ul className="col-span-5 col-start-7 hidden items-center justify-between text-ui lg:flex">
            {navLinks.map(({ label, href, mark }) => (
              <li key={href}>
                <Link href={href} className="flex items-start gap-1">
                  <RollText text={label} />
                  {mark && (
                    <span className="text-[0.6rem] text-muted">{mark}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={downloadLink.href}
            className="col-start-12 hidden items-center justify-end gap-1 text-ui lg:flex"
          >
            <RollText text={downloadLink.label} />
            <ArrowUpRightIcon className="size-3" />
          </Link>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="menu-drawer"
            onClick={() => setMenuOpen(true)}
            className="col-span-6 justify-self-end text-ui uppercase lg:hidden"
          >
            <RollText text="Menu" />
          </button>
        </nav>
      </motion.header>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
