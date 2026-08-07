import { History } from "lucide-react";

import { Panel, PanelHeader } from "./Panel";
import { FieldValue } from "./Field";
import { StatusPill } from "./StatusPill";
import type { RecordActivity } from "@/data/records";

export function ActivityBlock({ activity }: { activity: RecordActivity }) {
  return (
    <Panel>
      <PanelHeader title={activity.title} icon={<History className="h-4 w-4" />} />
      {activity.kind === "table" ? (
        <div className="-mx-2 mt-2 overflow-x-auto">
          <table className="w-full min-w-[42rem] border-collapse text-sm">
            <thead>
              <tr>
                {activity.columns.map((column) => (
                  <th key={column} className="label-micro px-2 py-3 text-left font-medium">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activity.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-t border-hairline transition-colors hover:bg-surface-muted/60"
                >
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-2 py-3 align-middle">
                      {cell.tone ? (
                        <StatusPill label={cell.text} tone={cell.tone} size="sm" />
                      ) : (
                        <FieldValue value={cell.text} kind={cell.kind} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ol className="mt-5 space-y-5">
          {activity.items.map((item, index) => (
            <li key={index} className="relative flex gap-4 pl-1">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
              {index < activity.items.length - 1 ? (
                <span
                  className="absolute top-4 left-[7px] h-full w-px bg-hairline"
                  aria-hidden
                />
              ) : null}
              <div className="grid min-w-0 flex-1 gap-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.meta}</p>
                </div>
                {item.transition ? (
                  <p className="font-mono text-[11px] text-muted-foreground sm:text-right">
                    {item.transition}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      )}
    </Panel>
  );
}