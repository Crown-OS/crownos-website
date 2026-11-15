import { DiscIcon } from "@/components/icons/DiscIcon";
import { AgentCursorsCard } from "@/components/platform/agent-cursors/AgentCursorsCard";
import { PlatformCard } from "@/components/platform/PlatformCard";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { latestIsoUrl } from "@/data/download";
import { platformCopy, platformFeatures } from "@/data/platform";

export function Platform() {
  const { headline, subline, action } = platformCopy;
  return (
    <section
      id="platform"
      aria-labelledby="platform-title"
      className="px-gutter py-24 font-inter md:py-36"
    >
      <header className="scroll-reveal flex flex-wrap items-end justify-between gap-8 px-2 md:px-8">
        <h2
          id="platform-title"
          className="max-w-[18em] text-[2.25rem] leading-[1.1] font-medium tracking-[-0.025em] text-white md:text-5xl md:leading-[1.1]"
        >
          {headline}
          <span className="block text-muted">{subline}</span>
        </h2>
        <ArrowButton href={latestIsoUrl} icon={<DiscIcon className="size-5" />}>
          {action}
        </ArrowButton>
      </header>
      <ul className="scroll-reveal mt-14 grid gap-4 md:grid-cols-3">
        {platformFeatures.map((feature) => (
          <PlatformCard key={feature.title} feature={feature} />
        ))}
        <AgentCursorsCard />
      </ul>
    </section>
  );
}
