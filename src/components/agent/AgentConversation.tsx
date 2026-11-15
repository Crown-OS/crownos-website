import {
  type AgentStep,
  agentCopy,
  agentPrompt,
  agentReply,
  agentSteps,
} from "@/data/agent";
import { AppChip } from "./AppChip";

function StepStatus({ state }: { state: AgentStep["state"] }) {
  if (state === "running")
    return (
      <span className="size-3.5 animate-[platform-spin_1s_linear_infinite] motion-reduce:animate-none rounded-full border-2 border-white/15 border-t-white/70" />
    );
  return <span className="size-3.5 rounded-full bg-sweep-sky/80" />;
}

export function AgentConversation() {
  return (
    <div className="flex min-w-0 grow flex-col">
      <header className="flex items-center justify-between px-5 pt-4">
        <span className="grid gap-1 leading-none">
          <span className="text-[0.9375rem] text-white">
            {agentCopy.windowTitle}
          </span>
          <span className="text-[0.75rem] text-white/45">
            {agentCopy.windowSubtitle}
          </span>
        </span>
        <span className="flex gap-1 rounded-full bg-white/6 p-1">
          <span className="size-6 rounded-full bg-white/8" />
          <span className="size-6 rounded-full bg-white/8" />
        </span>
      </header>
      <div className="grid content-start gap-7 px-5 pt-8">
        <p className="ml-auto max-w-[30rem] rounded-xl bg-white/7 px-3.5 py-2.5 text-[0.9375rem] leading-[1.7] text-white/90">
          {agentPrompt.map((part, index) =>
            typeof part === "string" ? (
              part
            ) : (
              // biome-ignore lint/suspicious/noArrayIndexKey: prompt parts are static and positional
              <AppChip key={index} app={part.app} tone={part.tone} />
            ),
          )}
        </p>
        <ul className="grid gap-3 text-[0.9375rem] text-white/55">
          {agentSteps.map(({ label, state, count }) => (
            <li key={label} className="flex items-center gap-3">
              <StepStatus state={state} />
              {label}
              {count && (
                <span className="rounded-md bg-white/8 px-1.5 py-0.5 text-[0.6875rem] leading-none">
                  {count}
                </span>
              )}
            </li>
          ))}
        </ul>
        <p className="max-w-[40rem] text-[0.9375rem] leading-[1.6] text-white/85">
          {agentReply}
        </p>
      </div>
    </div>
  );
}
