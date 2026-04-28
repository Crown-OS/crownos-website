import styles from "@/app/page.module.css";
import { ChevronDownIcon, MessageIcon } from "../icons";
import { SectionHeader } from "./SectionHeader";

const faqs = [
  {
    q: "Is Crowncrate really just Arch underneath?",
    a: "Yes. Crowncrate is a curated distribution built on the Arch Linux base, with a custom scheduler, composited shell and a few opinionated defaults. You get full pacman + AUR access and rolling updates.",
  },
  {
    q: "Does the AI run locally?",
    a: "By default, yes. The bundled runtime ships with a small local model and the system never sends prompts off-device unless you explicitly bridge it to a remote provider in settings.",
  },
  {
    q: "Will my apps from regular Arch / Manjaro work?",
    a: "Almost always — Crowncrate uses the same package format. Flatpak, AppImage and AUR all work out of the box.",
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

      <div className={styles.faq}>
        {faqs.map((item) => (
          <details key={item.q} className={styles.faqItem}>
            <summary className={styles.faqQuestion}>
              {item.q}
              <ChevronDownIcon />
            </summary>
            <div className={styles.faqAnswer}>{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
