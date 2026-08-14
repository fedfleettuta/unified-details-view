import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { StatusPill } from "@/components/detail/StatusPill";
import { Panel } from "@/components/detail/Panel";
import { records } from "@/data/records";
import { lists } from "@/data/lists";

const TITLE = "Fleet Detail Kit — one template, every record";
const DESCRIPTION =
  "A shared detail-page template for fleet records: licences, assets, fines, fuel and maintenance rendered from one config-driven layout.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

const rules = [
  {
    title: "No stat cards",
    body: "Headline values live once, in the at-a-glance rail. The field grid never repeats them.",
  },
  {
    title: "One header block",
    body: "Breadcrumb, title, status, vehicle chip and a single contextual line — actions on the right.",
  },
  {
    title: "Grouped fields",
    body: "Fields sit under quiet group labels, and empty ones collapse behind a toggle.",
  },
  {
    title: "Shared rail & activity",
    body: "Documents always live in the rail; history and audit trails share one Activity block.",
  },
];

function Index() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="max-w-2xl space-y-4">
        <p className="label-micro">Design system · detail pages</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          One detail template, eleven record types
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          Every page below is the same component tree driven by a record config. Nothing is shown
          twice, every field from the original screens is still there.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="label-micro">Admin dashboard</h2>
        <div className="mt-4">
          <Link
            to="/dashboard"
            className="group block rounded-xl border border-hairline bg-surface p-5 shadow-panel transition-all hover:-translate-y-0.5 hover:border-primary/40"
          >
            <span className="label-micro">Overview</span>
            <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
              Fleet control room
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              KPIs, approval queues, workshop pipeline, fleet status board, spend trend, compliance
              expiries, driver activity and audit feed.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
              Open dashboard
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="label-micro">Record types</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {records.map((record) => (
            <li key={record.slug}>
              <Link
                to="/records/$type"
                params={{ type: record.slug }}
                className="group block h-full rounded-xl border border-hairline bg-surface p-5 shadow-panel transition-all hover:-translate-y-0.5 hover:border-primary/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="label-micro">{record.listName}</span>
                  <StatusPill label={record.status.label} tone={record.status.tone} size="sm" />
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                  {record.typeLabel}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {record.vehicle
                    ? `${record.vehicle.reg} · ${record.vehicle.model}`
                    : record.crumb}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                  Open detail page
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="label-micro">List pages</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          One shared list template: header with stats, segment tabs, filters and search, a selectable
          data table with bulk actions, plus New / Upload / Export actions.
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lists.map((list) => (
            <li key={list.slug}>
              <Link
                to="/lists/$list"
                params={{ list: list.slug }}
                className="group block h-full rounded-xl border border-hairline bg-surface p-5 shadow-panel transition-all hover:-translate-y-0.5 hover:border-primary/40"
              >
                <span className="label-micro">List page</span>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                  {list.title}
                </h3>
                <p className="mt-1 font-numeric text-sm text-muted-foreground">
                  {list.rows.length} sample rows
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                  Open list page
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="label-micro">Template rules</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {rules.map((rule) => (
            <Panel key={rule.title}>
              <h3 className="font-display text-sm font-semibold tracking-tight">{rule.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{rule.body}</p>
            </Panel>
          ))}
        </div>
      </section>
    </div>
  );
}
