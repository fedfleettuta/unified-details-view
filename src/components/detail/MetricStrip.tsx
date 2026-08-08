import { TrendingUp } from "lucide-react";

import { Panel, PanelHeader } from "./Panel";
import { FieldValue } from "./Field";
import type { RecordMetrics } from "@/data/records";

export function MetricStrip({ metrics }: { metrics: RecordMetrics }) {
  return (
    <Panel>
      <PanelHeader
        title={metrics.title}
        icon={<TrendingUp className="h-4 w-4" />}
        action={
          metrics.note ? (
            <span className="text-xs text-muted-foreground">{metrics.note}</span>
          ) : undefined
        }
      />
      <dl className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.items.map((item) => (
          <div key={item.label} className="min-w-0 space-y-1">
            <dt className="label-micro">{item.label}</dt>
            <dd className="font-display text-lg font-semibold tracking-tight">
              <FieldValue value={item.value} kind={item.kind} className="font-numeric" />
            </dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
