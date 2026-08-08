import { ArrowRight, Layers } from "lucide-react";

import { Panel, PanelHeader } from "./Panel";
import { FieldValue } from "./Field";
import { StatusPill } from "./StatusPill";
import type { RelatedList } from "@/data/records";

function RelatedPanel({ list }: { list: RelatedList }) {
  return (
    <Panel>
      <PanelHeader
        title={list.title}
        icon={<Layers className="h-4 w-4" />}
        action={
          list.countLabel ? (
            <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              {list.countLabel}
            </span>
          ) : undefined
        }
      />

      {list.rows.length ? (
        <div className="-mx-2 mt-2 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr>
                {list.columns.map((column) => (
                  <th key={column} className="label-micro px-2 py-3 text-left font-medium">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.rows.map((row, rowIndex) => (
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
        <p className="mt-4 text-sm text-muted-foreground">
          {list.emptyLabel ?? "Nothing recorded yet."}
        </p>
      )}

      <a
        href="#"
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-opacity hover:opacity-80"
      >
        {list.linkLabel}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </a>
    </Panel>
  );
}

export function RelatedLists({ lists }: { lists: RelatedList[] }) {
  return (
    <div className="space-y-5">
      {lists.map((list) => (
        <RelatedPanel key={list.title} list={list} />
      ))}
    </div>
  );
}
