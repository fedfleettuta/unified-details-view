import { Paperclip } from "lucide-react";

import { Panel, PanelHeader } from "./Panel";
import { FieldValue } from "./Field";
import { StatusPill } from "./StatusPill";
import type { RecordDocument, SummaryItem } from "@/data/records";

export function SummaryRail({
  summary,
  documents,
}: {
  summary: SummaryItem[];
  documents: RecordDocument[];
}) {
  return (
    <div className="space-y-5">
      <Panel>
        <PanelHeader title="At a glance" />
        <dl className="mt-4 divide-y divide-hairline">
          {summary.map((item) => (
            <div
              key={item.label}
              className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
            >
              <dt className="label-micro">{item.label}</dt>
              <dd className="min-w-0 text-right text-sm">
                {item.tone ? (
                  <StatusPill label={item.value} tone={item.tone} size="sm" />
                ) : (
                  <FieldValue value={item.value} kind={item.kind} />
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Panel>

      <Panel>
        <PanelHeader title="Documents" icon={<Paperclip className="h-4 w-4" />} />
        <ul className="mt-4 space-y-1">
          {documents.map((doc) => (
            <li key={doc.label}>
              {doc.name ? (
                <a
                  href="#"
                  className="group flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-surface-muted"
                >
                  <span className="min-w-0">
                    <span className="block label-micro">{doc.label}</span>
                    <span className="block truncate text-foreground">{doc.name}</span>
                  </span>
                  <span className="shrink-0 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    View
                  </span>
                </a>
              ) : (
                <div className="flex items-center justify-between gap-3 px-2 py-2 text-sm">
                  <span className="label-micro">{doc.label}</span>
                  <span className="text-xs text-muted-foreground/60">Not attached</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}