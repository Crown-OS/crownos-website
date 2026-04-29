import { UsersIcon } from "../icons";
import { SectionHeader } from "./SectionHeader";

const testimonials = [
  {
    quote:
      "The first Arch-based distro I'd actually hand to a non-technical friend. The defaults are calm and the upgrades just don't break.",
    name: "Lena Park",
    role: "Kernel contributor",
    initial: "L",
  },
  {
    quote:
      "CrownOS's monochrome desktop gets out of the way. I forget I'm using a Linux distribution and just… work.",
    name: "Owen Reyes",
    role: "Product designer",
    initial: "O",
  },
  {
    quote:
      "Local AI that respects my data, latency that beats my old workstation, and a config tree I can actually reason about.",
    name: "Sasha Volkov",
    role: "ML engineer",
    initial: "S",
  },
];

export function TestimonialsSection() {
  return (
    <section id="community-voices">
      <SectionHeader
        eyebrow="Community"
        eyebrowIcon={UsersIcon}
        title="Loved by people who care about how their system feels."
        subtitle="Daily drivers, kernel hackers, and designers — all on the same calm desktop."
      />

      <div className="grid grid-cols-3 gap-4 max-[1024px]:grid-cols-1">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className='relative isolate grid gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 before:pointer-events-none before:absolute before:right-5 before:top-[0.4rem] before:font-serif before:text-[6rem] before:leading-none before:text-[color-mix(in_srgb,var(--color-foreground)_8%,transparent)] before:content-["""]'
          >
            <blockquote className="text-[0.98rem] leading-[1.6] text-muted-strong">
              {t.quote}
            </blockquote>
            <figcaption className="flex items-center gap-[0.65rem] border-t border-border pt-[0.85rem]">
              <span className="grid size-9 place-items-center rounded-full text-[0.85rem] font-semibold text-accent-fg avatar-mono">
                {t.initial}
              </span>
              <div>
                <div className="text-[0.92rem] font-medium">{t.name}</div>
                <div className="text-[0.82rem] text-muted">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
