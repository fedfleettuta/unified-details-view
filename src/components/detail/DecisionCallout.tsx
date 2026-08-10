import { ShieldQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { RecordDecision } from "@/data/records";

const toneClass: Record<RecordDecision["tone"], string> = {
  warning: "border-warning/40 bg-warning-soft",
  info: "border-info/40 bg-info-soft",
  active: "border-success/40 bg-success-soft",
  danger: "border-danger/40 bg-danger-soft",
};

const textClass: Record<RecordDecision["tone"], string> = {
  warning: "text-warning",
  info: "text-info",
  active: "text-success",
  danger: "text-danger",
};

export function DecisionCallout({ decision }: { decision: RecordDecision }) {
  return (
    <section
      className={cn(
        "rise-in rounded-xl border p-5 shadow-panel sm:p-6",
        toneClass[decision.tone],
      )}
    >
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0 space-y-1.5">
          <p className={cn("label-micro flex items-center gap-1.5", textClass[decision.tone])}>
            <ShieldQuestion className="h-3.5 w-3.5" aria-hidden />
            Action required
          </p>
          <h2 className="font-display text-base font-semibold tracking-tight">{decision.title}</h2>
          <p className={cn("text-sm", textClass[decision.tone])}>{decision.body}</p>
          {decision.note ? (
            <p className="text-xs text-muted-foreground">{decision.note}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button size="sm">{decision.primaryLabel}</Button>
          {decision.secondaryLabel ? (
            <Button size="sm" variant="outline" className="bg-surface">
              {decision.secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}