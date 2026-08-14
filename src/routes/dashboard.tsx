import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Download, Plus, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatCards } from "@/components/list/StatCards";
import { QueuePanel } from "@/components/dashboard/QueuePanel";
import { BarPanel } from "@/components/dashboard/BarPanel";
import { BreakdownPanel } from "@/components/dashboard/BreakdownPanel";
import { FleetBoard } from "@/components/dashboard/FleetBoard";
import { ComplianceBoard } from "@/components/dashboard/ComplianceBoard";
import { DriverBoard } from "@/components/dashboard/DriverBoard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { dashboard } from "@/data/dashboard";

const TITLE = "Fleet admin dashboard — sessions, damages, spend";
const DESCRIPTION =
  "Admin control room for the vehicle damage inspection app: live sessions, approval queues, workshop pipeline, compliance expiries and cost trends.";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:py-12">
      <header className="space-y-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-xs text-muted-foreground">
            <li>
              <Link to="/" className="transition-colors hover:text-foreground">
                Fleet
              </Link>
            </li>
            <ChevronRight className="h-3 w-3 opacity-50" aria-hidden />
            <li aria-current="page" className="text-foreground">
              Dashboard
            </li>
          </ol>
        </nav>

        <div className="grid gap-4 sm:flex sm:items-start sm:justify-between">
          <div className="min-w-0 max-w-2xl space-y-2">
            <p className="label-micro">Admin overview</p>
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {dashboard.title}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">{dashboard.subtitle}</p>
            <p className="font-numeric text-xs text-muted-foreground/80">{dashboard.timestamp}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" aria-hidden />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" aria-hidden />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4" aria-hidden />
              New session
            </Button>
          </div>
        </div>
      </header>

      <StatCards stats={dashboard.stats} />

      <section className="grid gap-6 lg:grid-cols-2">
        {dashboard.queues.map((queue) => (
          <QueuePanel key={queue.title} queue={queue} />
        ))}
      </section>

      <FleetBoard />

      <section className="grid gap-6 lg:grid-cols-3">
        <BarPanel panel={dashboard.sessions} />
        <BreakdownPanel panel={dashboard.damageBreakdown} />
        <BreakdownPanel panel={dashboard.inspectionBreakdown} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <BarPanel panel={dashboard.spend} />
        <ComplianceBoard />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <DriverBoard />
        <ActivityFeed />
      </section>
    </div>
  );
}