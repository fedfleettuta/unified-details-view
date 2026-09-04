import { useMemo, useState } from "react";
import { Camera, MapPin } from "lucide-react";

import { Panel, PanelHeader } from "./Panel";
import { StatusPill } from "./StatusPill";
import { VehicleBlueprint } from "@/components/blueprint/VehicleBlueprint";
import { ZoneLegend } from "@/components/blueprint/ZoneLegend";
import type { BlueprintMarker, ZoneSelection } from "@/data/blueprints";
import { useVehicleBlueprint } from "@/data/blueprint-store";
import { getVehicleDamageReports, toMarker } from "@/data/damage-reports";
import type { RecordEvidence } from "@/data/records";

export function EvidencePanel({
  evidence,
  vehicleReg,
}: {
  evidence: RecordEvidence;
  vehicleReg?: string | undefined;
}) {
  const blueprint = useVehicleBlueprint(vehicleReg);
  const reports = useMemo(() => getVehicleDamageReports(vehicleReg), [vehicleReg]);
  const focus = reports.find((report) => report.id === evidence.reportId);

  const [view, setView] = useState(focus?.view ?? evidence.activeView);
  const [selection, setSelection] = useState<ZoneSelection | null>(null);

  const markers = useMemo<BlueprintMarker[]>(() => {
    if (reports.length) {
      return reports.map((report) =>
        toMarker(report, report.id === focus?.id ? report.kind : "existing"),
      );
    }
    if (!evidence.marker) return [];
    const fallbackView = blueprint.views[0]!;
    return [
      {
        id: "legacy-marker",
        view: evidence.activeView,
        zoneId: fallbackView.zones[0]!.id,
        position: { x: evidence.marker.x / 100, y: evidence.marker.y / 100 },
        label: evidence.marker.label,
        kind: "session",
      },
    ];
  }, [blueprint, evidence.activeView, evidence.marker, focus?.id, reports]);

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
      <Panel>
        <PanelHeader
          title={evidence.title}
          icon={<MapPin className="h-4 w-4" />}
          action={<ZoneLegend className="hidden sm:flex" />}
        />

        <VehicleBlueprint
          className="mt-4"
          blueprint={blueprint}
          view={view}
          onViewChange={(next) => {
            setView(next);
            setSelection(null);
          }}
          markers={markers}
          selectedZoneId={selection?.zoneId ?? (view === focus?.view ? focus?.zoneId : undefined)}
          selectedPoint={selection?.position}
          highlightMarkerId={focus?.id}
          onZoneSelect={setSelection}
          hint={evidence.hint}
        />

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-hairline pt-4 sm:grid-cols-4">
          <div>
            <dt className="label-micro">View</dt>
            <dd className="text-sm font-medium">{selection?.view ?? focus?.view ?? view}</dd>
          </div>
          <div>
            <dt className="label-micro">Zone</dt>
            <dd className="text-sm font-medium">
              {selection?.zoneName ??
                blueprint.views
                  .flatMap((v) => v.zones)
                  .find((z) => z.id === focus?.zoneId)?.name ??
                "—"}
            </dd>
          </div>
          <div>
            <dt className="label-micro">Zone id</dt>
            <dd className="font-mono text-xs text-muted-foreground">
              {selection?.zoneId ?? focus?.zoneId ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="label-micro">Position</dt>
            <dd className="num font-mono text-xs text-muted-foreground">
              {(() => {
                const point = selection?.position ?? focus?.position;
                return point ? `x ${point.x.toFixed(3)} · y ${point.y.toFixed(3)}` : "—";
              })()}
            </dd>
          </div>
        </dl>
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