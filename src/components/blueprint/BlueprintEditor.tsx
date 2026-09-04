import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { Check, ImageUp, Pencil, RotateCcw, Save, Trash2, Undo2, X } from "lucide-react";

import { Panel, PanelHeader } from "@/components/detail/Panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VehicleBlueprint } from "./VehicleBlueprint";
import { cn } from "@/lib/utils";
import { blueprintVehicles, getBlueprintView, type BlueprintPoint, type BlueprintZone } from "@/data/blueprints";
import {
  hasOverride,
  resetVehicleOverride,
  resetViewOverride,
  saveViewOverride,
  useVehicleBlueprint,
} from "@/data/blueprint-store";
import { getVehicleDamageReports, toMarker } from "@/data/damage-reports";

const MAX_IMAGE_WIDTH = 1400;

/** Downscale an uploaded image and return it as a data URL. */
async function fileToDataUrl(file: File): Promise<string> {
  const raw = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("Could not read image"));
    el.src = raw;
  });

  if (img.width <= MAX_IMAGE_WIDTH) return raw;
  const scale = MAX_IMAGE_WIDTH / img.width;
  const canvas = document.createElement("canvas");
  canvas.width = MAX_IMAGE_WIDTH;
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return raw;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.86);
}

const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || `zone-${Date.now()}`;

