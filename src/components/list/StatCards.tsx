import {
  Activity,
  AlertTriangle,
  Archive,
  Ban,
  Building2,
  CalendarClock,
  Car,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Euro,
  FileText,
  Fuel,
  Gauge,
  Gavel,
  Package,
  ShieldCheck,
  Users,
  Wrench,
  XCircle,
} from "lucide-react";
import type { ComponentType } from "react";

import { FieldValue } from "@/components/detail/Field";
import { cn } from "@/lib/utils";
import type { ListStat, ListStatIcon } from "@/data/lists";
import type { StatusTone } from "@/data/records";

const icons: Record<ListStatIcon, ComponentType<{ className?: string }>> = {
  activity: Activity,
  alert: AlertTriangle,
  archive: Archive,
  ban: Ban,
  building: Building2,
  calendar: CalendarClock,
  car: Car,
  check: CheckCircle2,
  clipboard: ClipboardCheck,
  clock: Clock,
  file: FileText,
  fuel: Fuel,
  gauge: Gauge,
  gavel: Gavel,
  money: Euro,
  package: Package,
  shield: ShieldCheck,
  users: Users,
  wrench: Wrench,
  x: XCircle,
};

const iconTone: Record<StatusTone, string> = {
  active: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
  neutral: "bg-surface-muted text-muted-foreground",
};

const valueTone: Record<StatusTone, string> = {
  active: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
  neutral: "text-foreground",
};

export function StatCards({ stats }: { stats: ListStat[] }) {
  if (!stats.length) return null;

  return (
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {stats.map((stat) => {
        const tone = stat.tone ?? "neutral";
        const Icon = stat.icon ? icons[stat.icon] : undefined;

        return (
          <div
            key={stat.label}
            className={cn(
              "rise-in rounded-xl border border-hairline bg-surface p-4 shadow-panel",
              stat.highlight && "border-danger/30 bg-danger-soft/40",
            )}
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0 space-y-1">
                <dt className="label-micro truncate">{stat.label}</dt>
                <dd
                  className={cn(
                    "font-display text-2xl font-semibold tracking-tight",
                    stat.tone && valueTone[tone],
                  )}
                >
                  <FieldValue value={stat.value} kind={stat.kind} className="text-inherit" />
                </dd>
                {stat.hint ? (
                  <p className="truncate text-xs text-muted-foreground">{stat.hint}</p>
                ) : null}
              </div>
              {Icon ? (
                <span
                  className={cn(
                    "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    iconTone[tone],
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
              ) : null}
            </div>
          </div>
        );
      })}
    </dl>
  );
}
