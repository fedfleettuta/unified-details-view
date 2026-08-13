import { Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { ListFilter, ListSegment } from "@/data/lists";
import type { StatusTone } from "@/data/records";

const countTone: Record<StatusTone, string> = {
  active: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
  neutral: "bg-surface-muted text-muted-foreground",
};

export function ListToolbar({
  segments,
  activeSegment,
  onSegmentChange,
  filters,
  search,
  onSearchChange,
  searchPlaceholder,
}: {
  segments: ListSegment[];
  activeSegment: string;
  onSegmentChange: (label: string) => void;
  filters: ListFilter[];
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-hairline bg-surface p-4 shadow-panel">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="min-w-0 space-y-1.5">
            <label className="label-micro" htmlFor="list-search">
              Search
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                id="list-search"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder={searchPlaceholder}
                className="h-9 bg-surface pl-9 text-sm"
              />
            </div>
          </div>

          {filters.map((filter) => {
            const id = `filter-${filter.label.replace(/\s+/g, "-").toLowerCase()}`;
            return (
              <div key={filter.label} className="min-w-0 space-y-1.5">
                <label className="label-micro" htmlFor={id}>
                  {filter.label}
                </label>
                {filter.kind === "date" ? (
                  <Input
                    id={id}
                    type="date"
                    className="h-9 bg-surface text-sm"
                    aria-label={filter.label}
                  />
                ) : filter.kind === "search" ? (
                  <Input
                    id={id}
                    placeholder={filter.placeholder ?? filter.label}
                    className="h-9 bg-surface text-sm"
                    aria-label={filter.label}
                  />
                ) : (
                  <Select defaultValue={filter.options?.[0] ?? "Any"}>
                    <SelectTrigger
                      id={id}
                      className="h-9 w-full bg-surface text-xs"
                      aria-label={filter.label}
                    >
                      <SelectValue placeholder={filter.label} />
                    </SelectTrigger>
                    <SelectContent>
                      {(filter.options ?? ["Any"]).map((option) => (
                        <SelectItem key={option} value={option} className="text-xs">
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {segments.length ? (
        <div className="flex flex-wrap items-center gap-2">
          <div
            className="flex min-w-0 flex-1 gap-1 overflow-x-auto rounded-lg border border-hairline bg-surface p-1"
            role="tablist"
          >
            {segments.map((segment) => (
              <button
                key={segment.label}
                type="button"
                role="tab"
                aria-selected={activeSegment === segment.label}
                onClick={() => onSegmentChange(segment.label)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  activeSegment === segment.label
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                )}
              >
                {segment.label}
                <span
                  className={cn(
                    "font-numeric rounded-full px-1.5 py-0.5 text-[10px]",
                    activeSegment === segment.label
                      ? "bg-primary-foreground/15 text-primary-foreground"
                      : countTone[segment.tone ?? "neutral"],
                  )}
                >
                  {segment.count}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md border border-hairline bg-surface px-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
            Columns
          </button>
        </div>
      ) : null}
    </div>
  );
}
