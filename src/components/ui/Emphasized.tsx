const EMPHASIS_MARK = "*";

export function Emphasized({ text }: { text: string }) {
  return text.split(EMPHASIS_MARK).map((part, index) =>
    index % 2 ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: parts are static and positional
      <em key={index} className="pr-[0.06em] font-normal font-serif">
        {part}
      </em>
    ) : (
      part
    ),
  );
}
