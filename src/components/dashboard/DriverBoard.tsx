import { Link } from "@tanstack/react-router";
import { ArrowRight, Users } from "lucide-react";

import { Panel, PanelHeader } from "@/components/detail/Panel";
import { StatusPill } from "@/components/detail/StatusPill";
import { dashboard } from "@/data/dashboard";

export function DriverBoard() {
  const { title, note, rows } = dashboard.drivers;

  return (
    <Panel padded={false} className="overflow-hidden">
      <div className="px-5 pt-5 sm:px-6 sm:pt-6">
        <PanelHeader
          title={title}
          icon={<Users className="h-4 w-4" />}
          action={<span className="text-xs text-muted-foreground">{note}</span>}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-hairline">
              {["Driver", "Sessions", "Hours", "Km", "Damages reported", "Return checks"].map(
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
              <tr key={row.name} className="transition-colors hover:bg-surface-muted/50">
                <td className="px-5 py-3.5 font-medium sm:px-6">{row.name}</td>
                <td className="font-numeric px-5 py-3.5 sm:px-6">{row.sessions}</td>
                <td className="font-numeric px-5 py-3.5 sm:px-6">{row.hours}</td>
                <td className="font-numeric px-5 py-3.5 sm:px-6">{row.km}</td>
                <td className="font-numeric px-5 py-3.5 sm:px-6">{row.reported}</td>
                <td className="px-5 py-3.5 sm:px-6">
                  <StatusPill label={row.missed.label} tone={row.missed.tone} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-hairline px-5 py-4 sm:px-6">
        <Link
          to="/lists/$list"
          params={{ list: "drivers" }}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary"
        >
          All drivers
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </Panel>
  );
}