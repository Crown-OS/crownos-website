import Link from "next/link";
import { CrownIcon } from "@/components/icons";
import { RollText } from "@/components/motion";
import { primaryCta } from "@/data/navigation";

export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav
        aria-label="Primary"
        className="flex h-16 items-center justify-between px-gutter md:h-24"
      >
        <Link href="/" aria-label="CrownOS home" data-cursor="Home">
          <CrownIcon className="h-6 w-auto md:h-8" />
        </Link>
        <Link
          href={primaryCta.href}
          className="inline-flex h-11 items-center rounded-full bg-paper px-6 text-ink text-lead md:h-14 md:px-8"
        >
          <RollText text={primaryCta.label} />
        </Link>
      </nav>
    </header>
  );
}
