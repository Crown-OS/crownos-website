import { AUTHORS, type AuthorId } from "@/data/blog";

const AVATAR_SIZE = 48;

export function AuthorByline({ author }: { author: AuthorId }) {
  const { name, avatar, links } = AUTHORS[author];
  return (
    <div className="flex items-center gap-4">
      {/* biome-ignore lint/performance/noImgElement: static export serves public images as-is */}
      <img
        src={avatar}
        alt=""
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
        loading="lazy"
        decoding="async"
        className="size-12 rounded-full border border-border object-cover grayscale"
      />
      <div className="grid gap-1">
        <p className="text-foreground text-ui">{name}</p>
        <ul className="flex gap-4 font-mono text-micro text-faint uppercase">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
