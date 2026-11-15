import { PortraitImage } from "@/components/team/PortraitImage";
import { type AuthorId, findAuthor } from "@/data/blog";

export function AuthorLine({
  authorId,
  className = "",
}: {
  authorId: AuthorId;
  className?: string;
}) {
  const author = findAuthor(authorId);
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      {author.portrait && (
        <PortraitImage
          basePath={author.portrait}
          kind="avatar"
          sizes="48px"
          className="size-12 bg-black rounded-full object-cover"
        />
      )}
      <span className="grid justify-items-start text-left leading-tight">
        <span className="text-[1.125rem] font-medium">{author.name}</span>
        <span className="text-[0.8125rem] opacity-60">{author.role}</span>
      </span>
    </span>
  );
}
