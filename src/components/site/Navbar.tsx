import Link from "next/link";
import { CrownIcon } from "@/components/icons";
import { Magnetic, RollText } from "@/components/motion";
import { primaryCta } from "@/data/navigation";

export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav
        aria-label="Primary"
        className="flex h-16 items-center justify-between px-gutter md:h-24"
      >
        <Link href="/" aria-label="CrownOS home">
          <CrownIcon className="h-6 w-auto md:h-8" />
        </Link>
        <Magnetic>
          <Link
            href={primaryCta.href}
            className="btn btn-primary h-11 px-6 text-lead md:h-14 md:px-8"
          >
            <RollText text={primaryCta.label} />
          </Link>
        </Magnetic>
      </nav>
    </header>
  );
}
