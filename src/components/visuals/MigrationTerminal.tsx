import { AppWindow, type WindowTab } from "./window/AppWindow";

const TABS: readonly WindowTab[] = [
  { title: "crown migrate", icon: "terminal", active: true },
  { title: "zsh" },
];

const TRANSFERS = [
  { item: "Documents & photos", size: "18.4 GB" },
  { item: "Dotfiles & settings", size: "214 files" },
  { item: "Packages → pacman", size: "312 mapped" },
  { item: "Browser profiles", size: "3 profiles" },
];

const PROGRESS = 0.86;
const PROGRESS_CELLS = 28;

function ProgressBar() {
  const filled = Math.round(PROGRESS * PROGRESS_CELLS);
  return (
    <span>
      <span className="text-white/85">{"━".repeat(filled)}</span>
      <span className="text-white/15">
        {"━".repeat(PROGRESS_CELLS - filled)}
      </span>
    </span>
  );
}

function Prompt({ children }: { children?: string }) {
  return (
    <p>
      <span className="text-sky-400">~</span>{" "}
      <span className="text-emerald-400">❯</span> {children}
    </p>
  );
}

export function MigrationTerminal() {
  return (
    <AppWindow
      label="Terminal running crown migrate, copying files, dotfiles and packages and verifying checksums"
      width={560}
      height={400}
      theme="dark"
      tabs={TABS}
    >
      <div className="flex flex-1 flex-col gap-1 bg-[#1c1c1f] px-5 pt-4 font-mono text-xs leading-relaxed text-white/80">
        <Prompt>crown migrate --from old-desktop.local</Prompt>
        <p className="text-white/45">
          Paired with old-desktop · ubuntu 24.04 · 412 GB
        </p>
        <ul className="my-2 grid gap-1">
          {TRANSFERS.map(({ item, size }) => (
            <li key={item} className="flex gap-3">
              <span className="text-emerald-400">✓</span>
              <span className="flex-1">{item}</span>
              <span className="text-white/45">{size}</span>
            </li>
          ))}
        </ul>
        <p className="flex gap-3">
          <span className="text-amber-300">⠼</span>
          <span className="flex-1">Verifying checksums</span>
          <span className="text-white/45">sha256</span>
        </p>
        <p className="flex justify-between gap-3">
          <ProgressBar />
          <span>{Math.round(PROGRESS * 100)}%</span>
        </p>
        <p className="text-white/45">04:12 elapsed · 2.1 GB/s</p>
        <p className="mt-2 text-white/45">
          Nothing lands on this install until every byte matches.
        </p>
        <div className="mt-2 flex items-center gap-1">
          <Prompt />
          <span className="h-3.5 w-2 bg-white/70" />
        </div>
      </div>
    </AppWindow>
  );
}
