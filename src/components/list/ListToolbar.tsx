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
      <div
        className="flex gap-1 overflow-x-auto rounded-lg border border-hairline bg-surface p-1"
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
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
            )}
          >
            {segment.label}
            <span className="font-numeric rounded-full bg-surface-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
              {segment.count}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1 sm:max-w-xs">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-9 bg-surface pl-9 text-sm"
            aria-label={searchPlaceholder}
          />
        </div>

        {filters.map((filter) => (
          <Select key={filter.label} defaultValue={filter.options[0] ?? "Any"}>
            <SelectTrigger className="h-9 w-auto min-w-[9rem] bg-surface text-xs" aria-label={filter.label}>
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>
            <SelectContent>
              {filter.options.map((option) => (
                <SelectItem key={option} value={option} className="text-xs">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        <button
          type="button"
          className="inline-flex h-9 items-center gap-1.5 rounded-md border border-hairline bg-surface px-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
          Columns
        </button>
      </div>
    </div>
  );
}
