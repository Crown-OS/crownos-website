import { AgentWindow } from "@/components/agent/AgentWindow";
import { agentCopy } from "@/data/agent";

export function Agent() {
  const { headline, summary } = agentCopy;
  return (
    <section
      id="agent"
      aria-labelledby="agent-title"
      className="overflow-x-clip px-gutter pt-24 font-inter md:pt-36"
    >
      <header className="scroll-reveal mx-auto grid max-w-3xl justify-items-center gap-5 text-center">
        <h2
          id="agent-title"
          className="text-[2.25rem] leading-[1.1] font-medium tracking-[-0.025em] text-white md:text-5xl md:leading-[1.1]"
        >
          {headline}
        </h2>
        <p className="max-w-[34em] text-[1.0625rem] leading-normal tracking-[-0.011em] text-muted md:text-lg">
          {summary}
        </p>
      </header>
      <div className="scroll-reveal mx-auto mt-16 max-w-255">
        <AgentWindow />
      </div>
    </section>
  );
}
