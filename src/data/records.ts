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
  activity?: RecordActivity;
  primaryAction?: string;
  description: string;
}

const VEHICLE = { reg: "FED-003", model: "Toyota Hiace" };

export const records: RecordConfig[] = [
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