import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Panel, PanelHeader } from "@/components/detail/Panel";
import { StatusPill } from "@/components/detail/StatusPill";
import { dashboard } from "@/data/dashboard";

export function ComplianceBoard() {
  const { title, note, rows } = dashboard.compliance;

  return (
    <Panel className="flex h-full flex-col">
      <PanelHeader
        title={title}
        icon={<ShieldCheck className="h-4 w-4" />}
        action={<span className="text-xs text-muted-foreground">{note}</span>}
      />
      <ul className="mt-2 flex-1 divide-y divide-hairline">
        {rows.map((row) => (
          <li
            key={`${row.label}-${row.subject}`}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3.5"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{row.label}</p>
              <p className="truncate text-xs text-muted-foreground">{row.subject}</p>
            </div>
            <div className="text-right">
              <p className="font-numeric text-sm">{row.value}</p>
              <StatusPill label={row.meta} tone={row.tone} size="sm" className="mt-1" />
            </div>
          </li>
        ))}
      </ul>
      <Link
        to="/lists/$list"
        params={{ list: "licence-policy" }}
        className="mt-4 inline-flex items-center gap-1.5 border-t border-hairline pt-4 text-xs font-medium text-primary"
      >
        Licence &amp; policy list
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </Panel>
  );
}