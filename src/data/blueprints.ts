/**
 * Vehicle blueprints — the single source of geometry for every inspection flow.
 *
 * A blueprint belongs to a VEHICLE (not to a damage record): a set of views,
 * an optional uploaded image per view, and polygon zones with normalised
 * (0–1) coordinates so rendering stays resolution independent and responsive.
 */

export type BlueprintPoint = { x: number; y: number };

export interface BlueprintZone {
  id: string;
  name: string;
  /** Polygon outline in normalised 0–1 coordinates of the view frame. */
  points: BlueprintPoint[];
}

export interface BlueprintView {
  /** Human label, also used as the tab label, e.g. "Front". */
  label: string;
  /** Optional uploaded vehicle-specific blueprint image for this view. */
  image?: string;
  zones: BlueprintZone[];
}

export interface VehicleBlueprint {
  /** Vehicle registration this blueprint belongs to. */
  vehicleReg: string;
  model: string;
  /** Short caption shown next to the view name, e.g. "outline schematic". */
  label: string;
  views: BlueprintView[];
}

/** What a zone selection returns to the caller. */
export interface ZoneSelection {
  view: string;
  zoneId: string;
  zoneName: string;
  /** Precise point on the blueprint, normalised 0–1. */
  position: BlueprintPoint;
}

/** Marker kinds, so pre-existing / session / pending damages read differently. */
export type MarkerKind = "existing" | "session" | "pending" | "repaired";

export interface BlueprintMarker {
  id: string;
  view: string;
  zoneId: string;
  position: BlueprintPoint;
  label: string;
  kind: MarkerKind;
}

const rect = (x1: number, y1: number, x2: number, y2: number): BlueprintPoint[] => [
  { x: x1, y: y1 },
  { x: x2, y: y1 },
  { x: x2, y: y2 },
  { x: x1, y: y2 },
];

const poly = (...pairs: Array<[number, number]>): BlueprintPoint[] =>
  pairs.map(([x, y]) => ({ x, y }));

/** Panel-van zone set, shared by every van in the demo fleet. */
const vanViews: BlueprintView[] = [
  {
    label: "Front",
    zones: [
      { id: "front-roof-edge", name: "Roof edge — front", points: rect(0.26, 0.12, 0.74, 0.2) },
      { id: "windscreen", name: "Windscreen", points: poly([0.28, 0.2], [0.72, 0.2], [0.76, 0.38], [0.24, 0.38]) },
      { id: "bonnet", name: "Bonnet", points: rect(0.24, 0.38, 0.76, 0.5) },
      { id: "grille", name: "Grille", points: rect(0.36, 0.5, 0.64, 0.6) },
      { id: "headlight-left", name: "Headlight — left", points: rect(0.22, 0.5, 0.35, 0.59) },
      { id: "headlight-right", name: "Headlight — right", points: rect(0.65, 0.5, 0.78, 0.59) },
      { id: "bumper-front-left", name: "Front bumper — left", points: rect(0.2, 0.6, 0.5, 0.72) },
      { id: "bumper-front-right", name: "Front bumper — right", points: rect(0.5, 0.6, 0.8, 0.72) },
      { id: "front-plate", name: "Number plate — front", points: rect(0.42, 0.72, 0.58, 0.8) },
      { id: "wheel-front-left", name: "Wheel — front left", points: rect(0.16, 0.72, 0.28, 0.86) },
      { id: "wheel-front-right", name: "Wheel — front right", points: rect(0.72, 0.72, 0.84, 0.86) },
    ],
  },
  {
    label: "Rear",
    zones: [
      { id: "rear-roof-edge", name: "Roof edge — rear", points: rect(0.26, 0.12, 0.74, 0.2) },
      { id: "rear-window", name: "Rear window", points: rect(0.3, 0.2, 0.7, 0.36) },
      { id: "tailgate-left", name: "Rear door — left", points: rect(0.26, 0.36, 0.5, 0.62) },
      { id: "tailgate-right", name: "Rear door — right", points: rect(0.5, 0.36, 0.74, 0.62) },
      { id: "taillight-left", name: "Tail light — left", points: rect(0.2, 0.4, 0.26, 0.54) },
      { id: "taillight-right", name: "Tail light — right", points: rect(0.74, 0.4, 0.8, 0.54) },
      { id: "bumper-rear-left", name: "Rear bumper — left", points: rect(0.22, 0.62, 0.5, 0.74) },
      { id: "bumper-rear-right", name: "Rear bumper — right", points: rect(0.5, 0.62, 0.78, 0.74) },
      { id: "rear-plate", name: "Number plate — rear", points: rect(0.42, 0.74, 0.58, 0.82) },
    ],
  },
  {
    label: "Left",
    zones: [
      { id: "left-roof-rail", name: "Roof rail — left", points: rect(0.12, 0.2, 0.9, 0.27) },
      { id: "mirror-left", name: "Mirror — left", points: rect(0.08, 0.3, 0.16, 0.4) },
      { id: "front-wing-left", name: "Front wing — left", points: poly([0.12, 0.27], [0.3, 0.27], [0.3, 0.66], [0.12, 0.66]) },
      { id: "front-door-left", name: "Front door — left", points: rect(0.3, 0.27, 0.5, 0.66) },
      { id: "sliding-door-left", name: "Sliding door — left", points: rect(0.5, 0.27, 0.72, 0.66) },
      { id: "rear-panel-left", name: "Rear quarter panel — left", points: rect(0.72, 0.27, 0.9, 0.66) },
      { id: "sill-left", name: "Sill — left", points: rect(0.3, 0.66, 0.72, 0.74) },
      { id: "wheel-front-left-side", name: "Wheel — front left", points: rect(0.18, 0.66, 0.32, 0.84) },
      { id: "wheel-rear-left-side", name: "Wheel — rear left", points: rect(0.7, 0.66, 0.84, 0.84) },
    ],
  },
  {
    label: "Right",
    zones: [
      { id: "right-roof-rail", name: "Roof rail — right", points: rect(0.1, 0.2, 0.88, 0.27) },
      { id: "mirror-right", name: "Mirror — right", points: rect(0.84, 0.3, 0.92, 0.4) },
      { id: "front-wing-right", name: "Front wing — right", points: rect(0.7, 0.27, 0.88, 0.66) },
      { id: "front-door-right", name: "Front door — right", points: rect(0.5, 0.27, 0.7, 0.66) },
      { id: "sliding-door-right", name: "Sliding door — right", points: rect(0.28, 0.27, 0.5, 0.66) },
      { id: "rear-panel-right", name: "Rear quarter panel — right", points: rect(0.1, 0.27, 0.28, 0.66) },
      { id: "sill-right", name: "Sill — right", points: rect(0.28, 0.66, 0.7, 0.74) },
      { id: "wheel-front-right-side", name: "Wheel — front right", points: rect(0.68, 0.66, 0.82, 0.84) },
      { id: "wheel-rear-right-side", name: "Wheel — rear right", points: rect(0.16, 0.66, 0.3, 0.84) },
    ],
  },
  {
    label: "Roof",
    zones: [
      { id: "roof-front", name: "Roof — front third", points: rect(0.16, 0.24, 0.42, 0.76) },
      { id: "roof-mid", name: "Roof — centre", points: rect(0.42, 0.24, 0.64, 0.76) },
      { id: "roof-rear", name: "Roof — rear third", points: rect(0.64, 0.24, 0.86, 0.76) },
      { id: "roof-antenna", name: "Antenna mount", points: rect(0.2, 0.14, 0.3, 0.24) },
    ],
  },
  {
    label: "Interior",
    zones: [
      { id: "dashboard", name: "Dashboard", points: rect(0.14, 0.18, 0.86, 0.32) },
      { id: "seat-driver", name: "Driver seat", points: rect(0.16, 0.36, 0.44, 0.6) },
      { id: "seat-passenger", name: "Passenger seat", points: rect(0.56, 0.36, 0.84, 0.6) },
      { id: "headliner", name: "Headliner", points: rect(0.14, 0.08, 0.86, 0.18) },
      { id: "cargo-floor", name: "Cargo floor", points: rect(0.16, 0.64, 0.84, 0.88) },
    ],
  },
];

