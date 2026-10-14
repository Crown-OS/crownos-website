import { CheckIcon, DashIcon } from "@/components/feature-icons";
import { OsLogo } from "@/components/os-logos";
import type { MatrixTab } from "@/data/comparison";

const HIGHLIGHT_COLUMN = 0;
const HIGHLIGHT_TINT = "bg-white/4";

function SupportMark({
  supported,
  highlighted,
}: {
  supported: boolean;
  highlighted: boolean;
}) {
  const markStyle = highlighted
    ? "bg-paper text-ink"
    : "bg-white/10 text-foreground";
  return (
    <>
      <span className="sr-only">{supported ? "Included" : "Not included"}</span>
      {supported ? (
        <span
          aria-hidden
          className={`mx-auto grid size-6 place-items-center rounded-full ${markStyle}`}
        >
          <CheckIcon className="size-4" />
        </span>
      ) : (
        <DashIcon aria-hidden className="mx-auto size-5 text-faint" />
      )}
    </>
  );
}

export function ComparisonMatrix({ tab }: { tab: MatrixTab }) {
  const totals = tab.columns.map((_, column) =>
    tab.rows.reduce((count, { support }) => count + Number(support[column]), 0),
  );

  return (
    <div className="squircle overflow-x-auto rounded-card border border-border">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <thead>
          <tr className="border-border border-b text-ui">
            <th scope="col" className="sr-only">
              Feature
            </th>
            {tab.columns.map(({ os, name }, index) => (
              <th
                key={name}
                scope="col"
                className={`h-16 px-4 text-center font-medium ${
                  index === HIGHLIGHT_COLUMN
                    ? `${HIGHLIGHT_TINT} text-foreground`
                    : "text-muted"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <OsLogo os={os} className="size-4 shrink-0" />
                  {name}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {tab.rows.map(({ feature, support }) => (
            <tr key={feature} className="transition-colors hover:bg-white/2">
              <th
                scope="row"
                className="h-14 px-6 font-normal text-muted-strong text-ui"
              >
                {feature}
              </th>
              {support.map((supported, index) => (
                <td
                  key={tab.columns[index].name}
                  className={index === HIGHLIGHT_COLUMN ? HIGHLIGHT_TINT : ""}
                >
                  <SupportMark
                    supported={supported}
                    highlighted={index === HIGHLIGHT_COLUMN}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-border border-t text-ui">
            <th scope="row" className="h-14 px-6 font-normal text-faint">
              Total
            </th>
            {totals.map((total, index) => (
              <td
                key={tab.columns[index].name}
                className={`text-center font-medium tabular-nums ${
                  index === HIGHLIGHT_COLUMN
                    ? `${HIGHLIGHT_TINT} text-foreground`
                    : "text-muted"
                }`}
              >
                {total}/{tab.rows.length}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
