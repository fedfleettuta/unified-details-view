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
  vehicle?: { reg: string; model: string };
  headline: string;
  summary: SummaryItem[];
  groups: RecordFieldGroup[];
  documents: RecordDocument[];
  origin?: RecordOrigin;
  spotlight?: RecordSpotlight;
  metrics?: RecordMetrics;
  compliance?: ComplianceItem[];
  related?: RelatedList[];
  activity?: RecordActivity;
  primaryAction?: string;
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
];

export function getRecord(slug: string) {
  return records.find((record) => record.slug === slug);
}