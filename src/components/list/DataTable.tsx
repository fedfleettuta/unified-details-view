import { Link } from "@tanstack/react-router";
import { ArrowUpDown, ChevronRight } from "lucide-react";

import { FieldValue } from "@/components/detail/Field";
import { StatusPill } from "@/components/detail/StatusPill";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { ListColumn, ListRow } from "@/data/lists";

const hideClass: Record<string, string> = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
};

export function DataTable({
  columns,
  rows,
  selected,
  onToggleRow,
  onToggleAll,
  sortKey,
  onSort,
  emptyLabel,
}: {
  columns: ListColumn[];
  rows: ListRow[];
  selected: string[];
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
  sortKey?: string | undefined;
  onSort: (key: string) => void;
  emptyLabel?: string | undefined;
}) {
  const allSelected = rows.length > 0 && selected.length === rows.length;

  if (!rows.length) {
    return (
      <div className="rounded-xl border border-dashed border-hairline bg-surface-muted/40 px-6 py-16 text-center">
        <p className="font-display text-sm font-semibold">Nothing here yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {emptyLabel ?? "Adjust the filters or search to see more rows."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface shadow-panel">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[52rem] border-collapse text-sm">
          <thead className="bg-surface-muted/60">
            <tr>
              <th className="w-10 px-4 py-3">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={onToggleAll}
                  aria-label="Select all rows"
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={column.width ? { width: column.width } : undefined}
                  className={cn(
                    "px-4 py-3 text-left font-medium",
                    column.align === "right" && "text-right",
                    column.hideBelow && hideClass[column.hideBelow],
                  )}
                >
                  <button
                    type="button"
                    onClick={() => onSort(column.key)}
                    className={cn(
                      "label-micro inline-flex items-center gap-1 transition-colors hover:text-foreground",
                      sortKey === column.key && "text-foreground",
                    )}
                  >
                    {column.label}
                    <ArrowUpDown className="h-3 w-3 opacity-50" aria-hidden />
                  </button>
                </th>
              ))}
              <th className="w-10 px-2 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  "border-t border-hairline transition-colors hover:bg-surface-muted/60",
                  selected.includes(row.id) && "bg-accent/40",
                )}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selected.includes(row.id)}
                    onCheckedChange={() => onToggleRow(row.id)}
                    aria-label={`Select ${row.id}`}
                  />
                </td>
                {columns.map((column) => {
                  const cell = row.cells[column.key];
                  return (
                    <td
                      key={column.key}
                      className={cn(
                        "px-4 py-3 align-middle",
                        column.align === "right" && "text-right",
                        column.hideBelow && hideClass[column.hideBelow],
                      )}
                    >
                      {cell?.tone ? (
                        <StatusPill label={cell.text} tone={cell.tone} size="sm" />
                      ) : (
                        <div className="min-w-0">
                          <FieldValue value={cell?.text} kind={cell?.kind ?? column.kind} />
                          {cell?.sub ? (
                            <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                              {cell.sub}
                            </span>
                          ) : null}
                        </div>
                      )}
                    </td>
                  );
                })}
                <td className="px-2 py-3 text-right">
                  {row.recordSlug ? (
                    <Link
                      to="/records/$type"
                      params={{ type: row.recordSlug }}
                      aria-label={`Open ${row.id}`}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-muted hover:text-primary"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    </Link>
                  ) : (
                    <span className="inline-flex h-7 w-7 items-center justify-center text-muted-foreground/30">
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
