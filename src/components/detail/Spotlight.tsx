import { ArrowUpRight, Radio } from "lucide-react";

import { Panel } from "./Panel";
import { FieldValue } from "./Field";
import { StatusPill } from "./StatusPill";
import { Button } from "@/components/ui/button";
import type { RecordSpotlight } from "@/data/records";

export function Spotlight({ spotlight }: { spotlight: RecordSpotlight }) {
  return (
    <Panel className="border-l-2 border-l-primary">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
        <div className="min-w-0 space-y-1.5">
          <p className="label-micro flex items-center gap-1.5">
            <Radio className="h-3.5 w-3.5" aria-hidden />
            {spotlight.eyebrow}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-base font-semibold tracking-tight">
              {spotlight.title}
            </h2>
            {spotlight.tone ? (
              <StatusPill label={spotlight.stateLabel ?? "Live"} tone={spotlight.tone} size="sm" />
            ) : null}
          </div>
        </div>
        {spotlight.actionLabel ? (
          <Button size="sm" variant="outline" className="shrink-0">
            {spotlight.actionLabel}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Button>
        ) : null}
      </div>

      <dl className="mt-5 grid gap-x-6 gap-y-4 border-t border-hairline pt-5 sm:grid-cols-2 lg:grid-cols-4">
        {spotlight.items.map((item) => (
          <div key={item.label} className="min-w-0 space-y-1">
            <dt className="label-micro">{item.label}</dt>
            <dd className="text-sm">
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
  );
}
