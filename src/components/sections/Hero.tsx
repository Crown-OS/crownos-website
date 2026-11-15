import { CrownIcon } from "@/components/icons/CrownIcon";
import { DiscIcon } from "@/components/icons/DiscIcon";
import { DiscordIcon } from "@/components/icons/DiscordIcon";
import { SplitLetters } from "@/components/motion/SplitLetters";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { SweepSlogan } from "@/components/ui/SweepSlogan";
import { discordInviteUrl } from "@/data/community";
import { latestIsoUrl } from "@/data/download";
import { delayStyle, entranceDelay } from "@/data/entrance";
import { hero } from "@/data/hero";
import { HeroLaptop } from "./HeroLaptop";

const SLOGAN_TIMING = delayStyle(entranceDelay.slogan, {
  "--sweep-at": `${entranceDelay.sloganSweep}ms`,
  "--sweep-cycle": "6s",
});
const CROWN_LETTER = "w";

function renderHeadlineLetter(letter: string) {
  return letter === CROWN_LETTER ? (
    <CrownIcon
      data-intro-target
      className="inline-block h-[0.52em] w-auto align-baseline mr-[-0.045em]"
    />
  ) : (
    letter
  );
}

const EYEBROW_TIMING = delayStyle(entranceDelay.eyebrow);
const CTA_TIMING = delayStyle(entranceDelay.actions);

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex flex-col items-center overflow-clip px-gutter pt-10 text-center md:pt-14"
    >
      <div className="text-lift flex flex-col items-center">
        <hgroup className="flex flex-col items-center gap-3 md:gap-6">
          <p
            data-reveal="text"
            style={EYEBROW_TIMING}
            className="text-headline font-inter text-foreground/95 text-trim"
          >
            {hero.eyebrow}
          </p>
          <SplitLetters
            id="hero-title"
            lines={hero.headline}
            delay={entranceDelay.headline}
            renderLetter={renderHeadlineLetter}
            className="text-hero text-trim"
          />
        </hgroup>
        <SweepSlogan
          copy={hero.slogan}
          data-reveal="text"
          style={SLOGAN_TIMING}
          className="mt-6 md:mt-12"
        />
        <div
          data-reveal
          style={CTA_TIMING}
          className="mt-10 flex flex-wrap justify-center gap-3 md:mt-14"
        >
          <ArrowButton
            href={discordInviteUrl}
            target="_blank"
            rel="noreferrer"
            variant="dark"
            arrow="outward"
            icon={<DiscordIcon className="size-5" />}
          >
            Join Discord
          </ArrowButton>
          <ArrowButton
            href={latestIsoUrl}
            hasBeam
            icon={<DiscIcon className="size-5" />}
          >
            Download ISO
          </ArrowButton>
        </div>
      </div>
      <HeroLaptop />
    </section>
  );
}
