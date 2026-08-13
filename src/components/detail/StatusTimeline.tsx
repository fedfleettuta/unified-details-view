import { useState } from "react";
import { ArrowRight, ChevronDown, History } from "lucide-react";

import { Panel, PanelHeader } from "./Panel";
import { cn } from "@/lib/utils";
import type { RecordStatusTimeline } from "@/data/records";

export function StatusTimeline({ timeline }: { timeline: RecordStatusTimeline }) {
  const [open, setOpen] = useState(true);

  return (
    <Panel>
      <PanelHeader
        title={timeline.title}
        icon={<History className="h-4 w-4" />}
        action={
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            {open ? "Collapse" : `Show ${timeline.items.length}`}
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} aria-hidden />
          </button>
        }
      />

      {open ? (
        <ol className="mt-5 space-y-4">
          {timeline.items.map((item, index) => (
            <li key={`${item.title}-${item.meta}`} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
              <span className="relative flex w-4 justify-center">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
                {index < timeline.items.length - 1 ? (
                  <span className="absolute top-4 bottom-[-1rem] w-px bg-hairline" aria-hidden />
                ) : null}
              </span>
              <div className="min-w-0 space-y-1">
                <p className="text-sm font-medium">{item.title}</p>
                {item.transition ? (
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {item.transition.split("→")[0]?.trim()}
                    <ArrowRight className="h-3 w-3" aria-hidden />
                    <span className="font-medium text-foreground">
                      {item.transition.split("→")[1]?.trim()}
                    </span>
                  </p>
                ) : null}
                <p className="font-numeric text-xs text-muted-foreground">{item.meta}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : null}

      {timeline.note ? (
        <p className="mt-4 border-t border-hairline pt-3 text-xs text-muted-foreground">
          {timeline.note}
        </p>
      ) : null}
    </Panel>
  );
}
