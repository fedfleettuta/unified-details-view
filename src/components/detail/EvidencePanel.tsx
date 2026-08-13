import { useState } from "react";
import { Camera, MapPin } from "lucide-react";

import { Panel, PanelHeader } from "./Panel";
import { StatusPill } from "./StatusPill";
import { cn } from "@/lib/utils";
import type { RecordEvidence } from "@/data/records";

export function EvidencePanel({ evidence }: { evidence: RecordEvidence }) {
  const [view, setView] = useState(evidence.activeView);
  const showMarker = evidence.marker && view === evidence.activeView;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
      <Panel>
        <PanelHeader title={evidence.title} icon={<MapPin className="h-4 w-4" />} />

        <div className="mt-4 flex flex-wrap gap-1.5">
          {evidence.views.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setView(option)}
              aria-pressed={view === option}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                view === option
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-lg border border-hairline bg-surface-muted/50">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(to right, color-mix(in oklab, currentColor 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, currentColor 8%, transparent) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
            aria-hidden
          />
          <span className="absolute top-3 left-3 label-micro">
            {view} · {evidence.blueprintLabel}
          </span>
          {showMarker && evidence.marker ? (
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${evidence.marker.x}%`, top: `${evidence.marker.y}%` }}
            >
              <span className="relative flex h-6 w-6 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-danger/30" aria-hidden />
                <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-danger text-[11px] font-bold text-surface shadow-panel">
                  !
                </span>
              </span>
              <span className="mt-1 block -translate-x-1/2 rounded-md bg-surface px-2 py-0.5 text-[11px] font-medium whitespace-nowrap shadow-panel">
                {evidence.marker.label}
              </span>
            </span>
          ) : (
            <span className="absolute inset-x-0 bottom-4 text-center text-xs text-muted-foreground">
              No marker on this view
            </span>
          )}
        </div>

        {evidence.hint ? (
          <p className="mt-3 text-xs text-muted-foreground">{evidence.hint}</p>
        ) : null}
      </Panel>

      <Panel>
        <PanelHeader
          title={evidence.photosTitle}
          icon={<Camera className="h-4 w-4" />}
          action={
            <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              {evidence.photos.length}
            </span>
          }
        />
        {evidence.photos.length ? (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {evidence.photos.map((photo) => (
              <li
                key={photo.name}
                className="overflow-hidden rounded-lg border border-hairline bg-surface-muted/50"
              >
                <div className="flex aspect-[4/3] items-center justify-center">
                  <Camera className="h-5 w-5 text-muted-foreground/60" aria-hidden />
                </div>
                <div className="space-y-1.5 border-t border-hairline p-2.5">
                  <p className="truncate font-mono text-[11px] text-muted-foreground">
                    {photo.name}
                  </p>
                  {photo.approvalLabel ? (
                    <StatusPill
                      label={photo.approvalLabel}
                      tone={photo.approvalTone ?? "neutral"}
                      size="sm"
                    />
                  ) : null}
                  {evidence.photoActions?.length ? (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {evidence.photoActions.map((action) => (
                        <button
                          key={action}
                          type="button"
                          className="rounded-md border border-hairline bg-surface px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            {evidence.photosEmptyLabel ?? "No photos attached."}
          </p>
        )}
      </Panel>
    </div>
  );
}