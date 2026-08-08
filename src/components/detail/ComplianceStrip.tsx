import { ShieldCheck } from "lucide-react";

import { Panel, PanelHeader } from "./Panel";
import { FieldValue } from "./Field";
import { StatusPill } from "./StatusPill";
import type { ComplianceItem } from "@/data/records";

export function ComplianceStrip({ items }: { items: ComplianceItem[] }) {
  return (
    <Panel>
      <PanelHeader title="Compliance" icon={<ShieldCheck className="h-4 w-4" />} />
      <ul className="mt-4 divide-y divide-hairline">
        {items.map((item) => (
          <li
            key={item.label}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="label-micro">{item.label}</p>
              <p className="text-sm">
                <FieldValue value={item.value} kind="date" />
              </p>
            </div>
            <StatusPill label={item.meta} tone={item.tone} size="sm" />
          </li>
        ))}
      </ul>
    </Panel>
  );
}
