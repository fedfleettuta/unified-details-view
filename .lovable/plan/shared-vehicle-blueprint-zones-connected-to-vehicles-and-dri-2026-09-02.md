# Shared vehicle blueprint + zones, connected to vehicles and driver damage reports

Today the blueprint in the Evidence panel is a decorative CSS grid with one hardcoded `marker` per damage record, and the view tabs are just strings. It is not tied to a vehicle and it knows nothing about the driver's damage reports.

This replaces it with one shared blueprint module that every flow uses: pre-trip (Start Vehicle) inspection, return inspection, and the admin damage review.

## What changes conceptually

- A blueprint belongs to a **vehicle**, not to a damage record. Each vehicle has a blueprint definition: a set of views (Front, Rear, Left, Right, Roof, Interior), an image per view, and polygon **zones** on each view (id, name, points).
- A damage report from a driver references `vehicleId`, `view`, `zoneId` and a precise point on that view. The blueprint no longer stores the marker; it derives markers from the damage reports for that vehicle.
- Selecting a zone returns a single payload: `{ view, zoneId, zoneName, position: { x, y } }` — usable by both driver reporting and admin review.

## Behaviour per flow

- **Start Vehicle (pre-trip)** — driver picks a view, clicks a zone, gets zone name + exact point, and reports a damage against it. Existing damages for that vehicle show as read-only markers so the driver can see what is already known.
- **Return Vehicle** — identical component and geometry; new markers are tagged as raised on return, pre-existing ones stay visually distinct.
- **Admin damage review** — same blueprint and zones for the record's vehicle, with the pending damage's marker highlighted, sibling damages dimmed, and zone name shown in the review header. Approve/reject logic untouched.

Because all three read the same vehicle blueprint config, geometry is identical by construction.

## UI / UX (visual design unchanged)

- Same Panel shell, same view-tab pills, same aspect box, same marker/pulse styling and photo grid.
- Additions inside that shell: zone polygons drawn as hairline overlays, hover tint, selected zone filled with the accent at low opacity, zone name in a small floating label, and a legend for marker kinds (pre-existing / this session / pending approval).
- Zones and markers use normalised 0–1 coordinates over an `aspect-[4/3]` SVG `viewBox`, so it scales with the container and stays responsive; touch targets get a minimum hit area on mobile.
- Keyboard: zones are focusable, arrow keys move between them, Enter selects.

## Scope guardrails

- Damage records, damage photos, inspection submission and review logic stay as they are — this is blueprint rendering and zone selection only.
- No new storage model. Existing static demo data stays; the old `marker` field and current Evidence rendering path remain in place until the three flows are switched over.

## Technical notes

- `src/data/blueprints.ts` — `VehicleBlueprint` type (views, per-view image, zones with normalised polygon points) plus definitions for the demo vehicles, and a `getBlueprint(vehicleId)` lookup with a generic fallback.
- `src/components/blueprint/VehicleBlueprint.tsx` — presentational, controlled: props `blueprint`, `view`, `markers`, `selectedZoneId`, `onViewChange`, `onZoneSelect(selection)`. Renders image + SVG polygon layer + markers. Uses `getBoundingClientRect` on the untransformed frame and point-in-polygon to resolve a click to its zone, so the returned point is exact rather than snapped to the zone centre.
- `src/components/blueprint/ZoneLegend.tsx` — marker-kind legend.
- `EvidencePanel` keeps its layout but delegates the left panel to `VehicleBlueprint`, resolving the blueprint from the record's vehicle and building markers from that vehicle's damage reports.
- Damage demo data in `src/data/records.ts` gains `vehicleId`, `view`, `zoneId`, `point` alongside the existing fields; per-vehicle damage lists are derived so markers and lists never disagree.
- Vehicle blueprint images: placeholder line-art schematics per view in `src/assets`, replaceable by an uploaded per-vehicle image.
