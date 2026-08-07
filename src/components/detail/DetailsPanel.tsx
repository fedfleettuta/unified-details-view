import { useState } from "react";
import { ListTree, Pencil } from "lucide-react";

import { Panel, PanelHeader } from "./Panel";
import { Field } from "./Field";
import type { RecordFieldGroup } from "@/data/records";

export function DetailsPanel({ groups }: { groups: RecordFieldGroup[] }) {
  const [showEmpty, setShowEmpty] = useState(false);

  const emptyCount = groups.reduce(
    (total, group) => total + group.fields.filter((field) => !field.value).length,
    0,
  );

  const visibleGroups = groups
    .map((group) => ({
      ...group,
      fields: showEmpty ? group.fields : group.fields.filter((field) => field.value),
    }))
    .filter((group) => group.fields.length > 0);

  return (
    <Panel>
      <PanelHeader
        title="Details"
        icon={<ListTree className="h-4 w-4" />}
        action={
          <div className="flex items-center gap-1">
            {emptyCount > 0 ? (
              <button
                type="button"
                onClick={() => setShowEmpty((value) => !value)}
                className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
              >
                {showEmpty ? "Hide empty" : `Show empty (${emptyCount})`}
              </button>
            ) : null}
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-accent"
            >
              <Pencil className="h-3.5 w-3.5" aria-hidden />
              Edit
            </button>
          </div>
        }
      />

      <div className="mt-5 space-y-6">
        {visibleGroups.map((group) => (
          <div key={group.title} className="space-y-3">
            <h3 className="label-micro text-foreground/70">{group.title}</h3>
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.fields.map((field) => (
                <Field
                  key={field.label}
                  label={field.label}
                  value={field.value}
                  kind={field.kind}
                />
              ))}
            </dl>
          </div>
        ))}
      </div>
    </Panel>
  );
}