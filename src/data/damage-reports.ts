/**
 * Driver damage reports — the source of blueprint markers.
 *
 * Each report references a vehicle, a blueprint view, a zone id and a precise
 * point on that view, so markers and zone geometry can never disagree. This is
 * demo data only; the existing damage records and their review logic are
 * untouched.
 */

import type { BlueprintMarker, BlueprintPoint, MarkerKind } from "./blueprints";

export type InspectionPhase = "pre-trip" | "return" | "spot-check";

export interface DamageReport {
  id: string;
  reference: string;
  vehicleReg: string;
  view: string;
  zoneId: string;
  /** Precise point on the view, normalised 0–1. */
  position: BlueprintPoint;
  typeLabel: string;
  severity: "Minor" | "Moderate" | "Severe";
  reportedBy: string;
  reportedAt: string;
  sessionRef?: string;
  phase: InspectionPhase;
  approval: "Pending" | "Approved" | "Rejected";
  repairState?: "To repair" | "In repair" | "Repaired";
  kind: MarkerKind;
  photoCount: number;
  /** Detail record slug this report opens, when one exists in the demo. */
  recordSlug?: string;
}

export const damageReports: DamageReport[] = [
  {
    id: "dmg-4471",
    reference: "DMG-4471",
    vehicleReg: "FED-003",
    view: "Front",
    zoneId: "bumper-front-left",
    position: { x: 0.34, y: 0.65 },
    typeLabel: "Scratch",
    severity: "Minor",
    reportedBy: "AA AA",
    reportedAt: "07/08/2026, 17:05",
    sessionRef: "SES-1182",
    phase: "return",
    approval: "Approved",
    repairState: "To repair",
    kind: "session",
    photoCount: 2,
    recordSlug: "damage",
  },
  {
    id: "fed003-016",
    reference: "FED003-016",
    vehicleReg: "FED-003",
    view: "Front",
    zoneId: "grille",
    position: { x: 0.47, y: 0.55 },
    typeLabel: "Missing part",
    severity: "Moderate",
    reportedBy: "AA AA",
    reportedAt: "07/08/2026, 17:07",
    sessionRef: "SES-1182",
    phase: "return",
    approval: "Pending",
    kind: "pending",
    photoCount: 2,
    recordSlug: "damage-pending",
  },
  {
    id: "dmg-4390",
    reference: "DMG-4390",
    vehicleReg: "FED-003",
    view: "Left",
    zoneId: "sliding-door-left",
    position: { x: 0.61, y: 0.45 },
    typeLabel: "Dent",
    severity: "Moderate",
    reportedBy: "AA AA",
    reportedAt: "11/07/2026, 22:41",
    sessionRef: "SES-0007",
    phase: "pre-trip",
    approval: "Approved",
    repairState: "In repair",
    kind: "existing",
    photoCount: 1,
    recordSlug: "damage",
  },
  {
    id: "dmg-4402",
    reference: "DMG-4402",
    vehicleReg: "FED-003",
    view: "Rear",
    zoneId: "bumper-rear-right",
    position: { x: 0.66, y: 0.68 },
    typeLabel: "Scratch",
    severity: "Minor",
    reportedBy: "BB BB",
    reportedAt: "12/07/2026, 14:36",
    sessionRef: "SES-0007",
    phase: "return",
    approval: "Approved",
    repairState: "Repaired",
    kind: "repaired",
    photoCount: 3,
  },
  {
    id: "dmg-4318",
    reference: "DMG-4318",
    vehicleReg: "FED-003",
    view: "Interior",
    zoneId: "seat-driver",
    position: { x: 0.29, y: 0.5 },
    typeLabel: "Tear",
    severity: "Minor",
    reportedBy: "AA AA",
    reportedAt: "02/06/2026, 08:12",
    phase: "spot-check",
    approval: "Approved",
    repairState: "Repaired",
    kind: "repaired",
    photoCount: 1,
  },
  {
    id: "dmg-4295",
    reference: "DMG-4295",
    vehicleReg: "FED-003",
    view: "Roof",
    zoneId: "roof-rear",
    position: { x: 0.75, y: 0.42 },
    typeLabel: "Hail damage",
    severity: "Minor",
    reportedBy: "AA AA",
    reportedAt: "18/05/2026, 07:55",
    phase: "pre-trip",
    approval: "Approved",
    repairState: "To repair",
    kind: "existing",
    photoCount: 2,
  },
];

export function getVehicleDamageReports(vehicleReg?: string) {
  if (!vehicleReg) return [];
  return damageReports.filter((report) => report.vehicleReg === vehicleReg);
}

export function getSessionDamageReports(sessionRef: string, phase?: InspectionPhase) {
  return damageReports.filter(
    (report) => report.sessionRef === sessionRef && (!phase || report.phase === phase),
  );
}

export function toMarker(report: DamageReport, kind?: MarkerKind): BlueprintMarker {
  return {
    id: report.id,
    view: report.view,
    zoneId: report.zoneId,
    position: report.position,
    label: `${report.reference} · ${report.typeLabel}`,
    kind: kind ?? report.kind,
  };
}

export function toMarkers(reports: DamageReport[], kind?: MarkerKind) {
  return reports.map((report) => toMarker(report, kind));
}
