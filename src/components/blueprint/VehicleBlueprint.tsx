import { useMemo, useRef, type KeyboardEvent, type MouseEvent } from "react";

import { cn } from "@/lib/utils";
import {
  getBlueprintView,
  zoneAtPoint,
  type BlueprintMarker,
  type MarkerKind,
  type VehicleBlueprint as VehicleBlueprintData,
  type ZoneSelection,
} from "@/data/blueprints";

const markerStyles: Record<MarkerKind, { dot: string; ring: string }> = {
  pending: { dot: "bg-warning text-surface", ring: "bg-warning/30" },
  session: { dot: "bg-danger text-surface", ring: "bg-danger/30" },
  existing: { dot: "bg-info text-surface", ring: "bg-info/25" },
  repaired: { dot: "bg-success text-surface", ring: "bg-success/25" },
};

const markerGlyph: Record<MarkerKind, string> = {
  pending: "?",
  session: "!",
  existing: "•",
  repaired: "✓",
};

export function VehicleBlueprint({
  blueprint,
  view,
  onViewChange,
  markers = [],
  selectedZoneId,
  selectedPoint,
  highlightMarkerId,
  onZoneSelect,
  hint,
  readOnly = false,
  className,
}: {
  blueprint: VehicleBlueprintData;
  view: string;
  onViewChange?: (view: string) => void;
  markers?: BlueprintMarker[];
  selectedZoneId?: string | undefined;
  selectedPoint?: { x: number; y: number } | undefined;
  highlightMarkerId?: string | undefined;
  onZoneSelect?: (selection: ZoneSelection) => void;
  hint?: string | undefined;
  readOnly?: boolean;
  className?: string | undefined;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const activeView = useMemo(() => getBlueprintView(blueprint, view), [blueprint, view]);
  const viewMarkers = markers.filter((marker) => marker.view === activeView.label);

  const select = (zoneId: string, position: { x: number; y: number }) => {
    if (readOnly || !onZoneSelect) return;
    const zone = activeView.zones.find((z) => z.id === zoneId);
    if (!zone) return;
    onZoneSelect({
      view: activeView.label,
      zoneId: zone.id,
      zoneName: zone.name,
      position,
    });
  };

  const handleFrameClick = (event: MouseEvent<HTMLDivElement>) => {
    if (readOnly || !onZoneSelect) return;
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const point = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };
    const zone = zoneAtPoint(blueprint, activeView.label, point);
    if (!zone) return;
    select(zone.id, { x: Number(point.x.toFixed(4)), y: Number(point.y.toFixed(4)) });
  };

  const handleZoneKeyDown = (event: KeyboardEvent<SVGGElement>, index: number) => {
    const zones = activeView.zones;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const zone = zones[index]!;
      const centre = zone.points.reduce(
        (acc, p) => ({ x: acc.x + p.x / zone.points.length, y: acc.y + p.y / zone.points.length }),
        { x: 0, y: 0 },
      );
      select(zone.id, { x: Number(centre.x.toFixed(4)), y: Number(centre.y.toFixed(4)) });
      return;
    }
    const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + zones.length) % zones.length;
    const target = event.currentTarget.parentElement?.querySelectorAll<SVGGElement>("[data-zone]")[next];
    target?.focus();
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap gap-1.5">
        {blueprint.views.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => onViewChange?.(option.label)}
            aria-pressed={activeView.label === option.label}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              activeView.label === option.label
                ? "bg-primary text-primary-foreground"
                : "bg-surface-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div
        ref={frameRef}
        onClick={handleFrameClick}
        className={cn(
          "relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-hairline bg-surface-muted/50",
          !readOnly && onZoneSelect && "cursor-crosshair",
        )}
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, currentColor 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, currentColor 8%, transparent) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />

        {activeView.image ? (
          <img
            src={activeView.image}
            alt={`${blueprint.vehicleReg} ${activeView.label} blueprint`}
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : null}

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          role="group"
          aria-label={`${activeView.label} view zones`}
        >
          {activeView.zones.map((zone, index) => {
            const isSelected = zone.id === selectedZoneId;
            const hasMarker = viewMarkers.some((marker) => marker.zoneId === zone.id);
            return (
              <g
                key={zone.id}
                data-zone={zone.id}
                tabIndex={readOnly ? -1 : 0}
                role="button"
                aria-label={zone.name}
                aria-pressed={isSelected}
                onKeyDown={(event) => handleZoneKeyDown(event, index)}
                className="outline-none focus-visible:[&>polygon]:stroke-primary"
              >
                <polygon
                  points={zone.points.map((p) => `${p.x * 100},${p.y * 100}`).join(" ")}
                  className={cn(
                    "transition-colors",
                    isSelected
                      ? "fill-primary/20 stroke-primary"
                      : hasMarker
                        ? "fill-danger/10 stroke-hairline hover:fill-primary/10"
                        : "fill-transparent stroke-hairline hover:fill-primary/10",
                  )}
                  strokeWidth={0.4}
                  vectorEffect="non-scaling-stroke"
                />
                <title>{zone.name}</title>
              </g>
            );
          })}
        </svg>

        <span className="pointer-events-none absolute top-3 left-3 label-micro">
          {activeView.label} · {blueprint.label}
        </span>
        <span className="pointer-events-none absolute top-3 right-3 rounded-md bg-surface/80 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
          {blueprint.vehicleReg}
        </span>

        {viewMarkers.map((marker) => {
          const style = markerStyles[marker.kind];
          const dim = highlightMarkerId ? marker.id !== highlightMarkerId : false;
          return (
            <span
              key={marker.id}
              className={cn(
                "pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 transition-opacity",
                dim && "opacity-40",
              )}
              style={{ left: `${marker.position.x * 100}%`, top: `${marker.position.y * 100}%` }}
            >
              <span className="relative flex h-6 w-6 items-center justify-center">
                {!dim ? (
                  <span className={cn("absolute inset-0 animate-ping rounded-full", style.ring)} aria-hidden />
                ) : null}
                <span
                  className={cn(
                    "relative flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold shadow-panel",
                    style.dot,
                  )}
                >
                  {markerGlyph[marker.kind]}
                </span>
              </span>
              <span className="mt-1 block -translate-x-1/2 rounded-md bg-surface px-2 py-0.5 text-[11px] font-medium whitespace-nowrap shadow-panel">
                {marker.label}
              </span>
            </span>
          );
        })}

        {selectedPoint ? (
          <span
            className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-surface"
            style={{ left: `${selectedPoint.x * 100}%`, top: `${selectedPoint.y * 100}%` }}
            aria-hidden
          />
        ) : null}

        {!viewMarkers.length ? (
          <span className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-xs text-muted-foreground">
            No damage recorded on this view
          </span>
        ) : null}
      </div>

      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
