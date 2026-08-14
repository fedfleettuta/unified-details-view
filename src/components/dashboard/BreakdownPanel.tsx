import { PieChart } from "lucide-react";

import { Panel, PanelHeader } from "@/components/detail/Panel";
import { cn } from "@/lib/utils";
import type { BreakdownPanel as BreakdownPanelData } from "@/data/dashboard";
import type { StatusTone } from "@/data/records";

const barTone: Record<StatusTone, string> = {
  active: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-muted-foreground/50",
};

export function BreakdownPanel({ panel }: { panel: BreakdownPanelData }) {
  const max = Math.max(...panel.rows.map((r) => r.value), 1);

  return (
    <Panel className="flex h-full flex-col">
      <PanelHeader
        title={panel.title}
        icon={<PieChart className="h-4 w-4" />}
        action={<span className="text-xs text-muted-foreground">{panel.note}</span>}
      />
      <div className="mt-5 flex items-baseline gap-2">
        <span className="font-display font-numeric text-3xl font-semibold tracking-tight">
          {panel.total}
        </span>
        <span className="label-micro">{panel.totalLabel}</span>
      </div>
      <ul className="mt-5 flex-1 space-y-3.5">
        {panel.rows.map((row) => (
          <li key={row.label} className="space-y-1.5">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="truncate text-muted-foreground">{row.label}</span>
              <span className="font-numeric font-medium">{row.display}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-muted">
              <div
                className={cn("h-full rounded-full", barTone[row.tone])}
                style={{ width: `${Math.max(4, (row.value / max) * 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}