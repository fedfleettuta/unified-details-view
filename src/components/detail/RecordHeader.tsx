import { Link } from "@tanstack/react-router";
import { ChevronRight, Truck } from "lucide-react";
import type { ReactNode } from "react";

import { StatusPill } from "./StatusPill";
import type { RecordConfig } from "@/data/records";

export function RecordHeader({ record, actions }: { record: RecordConfig; actions?: ReactNode }) {
  return (
    <header className="space-y-4">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          <li>
            <Link to="/" className="transition-colors hover:text-foreground">
              Fleet
            </Link>
          </li>
          <ChevronRight className="h-3 w-3 opacity-50" aria-hidden />
          <li>{record.listName}</li>
          <ChevronRight className="h-3 w-3 opacity-50" aria-hidden />
          <li aria-current="page" className="text-foreground">
            {record.crumb}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex min-w-0 flex-wrap items-center gap-2.5">
            <h1 className="truncate font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {record.title}
            </h1>
            <StatusPill label={record.status.label} tone={record.status.tone} />
            {record.reference ? (
              <span className="rounded-md bg-surface-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                {record.reference}
              </span>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-2.5 py-1 text-xs font-medium text-foreground">
              <Truck className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
              {record.vehicle.reg}
              <span className="text-muted-foreground">· {record.vehicle.model}</span>
            </span>
            <span className="min-w-0">{record.headline}</span>
          </div>
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}