export function BlueprintEditor() {
  const [vehicleReg, setVehicleReg] = useState(blueprintVehicles[0]?.vehicleReg ?? "FED-003");
  const blueprint = useVehicleBlueprint(vehicleReg);
  const [viewLabel, setViewLabel] = useState(blueprint.views[0]!.label);
  const view = useMemo(() => getBlueprintView(blueprint, viewLabel), [blueprint, viewLabel]);

  const [image, setImage] = useState<string | undefined>(view.image);
  const [zones, setZones] = useState<BlueprintZone[]>(view.zones);
  const [draft, setDraft] = useState<BlueprintPoint[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [pendingName, setPendingName] = useState("");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Reload the draft whenever the vehicle or view changes.
  useEffect(() => {
    setImage(view.image);
    setZones(view.zones);
    setDraft([]);
    setDrawing(false);
    setPendingName("");
    setRenamingId(null);
    setDirty(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleReg, viewLabel]);

  const markers = useMemo(
    () => getVehicleDamageReports(vehicleReg).map((report) => toMarker(report)),
    [vehicleReg],
  );

  const addPoint = (event: MouseEvent<HTMLDivElement>) => {
    if (!drawing) return;
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const point = {
      x: Number(((event.clientX - rect.left) / rect.width).toFixed(4)),
      y: Number(((event.clientY - rect.top) / rect.height).toFixed(4)),
    };
    setDraft((prev) => [...prev, point]);
  };

  const commitZone = () => {
    if (draft.length < 3) {
      setStatus("A zone needs at least three points.");
      return;
    }
    const name = pendingName.trim() || `Zone ${zones.length + 1}`;
    let id = slug(name);
    if (zones.some((zone) => zone.id === id)) id = `${id}-${zones.length + 1}`;
    setZones((prev) => [...prev, { id, name, points: draft }]);
    setDraft([]);
    setDrawing(false);
    setPendingName("");
    setDirty(true);
    setStatus(`Zone "${name}" drawn — save to publish it.`);
  };

  const onUpload = async (file: File | undefined) => {
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setImage(dataUrl);
      setDirty(true);
      setStatus("Image loaded — save to publish it.");
    } catch {
      setStatus("That file could not be read as an image.");
    }
  };

  const save = () => {
    saveViewOverride(vehicleReg, viewLabel, { ...(image ? { image } : {}), zones });
    setDirty(false);
    setStatus(`Saved ${zones.length} zones on ${viewLabel} for ${vehicleReg}. Start and Return now use this.`);
  };

  const revertView = () => {
    resetViewOverride(vehicleReg, viewLabel);
    setStatus(`${viewLabel} reset to the built-in schematic.`);
    setDirty(false);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
      <Panel>
        <PanelHeader
          title="Draw zones"
          icon={<Pencil className="h-4 w-4" />}
          action={
            <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              {zones.length} zones · {viewLabel}
            </span>
          }
        />

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <select
            value={vehicleReg}
            onChange={(event) => setVehicleReg(event.target.value)}
            aria-label="Vehicle"
            className="h-8 rounded-md border border-hairline bg-surface px-2 text-xs"
          >
            {blueprintVehicles.map((vehicle) => (
              <option key={vehicle.vehicleReg} value={vehicle.vehicleReg}>
                {vehicle.vehicleReg} — {vehicle.model}
              </option>
            ))}
          </select>

          {blueprint.views.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => setViewLabel(option.label)}
              aria-pressed={option.label === viewLabel}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                option.label === viewLabel
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
          onClick={addPoint}
          className={cn(
            "relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border border-hairline bg-surface-muted/50",
            drawing && "cursor-crosshair ring-2 ring-primary/40",
          )}
        >
          {image ? (
            <img
              src={image}
              alt={`${vehicleReg} ${viewLabel} blueprint`}
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : (
            <span className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-xs text-muted-foreground">
              No image uploaded for this view yet
            </span>
          )}

          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {zones.map((zone) => (
              <polygon
                key={zone.id}
                points={zone.points.map((p) => `${p.x * 100},${p.y * 100}`).join(" ")}
                className={cn(
                  "fill-primary/5 stroke-hairline",
                  renamingId === zone.id && "fill-primary/20 stroke-primary",
                )}
                strokeWidth={0.4}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {draft.length > 1 ? (
              <polygon
                points={draft.map((p) => `${p.x * 100},${p.y * 100}`).join(" ")}
                className="fill-primary/20 stroke-primary"
                strokeWidth={0.6}
                strokeDasharray="3 2"
                vectorEffect="non-scaling-stroke"
              />
            ) : null}
            {draft.map((p, index) => (
              <circle
                key={`${p.x}-${p.y}-${index}`}
                cx={p.x * 100}
                cy={p.y * 100}
                r={0.9}
                className="fill-primary"
              />
            ))}
          </svg>

          <span className="pointer-events-none absolute top-3 left-3 label-micro">
            {vehicleReg} · {viewLabel}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              void onUpload(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
          <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
            <ImageUp className="h-4 w-4" aria-hidden />
            Upload image
          </Button>

          {drawing ? (
            <>
              <Input
                value={pendingName}
                onChange={(event) => setPendingName(event.target.value)}
                placeholder="Zone name, e.g. Front bumper — left"
                className="h-8 w-56 text-xs"
              />
              <Button size="sm" onClick={commitZone}>
                <Check className="h-4 w-4" aria-hidden />
                Finish zone
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDraft((prev) => prev.slice(0, -1))}
                disabled={!draft.length}
              >
                <Undo2 className="h-4 w-4" aria-hidden />
                Undo point
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setDrawing(false);
                  setDraft([]);
                  setPendingName("");
                }}
              >
                <X className="h-4 w-4" aria-hidden />
                Cancel
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => setDrawing(true)}>
              <Pencil className="h-4 w-4" aria-hidden />
              Draw a zone
            </Button>
          )}

          <Button variant="outline" size="sm" onClick={save} disabled={!dirty}>
            <Save className="h-4 w-4" aria-hidden />
            Save for Start &amp; Return
          </Button>
          <Button variant="ghost" size="sm" onClick={revertView}>
            <RotateCcw className="h-4 w-4" aria-hidden />
            Reset view
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              resetVehicleOverride(vehicleReg);
              setStatus(`All saved views cleared for ${vehicleReg}.`);
              setDirty(false);
            }}
          >
            Reset vehicle
          </Button>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          {drawing
            ? `Click the blueprint to drop points (${draft.length} placed), then name the zone and finish it.`
            : "Upload the vehicle photo or schematic for this view, then draw a polygon per panel. Coordinates are stored normalised, so zones scale with any screen size."}
        </p>
        {status ? <p className="mt-2 text-xs font-medium text-foreground">{status}</p> : null}

        <ul className="mt-4 divide-y divide-hairline rounded-lg border border-hairline">
          {zones.length ? (
            zones.map((zone) => (
              <li key={zone.id} className="flex items-center gap-2 px-3 py-2">
                {renamingId === zone.id ? (
                  <Input
                    autoFocus
                    defaultValue={zone.name}
                    className="h-7 flex-1 text-xs"
                    onBlur={(event) => {
                      const name = event.target.value.trim();
                      if (name)
                        setZones((prev) =>
                          prev.map((z) => (z.id === zone.id ? { ...z, name } : z)),
                        );
                      setRenamingId(null);
                      setDirty(true);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") event.currentTarget.blur();
                      if (event.key === "Escape") setRenamingId(null);
                    }}
                  />
                ) : (
                  <>
                    <span className="min-w-0 flex-1 truncate text-xs">{zone.name}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{zone.id}</span>
                    <span className="text-[11px] text-muted-foreground">{zone.points.length} pts</span>
                    <button
                      type="button"
                      aria-label={`Rename ${zone.name}`}
                      onClick={() => setRenamingId(zone.id)}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Pencil className="h-3.5 w-3.5" aria-hidden />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${zone.name}`}
                      onClick={() => {
                        setZones((prev) => prev.filter((z) => z.id !== zone.id));
                        setDirty(true);
                      }}
                      className="text-muted-foreground transition-colors hover:text-danger"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  </>
                )}
              </li>
            ))
          ) : (
            <li className="px-3 py-3 text-xs text-muted-foreground">
              No zones on this view yet — draw the first one.
            </li>
          )}
        </ul>
      </Panel>

      <Panel>
        <PanelHeader
          title="What drivers will see"
          action={
            <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              {hasOverride(vehicleReg, viewLabel) ? "Custom" : "Built-in"}
            </span>
          }
        />
        <p className="mt-3 text-xs text-muted-foreground">
          Live preview of the saved blueprint — identical geometry to Start Vehicle, Return Vehicle
          and the admin review. Click a zone to check the selection payload.
        </p>
        <VehicleBlueprint
          className="mt-4"
          blueprint={blueprint}
          view={viewLabel}
          onViewChange={setViewLabel}
          markers={markers}
          hint="Selection returns view, zone id, zone name and the exact point."
        />
        {dirty ? (
          <p className="mt-3 text-xs font-medium text-warning">
            Unsaved changes — the preview still shows the last saved version.
          </p>
        ) : null}
      </Panel>
    </div>
  );
}
