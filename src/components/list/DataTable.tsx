import { Link } from "@tanstack/react-router";
import {
  Archive,
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  Eye,
  Image as ImageIcon,
  KeyRound,
  Pencil,
  Power,
  Wrench,
} from "lucide-react";
import type { ComponentType } from "react";

import { FieldValue } from "@/components/detail/Field";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { ListBadge, ListCell, ListColumn, ListRow, ListRowActionIcon } from "@/data/lists";
import type { StatusTone } from "@/data/records";

const hideClass: Record<string, string> = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
};

const actionIcons: Record<ListRowActionIcon, ComponentType<{ className?: string }>> = {
  archive: Archive,
  eye: Eye,
  image: ImageIcon,
  key: KeyRound,
  pencil: Pencil,
  power: Power,
  wrench: Wrench,
};

const solidTone: Record<StatusTone, string> = {
  active: "bg-success text-surface",
  warning: "bg-warning text-surface",
  danger: "bg-danger text-surface",
  info: "bg-info text-surface",
  neutral: "bg-foreground text-surface",
};

const outlineTone: Record<StatusTone, string> = {
  active: "border-success/40 text-success",
  warning: "border-warning/40 text-warning",
  danger: "border-danger/40 text-danger",
  info: "border-info/40 text-info",
  neutral: "border-hairline text-muted-foreground",
};

const softTone: Record<StatusTone, string> = {
  active: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
  neutral: "bg-surface-muted text-muted-foreground",
};

export function Badge({ badge }: { badge: ListBadge }) {
  const tone = badge.tone ?? "neutral";
  const variant = badge.variant ?? "outline";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium whitespace-nowrap",
        variant === "solid" && solidTone[tone],
        variant === "soft" && softTone[tone],
        variant === "outline" && cn("border bg-surface", outlineTone[tone]),
      )}
    >
      {badge.label}
      {badge.caret ? <ChevronDown className="h-3 w-3 opacity-60" aria-hidden /> : null}
    </span>
  );
}

function Cell({ cell, column }: { cell: ListCell | undefined; column: ListColumn }) {
  if (!cell) {
    return <span className="text-muted-foreground/60">—</span>;
  }

  const badges = cell.badges ?? (cell.tone ? [{ label: cell.text, tone: cell.tone }] : undefined);

  if (badges && !cell.sub) {
    return (
      <div className={cn("flex flex-wrap items-center gap-1.5", column.align === "right" && "justify-end")}>
        {badges.map((badge) => (
          <Badge key={badge.label} badge={badge} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-w-0 space-y-0.5">
      <div className="flex min-w-0 flex-wrap items-center gap-1.5">
        {cell.chip ? (
          <span className="rounded-md border border-hairline bg-surface-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
            {cell.text}
          </span>
        ) : (
          <FieldValue
            value={cell.text}
            kind={cell.kind ?? column.kind}
            className={cell.link ? "font-medium text-primary" : undefined}
          />
        )}
        {cell.qualifier ? (
          <span className="text-xs text-muted-foreground">/ {cell.qualifier}</span>
        ) : null}
        {cell.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-hairline bg-surface px-2 py-0.5 text-[11px] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
        {badges?.map((badge) => (
          <Badge key={badge.label} badge={badge} />
        ))}
      </div>
      {cell.sub ? (
        <span className="block truncate text-xs text-muted-foreground">{cell.sub}</span>
      ) : null}
    </div>
  );
}

function RowActions({ row }: { row: ListRow }) {
  if (!row.actions?.length) return null;

  return (
    <div className="flex items-center justify-end gap-1.5">
      {row.actions.map((action) => {
        const Icon = action.icon ? actionIcons[action.icon] : undefined;
        return (
          <button
            key={action.label}
            type="button"
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap transition-colors",
              action.variant === "outline"
                ? "border border-hairline bg-surface text-foreground hover:bg-surface-muted"
                : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
            )}
          >
            {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden /> : null}
            {action.label}
          </button>
        );
      })}
    </div>
  );
}

export function DataTable({
  columns,
  rows,
  selected,
  onToggleRow,
  onToggleAll,
  sortKey,
  onSort,
  emptyLabel,
  selectable = true,
  actionsLabel,
}: {
  columns: ListColumn[];
  rows: ListRow[];
  selected: string[];
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
  sortKey?: string | undefined;
  onSort: (key: string) => void;
  emptyLabel?: string | undefined;
  selectable?: boolean;
  actionsLabel?: string | undefined;
}) {
  const allSelected = rows.length > 0 && selected.length === rows.length;
  const hasActions = rows.some((row) => row.actions?.length);

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
              {selectable ? (
                <th className="w-10 px-4 py-3">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={onToggleAll}
                    aria-label="Select all rows"
                  />
                </th>
              ) : null}
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
              {hasActions ? (
                <th className="px-4 py-3 text-right">
                  <span className="label-micro">{actionsLabel ?? "Actions"}</span>
                </th>
              ) : null}
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
                {selectable ? (
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selected.includes(row.id)}
                      onCheckedChange={() => onToggleRow(row.id)}
                      aria-label={`Select ${row.id}`}
                    />
                  </td>
                ) : null}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      "px-4 py-3 align-middle",
                      column.align === "right" && "text-right",
                      column.hideBelow && hideClass[column.hideBelow],
                    )}
                  >
                    <Cell cell={row.cells[column.key]} column={column} />
                  </td>
                ))}
                {hasActions ? (
                  <td className="px-4 py-3">
                    <RowActions row={row} />
                  </td>
                ) : null}
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
