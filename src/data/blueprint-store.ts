/**
 * Admin blueprint overrides.
 *
 * The demo has no backend, so the admin blueprint editor persists per-vehicle
 * blueprint edits (uploaded image + drawn polygon zones) in localStorage and
 * merges them over the static definitions in `src/data/blueprints.ts`.
 * Every flow — Start Vehicle, Return Vehicle and the admin surfaces — reads
 * through `useVehicleBlueprint`, so all of them see the same saved geometry.
 */

import { useEffect, useMemo, useState } from "react";

import {
  getBlueprint,
  type BlueprintZone,
  type VehicleBlueprint,
} from "./blueprints";

const STORAGE_KEY = "fleet.blueprint-overrides.v1";

export interface BlueprintViewOverride {
  /** Uploaded vehicle-specific blueprint image, stored as a data URL. */
  image?: string;
  /** Replaces the view's zones when present. */
  zones?: BlueprintZone[];
}

export type BlueprintOverride = Record<string, BlueprintViewOverride>;
export type BlueprintOverrides = Record<string, BlueprintOverride>;

const listeners = new Set<() => void>();
let cache: BlueprintOverrides | null = null;

function read(): BlueprintOverrides {
  if (cache) return cache;
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as BlueprintOverrides) : {};
  } catch {
    cache = {};
  }
  return cache;
}

function write(next: BlueprintOverrides) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Quota exceeded — keep the in-memory value so the session still works.
  }
  listeners.forEach((listener) => listener());
}

export function subscribeBlueprints(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getBlueprintOverride(vehicleReg?: string): BlueprintOverride {
  if (!vehicleReg) return {};
  return read()[vehicleReg] ?? {};
}

export function saveViewOverride(
  vehicleReg: string,
  view: string,
  patch: BlueprintViewOverride,
) {
  const all = read();
  const vehicle = { ...(all[vehicleReg] ?? {}) };
  vehicle[view] = { ...(vehicle[view] ?? {}), ...patch };
  write({ ...all, [vehicleReg]: vehicle });
}

export function resetViewOverride(vehicleReg: string, view: string) {
  const all = read();
  const vehicle = { ...(all[vehicleReg] ?? {}) };
  delete vehicle[view];
  write({ ...all, [vehicleReg]: vehicle });
}

export function resetVehicleOverride(vehicleReg: string) {
  const all = { ...read() };
  delete all[vehicleReg];
  write(all);
}

/** Merge saved admin edits over the static blueprint definition. */
export function mergeBlueprint(
  base: VehicleBlueprint,
  override: BlueprintOverride,
): VehicleBlueprint {
  if (!Object.keys(override).length) return base;
  return {
    ...base,
    views: base.views.map((view) => {
      const patch = override[view.label];
      if (!patch) return view;
      return {
        ...view,
        ...(patch.image ? { image: patch.image } : {}),
        zones: patch.zones?.length ? patch.zones : view.zones,
      };
    }),
  };
}

/** The blueprint every flow should render: static geometry + admin overrides. */
export function useVehicleBlueprint(vehicleReg?: string): VehicleBlueprint {
  const [version, setVersion] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeBlueprints(() => setVersion((v) => v + 1));
    // Apply saved overrides one tick after hydration so SSR markup matches.
    const timer = window.setTimeout(() => setHydrated(true), 0);
    return () => {
      window.clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  return useMemo(() => {
    const base = getBlueprint(vehicleReg);
    if (!hydrated || typeof window === "undefined") return base;
    return mergeBlueprint(base, getBlueprintOverride(vehicleReg));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleReg, hydrated, version]);
}

/** Whether a vehicle/view currently has saved admin edits. */
export function hasOverride(vehicleReg: string, view?: string) {
  const override = getBlueprintOverride(vehicleReg);
  if (!view) return Object.keys(override).length > 0;
  const patch = override[view];
  return Boolean(patch?.image || patch?.zones?.length);
}
