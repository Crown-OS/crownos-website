import { DiscIcon } from "@/components/icons/DiscIcon";
import { DiscordIcon } from "@/components/icons/DiscordIcon";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { discordInviteUrl } from "@/data/community";
import { latestIsoUrl } from "@/data/download";
import { footer } from "@/data/footer";
import { CircuitText } from "./circuit-text/CircuitText";

export function FooterCallToAction() {
  return (
    <section
      aria-labelledby="footer-call-to-action"
      className="flex flex-col items-center px-gutter pt-28 pb-8 text-center md:pt-40 md:pb-12"
    >
      <div className="scroll-reveal text-lift flex flex-col items-center">
        <h2
          id="footer-call-to-action"
          className="text-hero text-trim tracking-[-0.03em]"
        >
          <CircuitText>{footer.callToAction.headline}</CircuitText>
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3 md:mt-14">
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
    </section>
  );
}
