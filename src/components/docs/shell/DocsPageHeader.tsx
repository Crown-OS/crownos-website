import type { ApiSignature, DocMeta } from "@/util/docs";
import { formatLongDate } from "@/util/format-date";

const FILLED_KINDS = new Set(["POST", "CALL", "FN"]);

function ApiEndpoint({ api }: { api: ApiSignature }) {
  const badge = FILLED_KINDS.has(api.kind)
    ? "bg-paper text-ink"
    : api.kind === "EVENT"
      ? "border border-dashed border-white/40 text-foreground"
      : "border border-border-strong text-foreground";
  return (
    <div className="squircle flex min-w-0 items-center gap-3 rounded-tile border border-border bg-white/[0.02] p-2 pr-4">
      <span className={`rounded-lg px-2.5 py-1 font-mono text-micro ${badge}`}>
        {api.kind}
      </span>
      <code className="truncate font-mono text-foreground text-ui">
        {api.target}
      </code>
    </div>
  );
}

export function DocsPageHeader({ meta }: { meta: DocMeta }) {
  return (
    <header className="grid gap-3">
      <div className="grid gap-0">
        <p className="text-faint text-sm">{meta.group}</p>
        <h1 className="text-balance font-display text-foreground text-tagline">
          {meta.title}
        </h1>
      </div>
      <p className="max-w-2xl text-lg font-normal text-muted leading-normal">
        {meta.description}
      </p>
      {meta.api && <ApiEndpoint api={meta.api} />}
      {meta.updated && (
        <p className="font-mono text-faint text-micro uppercase">
          Updated{" "}
          <time dateTime={meta.updated}>{formatLongDate(meta.updated)}</time>
        </p>
      )}
    </header>
  );
}
