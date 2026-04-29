import { ChevronDownIcon, MessageIcon } from "../icons";
import { SectionHeader } from "./SectionHeader";

const faqs = [
  {
    q: "Is CrownOS really just Arch underneath?",
    a: "Yes. CrownOS is a curated distribution built on the Arch Linux base, with a custom scheduler, composited shell and a few opinionated defaults. You get full pacman + AUR access and rolling updates.",
  },
  {
    q: "Does the AI run locally?",
    a: "By default, yes. The bundled runtime ships with a small local model and the system never sends prompts off-device unless you explicitly bridge it to a remote provider in settings.",
  },
  {
    q: "Will my apps from regular Arch / Manjaro work?",
    a: "Almost always — CrownOS uses the same package format. Flatpak, AppImage and AUR all work out of the box.",
  },
  {
    q: "How customisable is the desktop really?",
    a: "Every layer is replaceable. Use the default monochrome theme, your own GTK/Qt themes, or swap the compositor entirely. The config tree is plain TOML and dotfiles.",
  },
  {
    q: "What about updates? Will my system break?",
    a: "Each system upgrade creates a btrfs snapshot. If anything breaks, you can roll back from the boot menu in one click. We also gate breaking changes behind a stable channel.",
  },
  {
    q: "How is privacy handled?",
    a: "No telemetry, ever. Crash reports are opt-in and stripped. The full source is on GitHub and every release is GPG signed with reproducible builds.",
  },
];

export function FAQSection() {
  return (
    <section id="faq">
      <SectionHeader
        eyebrow="FAQ"
        eyebrowIcon={MessageIcon}
        title="Questions, calmly answered."
        subtitle="Everything you'd want to know before flashing the ISO."
      />

      <div className="grid gap-[0.55rem]">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition-[border-color] duration-150 open:border-[color-mix(in_srgb,var(--color-foreground)_25%,transparent)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[1.1rem] py-4 font-medium [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDownIcon className="size-4 text-muted-strong transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="px-[1.1rem] pb-[1.1rem] text-[0.95rem] leading-[1.6] text-muted">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
