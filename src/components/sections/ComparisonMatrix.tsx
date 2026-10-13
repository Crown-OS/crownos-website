import { CheckIcon, DashIcon } from "@/components/feature-icons";
import type { MatrixTab } from "@/data/comparison";

const HIGHLIGHT_COLUMN = 0;

function SupportMark({ supported }: { supported: boolean }) {
  return (
    <>
      <span className="sr-only">{supported ? "Included" : "Not included"}</span>
      {supported ? (
        <CheckIcon className="mx-auto size-5" />
      ) : (
        <DashIcon className="mx-auto size-5 text-faint" />
      )}
    </>
  );
}

export function ComparisonMatrix({ tab }: { tab: MatrixTab }) {
  return (
    <div className="-mx-gutter overflow-x-auto px-gutter">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <thead>
          <tr className="text-ui">
            <th scope="col" className="sr-only">
              Feature
            </th>
            {tab.columns.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={`h-14 px-4 text-center font-medium ${
                  index === HIGHLIGHT_COLUMN
                    ? "rounded-t-xl bg-white/6 text-foreground"
                    : "text-muted"
                }`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tab.rows.map(({ feature, support }) => (
            <tr key={feature} className="border-border border-t">
              <th
                scope="row"
                className="h-16 pr-6 font-normal text-lead text-muted-strong"
              >
                {feature}
              </th>
              {support.map((supported, index) => (
                <td
                  key={tab.columns[index]}
                  className={index === HIGHLIGHT_COLUMN ? "bg-white/6" : ""}
                >
                  <SupportMark supported={supported} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