const blueprints: VehicleBlueprint[] = [
  {
    vehicleReg: "FED-003",
    model: "Toyota Hiace",
    label: "outline schematic",
    views: vanViews,
  },
  {
    vehicleReg: "FED-011",
    model: "Ford Transit",
    label: "outline schematic",
    views: vanViews,
  },
];

const fallbackBlueprint: VehicleBlueprint = {
  vehicleReg: "—",
  model: "Generic van",
  label: "generic schematic",
  views: vanViews,
};

/** Resolve the blueprint for a vehicle registration; falls back to the generic van. */
export function getBlueprint(vehicleReg?: string): VehicleBlueprint {
  if (!vehicleReg) return fallbackBlueprint;
  return blueprints.find((b) => b.vehicleReg === vehicleReg) ?? fallbackBlueprint;
}

export function getBlueprintView(blueprint: VehicleBlueprint, view: string): BlueprintView {
  return blueprint.views.find((v) => v.label === view) ?? blueprint.views[0]!;
}

export function findZone(blueprint: VehicleBlueprint, view: string, zoneId: string) {
  return getBlueprintView(blueprint, view).zones.find((z) => z.id === zoneId);
}

/** Ray-casting point-in-polygon test on normalised coordinates. */
export function isPointInZone(point: BlueprintPoint, zone: BlueprintZone) {
  const pts = zone.points;
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const a = pts[i]!;
    const b = pts[j]!;
    const intersects =
      a.y > point.y !== b.y > point.y &&
      point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x;
    if (intersects) inside = !inside;
  }
  return inside;
}

export function zoneCentroid(zone: BlueprintZone): BlueprintPoint {
  const n = zone.points.length;
  const sum = zone.points.reduce(
    (acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }),
    { x: 0, y: 0 },
  );
  return { x: sum.x / n, y: sum.y / n };
}

export function zoneAtPoint(blueprint: VehicleBlueprint, view: string, point: BlueprintPoint) {
  return getBlueprintView(blueprint, view).zones.find((zone) => isPointInZone(point, zone));
}
