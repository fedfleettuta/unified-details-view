import { History } from "lucide-react";

import { Panel, PanelHeader } from "@/components/detail/Panel";
import { cn } from "@/lib/utils";
import { dashboard } from "@/data/dashboard";
import type { StatusTone } from "@/data/records";

const dotTone: Record<StatusTone, string> = {
  active: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-muted-foreground/50",
};

export function ActivityFeed() {
  const { title, note, items } = dashboard.feed;

  return (
    <Panel className="flex h-full flex-col">
      <PanelHeader
        title={title}
        icon={<History className="h-4 w-4" />}
        action={<span className="text-xs text-muted-foreground">{note}</span>}
      />
      <ol className="mt-5 flex-1 space-y-5">
        {items.map((item) => (
          <li key={item.title} className="relative pl-5">
            <span
              className={cn("absolute left-0 top-1.5 h-2 w-2 rounded-full", dotTone[item.tone])}
              aria-hidden
            />
            <p className="text-sm font-medium leading-snug">{item.title}</p>
            <p className="font-numeric mt-0.5 text-xs text-muted-foreground">{item.meta}</p>
            {item.transition ? (
              <p className="mt-1 text-xs text-muted-foreground/80">{item.transition}</p>
            ) : null}
          </li>
        ))}
      </ol>
    </Panel>
  );
}