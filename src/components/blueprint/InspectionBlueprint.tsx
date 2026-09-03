import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";

import { Panel, PanelHeader } from "@/components/detail/Panel";
import { VehicleBlueprint } from "./VehicleBlueprint";
import { ZoneLegend } from "./ZoneLegend";
import { cn } from "@/lib/utils";
import { getBlueprint, type BlueprintMarker, type ZoneSelection } from "@/data/blueprints";
import { getVehicleDamageReports, toMarker } from "@/data/damage-reports";
import type { RecordBlueprint } from "@/data/records";

/**
 * The shared blueprint surface used by the Start Vehicle inspection, the Return
 * Vehicle inspection and the admin vehicle blueprint. All three read the same
 * per-vehicle geometry, so zones and markers are identical by construction.
 */
export function InspectionBlueprint({
  config,
  vehicleReg,
}: {
  config: RecordBlueprint;
  vehicleReg?: string | undefined;
}) {
  const blueprint = useMemo(() => getBlueprint(vehicleReg), [vehicleReg]);
  const reports = useMemo(() => getVehicleDamageReports(vehicleReg), [vehicleReg]);

  const [phaseId, setPhaseId] = useState(config.phases[0]?.id ?? "all");
  const phase = config.phases.find((p) => p.id === phaseId) ?? config.phases[0];
  const [view, setView] = useState(config.activeView ?? blueprint.views[0]!.label);
  const [selection, setSelection] = useState<ZoneSelection | null>(null);

  const markers = useMemo<BlueprintMarker[]>(() => {
    if (!phase || phase.phase === "all") return reports.map((report) => toMarker(report));
    return reports.map((report) => {
      const inPhase =
        report.phase === phase.phase &&
        (!phase.sessionRef || report.sessionRef === phase.sessionRef);
      if (inPhase) return toMarker(report, report.approval === "Pending" ? "pending" : "session");
      return toMarker(report, report.repairState === "Repaired" ? "repaired" : "existing");
    });
  }, [phase, reports]);

  return (
    <Panel>
      <PanelHeader
        title={config.title}
        icon={<MapPin className="h-4 w-4" />}
        action={
          <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            {markers.filter((marker) => marker.view === view).length} on {view.toLowerCase()}
          </span>
        }
      />

      {config.note ? <p className="mt-3 text-xs text-muted-foreground">{config.note}</p> : null}

      {config.phases.length > 1 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {config.phases.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setPhaseId(option.id);
                setSelection(null);
              }}
              aria-pressed={option.id === phaseId}
              className={cn(
                "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                option.id === phaseId
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-hairline bg-surface text-muted-foreground hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}

      {phase?.note ? <p className="mt-3 text-xs text-muted-foreground">{phase.note}</p> : null}

      <VehicleBlueprint
        className="mt-4"
        blueprint={blueprint}
        view={view}
        onViewChange={(next) => {
          setView(next);
          setSelection(null);
        }}
        markers={markers}
        selectedZoneId={selection?.zoneId}
        selectedPoint={selection?.position}
        onZoneSelect={setSelection}
        readOnly={phase?.readOnly ?? false}
        hint={config.hint}
      />

      <div className="mt-4 grid gap-3 border-t border-hairline pt-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        {selection ? (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-4">
            <div>
              <dt className="label-micro">View</dt>
              <dd className="text-sm font-medium">{selection.view}</dd>
            </div>
            <div>
              <dt className="label-micro">Zone</dt>
              <dd className="text-sm font-medium">{selection.zoneName}</dd>
            </div>
            <div>
              <dt className="label-micro">Zone id</dt>
              <dd className="font-mono text-xs text-muted-foreground">{selection.zoneId}</dd>
            </div>
            <div>
              <dt className="label-micro">Position</dt>
              <dd className="num font-mono text-xs text-muted-foreground">
                x {selection.position.x.toFixed(3)} · y {selection.position.y.toFixed(3)}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="text-xs text-muted-foreground">
            {phase?.readOnly
              ? "Read-only view — zone selection is disabled for this phase."
              : "Select a zone on the blueprint to capture view, zone and precise position."}
          </p>
        )}
        <ZoneLegend kinds={config.legendKinds} className="sm:justify-end" />
      </div>
    </Panel>
  );
}
