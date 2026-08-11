import { useMemo, useState } from "react";
import { ChevronRight, Download, Plus, Upload } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Panel, PanelHeader } from "@/components/detail/Panel";
import { FieldValue } from "@/components/detail/Field";
import { StatusPill } from "@/components/detail/StatusPill";
import { UploadDialog } from "@/components/detail/UploadDialog";
import { DataTable } from "./DataTable";
import { ListToolbar } from "./ListToolbar";
import type { ListConfig } from "@/data/lists";

export function ListPage({ list }: { list: ListConfig }) {
  const [segment, setSegment] = useState(list.segments[0]?.label ?? "All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<string | undefined>(undefined);

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    let next = list.rows.filter((row) => {
      const inSegment = segment === (list.segments[0]?.label ?? "All") || row.segment === segment;
      if (!inSegment) return false;
      if (!term) return true;
      return Object.values(row.cells).some((cell) =>
        `${cell.text} ${cell.sub ?? ""}`.toLowerCase().includes(term),
      );
    });
    if (sortKey) {
      next = [...next].sort((a, b) =>
        (a.cells[sortKey]?.text ?? "").localeCompare(b.cells[sortKey]?.text ?? ""),
      );
    }
    return next;
  }, [list, search, segment, sortKey]);

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
              {list.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-4 sm:flex sm:items-start sm:justify-between">
          <div className="min-w-0 max-w-2xl space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {list.title}
              </h1>
              <span className="font-numeric rounded-full bg-surface-muted px-2.5 py-1 text-xs text-muted-foreground">
                {list.rows.length} records
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{list.description}</p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Button size="sm" variant="outline">
              <Download className="h-3.5 w-3.5" aria-hidden />
              Export
            </Button>
            {list.uploadAction ? (
              <UploadDialog
                title={list.uploadAction}
                description={`Attach files against ${list.name.toLowerCase()}.`}
                trigger={
                  <Button size="sm" variant="outline">
                    <Upload className="h-3.5 w-3.5" aria-hidden />
                    {list.uploadAction}
                  </Button>
                }
              />
            ) : null}
            <Button size="sm" className="shadow-panel">
              <Plus className="h-3.5 w-3.5" aria-hidden />
              {list.primaryAction}
            </Button>
          </div>
        </div>
      </header>

      <Panel padded={false} className="px-5 py-4 sm:px-6">
        <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <dt className="label-micro">{stat.label}</dt>
              <dd className="text-lg font-semibold">
                {stat.tone ? (
                  <StatusPill label={stat.value} tone={stat.tone} size="sm" />
                ) : (
                  <FieldValue value={stat.value} kind={stat.kind} />
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Panel>

      <ListToolbar
        segments={list.segments}
        activeSegment={segment}
        onSegmentChange={(value) => {
          setSegment(value);
          setSelected([]);
        }}
        filters={list.filters}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder={list.searchPlaceholder}
      />

      {selected.length ? (
        <Panel padded={false} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
          <p className="text-sm">
            <span className="font-numeric font-semibold">{selected.length}</span> selected
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setSelected([])}>
              Clear
            </Button>
            <Button size="sm" variant="outline">
              Assign
            </Button>
            <Button size="sm">Bulk update</Button>
          </div>
        </Panel>
      ) : null}

      <DataTable
        columns={list.columns}
        rows={rows}
        selected={selected}
        sortKey={sortKey}
        onSort={setSortKey}
        onToggleRow={(id) =>
          setSelected((current) =>
            current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
          )
        }
        onToggleAll={() =>
          setSelected((current) => (current.length === rows.length ? [] : rows.map((row) => row.id)))
        }
        emptyLabel={list.emptyLabel}
      />

      <footer className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>
          Showing <span className="font-numeric">{rows.length}</span> of{" "}
          <span className="font-numeric">{list.rows.length}</span> {list.name.toLowerCase()}
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" disabled>
            Previous
          </Button>
          <Button size="sm" variant="outline">
            Next
          </Button>
        </div>
      </footer>
    </div>
  );
}
