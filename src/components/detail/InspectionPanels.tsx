import { AlertTriangle, ClipboardCheck, ExternalLink } from "lucide-react";

import { Panel, PanelHeader } from "./Panel";
import { StatusPill } from "./StatusPill";
import type { InspectionBlock, RecordInspections } from "@/data/records";

function stateTone(state: InspectionBlock["items"][number]["state"]) {
  if (state === "issue") return "danger" as const;
  if (state === "na") return "neutral" as const;
  return "active" as const;
}

function stateLabel(state: InspectionBlock["items"][number]["state"]) {
  if (state === "issue") return "Issue";
  if (state === "na") return "N/A";
  return "Pass";
}

function InspectionCard({ block }: { block: InspectionBlock }) {
  return (
    <Panel>
      <PanelHeader
        title={block.title}
        icon={<ClipboardCheck className="h-4 w-4" />}
        action={
          block.issueLabel ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-danger">
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
              {block.issueLabel}
            </span>
          ) : (
            <span className="text-xs font-medium text-success">No issues</span>
          )
        }
      />
      {block.meta ? <p className="mt-3 text-xs text-muted-foreground">{block.meta}</p> : null}

      {block.items.length ? (
        <ul className="mt-2 divide-y divide-hairline">
          {block.items.map((item) => (
            <li
              key={item.label}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 py-3 transition-colors last:pb-0 hover:bg-surface-muted/40"
            >
              <div className="min-w-0 space-y-1">
                <p className="text-sm font-medium break-words">{item.label}</p>
                {item.note ? (
                  <p className="text-xs text-muted-foreground">{item.note}</p>
                ) : null}
                {item.actionLabel ? (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-opacity hover:opacity-80"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    {item.actionLabel}
                  </button>
                ) : null}
              </div>
              <StatusPill label={stateLabel(item.state)} tone={stateTone(item.state)} size="sm" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          {block.emptyLabel ?? "No checklist recorded."}
        </p>
      )}
    </Panel>
  );
}

export function InspectionPanels({ inspections }: { inspections: RecordInspections }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="label-micro text-foreground/70">{inspections.title}</h2>
        {inspections.note ? (
          <p className="text-xs text-muted-foreground">{inspections.note}</p>
        ) : null}
      </div>
      <div className="grid gap-5 xl:grid-cols-2 xl:items-start">
        {inspections.blocks.map((block) => (
          <InspectionCard key={block.title} block={block} />
        ))}
      </div>
    </div>
  );
}
