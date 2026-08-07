# Fleet Detail Pages — Shared Template Design System

A design-system demo: one canonical detail-page template, five record types rendered through it, with static demo data. No backend.

## The core problem being fixed

In the current screenshots every detail page repeats itself three times: the page title block, a row of stat cards, and the Details grid all show the same fields (vehicle, cost, date, status). The redesign keeps every field but shows each one exactly once.

New structure, top to bottom:

```text
Breadcrumb  ...........................  [actions]
TITLE + status pill
subtitle: vehicle · make · key date
--- inline meta strip (small, single line, no cards) ---
Details  (grouped field grid, Edit)
Origin / Renewal history / Audit history (only when relevant)
```

- Stat cards removed entirely. The 3-4 "headline" values move into a compact inline meta strip under the title (label above value, hairline dividers, no boxes) and are *not* repeated in Details.
- Header becomes one tight block: breadcrumb, title + status, one-line subtitle, right-aligned actions collapsing into a menu on small screens.
- Details grid stops being a flat 3-column dump of 15 fields — fields group under quiet section labels (Identity, Costs, Dates, Documents, Notes).
- Empty fields render as a consistent muted em dash, and a "Show empty fields" toggle hides them by default so pages read as dense and intentional rather than half-blank.

## Layout freedom

Since restructuring is open, the template also reorganises the page rather than
just deleting cards:

- Two-column working layout on desktop: the main column carries Details and the
  record-specific sections; a narrower right rail carries the at-a-glance summary
  (status, key dates, cost total), documents, and actions. Single column on mobile,
  rail moving above Details.
- Documents (licence, invoice, receipt, photo, fine notice) are pulled out of the
  field grid into one "Documents" block in the rail so every page handles
  attachments the same way.
- History and audit sections become a single shared "Activity" block at the bottom,
  switching between table and timeline presentation based on the record type.
- The vehicle context (FED-003 · Toyota Hiace) becomes one compact linked chip in
  the header instead of appearing in the subtitle, a stat card, and the field grid.

## The five pages

Licence & Policy, Assets, Fines, Fuel, Maintenance. Each one is just a config object (title, status, meta strip fields, field groups, extra sections) plus demo data — no bespoke page code. Adding a sixth record type later is a config entry, not a new page.

## Visual direction (pushed further)

- Deep navy/slate ink with a single confident accent; status colours become semantic tokens (active, warning/expiring, danger/overdue, neutral/paid) instead of ad-hoc greens and ambers.
- Typography: geometric sans headings with a compact grotesque body, plus tabular numerals for all money, litres, and odometer values so columns align.
- Field labels get uppercase micro-type with tracking; values step up in weight — clear two-level hierarchy instead of today's flat grey.
- Data surfaces use hairline borders and soft elevation, not heavy cards. Consistent radius scale, generous but disciplined vertical rhythm.
- Small motion: subtle fade/rise on section mount, hover affordance on rows and document links.
- Full dark mode from the same tokens.

## Shared components

- `PageHeader` — breadcrumb, title, status pill, subtitle, actions
- `MetaStrip` — the card-replacement inline summary
- `DetailSection` / `FieldGrid` / `Field` — grouped label/value display with empty handling
- `StatusPill`, `DocumentLink`, `MoneyValue`, `DateValue`, `HistoryTable`, `TimelineList`
- `RecordDetailLayout` — composes all of the above from a record config

## Routes

- `/` — overview index listing the five record types with links, plus a short note on the template rules
- `/records/$type` — the shared detail page rendering any of the five configs
- Each route gets its own head() metadata.

## Technical notes

- Tailwind v4 tokens defined in `src/styles.css` (`@theme inline`), semantic only — no hardcoded colour utilities.
- Web fonts loaded via `<link>` in `src/routes/__root.tsx`.
- Demo data + record configs in `src/data/`, typed; components in `src/components/detail/`.
- Responsive: header uses the grid→flex pattern, meta strip wraps to two columns on mobile, field grid goes 1 → 2 → 3 columns.
