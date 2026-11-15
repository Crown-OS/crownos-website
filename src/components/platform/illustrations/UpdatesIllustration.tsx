import { LineBundle } from "../LineBundle";
import { MockPanel } from "../MockPanel";

const PACKAGES = [
  {
    name: "linux-cachyos",
    version: "7.2.9 · znver4",
    state: "done",
    indent: "0%",
  },
  {
    name: "crownos",
    version: "2026.11.15 · znver4",
    state: "running",
    indent: "9%",
  },
  {
    name: "davinci-resolve",
    version: "21.1 · znver4",
    state: "waiting",
    indent: "16%",
  },
] as const;

function StatusRing({ state }: { state: (typeof PACKAGES)[number]["state"] }) {
  if (state === "done")
    return (
      <span className="grid size-5 place-items-center rounded-full bg-sweep-sky text-ink">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3"
        >
          <path d="m5 12 5 5 9-10" />
        </svg>
      </span>
    );
  return (
    <span
      className={`size-5 rounded-full border-2 border-white/20 ${state === "running" ? "animate-[platform-spin_1s_linear_infinite] border-t-sweep-sky motion-reduce:animate-none" : ""}`}
    />
  );
}

export function UpdatesIllustration() {
  return (
    <>
      <LineBundle
        lineCount={1}
        curves={[
          {
            from: [90, 0],
            to: [1000, 380],
            controls: [
              [160, 320],
              [700, 230],
            ],
            spreadFrom: 0,
            spreadTo: 0,
          },
        ]}
      />
      <ul className="absolute top-[24%] right-[10%] left-[10%] grid gap-3">
        {PACKAGES.map(({ name, version, state, indent }) => (
          <li key={name} style={{ marginLeft: indent }}>
            <MockPanel className="flex items-center gap-3 px-4 py-3">
              <StatusRing state={state} />
              <span className="grid gap-1 text-[0.8125rem] leading-none">
                <span className="text-white/85">{name}</span>
                <span className="text-white/40">{version}</span>
              </span>
            </MockPanel>
          </li>
        ))}
      </ul>
    </>
  );
}
