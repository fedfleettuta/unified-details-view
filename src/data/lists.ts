import type { FieldKind, StatusTone, SummaryItem } from "./records";

export interface ListColumn {
  key: string;
  label: string;
  kind?: FieldKind;
  align?: "left" | "right";
  /** Hide this column below the given breakpoint to keep mobile readable. */
  hideBelow?: "sm" | "md" | "lg";
  width?: string;
}

/** Small icon slot used by the list stat cards. */
export type ListStatIcon =
  | "activity"
  | "alert"
  | "archive"
  | "ban"
  | "building"
  | "calendar"
  | "car"
  | "check"
  | "clipboard"
  | "clock"
  | "file"
  | "fuel"
  | "gauge"
  | "gavel"
  | "money"
  | "package"
  | "shield"
  | "users"
  | "wrench"
  | "x";

export interface ListStat extends SummaryItem {
  icon?: ListStatIcon;
  /** Secondary line under the value, e.g. "2 in progress". */
  hint?: string;
  /** Tints the whole card, for the "needs attention" KPI. */
  highlight?: boolean;
}

export interface ListBadge {
  label: string;
  tone?: StatusTone;
  variant?: "solid" | "outline" | "soft";
  /** Renders a caret, for badges that double as an inline status picker. */
  caret?: boolean;
}

export type ListRowActionIcon =
  | "archive"
  | "eye"
  | "image"
  | "key"
  | "pencil"
  | "power"
  | "wrench";

export interface ListRowAction {
  label: string;
  icon?: ListRowActionIcon;
  variant?: "ghost" | "outline";
}

export interface ListCell {
  text: string;
  sub?: string;
  kind?: FieldKind;
  tone?: StatusTone;
  /** Renders the text as a mono reference chip, e.g. fed003-020. */
  chip?: boolean;
  /** Renders the text in the link colour (reg numbers, receipt refs). */
  link?: boolean;
  /** Trailing muted qualifier on the same line, e.g. "/ front". */
  qualifier?: string;
  /** One or more badges instead of / next to the text. */
  badges?: ListBadge[];
  /** Neutral outline tags, e.g. supplier types. */
  tags?: string[];
}

export interface ListRow {
  id: string;
  /** Detail record this row opens, when a demo detail page exists. */
  recordSlug?: string;
  segment: string;
  cells: Record<string, ListCell>;
  /** Inline row actions (Manage, Edit, Archive, Create Maintenance…). */
  actions?: ListRowAction[];
}

export interface ListSegment {
  label: string;
  count: number;
  tone?: StatusTone;
}

export interface ListFilter {
  label: string;
  /** Defaults to "select". */
  kind?: "select" | "date" | "search";
  options?: string[];
  placeholder?: string;
}

export interface ListConfig {
  slug: string;
  name: string;
  typeLabel: string;
  title: string;
  description: string;
  searchPlaceholder: string;
  primaryAction: string;
  /** Optional secondary header button, e.g. "Try V2". */
  secondaryAction?: string;
  /** Enables the upload button in the list header (bulk import / attachments). */
  uploadAction?: string;
  stats: ListStat[];
  segments: ListSegment[];
  filters: ListFilter[];
  columns: ListColumn[];
  rows: ListRow[];
  emptyLabel?: string;
  /** Row checkboxes + bulk bar. Defaults to true. */
  selectable?: boolean;
  /** Pagination footer state. */
  page?: { current: number; total: number };
}

const c = (text: string, extra: Omit<ListCell, "text"> = {}): ListCell => ({ text, ...extra });

