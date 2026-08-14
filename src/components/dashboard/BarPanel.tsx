import { BarChart3 } from "lucide-react";

import { Panel, PanelHeader } from "@/components/detail/Panel";
import type { BarPanel as BarPanelData } from "@/data/dashboard";

export function BarPanel({ panel }: { panel: BarPanelData }) {
  const max = Math.max(...panel.points.map((p) => p.value), 1);

  return (
    <Panel className="flex h-full flex-col">
      <PanelHeader
        title={panel.title}
        icon={<BarChart3 className="h-4 w-4" />}
        action={<span className="text-xs text-muted-foreground">{panel.note}</span>}
      />
      <div className="mt-6 flex flex-1 items-end gap-2 sm:gap-3" aria-hidden>
        {panel.points.map((point) => (
          <div key={point.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <span className="font-numeric text-[11px] text-muted-foreground">{point.display}</span>
            <div className="flex h-28 w-full items-end rounded-md bg-surface-muted/70">
              <div
                className="w-full rounded-md bg-primary/80 transition-[height]"
                style={{ height: `${Math.max(8, (point.value / max) * 100)}%` }}
              />
            </div>
            <span className="label-micro">{point.label}</span>
          </div>
        ))}
      </div>
      <ul className="sr-only">
        {panel.points.map((point) => (
          <li key={point.label}>{`${point.label}: ${point.display}`}</li>
        ))}
      </ul>
      <p className="mt-5 border-t border-hairline pt-4 text-xs text-muted-foreground">
        {panel.footer}
      </p>
    </Panel>
  );
}