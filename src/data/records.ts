export type StatusTone = "active" | "warning" | "danger" | "neutral" | "info";

export type FieldKind = "text" | "money" | "date" | "number" | "mono";

export interface RecordField {
  label: string;
  value?: string | null;
  kind?: FieldKind;
}

export interface RecordFieldGroup {
  title: string;
  fields: RecordField[];
}

export interface RecordDocument {
  label: string;
  name?: string | null;
}

export interface SummaryItem {
  label: string;
  value: string;
  kind?: FieldKind;
  tone?: StatusTone;
}

export interface ActivityTable {
  kind: "table";
  title: string;
  columns: string[];
  rows: Array<Array<{ text: string; tone?: StatusTone; kind?: FieldKind }>>;
}

export interface ActivityTimeline {
  kind: "timeline";
  title: string;
  items: Array<{ title: string; meta: string; transition?: string }>;
}

export type RecordActivity = ActivityTable | ActivityTimeline;

export interface RecordOrigin {
  eyebrow: string;
  title: string;
  lines: string[];
  actionLabel: string;
  /** Mono reference chip under the title, e.g. fed003-017. */
  reference?: string;
  /** Status badge shown next to the reference, e.g. "To Repair". */
  badge?: { label: string; tone: StatusTone };
}

export interface RecordSpotlight {
  eyebrow: string;
  title: string;
  tone?: StatusTone;
  stateLabel?: string;
  items: SummaryItem[];
  actionLabel?: string;
}

export interface RecordMetrics {
  title: string;
  note?: string;
  items: SummaryItem[];
}

export interface ComplianceItem {
  label: string;
  value: string;
  meta: string;
  tone: StatusTone;
}

export interface RelatedList {
  title: string;
  countLabel?: string;
  columns: string[];
  rows: Array<Array<{ text: string; tone?: StatusTone; kind?: FieldKind }>>;
  linkLabel: string;
  emptyLabel?: string;
}

/** A single checklist line inside a pre-trip / return inspection. */
export interface InspectionItem {
  label: string;
  state: "pass" | "issue" | "na";
  note?: string;
  actionLabel?: string;
}

export interface InspectionBlock {
  title: string;
  meta?: string;
  issueLabel?: string;
  items: InspectionItem[];
  emptyLabel?: string;
}

export interface RecordInspections {
  title: string;
  note?: string;
  blocks: InspectionBlock[];
}

export interface EvidencePhoto {
  name: string;
  approvalLabel?: string;
  approvalTone?: StatusTone;
}

export interface RecordEvidence {
  title: string;
  blueprintLabel: string;
  views: string[];
  activeView: string;
  /** Marker position on the schematic, in percent of the frame. */
  marker?: { x: number; y: number; label: string };
  /** Damage report this evidence belongs to; drives shared blueprint markers. */
  reportId?: string;
  hint?: string;
  photosTitle: string;
  photos: EvidencePhoto[];
  photosEmptyLabel?: string;
  /** Per-photo moderation actions, e.g. ["Unapprove", "Delete"]. */
  photoActions?: string[];
}

/** Shared blueprint/zone surface: Start Vehicle, Return Vehicle, Admin blueprint. */
export interface RecordBlueprint {
  title: string;
  note?: string;
  hint?: string;
  /** Which blueprint view opens first, e.g. "Front". */
  activeView?: string;
  legendKinds?: Array<"existing" | "session" | "pending" | "repaired">;
  phases: Array<{
    id: string;
    label: string;
    /** "pre-trip" | "return" | "spot-check" highlight this phase; "all" shows everything. */
    phase?: "pre-trip" | "return" | "spot-check" | "all";
    sessionRef?: string;
    note?: string;
    readOnly?: boolean;
  }>;
}


export interface RecordDecision {
  tone: Extract<StatusTone, "warning" | "info" | "active" | "danger">;
  title: string;
  body: string;
  primaryLabel: string;
  secondaryLabel?: string;
  note?: string;
}

/** Header action button. */
export interface RecordAction {
  label: string;
  variant?: "primary" | "outline" | "success";
  icon?: "car" | "check" | "plus" | "external" | "wrench" | "eye";
}

/** Collapsible status timeline shown right under the details panel. */
export interface RecordStatusTimeline {
  title: string;
  note?: string;
  items: Array<{ title: string; meta: string; transition?: string }>;
}

export interface DamageReportItem {
  typeLabel: string;
  view: string;
  approvalLabel: string;
  approvalTone: StatusTone;
  description?: string;
  photoCount: number;
  reference?: string;
}

export interface DamageReportBlock {
  title: string;
  countLabel?: string;
  items: DamageReportItem[];
  emptyLabel?: string;
}

export interface RecordDamageReports {
  title: string;
  note?: string;
  blocks: DamageReportBlock[];
}

export interface RecordConfig {
  slug: string;
  /** Name of the list page this record belongs to. */
  listName: string;
  listPlural: string;
  /** Short human title of the record type, e.g. "Fuel Entry". */
  typeLabel: string;
  title: string;
  reference?: string;
  crumb: string;
  status: { label: string; tone: StatusTone };
  /** Extra state pills next to the main status, e.g. Approved + To Repair. */
  statusExtras?: Array<{ label: string; tone: StatusTone }>;
  /** Muted timestamp under the title, e.g. "06/08/2026, 17:44:43". */
  timestamp?: string;
  /** Ghost chip for switching template variants, e.g. "Switch to Version B". */
  variantLabel?: string;
  vehicle?: { reg: string; model: string };
  headline: string;
  summary: SummaryItem[];
  groups: RecordFieldGroup[];
  documents: RecordDocument[];
  origin?: RecordOrigin;
  /** Linked-record banners (linked damage, linked repair, source checklist item). */
  links?: RecordOrigin[];
  statusTimeline?: RecordStatusTimeline;
  spotlight?: RecordSpotlight;
  metrics?: RecordMetrics;
  compliance?: ComplianceItem[];
  related?: RelatedList[];
  inspections?: RecordInspections;
  damageReports?: RecordDamageReports;
  evidence?: RecordEvidence;
  blueprint?: RecordBlueprint;
  decision?: RecordDecision;
  activity?: RecordActivity;
  primaryAction?: string;
  /** Full header action set; falls back to primaryAction + View vehicle. */
  actions?: RecordAction[];
  description: string;
}

const VEHICLE = { reg: "FED-003", model: "Toyota Hiace" };

