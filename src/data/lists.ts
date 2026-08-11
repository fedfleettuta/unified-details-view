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

export interface ListCell {
  text: string;
  sub?: string;
  kind?: FieldKind;
  tone?: StatusTone;
}

export interface ListRow {
  id: string;
  /** Detail record this row opens, when a demo detail page exists. */
  recordSlug?: string;
  segment: string;
  cells: Record<string, ListCell>;
}

export interface ListSegment {
  label: string;
  count: number;
}

export interface ListFilter {
  label: string;
  options: string[];
}

export interface ListConfig {
  slug: string;
  name: string;
  typeLabel: string;
  title: string;
  description: string;
  searchPlaceholder: string;
  primaryAction: string;
  /** Enables the upload button in the list header (bulk import / attachments). */
  uploadAction?: string;
  stats: SummaryItem[];
  segments: ListSegment[];
  filters: ListFilter[];
  columns: ListColumn[];
  rows: ListRow[];
  emptyLabel?: string;
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
];

export function getList(slug: string) {
  return lists.find((list) => list.slug === slug);
}
