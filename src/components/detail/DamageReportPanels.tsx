import { AlertTriangle, Image as ImageIcon } from "lucide-react";

import { Panel, PanelHeader } from "./Panel";
import { StatusPill } from "./StatusPill";
import type { DamageReportBlock, RecordDamageReports } from "@/data/records";

function DamageCard({ block }: { block: DamageReportBlock }) {
  return (
    <Panel>
      <PanelHeader
        title={block.title}
        icon={<AlertTriangle className="h-4 w-4" />}
        action={
          block.countLabel ? (
            <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              {block.countLabel}
            </span>
          ) : undefined
        }
      />

      {block.items.length ? (
        <ul className="mt-4 space-y-4">
          {block.items.map((item, index) => (
            <li
              key={`${item.typeLabel}-${index}`}
              className="space-y-2 rounded-lg border border-hairline bg-surface-muted/40 p-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-hairline bg-surface px-2 py-0.5 text-xs font-medium">
                  {item.typeLabel}
                </span>
                <span className="text-xs text-muted-foreground">{item.view}</span>
                <StatusPill label={item.approvalLabel} tone={item.approvalTone} size="sm" />
                {item.reference ? (
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {item.reference}
                  </span>
                ) : null}
              </div>
              {item.description ? (
                <p className="text-sm break-words">{item.description}</p>
              ) : null}
              <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <ImageIcon className="h-3.5 w-3.5" aria-hidden />
                {item.photoCount} driver {item.photoCount === 1 ? "photo" : "photos"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          {block.emptyLabel ?? "No damage reported."}
        </p>
      )}
    </Panel>
  );
}

export function DamageReportPanels({ reports }: { reports: RecordDamageReports }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="label-micro text-foreground/70">{reports.title}</h2>
        {reports.note ? <p className="text-xs text-muted-foreground">{reports.note}</p> : null}
      </div>
      <div className="grid gap-5 xl:grid-cols-2 xl:items-start">
        {reports.blocks.map((block) => (
          <DamageCard key={block.title} block={block} />
        ))}
      </div>
    </div>
  );
}