export const records: RecordConfig[] = [
  {
    slug: "vehicle",
    listName: "Vehicles",
    listPlural: "Vehicles",
    typeLabel: "Vehicle",
    title: "FED-003",
    reference: "VIN JTFR12P900123456",
    crumb: "FED-003",
    status: { label: "Active", tone: "active" },
    headline: "Toyota Hiace · 2019 diesel panel van · assigned to AA AA",
    summary: [
      { label: "Odometer", value: "148,210 km", kind: "number" },
      { label: "Next service", value: "Sep 12, 2026", kind: "date" },
      { label: "Licence expiry", value: "Aug 8, 2026", kind: "date", tone: "warning" },
      { label: "In use by", value: "AA AA", tone: "info" },
      { label: "Since", value: "Aug 8, 2026 · 07:42" },
      { label: "Last returned by", value: "AA AA — Aug 7, 17:05" },
      { label: "Open damages", value: "3", kind: "number", tone: "warning" },
    ],
    groups: [
      {
        title: "Identity",
        fields: [
          { label: "Registration", value: "FED-003", kind: "mono" },
          { label: "Make", value: "Toyota" },
          { label: "Model", value: "Hiace" },
          { label: "Year", value: "2019", kind: "number" },
          { label: "VIN", value: "JTFR12P900123456", kind: "mono" },
          { label: "Body type", value: "Panel van" },
        ],
      },
      {
        title: "Specification",
        fields: [
          { label: "Fuel type", value: "Diesel" },
          { label: "Engine size", value: "2.8 L" },
          { label: "Transmission", value: null },
          { label: "Seats", value: "3", kind: "number" },
          { label: "Gross weight", value: null },
          { label: "Colour", value: "White" },
        ],
      },
      {
        title: "Ownership",
        fields: [
          { label: "Owner", value: "Fleetguard Ltd" },
          { label: "Acquired on", value: "Mar 14, 2022", kind: "date" },
          { label: "Purchase cost", value: "€24,500.00", kind: "money" },
          { label: "Finance agreement", value: null, kind: "mono" },
          { label: "Depot", value: "Marsa yard" },
          { label: "Notes", value: null },
        ],
      },
    ],
    documents: [
      { label: "Registration document", name: "vrt-fed003.pdf" },
      { label: "Insurance certificate", name: null },
      { label: "Vehicle photo", name: "fed003-front.jpg" },
    ],
    spotlight: {
      eyebrow: "Current session",
      title: "In use by AA AA since Aug 8, 2026 at 7:42 AM",
      tone: "info",
      stateLabel: "Open session",
      actionLabel: "View session",
      items: [
        { label: "Start inspection", value: "Completed", tone: "active" },
        { label: "Odometer at start", value: "148,210 km", kind: "number" },
        { label: "Elapsed", value: "6h 12m" },
        { label: "Issues raised", value: "1", kind: "number", tone: "warning" },
      ],
    },
    blueprint: {
      title: "Vehicle blueprint",
      note: "Admin view of every zone and every damage report on this vehicle.",
      hint: "Select a zone to capture view, zone id and precise position for a new report.",
      activeView: "Front",
      phases: [{ id: "all", label: "All damage", phase: "all" }],
    },
    metrics: {
      title: "Running costs",
      note: "Last 90 days",
      items: [
        { label: "Fuel", value: "€612.40", kind: "money" },
        { label: "Maintenance", value: "€1,240.00", kind: "money" },
        { label: "Fines", value: "€75.00", kind: "money" },
        { label: "Cost / km", value: "€0.31", kind: "money" },
        { label: "Consumption", value: "9.8 L / 100 km", kind: "number" },
        { label: "Distance driven", value: "6,420 km", kind: "number" },
      ],
    },
    compliance: [
      { label: "Licence expiry", value: "Aug 8, 2026", meta: "Expires in 24 days", tone: "warning" },
      { label: "Insurance expiry", value: "Sep 1, 2026", meta: "48 days left", tone: "active" },
      { label: "VRT expiry", value: "Jan 14, 2027", meta: "Valid", tone: "active" },
      { label: "Next service", value: "Sep 12, 2026", meta: "In 1,790 km", tone: "neutral" },
    ],
    related: [
      {
        title: "Open damages",
        countLabel: "3 open · 1 being repaired",
        columns: ["Damage", "Position", "Reported by", "Reported", "Repair"],
        rows: [
          [
            { text: "Scratch" },
            { text: "Front bumper — left" },
            { text: "AA AA" },
            { text: "Aug 7, 2026", kind: "date" },
            { text: "Being repaired", tone: "info" },
          ],
          [
            { text: "Missing part" },
            { text: "Rear light cover" },
            { text: "AA AA" },
            { text: "Jul 30, 2026", kind: "date" },
            { text: "To repair", tone: "warning" },
          ],
          [
            { text: "Dent" },
            { text: "Sliding door — right" },
            { text: "BB BB" },
            { text: "Jul 22, 2026", kind: "date" },
            { text: "To repair", tone: "warning" },
          ],
        ],
        linkLabel: "All damages for FED-003",
      },
      {
        title: "Open checklist issues",
        countLabel: "2 unresolved",
        columns: ["Item", "Inspection", "Reported by", "Reported", "Status"],
        rows: [
          [
            { text: "Lights (head, brake, indicators)" },
            { text: "Pre-trip" },
            { text: "AA AA" },
            { text: "Aug 5, 2026", kind: "date" },
            { text: "Sent to workshop", tone: "info" },
          ],
          [
            { text: "Tyre tread — rear left" },
            { text: "Return" },
            { text: "AA AA" },
            { text: "Aug 2, 2026", kind: "date" },
            { text: "Not actioned", tone: "warning" },
          ],
        ],
        linkLabel: "All issues for FED-003",
      },
      {
        title: "Recent sessions",
        countLabel: "Last 4 of 128",
        columns: ["Driver", "Started", "Returned", "Duration", "Km", "Return check"],
        rows: [
          [
            { text: "AA AA" },
            { text: "Aug 8, 07:42" },
            { text: "—" },
            { text: "6h 12m" },
            { text: "—" },
            { text: "Pending", tone: "info" },
          ],
          [
            { text: "AA AA" },
            { text: "Aug 7, 07:31" },
            { text: "Aug 7, 17:05" },
            { text: "9h 34m" },
            { text: "182", kind: "number" },
            { text: "Completed", tone: "active" },
          ],
          [
            { text: "BB BB" },
            { text: "Aug 6, 06:58" },
            { text: "Aug 6, 16:12" },
            { text: "9h 14m" },
            { text: "154", kind: "number" },
            { text: "Completed", tone: "active" },
          ],
          [
            { text: "AA AA" },
            { text: "Aug 5, 07:20" },
            { text: "Aug 5, 15:44" },
            { text: "8h 24m" },
            { text: "141", kind: "number" },
            { text: "Missing", tone: "danger" },
          ],
        ],
        linkLabel: "All sessions for FED-003",
      },
      {
        title: "Attached assets",
        countLabel: "2 assigned",
        columns: ["Asset", "Serial", "Condition", "Next inspection"],
        rows: [
          [
            { text: "Fire extinguisher" },
            { text: "68789 8KI", kind: "mono" },
            { text: "New", tone: "active" },
            { text: "Feb 9, 2027", kind: "date" },
          ],
          [
            { text: "First aid kit" },
            { text: "FA-2291", kind: "mono" },
            { text: "Check due", tone: "warning" },
            { text: "Aug 20, 2026", kind: "date" },
          ],
        ],
        linkLabel: "All assets for FED-003",
      },
    ],
    activity: {
      kind: "timeline",
      title: "Audit history",
      items: [
        {
          title: "Sent for repair",
          meta: "by admin@fleetguard.com · Aug 5, 2026 at 8:02 AM",
          transition: "Active → In workshop",
        },
        {
          title: "Driver assigned",
          meta: "by admin@fleetguard.com · Feb 9, 2026 at 10:15 AM",
          transition: "Unassigned → AA AA",
        },
      ],
    },
    primaryAction: "Edit vehicle",
    description:
      "Fleet vehicle record with identity, specification, ownership and audit trail on the shared detail template.",
  },
  {
    slug: "driver",
    listName: "Drivers",
    listPlural: "Drivers",
    typeLabel: "Driver",
    title: "AA AA",
    reference: "FED001",
    crumb: "AA AA",
    status: { label: "Enabled", tone: "active" },
    vehicle: VEHICLE,
    headline: "Licence CE valid to Oct 31, 2026 · CPC valid",
    summary: [
      { label: "Licence number", value: "MT-675576675", kind: "mono" },
      { label: "Licence expiry", value: "Oct 31, 2026", kind: "date" },
      { label: "CPC expiry", value: "Mar 26, 2027", kind: "date" },
      { label: "CPC valid", value: "Yes", tone: "active" },
    ],
    groups: [
      {
        title: "Identity",
        fields: [
          { label: "Name", value: "AA AA" },
          { label: "Employee #", value: "FED001", kind: "mono" },
          { label: "Mobile", value: null },
          { label: "Email", value: "aa@fleetguard.com" },
        ],
      },
      {
        title: "Licence",
        fields: [
          { label: "Licence type", value: "Local" },
          { label: "Licence category", value: "CE" },
          { label: "Licence number", value: "MT-675576675", kind: "mono" },
          { label: "Licence expiry date", value: "Oct 31, 2026", kind: "date" },
          { label: "CPC valid", value: "Yes" },
          { label: "CPC expiry date", value: "Mar 26, 2027", kind: "date" },
        ],
      },
      {
        title: "Employment",
        fields: [
          { label: "Depot", value: "Marsa yard" },
          { label: "Start date", value: "Jan 8, 2024", kind: "date" },
          { label: "Notes", value: null },
        ],
      },
    ],
    documents: [
      { label: "Licence photo", name: "licence-fed001.jpg" },
      { label: "CPC card", name: null },
    ],
    spotlight: {
      eyebrow: "Current session",
      title: "Driving FED-003 since Aug 8, 2026 at 7:42 AM",
      tone: "info",
      stateLabel: "Open session",
      actionLabel: "View session",
      items: [
        { label: "Start inspection", value: "Completed", tone: "active" },
        { label: "Return inspection", value: "Pending", tone: "info" },
        { label: "Elapsed", value: "6h 12m" },
        { label: "Odometer at start", value: "148,210 km", kind: "number" },
      ],
    },
    metrics: {
      title: "Driving activity",
      note: "Last 30 days",
      items: [
        { label: "Sessions", value: "22", kind: "number" },
        { label: "Hours driven", value: "186h 40m" },
        { label: "Distance driven", value: "3,180 km", kind: "number" },
        { label: "Vehicles driven", value: "3", kind: "number" },
        { label: "Return checks missed", value: "1", kind: "number" },
        { label: "Damages reported", value: "4", kind: "number" },
      ],
    },
    compliance: [
      { label: "Licence expiry", value: "Oct 31, 2026", meta: "84 days left", tone: "active" },
      { label: "CPC expiry", value: "Mar 26, 2027", meta: "Valid", tone: "active" },
      { label: "Return inspections", value: "21 of 22 completed", meta: "1 missed", tone: "warning" },
    ],
    related: [
      {
        title: "Recent sessions",
        countLabel: "Last 4 of 128",
        columns: ["Vehicle", "Started", "Returned", "Duration", "Km", "Return check"],
        rows: [
          [
            { text: "FED-003", kind: "mono" },
            { text: "Aug 8, 07:42" },
            { text: "—" },
            { text: "6h 12m" },
            { text: "—" },
            { text: "Pending", tone: "info" },
          ],
          [
            { text: "FED-003", kind: "mono" },
            { text: "Aug 7, 07:31" },
            { text: "Aug 7, 17:05" },
            { text: "9h 34m" },
            { text: "182", kind: "number" },
            { text: "Completed", tone: "active" },
          ],
          [
            { text: "FED-007", kind: "mono" },
            { text: "Aug 6, 07:04" },
            { text: "Aug 6, 15:58" },
            { text: "8h 54m" },
            { text: "128", kind: "number" },
            { text: "Completed", tone: "active" },
          ],
          [
            { text: "FED-003", kind: "mono" },
            { text: "Aug 5, 07:20" },
            { text: "Aug 5, 15:44" },
            { text: "8h 24m" },
            { text: "141", kind: "number" },
            { text: "Missing", tone: "danger" },
          ],
        ],
        linkLabel: "All sessions for AA AA",
      },
      {
        title: "Damages reported",
        countLabel: "4 reported · 2 during their session",
        columns: ["Damage", "Vehicle", "Reported", "Approval", "Repair"],
        rows: [
          [
            { text: "Scratch — front bumper" },
            { text: "FED-003", kind: "mono" },
            { text: "Aug 7, 2026", kind: "date" },
            { text: "Approved", tone: "active" },
            { text: "Being repaired", tone: "info" },
          ],
          [
            { text: "Missing rear light cover" },
            { text: "FED-003", kind: "mono" },
            { text: "Jul 30, 2026", kind: "date" },
            { text: "Approved", tone: "active" },
            { text: "To repair", tone: "warning" },
          ],
          [
            { text: "Wing mirror crack" },
            { text: "FED-007", kind: "mono" },
            { text: "Jul 18, 2026", kind: "date" },
            { text: "Rejected", tone: "danger" },
            { text: "—" },
          ],
        ],
        linkLabel: "All damages by AA AA",
      },
      {
        title: "Fines",
        countLabel: "3 fines · €75.00 · €50.00 unpaid",
        columns: ["Contravention", "Vehicle", "Fine date", "Amount", "Status"],
        rows: [
          [
            { text: "45-567655-09", kind: "mono" },
            { text: "FED-003", kind: "mono" },
            { text: "Jul 18, 2026", kind: "date" },
            { text: "€25.00", kind: "money" },
            { text: "Paid", tone: "active" },
          ],
          [
            { text: "45-591220-04", kind: "mono" },
            { text: "FED-003", kind: "mono" },
            { text: "Jun 29, 2026", kind: "date" },
            { text: "€30.00", kind: "money" },
            { text: "Unpaid", tone: "danger" },
          ],
          [
            { text: "45-604411-77", kind: "mono" },
            { text: "FED-007", kind: "mono" },
            { text: "May 12, 2026", kind: "date" },
            { text: "€20.00", kind: "money" },
            { text: "Unpaid", tone: "danger" },
          ],
        ],
        linkLabel: "All fines for AA AA",
      },
      {
        title: "Vehicles driven",
        countLabel: "Last 30 days",
        columns: ["Vehicle", "Sessions", "Km", "Last driven"],
        rows: [
          [
            { text: "FED-003 · Toyota Hiace" },
            { text: "18", kind: "number" },
            { text: "2,640", kind: "number" },
            { text: "Aug 8, 2026", kind: "date" },
          ],
          [
            { text: "FED-007 · Ford Transit" },
            { text: "3", kind: "number" },
            { text: "402", kind: "number" },
            { text: "Aug 6, 2026", kind: "date" },
          ],
          [
            { text: "FED-011 · Renault Kangoo" },
            { text: "1", kind: "number" },
            { text: "138", kind: "number" },
            { text: "Jul 24, 2026", kind: "date" },
          ],
        ],
        linkLabel: "All sessions by vehicle",
      },
    ],
    activity: {
      kind: "timeline",
      title: "Audit history",
      items: [
        {
          title: "Licence renewed",
          meta: "by admin@fleetguard.com · Nov 2, 2025 at 11:31 AM",
          transition: "Expiry 31/10/2025 → 31/10/2026",
        },
        {
          title: "Driver enabled",
          meta: "by admin@fleetguard.com · Jan 8, 2024 at 9:00 AM",
          transition: "Disabled → Enabled",
        },
      ],
    },
    primaryAction: "Edit driver",
    description:
      "Driver record with identity, licence, CPC and employment details on the shared detail template.",
  },
  {
    slug: "session",
    listName: "Sessions",
    listPlural: "Sessions",
    typeLabel: "Session",
    title: "Session report",
    reference: "SES-0007",
    crumb: "Session — 11/07/2026",
    status: { label: "Completed", tone: "active" },
    vehicle: VEHICLE,
    headline: "AA AA · started Jul 11, 22:40 · returned Jul 12, 14:37 · 2 issues, 2 damages",
    summary: [
      { label: "Driver", value: "AA AA" },
      { label: "Started at", value: "Jul 11, 2026 · 22:40:20", kind: "date" },
      { label: "Ended at", value: "Jul 12, 2026 · 14:37:29", kind: "date" },
      { label: "Duration", value: "15h 57m" },
      { label: "Distance", value: "182 km", kind: "number" },
      { label: "Return inspection", value: "Completed", tone: "active" },
      { label: "Issues raised", value: "2", kind: "number", tone: "warning" },
      { label: "New damages", value: "1", kind: "number", tone: "warning" },
    ],
    groups: [
      {
        title: "Assignment",
        fields: [
          { label: "Driver", value: "AA AA" },
          { label: "Vehicle", value: "FED-003", kind: "mono" },
          { label: "Reference ID", value: "SES-0007", kind: "mono" },
          { label: "Depot", value: "Marsa yard" },
        ],
      },
      {
        title: "Timings",
        fields: [
          { label: "Started at", value: "11/07/2026, 22:40:20", kind: "date" },
          { label: "Ended at", value: "12/07/2026, 14:37:29", kind: "date" },
          { label: "Duration", value: "15h 57m" },
          { label: "Return inspection at", value: "12/07/2026, 14:35:02", kind: "date" },
          { label: "Closed late", value: "No" },
        ],
      },
      {
        title: "Odometer & fuel",
        fields: [
          { label: "Odometer at start", value: "148,028 km", kind: "number" },
          { label: "Odometer at return", value: "148,210 km", kind: "number" },
          { label: "Distance driven", value: "182 km", kind: "number" },
          { label: "Fuel level at return", value: "Full" },
          { label: "Driver notes", value: "Brakes felt soft on the hill descent." },
        ],
      },
    ],
    documents: [
      { label: "Signed session report", name: "ses-0007-report.pdf" },
      { label: "Pre-trip photo set", name: "ses-0007-pretrip.zip" },
      { label: "Return photo set", name: "ses-0007-return.zip" },
    ],
    inspections: {
      title: "Inspections",
      note: "Pre-trip and return checklists recorded by the driver",
      blocks: [
        {
          title: "Pre-trip inspection",
          meta: "Completed 11/07/2026, 22:40 by AA AA",
          issueLabel: "1 issue",
          items: [
            { label: "Lights (head, brake, indicators)", state: "pass" },
            { label: "Fluid leaks underneath", state: "pass" },
            { label: "Dashboard warning lights", state: "pass" },
            {
              label: "Brakes feel",
              state: "issue",
              note: "1 photo · converted to maintenance MNT-003",
              actionLabel: "View maintenance",
            },
            { label: "Seatbelts & interior cleanliness", state: "pass" },
          ],
        },
        {
          title: "Return inspection",
          meta: "Completed 12/07/2026, 14:35 by AA AA",
          issueLabel: "1 issue",
          items: [
            { label: "New damage?", state: "issue", note: "1 item(s) reported" },
            { label: "Fuel level", state: "pass", note: "Full" },
            { label: "Warning lights?", state: "pass" },
          ],
        },
      ],
    },
    damageReports: {
      title: "Damages recorded in this session",
      note: "Each entry links to its own damage record",
      blocks: [
        {
          title: "Damage reported on pre-trip",
          countLabel: "1 item",
          items: [
            {
              typeLabel: "Missing part",
              view: "Front",
              approvalLabel: "Approved",
              approvalTone: "active",
              description: "dgdththh",
              photoCount: 2,
              reference: "fed003-009",
            },
          ],
        },
        {
          title: "Damage reported on return",
          countLabel: "1 item",
          items: [
            {
              typeLabel: "Scratch",
              view: "Front",
              approvalLabel: "Approved",
              approvalTone: "active",
              photoCount: 2,
              reference: "fed003-016",
            },
          ],
        },
      ],
    },
    blueprint: {
      title: "Inspection blueprint",
      note: "Same vehicle geometry as the Start Vehicle and Return Vehicle screens.",
      hint: "Select a zone to see its id and precise position; markers come from driver damage reports.",
      activeView: "Front",
      phases: [
        {
          id: "pre-trip",
          label: "Start vehicle (pre-trip)",
          phase: "pre-trip",
          sessionRef: "SES-0007",
          note: "Damage the driver marked before driving away.",
        },
        {
          id: "return",
          label: "Return vehicle",
          phase: "return",
          sessionRef: "SES-0007",
          note: "New damage marked at return, compared against the pre-trip state.",
        },
        { id: "all", label: "All recorded damage", phase: "all", readOnly: true },
      ],
    },
    related: [
      {
        title: "Issues raised in this session",
        countLabel: "2 issues",
        columns: ["Item", "Inspection", "Outcome", "Record", "Status"],
        rows: [
          [
            { text: "Brakes feel" },
            { text: "Pre-trip" },
            { text: "Sent to maintenance" },
            { text: "MNT-003", kind: "mono" },
            { text: "Repaired", tone: "active" },
          ],
          [
            { text: "New damage?" },
            { text: "Return" },
            { text: "Damage recorded" },
            { text: "fed003-016", kind: "mono" },
            { text: "Pending approval", tone: "warning" },
          ],
        ],
        linkLabel: "All issues for FED-003",
      },
    ],
    activity: {
      kind: "timeline",
      title: "Status timeline",
      items: [
        {
          title: "Session completed",
          meta: "by AA AA · Jul 12, 2026 at 2:37 PM",
          transition: "Return inspection → Completed",
        },
        {
          title: "Return inspection submitted",
          meta: "by AA AA · Jul 12, 2026 at 2:35 PM",
          transition: "In use → Return inspection",
        },
        {
          title: "Vehicle taken out",
          meta: "by AA AA · Jul 11, 2026 at 10:40 PM",
          transition: "Pre-trip inspection → In use",
        },
        {
          title: "Session started",
          meta: "by AA AA · Jul 11, 2026 at 10:40 PM",
          transition: "Draft → Pre-trip inspection",
        },
      ],
    },
    primaryAction: "Export report",
    description:
      "Session report with pre-trip and return inspections, issues, damages and status timeline on the shared detail template.",
  },
  {
    slug: "licence-policy",
    listName: "Licence & Policy",
    listPlural: "Licences & policies",
    typeLabel: "Licence & Policy",
    title: "FED-003",
    reference: "POL-2026-118",
    crumb: "FED-003",
    status: { label: "Expiring soon", tone: "warning" },
    vehicle: VEHICLE,
    headline: "Renews Sep 1, 2026 · expires in 24 days",
    summary: [
      { label: "Total cost", value: "€555.00", kind: "money" },
      { label: "Expiry date", value: "Aug 8, 2026", kind: "date" },
      { label: "Renewal date", value: "Sep 1, 2026", kind: "date" },
      { label: "Payment", value: "Paid", tone: "active" },
    ],
    groups: [
      {
        title: "Policy",
        fields: [
          { label: "Insurance company", value: "ABC Insurance" },
          { label: "Policy number", value: null, kind: "mono" },
          { label: "Notes", value: null },
        ],
      },
      {
        title: "Costs",
        fields: [
          { label: "Policy cost", value: "€555.00", kind: "money" },
          { label: "Licence cost", value: null, kind: "money" },
          { label: "VRT cost", value: null, kind: "money" },
        ],
      },
    ],
    documents: [
      { label: "Licence document", name: null },
      { label: "Insurance document", name: null },
      { label: "VRT document", name: null },
    ],
    activity: {
      kind: "table",
      title: "Renewal history",
      columns: ["Renewal date", "Expiry date", "Insurance company", "Total", "Paid", "Documents"],
      rows: [
        [
          { text: "Jul 28, 2026", kind: "date" },
          { text: "Jul 28, 2027", kind: "date" },
          { text: "ABC Insurance" },
          { text: "€415.00", kind: "money" },
          { text: "Paid", tone: "active" },
          { text: "Licence" },
        ],
        [
          { text: "Jul 30, 2025", kind: "date" },
          { text: "Jul 30, 2026", kind: "date" },
          { text: "ABC Insurance" },
          { text: "€398.00", kind: "money" },
          { text: "Paid", tone: "active" },
          { text: "Licence" },
        ],
      ],
    },
    primaryAction: "Renew policy",
    description:
      "Insurance, licence and VRT renewal record for a fleet vehicle, shown on the shared detail template.",
  },
  {
    slug: "asset",
    listName: "Assets",
    listPlural: "Assets",
    typeLabel: "Asset",
    title: "Fire Extinguisher",
    reference: "68789 8KI",
    crumb: "Fire Extinguisher",
    status: { label: "Active", tone: "active" },
    vehicle: VEHICLE,
    headline: "In service since Feb 9, 2026 · condition new",
    summary: [
      { label: "Purchase cost", value: "€43.00", kind: "money" },
      { label: "Purchase date", value: "Feb 9, 2026", kind: "date" },
      { label: "Condition", value: "New", tone: "active" },
      { label: "Due date", value: "—" },
    ],
    groups: [
      {
        title: "Identity",
        fields: [
          { label: "Asset name", value: "Fire Extinguisher" },
          { label: "Asset type", value: null },
          { label: "Serial number", value: "68789 8KI", kind: "mono" },
        ],
      },
      {
        title: "Procurement",
        fields: [
          { label: "Supplier", value: null },
          { label: "Warranty", value: null },
          { label: "Notes", value: null },
        ],
      },
    ],
    documents: [
      { label: "Purchase invoice", name: null },
      { label: "Photo", name: null },
    ],
    primaryAction: "Log inspection",
    description:
      "Vehicle-assigned equipment record with purchase, warranty and condition details on the shared detail template.",
  },
  {
    slug: "fine",
    listName: "Fines",
    listPlural: "Fines",
    typeLabel: "Fine",
    title: "Fine · Jul 18, 2026",
    reference: "45-567655-09",
    crumb: "Jul 18, 2026",
    status: { label: "Paid", tone: "active" },
    vehicle: VEHICLE,
    headline: "Issued Jul 18, 2026 · settled Jul 20, 2026",
    summary: [
      { label: "Amount", value: "€25.00", kind: "money" },
      { label: "Fine date", value: "Jul 18, 2026", kind: "date" },
      { label: "Payment date", value: "Jul 20, 2026", kind: "date" },
      { label: "Driver", value: "AA AA" },
    ],
    groups: [
      {
        title: "Notice",
        fields: [
          { label: "Contravention number", value: "45-567655-09", kind: "mono" },
          { label: "Authority", value: null },
          { label: "Due date", value: null, kind: "date" },
        ],
      },
      {
        title: "Other",
        fields: [{ label: "Notes", value: null }],
      },
    ],
    documents: [
      { label: "Fine notice", name: "fine-notice.pdf" },
      { label: "Payment receipt", name: "receipt-4567.pdf" },
    ],
    activity: {
      kind: "timeline",
      title: "Activity",
      items: [
        {
          title: "Fine paid",
          meta: "by admin@fleetguard.com · Jul 20, 2026 at 9:12 AM",
          transition: "Unpaid → Paid",
        },
        {
          title: "Fine recorded",
          meta: "by admin@fleetguard.com · Jul 18, 2026 at 4:40 PM",
        },
      ],
    },
    description:
      "Traffic fine record with driver, authority and payment evidence on the shared detail template.",
  },
  {
    slug: "fuel",
    listName: "Fuel",
    listPlural: "Fuel entries",
    typeLabel: "Fuel Entry",
    title: "Fuel · Jul 27, 2026",
    reference: "56664t",
    crumb: "Jul 27, 2026",
    status: { label: "Recorded", tone: "neutral" },
    vehicle: VEHICLE,
    headline: "20 L at €2.25 / L from ACP",
    summary: [
      { label: "Total cost", value: "€45.00", kind: "money" },
      { label: "Litres", value: "20 L", kind: "number" },
      { label: "Price / litre", value: "€2.25", kind: "money" },
      { label: "Date", value: "Jul 27, 2026", kind: "date" },
    ],
    groups: [
      {
        title: "Fill details",
        fields: [
          { label: "Supplier", value: "ACP" },
          { label: "Receipt number", value: "56664t", kind: "mono" },
          { label: "Odometer", value: null, kind: "number" },
        ],
      },
      {
        title: "Other",
        fields: [{ label: "Notes", value: null }],
      },
    ],
    documents: [{ label: "Receipt photo", name: "receipt-jul27.jpg" }],
    description:
      "Fuel purchase record with litres, price per litre and receipt evidence on the shared detail template.",
  },
  {
    slug: "maintenance",
    listName: "Repairs & Maintenance",
    listPlural: "Repairs & maintenance",
    typeLabel: "Maintenance",
    title: "Maintenance",
    reference: "MNT-089",
    crumb: "Maintenance",
    status: { label: "Being repaired", tone: "info" },
    vehicle: VEHICLE,
    headline: "In the workshop since Aug 5, 2026 · no pickup date set",
    summary: [
      { label: "Cost", value: "€0.01", kind: "money" },
      { label: "Repair date", value: "Aug 5, 2026", kind: "date" },
      { label: "Expected pickup", value: "—" },
      { label: "Work category", value: "89" },
    ],
    groups: [
      {
        title: "Job",
        fields: [
          { label: "Supplier", value: "ABC Insurance" },
          {
            label: "Description",
            value: "Maintenance from checklist issue: Lights (head, brake, indicators)",
          },
        ],
      },
      {
        title: "Schedule",
        fields: [
          { label: "Drop-off date", value: null, kind: "date" },
          { label: "Expected pickup date", value: null, kind: "date" },
        ],
      },
      {
        title: "Invoicing",
        fields: [
          { label: "Invoice number", value: null, kind: "mono" },
          { label: "Invoice date", value: null, kind: "date" },
        ],
      },
    ],
    documents: [{ label: "Invoice document", name: null }],
    origin: {
      eyebrow: "Origin · checklist item",
      title: "Lights (head, brake, indicators)",
      lines: ["Inspection: Pre-trip", "Reported by: AA AA"],
      actionLabel: "View session",
    },
    activity: {
      kind: "timeline",
      title: "Audit history",
      items: [
        {
          title: "Repair started",
          meta: "by admin@fleetguard.com · Aug 7, 2026 at 4:29 PM",
          transition: "Scheduled → Being repaired",
        },
        {
          title: "Repair scheduled",
          meta: "by admin@fleetguard.com · Aug 7, 2026 at 4:29 PM",
          transition: "To repair → Scheduled",
        },
      ],
    },
    primaryAction: "Mark repaired",
    description:
      "Workshop job record with schedule, invoicing and audit trail on the shared detail template.",
  },
  {
    slug: "damage",
    listName: "Damages",
    listPlural: "Damages",
    typeLabel: "Damage",
    title: "Scratch — front bumper (left)",
    reference: "DMG-4471",
    crumb: "DMG-4471",
    status: { label: "Approved", tone: "active" },
    vehicle: VEHICLE,
    headline: "Reported by AA AA on Aug 7, 2026 during the return inspection",
    summary: [
      { label: "Damage type", value: "Scratch" },
      { label: "Position", value: "Front bumper — left" },
      { label: "Reported", value: "Aug 7, 2026 · 17:05", kind: "date" },
      { label: "Reported by", value: "AA AA" },
      { label: "Approval", value: "Approved", tone: "active" },
      { label: "Repair status", value: "Being repaired", tone: "info" },
      { label: "Estimated cost", value: "€180.00", kind: "money" },
    ],
    groups: [
      {
        title: "Damage",
        fields: [
          { label: "Damage type", value: "Scratch" },
          { label: "Area", value: "Exterior — front" },
          { label: "Position", value: "Front bumper — left" },
          { label: "Severity", value: "Minor" },
          { label: "Size", value: "12 cm" },
          { label: "Pre-existing", value: "No" },
        ],
      },
      {
        title: "Reporting",
        fields: [
          { label: "Reported by", value: "AA AA" },
          { label: "Inspection", value: "Return inspection" },
          { label: "Reported at", value: "Aug 7, 2026 · 17:05", kind: "date" },
          { label: "Odometer", value: "148,210 km", kind: "number" },
          { label: "Driver notes", value: "Contact while reversing at the Marsa gate." },
          { label: "Depot", value: "Marsa yard" },
        ],
      },
      {
        title: "Assessment",
        fields: [
          { label: "Approved by", value: "admin@fleetguard.com" },
          { label: "Approved at", value: "Aug 7, 2026 · 17:41", kind: "date" },
          { label: "Liability", value: "Driver" },
          { label: "Insurance claim", value: null, kind: "mono" },
          { label: "Estimated cost", value: "€180.00", kind: "money" },
          { label: "Assessor notes", value: null },
        ],
      },
    ],
    documents: [
      { label: "Damage photo", name: "dmg-4471-bumper.jpg" },
      { label: "Close-up photo", name: "dmg-4471-detail.jpg" },
      { label: "Assessment report", name: null },
    ],
    origin: {
      eyebrow: "Origin · session return inspection",
      title: "Session SES-1182 · FED-003 · AA AA",
      lines: ["Started Aug 7, 07:31 · Returned Aug 7, 17:05", "Damage first recorded at return"],
      actionLabel: "View session",
    },
    evidence: {
      title: "Location on blueprint",
      blueprintLabel: "outline schematic",
      views: ["Front", "Rear", "Left", "Right", "Roof", "Interior"],
      activeView: "Front",
      marker: { x: 34, y: 62, label: "Front bumper — left" },
      reportId: "dmg-4471",
      hint: "Tap the blueprint to drop a damage marker.",
      photosTitle: "Driver photos",
      photos: [
        { name: "dmg-4471-bumper.jpg", approvalLabel: "Approved", approvalTone: "active" },
        { name: "dmg-4471-detail.jpg", approvalLabel: "Approved", approvalTone: "active" },
      ],
    },
    decision: {
      tone: "info",
      title: "Management decision required",
      body: "This damage has been approved and is awaiting a decision on whether to send it for repair.",
      primaryLabel: "Send to repair",
      secondaryLabel: "Log as accepted wear",
      note: "Marker and both photos approved by admin@fleetguard.com on Aug 7, 2026.",
    },
    related: [
      {
        title: "Linked repair",
        countLabel: "1 job",
        columns: ["Job", "Supplier", "Status", "Scheduled", "Cost"],
        rows: [
          [
            { text: "RPR-0912", kind: "mono" },
            { text: "Bodyworks Ltd" },
            { text: "Being repaired", tone: "info" },
            { text: "Aug 9, 2026", kind: "date" },
            { text: "€180.00", kind: "money" },
          ],
        ],
        linkLabel: "Open repair job",
      },
    ],
    activity: {
      kind: "timeline",
      title: "Audit history",
      items: [
        {
          title: "Sent to workshop",
          meta: "by admin@fleetguard.com · Aug 8, 2026 at 9:14 AM",
          transition: "To repair → Being repaired",
        },
        {
          title: "Damage approved",
          meta: "by admin@fleetguard.com · Aug 7, 2026 at 5:41 PM",
          transition: "Pending → Approved",
        },
        {
          title: "Damage reported",
          meta: "by AA AA · Aug 7, 2026 at 5:05 PM",
          transition: "Return inspection",
        },
      ],
    },
    primaryAction: "Create repair job",
    description:
      "Vehicle damage record with position, severity, reporting session, assessment and linked repair on the shared detail template.",
  },
  {
    slug: "repair",
    listName: "Repairs",
    listPlural: "Repairs",
    typeLabel: "Repair",
    title: "Front bumper respray",
    reference: "RPR-0912",
    crumb: "RPR-0912",
    status: { label: "Being repaired", tone: "info" },
    vehicle: VEHICLE,
    headline: "Bodyworks Ltd · dropped off Aug 9, 2026 · no pickup date confirmed",
    summary: [
      { label: "Supplier", value: "Bodyworks Ltd" },
      { label: "Repair status", value: "Being repaired", tone: "info" },
      { label: "Drop-off", value: "Aug 9, 2026", kind: "date" },
      { label: "Expected pickup", value: "Aug 12, 2026", kind: "date" },
      { label: "Quoted", value: "€180.00", kind: "money" },
      { label: "Invoiced", value: "—", kind: "money" },
      { label: "Vehicle off road", value: "3 days", tone: "warning" },
    ],
    groups: [
      {
        title: "Job",
        fields: [
          { label: "Work category", value: "Bodywork" },
          { label: "Supplier", value: "Bodyworks Ltd" },
          { label: "Description", value: "Respray front bumper following approved damage DMG-4471." },
          { label: "Assigned to", value: "admin@fleetguard.com" },
        ],
      },
      {
        title: "Schedule",
        fields: [
          { label: "Drop-off date", value: "Aug 9, 2026", kind: "date" },
          { label: "Expected pickup date", value: "Aug 12, 2026", kind: "date" },
          { label: "Actual pickup date", value: null, kind: "date" },
          { label: "Odometer at drop-off", value: "148,392 km", kind: "number" },
        ],
      },
      {
        title: "Costs & invoicing",
        fields: [
          { label: "Quoted cost", value: "€180.00", kind: "money" },
          { label: "Final cost", value: null, kind: "money" },
          { label: "Invoice number", value: null, kind: "mono" },
          { label: "Invoice date", value: null, kind: "date" },
          { label: "Recharged to driver", value: "No" },
          { label: "Notes", value: null },
        ],
      },
    ],
    documents: [
      { label: "Quotation", name: "quote-bodyworks-0912.pdf" },
      { label: "Invoice document", name: null },
      { label: "Before photo", name: "dmg-4471-bumper.jpg" },
    ],
    origin: {
      eyebrow: "Origin · approved damage",
      title: "DMG-4471 · Scratch — front bumper (left)",
      lines: ["Reported by AA AA on Aug 7, 2026", "Approved Aug 7, 2026 · liability: driver"],
      actionLabel: "View damage",
    },
    evidence: {
      title: "Damage location (from DMG-4471)",
      blueprintLabel: "outline schematic",
      views: ["Front", "Rear", "Left", "Right", "Roof", "Interior"],
      activeView: "Front",
      marker: { x: 34, y: 62, label: "Front bumper — left" },
      reportId: "dmg-4471",
      hint: "Read-only view carried over from the source damage record.",
      photosTitle: "Before & after photos",
      photos: [
        { name: "dmg-4471-bumper.jpg", approvalLabel: "Before", approvalTone: "neutral" },
        { name: "dmg-4471-detail.jpg", approvalLabel: "Before", approvalTone: "neutral" },
        { name: "rpr-0912-after.jpg", approvalLabel: "Pending workshop", approvalTone: "info" },
      ],
    },
    related: [
      {
        title: "Damages covered",
        countLabel: "1 damage",
        columns: ["Damage", "Position", "Reported", "Approval", "Estimate"],
        rows: [
          [
            { text: "Scratch" },
            { text: "Front bumper — left" },
            { text: "Aug 7, 2026", kind: "date" },
            { text: "Approved", tone: "active" },
            { text: "€180.00", kind: "money" },
          ],
        ],
        linkLabel: "All damages for FED-003",
      },
    ],
    activity: {
      kind: "timeline",
      title: "Audit history",
      items: [
        {
          title: "Repair started",
          meta: "by admin@fleetguard.com · Aug 9, 2026 at 8:22 AM",
          transition: "Scheduled → Being repaired",
        },
        {
          title: "Repair scheduled",
          meta: "by admin@fleetguard.com · Aug 8, 2026 at 9:14 AM",
          transition: "To repair → Scheduled",
        },
      ],
    },
    primaryAction: "Mark repaired",
    description:
      "Repair job record with supplier, schedule, costs, source damage and audit trail on the shared detail template.",
  },
  {
    slug: "damage-pending",
    listName: "Damages",
    listPlural: "Damages",
    typeLabel: "Damage · pending approval",
    title: "Driver-reported damage",
    reference: "fed003-016",
    crumb: "fed003-016 — FED-003",
    status: { label: "Pending approval", tone: "warning" },
    vehicle: VEHICLE,
    headline: "Reported by AA AA on Jul 26, 2026 · 16:13 · awaiting admin review",
    summary: [
      { label: "Damage type", value: "Scratch" },
      { label: "View", value: "Front" },
      { label: "Reported", value: "Jul 26, 2026 · 16:13", kind: "date" },
      { label: "Reported by", value: "AA AA" },
      { label: "Approval", value: "Pending approval", tone: "warning" },
      { label: "Photos approved", value: "2 of 2", kind: "number", tone: "active" },
      { label: "Marker approved", value: "No", tone: "warning" },
      { label: "Visible in reports", value: "No", tone: "neutral" },
    ],
    groups: [
      {
        title: "Damage",
        fields: [
          { label: "Damage type", value: "Scratch" },
          { label: "View", value: "Front" },
          { label: "Position", value: "Front bumper — centre" },
          { label: "Severity", value: null },
          { label: "Description", value: null },
          { label: "Pre-existing", value: "Unknown — pending review" },
        ],
      },
      {
        title: "Reporting",
        fields: [
          { label: "Reported by", value: "AA AA" },
          { label: "Inspection", value: "Return inspection" },
          { label: "Reported at", value: "26/07/2026, 16:13:19", kind: "date" },
          { label: "Session", value: "SES-0007", kind: "mono" },
          { label: "Odometer", value: "148,210 km", kind: "number" },
          { label: "Depot", value: "Marsa yard" },
        ],
      },
      {
        title: "Review",
        fields: [
          { label: "Version", value: "Version A (of 2)" },
          { label: "Last reviewed by", value: "admin@fleetguard.com" },
          { label: "Last reviewed at", value: "Aug 10, 2026 · 17:04", kind: "date" },
          { label: "Rejection reason", value: null },
          { label: "Liability", value: null },
          { label: "Estimated cost", value: null, kind: "money" },
        ],
      },
    ],
    documents: [
      { label: "Driver photo 1", name: "fed003-016-front-a.jpg" },
      { label: "Driver photo 2", name: "fed003-016-front-b.jpg" },
      { label: "Assessment report", name: null },
    ],
    decision: {
      tone: "warning",
      title: "Review required",
      body: "Approve to make this damage visible in fleet reports, or reject if it doesn't meet documentation standards.",
      primaryLabel: "Approve marker & all photos",
      secondaryLabel: "Reject",
      note: "Rejection reason is optional but recommended — e.g. photos unclear, damage appears pre-existing.",
    },
    evidence: {
      title: "Location on blueprint",
      blueprintLabel: "outline schematic",
      views: ["Front", "Rear", "Left", "Right", "Roof", "Interior"],
      activeView: "Front",
      marker: { x: 46, y: 66, label: "Awaiting approval" },
      reportId: "fed003-016",
      hint: "Tap the blueprint to drop a damage marker.",
      photosTitle: "Driver photos",
      photos: [
        { name: "fed003-016-front-a.jpg", approvalLabel: "Approved", approvalTone: "active" },
        { name: "fed003-016-front-b.jpg", approvalLabel: "Approved", approvalTone: "active" },
      ],
    },
    origin: {
      eyebrow: "Origin · session return inspection",
      title: "Session SES-0007 · FED-003 · AA AA",
      lines: ["Started Jul 11, 22:40 · Returned Jul 12, 14:37", "Damage first recorded at return"],
      actionLabel: "View session",
    },
    activity: {
      kind: "timeline",
      title: "Audit history",
      items: [
        {
          title: "Reverted",
          meta: "by admin@fleetguard.com · Aug 10, 2026 at 5:04 PM",
          transition: "Approved → Pending approval",
        },
        {
          title: "Damage approved",
          meta: "by admin@fleetguard.com · Jul 26, 2026 at 4:41 PM",
          transition: "Pending approval → Approved",
        },
        {
          title: "Damage reported",
          meta: "by AA AA · Jul 26, 2026 at 4:13 PM",
          transition: "Return inspection",
        },
      ],
    },
    primaryAction: "Approve damage",
    description:
      "Driver-reported damage awaiting admin approval, with blueprint marker, photo review state and audit trail on the shared detail template.",
  },
];

export function getRecord(slug: string) {
  return records.find((record) => record.slug === slug);
}