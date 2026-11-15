import { CrownIcon } from "@/components/icons/CrownIcon";
import { GlobeIcon } from "@/components/icons/GlobeIcon";
import { RollText } from "@/components/motion/RollText";
import { footer } from "@/data/footer";
import { FooterCallToAction } from "./FooterCallToAction";
import { FooterGlow } from "./FooterGlow";

function isExternal(href: string) {
  return href.startsWith("http");
}

function InfoPlate() {
  return (
    <div className="grid w-fit grid-cols-[auto_auto_auto] border font-sans border-foreground/80 text-ui uppercase">
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

function FooterBrand() {
  const { name, description } = footer.brand;
  return (
    <div className="grid max-w-80 gap-4 font-inter">
      <a href="/" className="flex w-fit items-center gap-2.5 text-white">
        <CrownIcon className="h-5 w-auto" />
        <span className="text-xl font-medium tracking-[-0.02em]">{name}</span>
      </a>
      <p className="text-[0.9375rem] leading-normal tracking-[-0.011em] text-[#aaa]">
        {description}
      </p>
      <InfoPlate />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-clip">
      <FooterCallToAction />
      <div className="relative">
        <FooterGlow />
        <div className="text-lift mx-auto grid max-w-310 gap-12 px-gutter pt-20 pb-6 md:grid-cols-[1fr_auto] md:items-end md:pt-24 md:pb-8">
          <FooterBrand />
          <nav
            aria-label="Footer"
            className="grid grid-cols-3 gap-8 font-inter md:justify-self-end"
          >
            {footer.columns.map(({ title, links }) => (
              <div key={title} className="grid content-start gap-4">
                <p className="text-sm font-medium text-white/75">{title}</p>
                <ul className="grid content-start gap-2.5 text-base tracking-[-0.011em]">
                  {links.map(({ label, href }) => (
                    <li key={href}>
                      <a
                        href={href}
                        {...(isExternal(href) && {
                          target: "_blank",
                          rel: "noreferrer",
                        })}
                      >
                        <RollText text={label} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <p className="justify-self-center font-inter text-base font-light text-white md:col-span-2 md:mt-12 md:text-xl">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
