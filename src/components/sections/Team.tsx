import { TeamLine } from "@/components/team/TeamLine";
import { teamCopy, teamMembers } from "@/data/team";

export function Team() {
  const { headline, summary } = teamCopy;
  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="mx-auto max-w-310 px-gutter py-24 font-inter md:py-36"
    >
      <header className="scroll-reveal mx-auto grid max-w-3xl justify-items-center gap-6 text-center md:gap-7">
        <h2
          id="team-title"
          className="text-[2.25rem] leading-[1.1] font-medium tracking-[-0.025em] text-white md:text-5xl md:leading-[1.1]"
        >
          {headline}
        </h2>
        <p className="max-w-[33.8em] text-[1.0625rem] leading-normal font-normal tracking-[-0.011em] text-[#aaa] md:text-lg">
          {summary}
        </p>
      </header>

      <div className="scroll-reveal mt-2">
        <TeamLine members={teamMembers} />
      </div>
    </section>
  );
}
