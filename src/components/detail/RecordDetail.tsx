import { ExternalLink, GitBranch } from "lucide-react";

import { RecordHeader } from "./RecordHeader";
import { DetailsPanel } from "./DetailsPanel";
import { SummaryRail } from "./SummaryRail";
import { ActivityBlock } from "./ActivityBlock";
import { Panel } from "./Panel";
import { Spotlight } from "./Spotlight";
import { MetricStrip } from "./MetricStrip";
import { ComplianceStrip } from "./ComplianceStrip";
import { RelatedLists } from "./RelatedLists";
import { InspectionPanels } from "./InspectionPanels";
import { DamageReportPanels } from "./DamageReportPanels";
import { EvidencePanel } from "./EvidencePanel";
import { DecisionCallout } from "./DecisionCallout";
import { Button } from "@/components/ui/button";
import type { RecordConfig } from "@/data/records";

export function RecordDetail({ record }: { record: RecordConfig }) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:py-12">
      <RecordHeader
        record={record}
        actions={
          <>
            {record.primaryAction ? (
              <Button size="sm" className="shadow-panel">
                {record.primaryAction}
              </Button>
            ) : null}
            {record.vehicle ? (
              <Button size="sm" variant="outline">
                View vehicle
              </Button>
            ) : null}
          </>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="order-2 space-y-5 lg:order-1">
          {record.spotlight ? <Spotlight spotlight={record.spotlight} /> : null}

          {record.decision ? <DecisionCallout decision={record.decision} /> : null}

          {record.origin ? (
            <Panel className="border-l-2 border-l-primary">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0 space-y-1">
                  <p className="label-micro flex items-center gap-1.5">
                    <GitBranch className="h-3.5 w-3.5" aria-hidden />
                    {record.origin.eyebrow}
                  </p>
                  <h2 className="font-display text-base font-semibold tracking-tight">
                    {record.origin.title}
                  </h2>
                  {record.origin.lines.map((line) => (
                    <p key={line} className="text-xs text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>
                <Button size="sm" variant="outline" className="shrink-0">
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  {record.origin.actionLabel}
                </Button>
              </div>
            </Panel>
          ) : null}

          <DetailsPanel groups={record.groups} recordTitle={record.typeLabel} />

          {record.evidence ? <EvidencePanel evidence={record.evidence} /> : null}

          {record.inspections ? <InspectionPanels inspections={record.inspections} /> : null}

          {record.damageReports ? <DamageReportPanels reports={record.damageReports} /> : null}

          {record.metrics ? <MetricStrip metrics={record.metrics} /> : null}

          {record.related ? <RelatedLists lists={record.related} /> : null}

          {record.activity ? <ActivityBlock activity={record.activity} /> : null}
        </div>

        <aside className="order-1 lg:sticky lg:top-8 lg:order-2">
          <div className="space-y-5">
            <SummaryRail summary={record.summary} documents={record.documents} />
            {record.compliance ? <ComplianceStrip items={record.compliance} /> : null}
          </div>
        </aside>
      </div>
    </div>
  );
}