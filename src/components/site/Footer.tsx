import Link from "next/link";
import { GlobeIcon } from "@/components/icons";
import { RollText, SplitWords } from "@/components/motion";
import { footer } from "@/data/crownos";

function InfoPlate() {
  return (
    <div className="grid w-fit grid-cols-[auto_auto_auto] border border-foreground/80 text-ui uppercase">
      <p className="col-span-3 border-foreground/80 border-b px-3 py-3">
        {footer.location}
      </p>
      <span className="grid place-items-center border-foreground/80 border-r px-5 py-2">
        <GlobeIcon className="size-7" />
      </span>
      <p className="grid place-items-center border-foreground/80 border-r px-6 py-2 text-center leading-[1.25]">
        {footer.reach[0]}
        <br />
        {footer.reach[1]}
      </p>
      <span className="grid place-items-center px-3 [writing-mode:vertical-rl]">
        {footer.license}
      </span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 bg-background">
      <div className="overflow-clip bg-paper px-gutter pt-[clamp(3rem,8vw,7rem)] text-ink">
        <SplitWords
          as="p"
          lines={[footer.wordmark]}
          className="translate-y-[0.14em] text-mega"
        />
      </div>

      <div className="grid gap-12 px-gutter pt-20 pb-10 md:grid-cols-12">
        <div className="grid gap-6 md:col-span-5">
          <InfoPlate />
          <p className="text-ui text-muted uppercase">{footer.copyright}</p>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-3 gap-6 self-end md:col-span-5 md:col-start-8"
        >
          {footer.columns.map((column) => (
            <ul key={column[0].href} className="grid gap-2 text-lead">
              {column.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}>
                    <RollText text={label} />
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>
      </div>
    </footer>
  );
}
