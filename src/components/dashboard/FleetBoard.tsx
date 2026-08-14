import { Link } from "@tanstack/react-router";
import { ArrowRight, Car } from "lucide-react";

import { Panel, PanelHeader } from "@/components/detail/Panel";
import { StatusPill } from "@/components/detail/StatusPill";
import { dashboard } from "@/data/dashboard";

export function FleetBoard() {
  const { title, note, rows } = dashboard.fleet;

  return (
    <Panel padded={false} className="overflow-hidden">
      <div className="px-5 pt-5 sm:px-6 sm:pt-6">
        <PanelHeader
          title={title}
          icon={<Car className="h-4 w-4" />}
          action={<span className="text-xs text-muted-foreground">{note}</span>}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-hairline">
              {["Vehicle", "State", "Driver", "Since", "Open damages", "Compliance"].map(
                (head) => (
                  <th key={head} className="label-micro px-5 py-3 text-left font-medium sm:px-6">
                    {head}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {rows.map((row) => (
              <tr key={row.reg} className="transition-colors hover:bg-surface-muted/50">
                <td className="px-5 py-3.5 sm:px-6">
                  <div className="min-w-0">
                    <span className="font-mono text-[13px] font-medium text-primary">
                      {row.reg}
                    </span>
                    <p className="truncate text-xs text-muted-foreground">{row.model}</p>
                  </div>
                </td>
                <td className="px-5 py-3.5 sm:px-6">
                  <StatusPill label={row.state.label} tone={row.state.tone} size="sm" />
                </td>
                <td className="px-5 py-3.5 sm:px-6">{row.driver}</td>
                <td className="font-numeric px-5 py-3.5 text-muted-foreground sm:px-6">
                  {row.since}
                </td>
                <td className="font-numeric px-5 py-3.5 sm:px-6">{row.openDamages}</td>
                <td className="px-5 py-3.5 sm:px-6">
                  <StatusPill
                    label={row.compliance.label}
                    tone={row.compliance.tone}
                    size="sm"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-hairline px-5 py-4 sm:px-6">
        <Link
          to="/lists/$list"
          params={{ list: "vehicles" }}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary"
        >
          All vehicles
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </Panel>
  );
}