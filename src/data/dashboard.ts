import type { ListStat } from "./lists";
import type { StatusTone } from "./records";

export interface QueueItem {
  reference: string;
  title: string;
  meta: string;
  waiting: string;
  tone: StatusTone;
  badge: string;
  to?: { type: string } | undefined;
}

export interface QueueBlock {
  title: string;
  note: string;
  actionLabel: string;
  listSlug: string;
  items: QueueItem[];
}

export interface FleetRow {
  reg: string;
  model: string;
  state: { label: string; tone: StatusTone };
  driver: string;
  since: string;
  openDamages: string;
  compliance: { label: string; tone: StatusTone };
}

export interface BarSeriesPoint {
  label: string;
  value: number;
  display: string;
}

export interface BarPanel {
  title: string;
  note: string;
  points: BarSeriesPoint[];
  footer: string;
}

export interface BreakdownRow {
  label: string;
  value: number;
  display: string;
  tone: StatusTone;
}

export interface BreakdownPanel {
  title: string;
  note: string;
  total: string;
  totalLabel: string;
  rows: BreakdownRow[];
}

export interface ComplianceRow {
  label: string;
  subject: string;
  value: string;
  meta: string;
  tone: StatusTone;
}

export interface FeedItem {
  title: string;
  meta: string;
  transition?: string;
  tone: StatusTone;
}

