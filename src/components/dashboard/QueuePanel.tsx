import { Link } from "@tanstack/react-router";
import { ArrowRight, ListChecks } from "lucide-react";

import { Panel, PanelHeader } from "@/components/detail/Panel";
import { StatusPill } from "@/components/detail/StatusPill";
import type { QueueBlock } from "@/data/dashboard";

export function QueuePanel({ queue }: { queue: QueueBlock }) {
  return (
    <Panel className="flex h-full flex-col">
      <PanelHeader
        title={queue.title}
        icon={<ListChecks className="h-4 w-4" />}
        action={<span className="text-xs text-muted-foreground">{queue.note}</span>}
      />
      <ul className="mt-2 flex-1 divide-y divide-hairline">
        {queue.items.map((item) => {
          const body = (
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 py-3.5">
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-surface-muted px-1.5 py-0.5 font-mono text-[11px] tracking-tight text-muted-foreground">
                    {item.reference}
                  </span>
                  <StatusPill label={item.badge} tone={item.tone} size="sm" />
                </div>
                <p className="truncate text-sm font-medium">{item.title}</p>
                <p className="truncate text-xs text-muted-foreground">{item.meta}</p>
              </div>
              <span className="font-numeric shrink-0 text-xs text-muted-foreground">
                {item.waiting}
              </span>
            </div>
          );

          return (
            <li key={item.reference}>
              {item.to ? (
                <Link
                  to="/records/$type"
                  params={{ type: item.to.type }}
                  className="block rounded-lg px-1 transition-colors hover:bg-surface-muted/60"
                >
                  {body}
                </Link>
              ) : (
                <div className="px-1">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
      <Link
        to="/lists/$list"
        params={{ list: queue.listSlug }}
        className="mt-4 inline-flex items-center gap-1.5 border-t border-hairline pt-4 text-xs font-medium text-primary"
      >
        {queue.actionLabel}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </Panel>
  );
}