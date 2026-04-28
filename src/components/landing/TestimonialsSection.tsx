import styles from "@/app/page.module.css";
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
      "Crowncrate's monochrome desktop gets out of the way. I forget I'm using a Linux distribution and just… work.",
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

      <div className={styles.testimonialGrid}>
        {testimonials.map((t) => (
          <figure key={t.name} className={styles.testimonial}>
            <blockquote className={styles.testimonialQuote}>
              {t.quote}
            </blockquote>
            <figcaption className={styles.testimonialAuthor}>
              <span className={styles.testimonialAvatar}>{t.initial}</span>
              <div>
                <div className={styles.testimonialName}>{t.name}</div>
                <div className={styles.testimonialRole}>{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