export const dashboard = {
  title: "Fleet control room",
  subtitle:
    "Live view of sessions, inspections, damages and spend across 18 vehicles and 24 drivers.",
  timestamp: "Aug 14, 2026 · 12:19 · auto-refresh every 60s",
  stats: [
    {
      label: "Vehicles in use",
      value: "11 / 18",
      kind: "number",
      icon: "car",
      tone: "info",
      hint: "61% utilisation · 4 available, 3 in workshop",
    },
    {
      label: "Open sessions",
      value: "11",
      kind: "number",
      icon: "clock",
      tone: "info",
      hint: "2 running over 10h",
    },
    {
      label: "Awaiting approval",
      value: "7",
      kind: "number",
      icon: "clipboard",
      tone: "warning",
      hint: "5 damages · 2 repair quotes",
      highlight: true,
    },
    {
      label: "Open damages",
      value: "23",
      kind: "number",
      icon: "alert",
      tone: "warning",
      hint: "9 to repair · 6 being repaired",
    },
    {
      label: "Return checks missed",
      value: "3",
      kind: "number",
      icon: "x",
      tone: "danger",
      hint: "Last 7 days",
    },
    {
      label: "Spend this month",
      value: "€8,412.60",
      kind: "money",
      icon: "money",
      tone: "neutral",
      hint: "Fuel €3,180 · Repairs €4,975 · Fines €257",
    },
    {
      label: "Cost / km",
      value: "€0.34",
      kind: "money",
      icon: "gauge",
      tone: "neutral",
      hint: "Target €0.31",
    },
    {
      label: "Expiring in 30 days",
      value: "5",
      kind: "number",
      icon: "shield",
      tone: "warning",
      hint: "2 licences · 2 insurance · 1 VRT",
    },
  ] as ListStat[],

  queues: [
    {
      title: "Damages awaiting admin approval",
      note: "5 pending · oldest 3 days",
      actionLabel: "Open pending damages",
      listSlug: "pending-damages",
      items: [
        {
          reference: "fed003-016",
          title: "Scratch · front bumper (left)",
          meta: "FED-003 · reported by AA AA in pre-trip check",
          waiting: "3d 4h",
          tone: "warning",
          badge: "To approve",
          to: { type: "damage-pending" },
        },
        {
          reference: "fed007-004",
          title: "Missing part · rear light cover",
          meta: "FED-007 · reported by BB BB at return",
          waiting: "2d 1h",
          tone: "warning",
          badge: "To approve",
        },
        {
          reference: "fed011-009",
          title: "Dent · sliding door (right)",
          meta: "FED-011 · reported by CC CC at return",
          waiting: "1d 6h",
          tone: "warning",
          badge: "No photos",
        },
        {
          reference: "fed002-021",
          title: "Crack · windscreen",
          meta: "FED-002 · reported by DD DD in pre-trip check",
          waiting: "22h",
          tone: "danger",
          badge: "Safety",
        },
      ],
    },
    {
      title: "Workshop pipeline",
      note: "6 repairs in progress · 2 quotes to approve",
      actionLabel: "Open repairs",
      listSlug: "repairs",
      items: [
        {
          reference: "RPR-0912",
          title: "Bumper respray · Marsa Body Works",
          meta: "FED-003 · €340.00 · due Aug 16",
          waiting: "In progress",
          tone: "info",
          badge: "Being repaired",
          to: { type: "repair" },
        },
        {
          reference: "RPR-0918",
          title: "Windscreen replacement · GlassFix",
          meta: "FED-002 · quote €520.00 pending approval",
          waiting: "Quote",
          tone: "warning",
          badge: "To approve",
        },
        {
          reference: "RPR-0921",
          title: "Rear light unit · Fleetguard workshop",
          meta: "FED-007 · awaiting part delivery",
          waiting: "Blocked",
          tone: "danger",
          badge: "Waiting part",
        },
        {
          reference: "RPR-0907",
          title: "Sliding-door alignment · Marsa Body Works",
          meta: "FED-011 · completed Aug 12 · €180.00",
          waiting: "Done",
          tone: "active",
          badge: "Repaired",
        },
      ],
    },
  ] as QueueBlock[],

  fleet: {
    title: "Fleet status board",
    note: "18 vehicles · sorted by attention needed",
    rows: [
      {
        reg: "FED-003",
        model: "Toyota Hiace",
        state: { label: "In use", tone: "info" },
        driver: "AA AA",
        since: "Aug 14, 07:42",
        openDamages: "3",
        compliance: { label: "Licence in 24d", tone: "warning" },
      },
      {
        reg: "FED-002",
        model: "Ford Transit",
        state: { label: "In workshop", tone: "danger" },
        driver: "—",
        since: "Aug 12, 09:10",
        openDamages: "2",
        compliance: { label: "Insurance in 12d", tone: "warning" },
      },
      {
        reg: "FED-007",
        model: "Renault Kangoo",
        state: { label: "In workshop", tone: "danger" },
        driver: "—",
        since: "Aug 11, 14:25",
        openDamages: "4",
        compliance: { label: "Valid", tone: "active" },
      },
      {
        reg: "FED-011",
        model: "Peugeot Partner",
        state: { label: "In use", tone: "info" },
        driver: "CC CC",
        since: "Aug 14, 06:58",
        openDamages: "1",
        compliance: { label: "VRT in 28d", tone: "warning" },
      },
      {
        reg: "FED-005",
        model: "Toyota Proace",
        state: { label: "Available", tone: "active" },
        driver: "—",
        since: "Returned Aug 13, 17:22",
        openDamages: "0",
        compliance: { label: "Valid", tone: "active" },
      },
      {
        reg: "FED-014",
        model: "Fiat Ducato",
        state: { label: "In use", tone: "info" },
        driver: "DD DD",
        since: "Aug 14, 05:40",
        openDamages: "2",
        compliance: { label: "Valid", tone: "active" },
      },
    ] as FleetRow[],
  },

  sessions: {
    title: "Sessions today",
    note: "Started vs returned, by hour",
    points: [
      { label: "06", value: 4, display: "4 started" },
      { label: "07", value: 7, display: "7 started" },
      { label: "08", value: 3, display: "3 started" },
      { label: "09", value: 1, display: "1 started" },
      { label: "15", value: 2, display: "2 returned" },
      { label: "16", value: 5, display: "5 returned" },
      { label: "17", value: 6, display: "6 returned" },
    ],
    footer: "17 sessions started · 6 returned · 11 still open",
  } as BarPanel,

  spend: {
    title: "Spend trend",
    note: "Last 6 months, all cost types",
    points: [
      { label: "Mar", value: 6120, display: "€6,120" },
      { label: "Apr", value: 7480, display: "€7,480" },
      { label: "May", value: 6890, display: "€6,890" },
      { label: "Jun", value: 9240, display: "€9,240" },
      { label: "Jul", value: 7960, display: "€7,960" },
      { label: "Aug", value: 8412, display: "€8,413" },
    ],
    footer: "Rolling 6-month average €7,684 · Aug tracking 9% above",
  } as BarPanel,

  damageBreakdown: {
    title: "Open damages by state",
    note: "Across all vehicles",
    total: "23",
    totalLabel: "Open damages",
    rows: [
      { label: "To approve", value: 5, display: "5", tone: "warning" },
      { label: "To repair", value: 9, display: "9", tone: "warning" },
      { label: "Being repaired", value: 6, display: "6", tone: "info" },
      { label: "Rejected", value: 3, display: "3", tone: "danger" },
    ],
  } as BreakdownPanel,

  inspectionBreakdown: {
    title: "Inspection compliance",
    note: "Last 30 days · 214 sessions",
    total: "96%",
    totalLabel: "Checks completed",
    rows: [
      { label: "Pre-trip completed", value: 212, display: "212 / 214", tone: "active" },
      { label: "Return completed", value: 205, display: "205 / 214", tone: "active" },
      { label: "Return missed", value: 9, display: "9", tone: "danger" },
      { label: "Issues raised", value: 41, display: "41", tone: "warning" },
    ],
  } as BreakdownPanel,

  compliance: {
    title: "Expiries & renewals",
    note: "Next 60 days",
    rows: [
      {
        label: "Licence expiry",
        subject: "FED-003 · Toyota Hiace",
        value: "Sep 7, 2026",
        meta: "24 days left",
        tone: "warning",
      },
      {
        label: "Insurance expiry",
        subject: "FED-002 · Ford Transit",
        value: "Aug 26, 2026",
        meta: "12 days left",
        tone: "danger",
      },
      {
        label: "VRT expiry",
        subject: "FED-011 · Peugeot Partner",
        value: "Sep 11, 2026",
        meta: "28 days left",
        tone: "warning",
      },
      {
        label: "Driving licence",
        subject: "AA AA",
        value: "Sep 30, 2026",
        meta: "47 days left",
        tone: "neutral",
      },
      {
        label: "Next service",
        subject: "FED-014 · Fiat Ducato",
        value: "Sep 2, 2026",
        meta: "In 940 km",
        tone: "neutral",
      },
    ] as ComplianceRow[],
  },

  drivers: {
    title: "Driver activity",
    note: "Last 30 days · top 5 by hours",
    rows: [
      {
        name: "AA AA",
        sessions: "26",
        hours: "214h",
        km: "3,180",
        reported: "5",
        missed: { label: "0 missed", tone: "active" as StatusTone },
      },
      {
        name: "BB BB",
        sessions: "24",
        hours: "198h",
        km: "2,940",
        reported: "3",
        missed: { label: "1 missed", tone: "warning" as StatusTone },
      },
      {
        name: "CC CC",
        sessions: "22",
        hours: "181h",
        km: "2,610",
        reported: "6",
        missed: { label: "0 missed", tone: "active" as StatusTone },
      },
      {
        name: "DD DD",
        sessions: "19",
        hours: "154h",
        km: "2,240",
        reported: "2",
        missed: { label: "2 missed", tone: "danger" as StatusTone },
      },
      {
        name: "EE EE",
        sessions: "17",
        hours: "138h",
        km: "1,980",
        reported: "1",
        missed: { label: "0 missed", tone: "active" as StatusTone },
      },
    ],
  },

  feed: {
    title: "Recent activity",
    note: "Newest first",
    items: [
      {
        title: "Damage fed003-017 approved",
        meta: "Admin · Aug 14, 11:58",
        transition: "To approve → To repair",
        tone: "active",
      },
      {
        title: "Session SES-0031 started",
        meta: "DD DD · FED-014 · Aug 14, 05:40",
        transition: "Pre-trip check completed",
        tone: "info",
      },
      {
        title: "Fine FIN-0142 assigned to driver",
        meta: "Admin · Aug 14, 09:12",
        transition: "Unassigned → AA AA",
        tone: "warning",
      },
      {
        title: "Repair RPR-0907 marked repaired",
        meta: "Marsa Body Works · Aug 12, 16:04",
        transition: "Being repaired → Repaired",
        tone: "active",
      },
      {
        title: "Return check missed",
        meta: "DD DD · FED-014 · Aug 11, 18:20",
        transition: "Session closed without return inspection",
        tone: "danger",
      },
      {
        title: "Fuel entry added",
        meta: "BB BB · FED-007 · €62.40 · Aug 11, 08:31",
        tone: "neutral",
      },
    ] as FeedItem[],
  },
};