export const lists: ListConfig[] = [
  {
    slug: "sessions",
    name: "Sessions",
    typeLabel: "Session",
    title: "Sessions",
    description:
      "Every vehicle assignment from pre-trip inspection to return inspection, with duration, distance and what the driver raised.",
    searchPlaceholder: "Search by driver, vehicle or session ref",
    primaryAction: "Start session",
    uploadAction: "Import sessions",
    stats: [
      { label: "Open now", value: "3", kind: "number", tone: "info" },
      { label: "Closed this week", value: "27", kind: "number" },
      { label: "Missing return check", value: "2", kind: "number", tone: "danger" },
      { label: "Distance this week", value: "4,182 km", kind: "number" },
    ],
    segments: [
      { label: "All", count: 32 },
      { label: "Open", count: 3 },
      { label: "Completed", count: 27 },
      { label: "Missing return check", count: 2 },
    ],
    filters: [
      { label: "Vehicle", options: ["All vehicles", "FED-003", "FED-007", "FED-011", "FED-020"] },
      { label: "Driver", options: ["All drivers", "AA AA", "M. Borg", "J. Camilleri", "S. Farrugia"] },
      { label: "Period", options: ["Last 30 days", "Last 7 days", "This month", "This year"] },
    ],
    columns: [
      { key: "ref", label: "Session", width: "12rem" },
      { key: "driver", label: "Driver" },
      { key: "vehicle", label: "Vehicle", hideBelow: "md" },
      { key: "start", label: "Started", kind: "date" },
      { key: "end", label: "Returned", kind: "date", hideBelow: "lg" },
      { key: "duration", label: "Duration", kind: "number", align: "right", hideBelow: "md" },
      { key: "distance", label: "Distance", kind: "number", align: "right" },
      { key: "raised", label: "Raised", hideBelow: "lg" },
      { key: "status", label: "Status", align: "right" },
    ],
    rows: [
      {
        id: "SES-0007",
        recordSlug: "session",
        segment: "Completed",
        cells: {
          ref: c("SES-0007", { kind: "mono" }),
          driver: c("AA AA", { sub: "EMP-0142" }),
          vehicle: c("FED-003", { sub: "Toyota Hiace" }),
          start: c("Aug 7, 2026 06:42"),
          end: c("Aug 7, 2026 16:18"),
          duration: c("9h 36m"),
          distance: c("184 km"),
          raised: c("1 issue · 2 damages"),
          status: c("Completed", { tone: "active" }),
        },
      },
      {
        id: "SES-0011",
        segment: "Open",
        cells: {
          ref: c("SES-0011", { kind: "mono" }),
          driver: c("M. Borg", { sub: "EMP-0088" }),
          vehicle: c("FED-007", { sub: "Ford Transit" }),
          start: c("Aug 11, 2026 05:58"),
          end: c("—"),
          duration: c("2h 12m"),
          distance: c("47 km"),
          raised: c("—"),
          status: c("In progress", { tone: "info" }),
        },
      },
      {
        id: "SES-0010",
        segment: "Open",
        cells: {
          ref: c("SES-0010", { kind: "mono" }),
          driver: c("S. Farrugia", { sub: "EMP-0203" }),
          vehicle: c("FED-020", { sub: "Renault Kangoo" }),
          start: c("Aug 11, 2026 06:15"),
          end: c("—"),
          duration: c("1h 55m"),
          distance: c("31 km"),
          raised: c("1 issue"),
          status: c("In progress", { tone: "info" }),
        },
      },
      {
        id: "SES-0009",
        segment: "Missing return check",
        cells: {
          ref: c("SES-0009", { kind: "mono" }),
          driver: c("J. Camilleri", { sub: "EMP-0117" }),
          vehicle: c("FED-011", { sub: "Fiat Ducato" }),
          start: c("Aug 10, 2026 07:04"),
          end: c("Aug 10, 2026 18:47"),
          duration: c("11h 43m"),
          distance: c("263 km"),
          raised: c("—"),
          status: c("No return check", { tone: "danger" }),
        },
      },
      {
        id: "SES-0008",
        segment: "Completed",
        cells: {
          ref: c("SES-0008", { kind: "mono" }),
          driver: c("AA AA", { sub: "EMP-0142" }),
          vehicle: c("FED-003", { sub: "Toyota Hiace" }),
          start: c("Aug 6, 2026 06:38"),
          end: c("Aug 6, 2026 15:04"),
          duration: c("8h 26m"),
          distance: c("151 km"),
          raised: c("1 damage"),
          status: c("Completed", { tone: "active" }),
        },
      },
      {
        id: "SES-0006",
        segment: "Completed",
        cells: {
          ref: c("SES-0006", { kind: "mono" }),
          driver: c("M. Borg", { sub: "EMP-0088" }),
          vehicle: c("FED-007", { sub: "Ford Transit" }),
          start: c("Aug 5, 2026 06:51"),
          end: c("Aug 5, 2026 17:29"),
          duration: c("10h 38m"),
          distance: c("227 km"),
          raised: c("2 issues"),
          status: c("Completed", { tone: "active" }),
        },
      },
      {
        id: "SES-0005",
        segment: "Missing return check",
        cells: {
          ref: c("SES-0005", { kind: "mono" }),
          driver: c("S. Farrugia", { sub: "EMP-0203" }),
          vehicle: c("FED-020", { sub: "Renault Kangoo" }),
          start: c("Aug 4, 2026 08:02"),
          end: c("Aug 4, 2026 14:12"),
          duration: c("6h 10m"),
          distance: c("88 km"),
          raised: c("—"),
          status: c("No return check", { tone: "danger" }),
        },
      },
      {
        id: "SES-0004",
        segment: "Completed",
        cells: {
          ref: c("SES-0004", { kind: "mono" }),
          driver: c("J. Camilleri", { sub: "EMP-0117" }),
          vehicle: c("FED-011", { sub: "Fiat Ducato" }),
          start: c("Aug 3, 2026 06:30"),
          end: c("Aug 3, 2026 16:41"),
          duration: c("10h 11m"),
          distance: c("241 km"),
          raised: c("1 issue · 1 damage"),
          status: c("Completed", { tone: "active" }),
        },
      },
    ],
  },
  {
    slug: "damages",
    name: "Damages",
    typeLabel: "Damage",
    title: "Damages",
    description:
      "Driver-reported damage across the fleet, with the session it came from, the admin approval state and where the repair stands.",
    searchPlaceholder: "Search by vehicle, type or damage ref",
    primaryAction: "Report damage",
    uploadAction: "Upload photos",
    stats: [
      { label: "Open damages", value: "9", kind: "number", tone: "warning" },
      { label: "Awaiting approval", value: "4", kind: "number", tone: "danger" },
      { label: "In repair", value: "3", kind: "number", tone: "info" },
      { label: "Repaired (30d)", value: "12", kind: "number", tone: "active" },
    ],
    segments: [
      { label: "All", count: 28 },
      { label: "Approved", count: 11 },
      { label: "Pending approval", count: 4 },
      { label: "Rejected", count: 5 },
      { label: "Repaired", count: 8 },
    ],
    filters: [
      { label: "Vehicle", options: ["All vehicles", "FED-003", "FED-007", "FED-011", "FED-020"] },
      { label: "Type", options: ["All types", "Scratch", "Dent", "Missing part", "Crack", "Puncture"] },
      { label: "Repair status", options: ["Any", "To repair", "Being repaired", "Repaired"] },
    ],
    columns: [
      { key: "ref", label: "Damage", width: "12rem" },
      { key: "vehicle", label: "Vehicle" },
      { key: "type", label: "Type / position" },
      { key: "reported", label: "Reported", kind: "date" },
      { key: "by", label: "Reported by", hideBelow: "lg" },
      { key: "photos", label: "Photos", kind: "number", align: "right", hideBelow: "md" },
      { key: "repair", label: "Repair", hideBelow: "md" },
      { key: "status", label: "Approval", align: "right" },
    ],
    rows: [
      {
        id: "DMG-4471",
        recordSlug: "damage",
        segment: "Approved",
        cells: {
          ref: c("DMG-4471", { kind: "mono" }),
          vehicle: c("FED-003", { sub: "Toyota Hiace" }),
          type: c("Scratch", { sub: "Front bumper — left" }),
          reported: c("Aug 7, 2026"),
          by: c("AA AA"),
          photos: c("3"),
          repair: c("To repair", { tone: "warning" }),
          status: c("Approved", { tone: "active" }),
        },
      },
      {
        id: "DMG-4478",
        recordSlug: "damage-pending",
        segment: "Pending approval",
        cells: {
          ref: c("DMG-4478", { kind: "mono" }),
          vehicle: c("FED-003", { sub: "Toyota Hiace" }),
          type: c("Dent", { sub: "Rear door — right" }),
          reported: c("Aug 10, 2026"),
          by: c("AA AA"),
          photos: c("2"),
          repair: c("—"),
          status: c("Pending approval", { tone: "warning" }),
        },
      },
      {
        id: "DMG-4480",
        segment: "Pending approval",
        cells: {
          ref: c("DMG-4480", { kind: "mono" }),
          vehicle: c("FED-007", { sub: "Ford Transit" }),
          type: c("Crack", { sub: "Windscreen — passenger side" }),
          reported: c("Aug 11, 2026"),
          by: c("M. Borg"),
          photos: c("4"),
          repair: c("—"),
          status: c("Pending approval", { tone: "warning" }),
        },
      },
      {
        id: "DMG-4469",
        segment: "Being repaired",
        cells: {
          ref: c("DMG-4469", { kind: "mono" }),
          vehicle: c("FED-011", { sub: "Fiat Ducato" }),
          type: c("Missing part", { sub: "Wheel trim — front left" }),
          reported: c("Aug 3, 2026"),
          by: c("J. Camilleri"),
          photos: c("1"),
          repair: c("Being repaired", { tone: "info" }),
          status: c("Approved", { tone: "active" }),
        },
      },
      {
        id: "DMG-4462",
        segment: "Repaired",
        cells: {
          ref: c("DMG-4462", { kind: "mono" }),
          vehicle: c("FED-020", { sub: "Renault Kangoo" }),
          type: c("Scratch", { sub: "Sliding door — left" }),
          reported: c("Jul 28, 2026"),
          by: c("S. Farrugia"),
          photos: c("2"),
          repair: c("Repaired", { tone: "active" }),
          status: c("Approved", { tone: "active" }),
        },
      },
      {
        id: "DMG-4458",
        segment: "Rejected",
        cells: {
          ref: c("DMG-4458", { kind: "mono" }),
          vehicle: c("FED-003", { sub: "Toyota Hiace" }),
          type: c("Scratch", { sub: "Bonnet — centre" }),
          reported: c("Jul 24, 2026"),
          by: c("AA AA"),
          photos: c("1"),
          repair: c("—"),
          status: c("Rejected", { tone: "danger" }),
        },
      },
      {
        id: "DMG-4455",
        segment: "Approved",
        cells: {
          ref: c("DMG-4455", { kind: "mono" }),
          vehicle: c("FED-007", { sub: "Ford Transit" }),
          type: c("Puncture", { sub: "Tyre — rear right" }),
          reported: c("Jul 21, 2026"),
          by: c("M. Borg"),
          photos: c("2"),
          repair: c("Repaired", { tone: "active" }),
          status: c("Approved", { tone: "active" }),
        },
      },
      {
        id: "DMG-4451",
        segment: "Rejected",
        cells: {
          ref: c("DMG-4451", { kind: "mono" }),
          vehicle: c("FED-011", { sub: "Fiat Ducato" }),
          type: c("Dent", { sub: "Rear bumper — centre" }),
          reported: c("Jul 18, 2026"),
          by: c("J. Camilleri"),
          photos: c("0"),
          repair: c("—"),
          status: c("Rejected", { tone: "danger" }),
        },
      },
    ],
  },
  {
    slug: "pending-damages",
    name: "Pending damages",
    typeLabel: "Pending damage",
    title: "Damages awaiting approval",
    description:
      "The admin review queue: driver reports that still need a decision, oldest first, with photo evidence counts and how long they have been waiting.",
    searchPlaceholder: "Search the review queue",
    primaryAction: "Review oldest",
    uploadAction: "Attach evidence",
    stats: [
      { label: "In queue", value: "4", kind: "number", tone: "warning" },
      { label: "Waiting > 48h", value: "2", kind: "number", tone: "danger" },
      { label: "Photos to review", value: "11", kind: "number" },
      { label: "Avg. decision time", value: "19h", kind: "number" },
    ],
    segments: [
      { label: "All", count: 4 },
      { label: "New today", count: 1 },
      { label: "Waiting > 48h", count: 2 },
      { label: "Re-submitted", count: 1 },
    ],
    filters: [
      { label: "Vehicle", options: ["All vehicles", "FED-003", "FED-007", "FED-020"] },
      { label: "Severity", options: ["Any", "Minor", "Moderate", "Severe"] },
      { label: "Source", options: ["Any", "Pre-trip", "Return", "Manual report"] },
    ],
    columns: [
      { key: "ref", label: "Damage", width: "12rem" },
      { key: "vehicle", label: "Vehicle" },
      { key: "type", label: "Type / position" },
      { key: "source", label: "Source", hideBelow: "md" },
      { key: "reported", label: "Reported", kind: "date" },
      { key: "waiting", label: "Waiting", kind: "number", align: "right" },
      { key: "photos", label: "Photos", kind: "number", align: "right", hideBelow: "md" },
      { key: "severity", label: "Severity", hideBelow: "lg" },
      { key: "status", label: "State", align: "right" },
    ],
    rows: [
      {
        id: "DMG-4480",
        segment: "New today",
        cells: {
          ref: c("DMG-4480", { kind: "mono" }),
          vehicle: c("FED-007", { sub: "Ford Transit" }),
          type: c("Crack", { sub: "Windscreen — passenger side" }),
          source: c("Return inspection", { sub: "SES-0011" }),
          reported: c("Aug 11, 2026 06:12"),
          waiting: c("0h 39m"),
          photos: c("4"),
          severity: c("Severe", { tone: "danger" }),
          status: c("Pending approval", { tone: "warning" }),
        },
      },
      {
        id: "DMG-4478",
        recordSlug: "damage-pending",
        segment: "Re-submitted",
        cells: {
          ref: c("DMG-4478", { kind: "mono" }),
          vehicle: c("FED-003", { sub: "Toyota Hiace" }),
          type: c("Dent", { sub: "Rear door — right" }),
          source: c("Pre-trip inspection", { sub: "SES-0010" }),
          reported: c("Aug 10, 2026 07:21"),
          waiting: c("23h 30m"),
          photos: c("2"),
          severity: c("Moderate", { tone: "warning" }),
          status: c("Re-submitted", { tone: "info" }),
        },
      },
      {
        id: "DMG-4474",
        segment: "Waiting > 48h",
        cells: {
          ref: c("DMG-4474", { kind: "mono" }),
          vehicle: c("FED-020", { sub: "Renault Kangoo" }),
          type: c("Scratch", { sub: "Tailgate — lower" }),
          source: c("Return inspection", { sub: "SES-0005" }),
          reported: c("Aug 8, 2026 15:44"),
          waiting: c("2d 15h"),
          photos: c("3"),
          severity: c("Minor", { tone: "neutral" }),
          status: c("Pending approval", { tone: "warning" }),
        },
      },
      {
        id: "DMG-4472",
        segment: "Waiting > 48h",
        cells: {
          ref: c("DMG-4472", { kind: "mono" }),
          vehicle: c("FED-003", { sub: "Toyota Hiace" }),
          type: c("Missing part", { sub: "Mud flap — rear left" }),
          source: c("Manual report", { sub: "Workshop" }),
          reported: c("Aug 7, 2026 18:03"),
          waiting: c("3d 12h"),
          photos: c("2"),
          severity: c("Minor", { tone: "neutral" }),
          status: c("Pending approval", { tone: "warning" }),
        },
      },
    ],
  },
  {
    slug: "repairs",
    name: "Repairs",
    typeLabel: "Repair",
    title: "Repairs",
    description:
      "Repair jobs raised from approved damages: supplier, drop-off and pickup dates, quoted versus final cost and how long the vehicle was off the road.",
    searchPlaceholder: "Search by supplier, vehicle or repair ref",
    primaryAction: "New repair",
    uploadAction: "Upload invoice",
    stats: [
      { label: "Open jobs", value: "5", kind: "number", tone: "info" },
      { label: "Off road now", value: "2", kind: "number", tone: "danger" },
      { label: "Spend (30d)", value: "€2,486.00", kind: "money" },
      { label: "Avg. turnaround", value: "3.4 days", kind: "number" },
    ],
    segments: [
      { label: "All", count: 21 },
      { label: "Quoted", count: 3 },
      { label: "Being repaired", count: 2 },
      { label: "Repaired", count: 14 },
      { label: "Cancelled", count: 2 },
    ],
    filters: [
      { label: "Supplier", options: ["All suppliers", "Bodyworks Ltd", "Tramanja", "AutoGlass Malta", "Tyre Hub"] },
      { label: "Vehicle", options: ["All vehicles", "FED-003", "FED-007", "FED-011", "FED-020"] },
      { label: "Period", options: ["Last 90 days", "Last 30 days", "This year"] },
    ],
    columns: [
      { key: "ref", label: "Repair", width: "12rem" },
      { key: "vehicle", label: "Vehicle" },
      { key: "work", label: "Work" },
      { key: "supplier", label: "Supplier", hideBelow: "md" },
      { key: "dropoff", label: "Drop-off", kind: "date", hideBelow: "lg" },
      { key: "pickup", label: "Pickup", kind: "date", hideBelow: "lg" },
      { key: "days", label: "Off road", kind: "number", align: "right", hideBelow: "md" },
      { key: "cost", label: "Cost", kind: "money", align: "right" },
      { key: "status", label: "Status", align: "right" },
    ],
    rows: [
      {
        id: "RPR-0912",
        recordSlug: "repair",
        segment: "Repaired",
        cells: {
          ref: c("RPR-0912", { kind: "mono" }),
          vehicle: c("FED-003", { sub: "Toyota Hiace" }),
          work: c("Bumper respray", { sub: "From DMG-4471" }),
          supplier: c("Bodyworks Ltd"),
          dropoff: c("Aug 8, 2026"),
          pickup: c("Aug 10, 2026"),
          days: c("2"),
          cost: c("€344.00"),
          status: c("Repaired", { tone: "active" }),
        },
      },
      {
        id: "RPR-0918",
        segment: "Being repaired",
        cells: {
          ref: c("RPR-0918", { kind: "mono" }),
          vehicle: c("FED-011", { sub: "Fiat Ducato" }),
          work: c("Wheel trim replacement", { sub: "From DMG-4469" }),
          supplier: c("Tramanja"),
          dropoff: c("Aug 10, 2026"),
          pickup: c("—"),
          days: c("1"),
          cost: c("€86.50"),
          status: c("Being repaired", { tone: "info" }),
        },
      },
      {
        id: "RPR-0919",
        segment: "Being repaired",
        cells: {
          ref: c("RPR-0919", { kind: "mono" }),
          vehicle: c("FED-007", { sub: "Ford Transit" }),
          work: c("Windscreen replacement", { sub: "From DMG-4480" }),
          supplier: c("AutoGlass Malta"),
          dropoff: c("Aug 11, 2026"),
          pickup: c("—"),
          days: c("0"),
          cost: c("€412.00"),
          status: c("Being repaired", { tone: "info" }),
        },
      },
      {
        id: "RPR-0915",
        segment: "Quoted",
        cells: {
          ref: c("RPR-0915", { kind: "mono" }),
          vehicle: c("FED-020", { sub: "Renault Kangoo" }),
          work: c("Tailgate panel repair", { sub: "From DMG-4474" }),
          supplier: c("Bodyworks Ltd"),
          dropoff: c("—"),
          pickup: c("—"),
          days: c("—"),
          cost: c("€275.00"),
          status: c("Quoted", { tone: "warning" }),
        },
      },
      {
        id: "RPR-0908",
        segment: "Repaired",
        cells: {
          ref: c("RPR-0908", { kind: "mono" }),
          vehicle: c("FED-007", { sub: "Ford Transit" }),
          work: c("Tyre replacement", { sub: "From DMG-4455" }),
          supplier: c("Tyre Hub"),
          dropoff: c("Jul 22, 2026"),
          pickup: c("Jul 22, 2026"),
          days: c("0"),
          cost: c("€128.00"),
          status: c("Repaired", { tone: "active" }),
        },
      },
      {
        id: "RPR-0903",
        segment: "Repaired",
        cells: {
          ref: c("RPR-0903", { kind: "mono" }),
          vehicle: c("FED-020", { sub: "Renault Kangoo" }),
          work: c("Sliding door scratch blend", { sub: "From DMG-4462" }),
          supplier: c("Bodyworks Ltd"),
          dropoff: c("Jul 29, 2026"),
          pickup: c("Aug 1, 2026"),
          days: c("3"),
          cost: c("€196.00"),
          status: c("Repaired", { tone: "active" }),
        },
      },
      {
        id: "RPR-0899",
        segment: "Cancelled",
        cells: {
          ref: c("RPR-0899", { kind: "mono" }),
          vehicle: c("FED-011", { sub: "Fiat Ducato" }),
          work: c("Rear bumper dent", { sub: "From DMG-4451" }),
          supplier: c("Tramanja"),
          dropoff: c("—"),
          pickup: c("—"),
          days: c("—"),
          cost: c("€0.00"),
          status: c("Cancelled", { tone: "neutral" }),
        },
      },
    ],
  },
  {
    slug: "maintenance",
    name: "Maintenance",
    typeLabel: "Maintenance job",
    title: "Maintenance",
    description:
      "Scheduled servicing and checklist-driven jobs, showing where each job came from, the work category, supplier and cost.",
    searchPlaceholder: "Search by vehicle, supplier or job ref",
    primaryAction: "New job",
    uploadAction: "Upload invoice",
    stats: [
      { label: "Open jobs", value: "6", kind: "number", tone: "info" },
      { label: "Overdue services", value: "1", kind: "number", tone: "danger" },
      { label: "Spend (30d)", value: "€1,914.00", kind: "money" },
      { label: "From inspections", value: "9", kind: "number" },
    ],
    segments: [
      { label: "All", count: 34 },
      { label: "Scheduled", count: 4 },
      { label: "Being repaired", count: 2 },
      { label: "Repaired", count: 26 },
      { label: "Overdue", count: 1 },
    ],
    filters: [
      { label: "Category", options: ["All categories", "Service", "Brakes", "Tyres", "Electrical", "Bodywork"] },
      { label: "Origin", options: ["Any", "Pre-trip issue", "Return issue", "Scheduled", "Damage"] },
      { label: "Vehicle", options: ["All vehicles", "FED-003", "FED-007", "FED-011", "FED-020"] },
    ],
    columns: [
      { key: "ref", label: "Job", width: "12rem" },
      { key: "vehicle", label: "Vehicle" },
      { key: "category", label: "Category" },
      { key: "origin", label: "Origin", hideBelow: "lg" },
      { key: "supplier", label: "Supplier", hideBelow: "md" },
      { key: "date", label: "Repair date", kind: "date" },
      { key: "odometer", label: "Odometer", kind: "number", align: "right", hideBelow: "lg" },
      { key: "cost", label: "Cost", kind: "money", align: "right" },
      { key: "status", label: "Status", align: "right" },
    ],
    rows: [
      {
        id: "MNT-2081",
        recordSlug: "maintenance",
        segment: "Repaired",
        cells: {
          ref: c("MNT-2081", { kind: "mono" }),
          vehicle: c("FED-003", { sub: "Toyota Hiace" }),
          category: c("Brakes", { sub: "Front pads & discs" }),
          origin: c("Pre-trip issue", { sub: "SES-0007" }),
          supplier: c("Tramanja"),
          date: c("Aug 8, 2026"),
          odometer: c("148,120 km"),
          cost: c("€344.00"),
          status: c("Repaired", { tone: "active" }),
        },
      },
      {
        id: "MNT-2090",
        segment: "Being repaired",
        cells: {
          ref: c("MNT-2090", { kind: "mono" }),
          vehicle: c("FED-020", { sub: "Renault Kangoo" }),
          category: c("Electrical", { sub: "Rear light cluster" }),
          origin: c("Return issue", { sub: "SES-0010" }),
          supplier: c("Tramanja"),
          date: c("Aug 11, 2026"),
          odometer: c("96,455 km"),
          cost: c("€118.00"),
          status: c("Being repaired", { tone: "info" }),
        },
      },
      {
        id: "MNT-2088",
        segment: "Being repaired",
        cells: {
          ref: c("MNT-2088", { kind: "mono" }),
          vehicle: c("FED-011", { sub: "Fiat Ducato" }),
          category: c("Tyres", { sub: "Four-tyre change" }),
          origin: c("Scheduled", { sub: "Service plan" }),
          supplier: c("Tyre Hub"),
          date: c("Aug 10, 2026"),
          odometer: c("204,870 km"),
          cost: c("€612.00"),
          status: c("Being repaired", { tone: "info" }),
        },
      },
      {
        id: "MNT-2092",
        segment: "Scheduled",
        cells: {
          ref: c("MNT-2092", { kind: "mono" }),
          vehicle: c("FED-003", { sub: "Toyota Hiace" }),
          category: c("Service", { sub: "60,000 km interval" }),
          origin: c("Scheduled", { sub: "Service plan" }),
          supplier: c("Tramanja"),
          date: c("Sep 12, 2026"),
          odometer: c("—"),
          cost: c("€280.00"),
          status: c("Scheduled", { tone: "neutral" }),
        },
      },
      {
        id: "MNT-2079",
        segment: "Overdue",
        cells: {
          ref: c("MNT-2079", { kind: "mono" }),
          vehicle: c("FED-007", { sub: "Ford Transit" }),
          category: c("Service", { sub: "Annual service" }),
          origin: c("Scheduled", { sub: "Service plan" }),
          supplier: c("Tramanja"),
          date: c("Jul 30, 2026"),
          odometer: c("—"),
          cost: c("€310.00"),
          status: c("Overdue", { tone: "danger" }),
        },
      },
      {
        id: "MNT-2074",
        segment: "Repaired",
        cells: {
          ref: c("MNT-2074", { kind: "mono" }),
          vehicle: c("FED-007", { sub: "Ford Transit" }),
          category: c("Bodywork", { sub: "Windscreen seal" }),
          origin: c("Damage", { sub: "DMG-4455" }),
          supplier: c("AutoGlass Malta"),
          date: c("Jul 24, 2026"),
          odometer: c("132,004 km"),
          cost: c("€92.00"),
          status: c("Repaired", { tone: "active" }),
        },
      },
      {
        id: "MNT-2068",
        segment: "Repaired",
        cells: {
          ref: c("MNT-2068", { kind: "mono" }),
          vehicle: c("FED-020", { sub: "Renault Kangoo" }),
          category: c("Brakes", { sub: "Rear shoes" }),
          origin: c("Pre-trip issue", { sub: "SES-0004" }),
          supplier: c("Tramanja"),
          date: c("Jul 19, 2026"),
          odometer: c("95,210 km"),
          cost: c("€188.00"),
          status: c("Repaired", { tone: "active" }),
        },
      },
    ],
  },
  {
    slug: "vehicles",
    name: "Vehicles",
    typeLabel: "Vehicle",
    title: "Vehicles",
    description: "Manage the fleet — availability, open damages and who used each vehicle last.",
    searchPlaceholder: "Search by reg, make or model",
    primaryAction: "New vehicle",
    secondaryAction: "Try V2",
    stats: [
      { label: "Total vehicles", value: "4", kind: "number", icon: "car" },
      { label: "Available", value: "2", kind: "number", icon: "check", tone: "active" },
      { label: "In maintenance", value: "1", kind: "number", icon: "wrench", tone: "warning" },
      { label: "Open damages", value: "3", kind: "number", icon: "alert", tone: "danger", highlight: true, hint: "2 awaiting approval" },
    ],
    segments: [
      { label: "All", count: 4 },
      { label: "Available", count: 2, tone: "active" },
      { label: "In use", count: 1, tone: "info" },
      { label: "In maintenance", count: 1, tone: "warning" },
    ],
    filters: [{ label: "Status", options: ["All statuses", "Available", "In use", "In maintenance", "Archived"] }],
    columns: [
      { key: "reg", label: "Reg", width: "9rem" },
      { key: "model", label: "Make / Model" },
      { key: "year", label: "Year", kind: "number", hideBelow: "sm" },
      { key: "status", label: "Status" },
      { key: "damages", label: "Open damages", kind: "number", hideBelow: "md" },
      { key: "lastUsed", label: "Last used", kind: "date", hideBelow: "md" },
    ],
    page: { current: 1, total: 1 },
    selectable: false,
    rows: [
      {
        id: "FED-003",
        recordSlug: "vehicle",
        segment: "In use",
        cells: {
          reg: c("FED-003", { link: true }),
          model: c("Toyota Hiace", { sub: "Panel van · diesel" }),
          year: c("2000"),
          status: c("In use", { badges: [{ label: "In use", tone: "info", variant: "outline" }] }),
          damages: c("3", { qualifier: "2 to repair" }),
          lastUsed: c("06/08/2026", { sub: "AA AA" }),
        },
        actions: [
          { label: "Manage", icon: "image", variant: "outline" },
          { label: "Edit", icon: "pencil" },
          { label: "Archive", icon: "archive" },
        ],
      },
      {
        id: "FED-009",
        segment: "Available",
        cells: {
          reg: c("FED-009", { link: true }),
          model: c("Ford Transit Custom", { sub: "Panel van · diesel" }),
          year: c("2021"),
          status: c("Available", { badges: [{ label: "Available", tone: "active", variant: "outline" }] }),
          damages: c("—"),
          lastUsed: c("Never"),
        },
        actions: [
          { label: "Manage", icon: "image", variant: "outline" },
          { label: "Edit", icon: "pencil" },
          { label: "Archive", icon: "archive" },
        ],
      },
      {
        id: "FED-011",
        segment: "In maintenance",
        cells: {
          reg: c("FED-011", { link: true }),
          model: c("Renault Kangoo"),
          year: c("2019"),
          status: c("In maintenance", { badges: [{ label: "Being repaired", tone: "info", variant: "soft" }] }),
          damages: c("1"),
          lastUsed: c("29/07/2026", { sub: "ttfh tufu" }),
        },
        actions: [
          { label: "Manage", icon: "image", variant: "outline" },
          { label: "Edit", icon: "pencil" },
          { label: "Archive", icon: "archive" },
        ],
      },
      {
        id: "FED-014",
        segment: "Available",
        cells: {
          reg: c("FED-014", { link: true }),
          model: c("Peugeot Partner"),
          year: c("2022"),
          status: c("Available", { badges: [{ label: "Available", tone: "active", variant: "outline" }] }),
          damages: c("—"),
          lastUsed: c("02/08/2026", { sub: "Joe Meli" }),
        },
        actions: [
          { label: "Manage", icon: "image", variant: "outline" },
          { label: "Edit", icon: "pencil" },
          { label: "Archive", icon: "archive" },
        ],
      },
    ],
  },
  {
    slug: "drivers",
    name: "Drivers",
    typeLabel: "Driver",
    title: "Drivers",
    description: "Manage driver accounts and PINs, and see who is currently holding a vehicle.",
    searchPlaceholder: "Search by driver ID or name",
    primaryAction: "New driver",
    secondaryAction: "Try V2",
    stats: [
      { label: "Total drivers", value: "4", kind: "number", icon: "users" },
      { label: "Enabled", value: "3", kind: "number", icon: "check", tone: "active" },
      { label: "Disabled", value: "1", kind: "number", icon: "ban" },
      { label: "In session now", value: "1", kind: "number", icon: "activity", tone: "info" },
    ],
    segments: [
      { label: "All", count: 4 },
      { label: "Enabled", count: 3, tone: "active" },
      { label: "Disabled", count: 1 },
    ],
    filters: [
      { label: "Search", kind: "search", placeholder: "Search by name…" },
      { label: "Status", options: ["All", "Enabled", "Disabled"] },
    ],
    columns: [
      { key: "driverId", label: "Driver ID", width: "10rem" },
      { key: "name", label: "Name" },
      { key: "status", label: "Status" },
      { key: "sessions", label: "Sessions (30d)", kind: "number", hideBelow: "md" },
      { key: "lastSession", label: "Last session", kind: "date", hideBelow: "md" },
    ],
    page: { current: 1, total: 1 },
    selectable: false,
    rows: [
      {
        id: "FED001",
        recordSlug: "driver",
        segment: "Enabled",
        cells: {
          driverId: c("FED001"),
          name: c("AA AA", { link: true }),
          status: c("Enabled", { badges: [{ label: "Enabled", tone: "info", variant: "outline" }] }),
          sessions: c("18"),
          lastSession: c("06/08/2026", { sub: "FED-003" }),
        },
        actions: [
          { label: "Edit / Reset PIN", icon: "key", variant: "outline" },
          { label: "Disable", icon: "power" },
        ],
      },
      {
        id: "AAA",
        segment: "Enabled",
        cells: {
          driverId: c("AAA"),
          name: c("ttfh tufu", { link: true }),
          status: c("Enabled", { badges: [{ label: "Enabled", tone: "info", variant: "outline" }] }),
          sessions: c("6"),
          lastSession: c("29/07/2026", { sub: "FED-011" }),
        },
        actions: [
          { label: "Edit / Reset PIN", icon: "key", variant: "outline" },
          { label: "Disable", icon: "power" },
        ],
      },
      {
        id: "FED004",
        segment: "Enabled",
        cells: {
          driverId: c("FED004"),
          name: c("Joe Meli", { link: true }),
          status: c("Enabled", { badges: [{ label: "Enabled", tone: "info", variant: "outline" }] }),
          sessions: c("11"),
          lastSession: c("02/08/2026", { sub: "FED-014" }),
        },
        actions: [
          { label: "Edit / Reset PIN", icon: "key", variant: "outline" },
          { label: "Disable", icon: "power" },
        ],
      },
      {
        id: "FED007",
        segment: "Disabled",
        cells: {
          driverId: c("FED007"),
          name: c("Marija Borg", { link: true }),
          status: c("Disabled", { badges: [{ label: "Disabled", tone: "neutral", variant: "outline" }] }),
          sessions: c("0"),
          lastSession: c("14/05/2026"),
        },
        actions: [
          { label: "Edit / Reset PIN", icon: "key", variant: "outline" },
          { label: "Enable", icon: "power" },
        ],
      },
    ],
  },
  {
    slug: "assets",
    name: "Assets",
    typeLabel: "Asset",
    title: "Assets",
    description: "Track equipment and inventory across the fleet, with serial numbers, cost and supplier.",
    searchPlaceholder: "Search by asset name or serial number",
    primaryAction: "Add asset",
    uploadAction: "Import assets",
    stats: [
      { label: "Total assets", value: "5", kind: "number", icon: "package" },
      { label: "Active", value: "4", kind: "number", icon: "check", tone: "active" },
      { label: "Replaced", value: "1", kind: "number", icon: "archive", tone: "info" },
      { label: "Total purchase value", value: "€255.05", kind: "currency", icon: "money" },
    ],
    segments: [
      { label: "All", count: 5 },
      { label: "Active", count: 4, tone: "active" },
      { label: "Replaced", count: 1, tone: "info" },
    ],
    filters: [
      { label: "Vehicle", options: ["All vehicles", "FED-003", "FED-009", "FED-011"] },
      { label: "Asset type", kind: "search", placeholder: "All types" },
      { label: "Supplier", options: ["All suppliers", "ACP", "Tramanja"] },
      { label: "Status", options: ["All statuses", "Active", "Replaced"] },
    ],
    columns: [
      { key: "name", label: "Asset name" },
      { key: "vehicle", label: "Vehicle", hideBelow: "sm" },
      { key: "type", label: "Type", hideBelow: "md" },
      { key: "serial", label: "Serial number", hideBelow: "md" },
      { key: "purchased", label: "Purchase date", kind: "date", hideBelow: "lg" },
      { key: "cost", label: "Purchase cost", kind: "currency", align: "right" },
      { key: "supplier", label: "Supplier", hideBelow: "lg" },
      { key: "status", label: "Status" },
    ],
    page: { current: 1, total: 1 },
    selectable: false,
    rows: [
      {
        id: "m3u",
        segment: "Replaced",
        cells: {
          name: c("m3u"),
          vehicle: c("FED-003", { link: true }),
          type: c("—"),
          serial: c("—"),
          purchased: c("—"),
          cost: c("€0.05"),
          supplier: c("ACP", { link: true }),
          status: c("Replaced", { badges: [{ label: "Replaced", tone: "info", variant: "outline" }] }),
        },
      },
      {
        id: "gps",
        segment: "Active",
        cells: {
          name: c("GPS tracker"),
          vehicle: c("FED-003", { link: true }),
          type: c("NAV"),
          serial: c("56453erd", { chip: true }),
          purchased: c("Jul 12, 2026"),
          cost: c("€212.00"),
          supplier: c("ACP", { link: true }),
          status: c("Active", { badges: [{ label: "Active", tone: "active", variant: "outline" }] }),
        },
      },
      {
        id: "fire-1",
        recordSlug: "asset",
        segment: "Active",
        cells: {
          name: c("Fire extinguisher"),
          vehicle: c("FED-003", { link: true }),
          type: c("Safety"),
          serial: c("687898kl", { chip: true }),
          purchased: c("Feb 9, 2026"),
          cost: c("€43.00"),
          supplier: c("—"),
          status: c("Active", { badges: [{ label: "Active", tone: "active", variant: "outline" }] }),
        },
      },
      {
        id: "tythd",
        segment: "Active",
        cells: {
          name: c("tythd"),
          vehicle: c("FED-003", { link: true }),
          type: c("—"),
          serial: c("yufyuf", { chip: true }),
          purchased: c("—"),
          cost: c("—"),
          supplier: c("—"),
          status: c("Active", { badges: [{ label: "Active", tone: "active", variant: "outline" }] }),
        },
      },
      {
        id: "fire-2",
        segment: "Active",
        cells: {
          name: c("Fire extinguisher"),
          vehicle: c("FED-009", { link: true }),
          type: c("Safety"),
          serial: c("2435678", { chip: true }),
          purchased: c("—"),
          cost: c("—"),
          supplier: c("—"),
          status: c("Active", { badges: [{ label: "Active", tone: "active", variant: "outline" }] }),
        },
      },
    ],
  },
  {
    slug: "fines",
    name: "Fines",
    typeLabel: "Fine",
    title: "Fines",
    description: "Track traffic fines and contraventions across the fleet, matched to the driver on session.",
    searchPlaceholder: "Search by contravention number or driver",
    primaryAction: "Add fine",
    uploadAction: "Attach notices",
    stats: [
      { label: "Outstanding fines", value: "1", kind: "number", icon: "gavel", tone: "warning" },
      { label: "Outstanding amount", value: "€48.00", kind: "currency", icon: "money", tone: "danger", highlight: true, hint: "Due in 6 days" },
      { label: "Total fines", value: "3", kind: "number", icon: "file" },
      { label: "Paid this year", value: "€59.00", kind: "currency", icon: "check" },
    ],
    segments: [
      { label: "All", count: 3 },
      { label: "Outstanding", count: 1, tone: "warning" },
      { label: "Paid", count: 2, tone: "active" },
    ],
    filters: [
      { label: "Vehicle", options: ["All vehicles", "FED-003", "FED-009"] },
      { label: "Driver", options: ["All drivers", "AA AA", "ttfh tufu"] },
      { label: "Status", options: ["All statuses", "Outstanding", "Paid", "Appealed"] },
      { label: "From date", kind: "date" },
      { label: "To date", kind: "date" },
    ],
    columns: [
      { key: "date", label: "Date", kind: "date", width: "9rem" },
      { key: "vehicle", label: "Vehicle" },
      { key: "driver", label: "Driver", hideBelow: "sm" },
      { key: "contravention", label: "Contravention #", hideBelow: "md" },
      { key: "amount", label: "Amount", kind: "currency", align: "right" },
      { key: "status", label: "Status" },
    ],
    page: { current: 1, total: 1 },
    selectable: false,
    rows: [
      {
        id: "fine-1",
        segment: "Outstanding",
        cells: {
          date: c("Aug 4, 2026"),
          vehicle: c("FED-003", { link: true }),
          driver: c("AA AA", { link: true }),
          contravention: c("45-567900-11", { chip: true }),
          amount: c("€48.00"),
          status: c("Outstanding", { badges: [{ label: "Outstanding", tone: "warning", variant: "outline" }] }),
        },
      },
      {
        id: "fine-2",
        segment: "Paid",
        cells: {
          date: c("Jul 21, 2026"),
          vehicle: c("FED-003", { link: true }),
          driver: c("AA AA", { link: true }),
          contravention: c("—"),
          amount: c("€34.00"),
          status: c("Paid", { badges: [{ label: "Paid", tone: "active", variant: "outline" }] }),
        },
      },
      {
        id: "fine-3",
        recordSlug: "fine",
        segment: "Paid",
        cells: {
          date: c("Jul 18, 2026"),
          vehicle: c("FED-003", { link: true }),
          driver: c("AA AA", { link: true }),
          contravention: c("45-567655-09", { chip: true }),
          amount: c("€25.00"),
          status: c("Paid", { badges: [{ label: "Paid", tone: "active", variant: "outline" }] }),
        },
      },
    ],
  },
  {
    slug: "fuel",
    name: "Fuel",
    typeLabel: "Fuel entry",
    title: "Fuel",
    description: "Log fuel fill-ups and track fuel spend across the fleet.",
    searchPlaceholder: "Search by receipt number or supplier",
    primaryAction: "Add fuel",
    uploadAction: "Attach receipts",
    stats: [
      { label: "Fuel spend (Aug 2026)", value: "€211.01", kind: "currency", icon: "money" },
      { label: "Fill-ups (Aug 2026)", value: "5", kind: "number", icon: "fuel", tone: "warning" },
      { label: "Avg cost / fill-up", value: "€70.34", kind: "currency", icon: "gauge", tone: "active" },
      { label: "Missing receipt", value: "3", kind: "number", icon: "alert", tone: "warning", hint: "Chase drivers" },
    ],
    segments: [
      { label: "All", count: 5 },
      { label: "With receipt", count: 2, tone: "active" },
      { label: "Missing receipt", count: 3, tone: "warning" },
    ],
    filters: [
      { label: "Vehicle", options: ["All vehicles", "FED-003", "FED-009"] },
      { label: "Supplier", options: ["All suppliers", "ACP", "Tramanja"] },
      { label: "From date", kind: "date" },
      { label: "To date", kind: "date" },
    ],
    columns: [
      { key: "date", label: "Date", kind: "date", width: "9rem" },
      { key: "vehicle", label: "Vehicle" },
      { key: "amount", label: "Amount", kind: "currency", align: "right" },
      { key: "litres", label: "Litres", kind: "number", hideBelow: "sm" },
      { key: "receipt", label: "Receipt #", hideBelow: "md" },
      { key: "supplier", label: "Supplier", hideBelow: "md" },
    ],
    page: { current: 1, total: 1 },
    selectable: false,
    rows: [
      {
        id: "fuel-1",
        segment: "Missing receipt",
        cells: {
          date: c("Aug 9, 2026"),
          vehicle: c("FED-003", { link: true }),
          amount: c("€0.07"),
          litres: c("—"),
          receipt: c("—"),
          supplier: c("ACP", { link: true }),
        },
      },
      {
        id: "fuel-2",
        segment: "Missing receipt",
        cells: {
          date: c("Aug 8, 2026"),
          vehicle: c("FED-003", { link: true }),
          amount: c("€0.12"),
          litres: c("—"),
          receipt: c("—"),
          supplier: c("ACP", { link: true }),
        },
      },
      {
        id: "fuel-3",
        segment: "Missing receipt",
        cells: {
          date: c("Jul 27, 2026"),
          vehicle: c("FED-009", { link: true }),
          amount: c("€65.00"),
          litres: c("0.05 L"),
          receipt: c("—"),
          supplier: c("ACP", { link: true }),
        },
      },
      {
        id: "fuel-4",
        segment: "With receipt",
        cells: {
          date: c("Jul 27, 2026"),
          vehicle: c("FED-003", { link: true }),
          amount: c("€101.01"),
          litres: c("—"),
          receipt: c("343434rr", { chip: true }),
          supplier: c("ACP", { link: true }),
        },
      },
      {
        id: "fuel-5",
        recordSlug: "fuel",
        segment: "With receipt",
        cells: {
          date: c("Jul 27, 2026"),
          vehicle: c("FED-003", { link: true }),
          amount: c("€45.00"),
          litres: c("20 L"),
          receipt: c("56564t", { chip: true }),
          supplier: c("ACP", { link: true }),
        },
      },
    ],
  },
  {
    slug: "licence-policy",
    name: "Licence & Policy",
    typeLabel: "Renewal",
    title: "Licence & Policy",
    description: "Track road licence, insurance and VRT renewals across the fleet.",
    searchPlaceholder: "Search by vehicle or policy number",
    primaryAction: "Add renewal",
    uploadAction: "Attach documents",
    stats: [
      { label: "Expired", value: "1", kind: "number", icon: "x", tone: "danger", highlight: true, hint: "Past expiry" },
      { label: "Expiring soon", value: "0", kind: "number", icon: "clock", tone: "warning", hint: "None expiring" },
      { label: "Next renewal", value: "Aug 11, 2027", kind: "date", icon: "calendar", hint: "In 363 days" },
      { label: "Annual cost", value: "€711.00", kind: "currency", icon: "money" },
    ],
    segments: [
      { label: "All", count: 2 },
      { label: "Active", count: 1, tone: "active" },
      { label: "Expired", count: 1, tone: "danger" },
    ],
    filters: [
      { label: "Vehicle", options: ["All vehicles", "FED-003", "FED-009"] },
      { label: "Date from", kind: "date" },
      { label: "Date to", kind: "date" },
    ],
    columns: [
      { key: "vehicle", label: "Vehicle", width: "9rem" },
      { key: "renewal", label: "Renewal date", kind: "date" },
      { key: "licence", label: "Licence", kind: "currency", align: "right", hideBelow: "md" },
      { key: "policy", label: "Policy", kind: "currency", align: "right", hideBelow: "md" },
      { key: "vrt", label: "VRT", kind: "currency", align: "right", hideBelow: "lg" },
      { key: "total", label: "Total", kind: "currency", align: "right" },
      { key: "status", label: "Status" },
      { key: "paid", label: "Paid" },
    ],
    page: { current: 1, total: 1 },
    selectable: false,
    rows: [
      {
        id: "lic-1",
        recordSlug: "licence-policy",
        segment: "Active",
        cells: {
          vehicle: c("FED-003", { link: true }),
          renewal: c("Aug 11, 2026"),
          licence: c("—"),
          policy: c("—"),
          vrt: c("—"),
          total: c("€0.00"),
          status: c("Active", { badges: [{ label: "Active", tone: "active", variant: "outline" }] }),
          paid: c("Unpaid", { badges: [{ label: "Unpaid", tone: "neutral", variant: "outline" }] }),
        },
      },
      {
        id: "lic-2",
        segment: "Expired",
        cells: {
          vehicle: c("FED-009", { link: true }),
          renewal: c("Jul 27, 2026"),
          licence: c("€45.00"),
          policy: c("€666.00"),
          vrt: c("—"),
          total: c("€711.00"),
          status: c("Expired", { badges: [{ label: "Expired", tone: "danger", variant: "outline" }] }),
          paid: c("Paid", { badges: [{ label: "Paid", tone: "active", variant: "outline" }] }),
        },
      },
    ],
  },
  {
    slug: "suppliers",
    name: "Suppliers",
    typeLabel: "Supplier",
    title: "Suppliers",
    description: "Companies used for repairs, maintenance, parts and services.",
    searchPlaceholder: "Search by name…",
    primaryAction: "Add supplier",
    stats: [
      { label: "Total suppliers", value: "3", kind: "number", icon: "building" },
      { label: "Active", value: "3", kind: "number", icon: "check", tone: "active" },
      { label: "Inactive", value: "0", kind: "number", icon: "ban" },
      { label: "Spend this year", value: "€1,842.00", kind: "currency", icon: "money" },
    ],
    segments: [
      { label: "All", count: 3 },
      { label: "Active", count: 3, tone: "active" },
      { label: "Inactive", count: 0 },
    ],
    filters: [
      { label: "Search", kind: "search", placeholder: "Search by name…" },
      { label: "Type", options: ["All types", "Insurance", "Fuel supplier", "Parts supplier", "Repair garage", "Maintenance"] },
      { label: "Status", options: ["All", "Active", "Inactive"] },
    ],
    columns: [
      { key: "name", label: "Name", width: "12rem" },
      { key: "types", label: "Types" },
      { key: "contact", label: "Contact", hideBelow: "md" },
      { key: "phone", label: "Phone", hideBelow: "md" },
      { key: "email", label: "Email", hideBelow: "lg" },
      { key: "status", label: "Status" },
    ],
    page: { current: 1, total: 1 },
    selectable: false,
    rows: [
      {
        id: "ABC Insurance",
        segment: "Active",
        cells: {
          name: c("ABC Insurance", { link: true }),
          types: c("", { tags: ["Insurance"] }),
          contact: c("ABC INS"),
          phone: c("99009988"),
          email: c("—"),
          status: c("Active", { badges: [{ label: "Active", tone: "active", variant: "outline" }] }),
        },
        actions: [{ label: "Edit", icon: "pencil" }],
      },
      {
        id: "ACP",
        segment: "Active",
        cells: {
          name: c("ACP", { link: true }),
          types: c("", { tags: ["Fuel supplier", "Parts supplier"] }),
          contact: c("Fname surname"),
          phone: c("999000999"),
          email: c("—"),
          status: c("Active", { badges: [{ label: "Active", tone: "active", variant: "outline" }] }),
        },
        actions: [{ label: "Edit", icon: "pencil" }],
      },
      {
        id: "Tramanja",
        segment: "Active",
        cells: {
          name: c("Tramanja", { link: true }),
          types: c("", { tags: ["Repair garage", "Maintenance", "Insurance"] }),
          contact: c("Joe Meli"),
          phone: c("99998880"),
          email: c("—"),
          status: c("Active", { badges: [{ label: "Active", tone: "active", variant: "outline" }] }),
        },
        actions: [{ label: "Edit", icon: "pencil" }],
      },
    ],
  },
  {
    slug: "history-log",
    name: "History Log",
    typeLabel: "Event",
    title: "History Log",
    description: "Every action across the fleet — admin changes and driver activity, all in one timeline.",
    searchPlaceholder: "Search by event, vehicle or actor",
    primaryAction: "Export log",
    stats: [
      { label: "Events today", value: "14", kind: "number", icon: "activity" },
      { label: "Admin actions", value: "11", kind: "number", icon: "shield", tone: "info" },
      { label: "Driver actions", value: "3", kind: "number", icon: "users", tone: "active" },
      { label: "Status changes", value: "9", kind: "number", icon: "clipboard" },
    ],
    segments: [
      { label: "All", count: 8 },
      { label: "Damage activity", count: 3, tone: "danger" },
      { label: "Repair activity", count: 4, tone: "info" },
      { label: "Session activity", count: 1, tone: "active" },
    ],
    filters: [
      { label: "Vehicle", options: ["All vehicles", "FED-003", "FED-009"] },
      { label: "Actor", options: ["All", "Admin", "Driver"] },
      { label: "Source", options: ["All sources", "Damage activity", "Repair activity", "Issue activity", "Session activity"] },
      { label: "From date", kind: "date" },
      { label: "To date", kind: "date" },
    ],
    columns: [
      { key: "datetime", label: "Date / time", width: "11rem" },
      { key: "vehicle", label: "Vehicle", hideBelow: "sm" },
      { key: "actor", label: "Actor" },
      { key: "event", label: "Event" },
      { key: "performedBy", label: "Performed by", hideBelow: "md" },
      { key: "transition", label: "Status transition", hideBelow: "lg" },
    ],
    page: { current: 1, total: 6 },
    selectable: false,
    rows: [
      {
        id: "log-1",
        recordSlug: "damage",
        segment: "Damage activity",
        cells: {
          datetime: c("10 Aug 2026, 17:04"),
          vehicle: c("FED-003", { link: true }),
          actor: c("Admin", { badges: [{ label: "Admin", tone: "info", variant: "outline" }] }),
          event: c("Damage status: pending_approval → approved", { sub: "Damage activity" }),
          performedBy: c("admin@fleetguard.com"),
          transition: c("pending_approval → approved"),
        },
      },
      {
        id: "log-2",
        segment: "Damage activity",
        cells: {
          datetime: c("10 Aug 2026, 17:04"),
          vehicle: c("FED-003", { link: true }),
          actor: c("Admin", { badges: [{ label: "Admin", tone: "info", variant: "outline" }] }),
          event: c("Damage status: approved → pending_approval", { sub: "Damage activity" }),
          performedBy: c("admin@fleetguard.com"),
          transition: c("approved → pending_approval"),
        },
      },
      {
        id: "log-3",
        recordSlug: "repair",
        segment: "Repair activity",
        cells: {
          datetime: c("10 Aug 2026, 17:03"),
          vehicle: c("FED-003", { link: true }),
          actor: c("Admin", { badges: [{ label: "Admin", tone: "info", variant: "outline" }] }),
          event: c("Repair status: scheduled → being_repaired", { sub: "Repair activity" }),
          performedBy: c("admin@fleetguard.com"),
          transition: c("scheduled → being_repaired"),
        },
      },
      {
        id: "log-4",
        segment: "Repair activity",
        cells: {
          datetime: c("10 Aug 2026, 17:03"),
          vehicle: c("FED-003", { link: true }),
          actor: c("Admin", { badges: [{ label: "Admin", tone: "info", variant: "outline" }] }),
          event: c("Repair status: to_repair → scheduled", { sub: "Repair activity" }),
          performedBy: c("admin@fleetguard.com"),
          transition: c("to_repair → scheduled"),
        },
      },
      {
        id: "log-5",
        segment: "Repair activity",
        cells: {
          datetime: c("10 Aug 2026, 17:02"),
          vehicle: c("FED-003", { link: true }),
          actor: c("Admin", { badges: [{ label: "Admin", tone: "info", variant: "outline" }] }),
          event: c("Repair status: — → to_repair", { sub: "Repair activity" }),
          performedBy: c("—"),
          transition: c("— → to_repair"),
        },
      },
      {
        id: "log-6",
        segment: "Repair activity",
        cells: {
          datetime: c("07 Aug 2026, 16:35"),
          vehicle: c("FED-009", { link: true }),
          actor: c("Admin", { badges: [{ label: "Admin", tone: "info", variant: "outline" }] }),
          event: c("Repair status: scheduled → being_repaired", { sub: "Repair activity" }),
          performedBy: c("admin@fleetguard.com"),
          transition: c("scheduled → being_repaired"),
        },
      },
      {
        id: "log-7",
        segment: "Damage activity",
        cells: {
          datetime: c("06 Aug 2026, 22:56"),
          vehicle: c("FED-003", { link: true }),
          actor: c("Admin", { badges: [{ label: "Admin", tone: "info", variant: "outline" }] }),
          event: c("Damage status: pending_approval → approved", { sub: "Damage activity" }),
          performedBy: c("admin@fleetguard.com"),
          transition: c("pending_approval → approved"),
        },
      },
      {
        id: "log-8",
        recordSlug: "session",
        segment: "Session activity",
        cells: {
          datetime: c("06 Aug 2026, 22:54"),
          vehicle: c("FED-003", { link: true }),
          actor: c("Driver", { badges: [{ label: "Driver", tone: "active", variant: "outline" }] }),
          event: c("Session ended by AA AA", { sub: "Session activity" }),
          performedBy: c("AA AA"),
          transition: c("—"),
        },
      },
    ],
  },
];

export function getList(slug: string) {
  return lists.find((list) => list.slug === slug);
}
