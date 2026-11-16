import { agentCopy } from "@/data/agent";
import { AgentConversation } from "./AgentConversation";
import { AgentSidebar } from "./AgentSidebar";
import { WindowStack } from "./WindowStack";

export function AgentWindow() {
  return (
    <WindowStack>
      <figure className="relative flex h-[40rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e10] shadow-[0_0_80px_rgb(255_255_255/0.1),0_40px_80px_rgb(0_0_0/0.55)]">
        <div className="flex min-h-0 grow">
          <AgentSidebar />
          <AgentConversation />
        </div>
        <figcaption className="grid max-w-[28rem] gap-2 px-6 pt-4 pb-6">
          <span className="text-[1.0625rem] font-medium text-white">
            {agentCopy.caption}
          </span>
          <span className="text-[0.9375rem] leading-[1.5] text-white/55">
            {agentCopy.captionDetail}
          </span>
        </figcaption>
      </figure>
    </WindowStack>
  );
}
