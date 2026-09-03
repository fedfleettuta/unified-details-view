import { cn } from "@/lib/utils";
import type { MarkerKind } from "@/data/blueprints";

const legend: Array<{ kind: MarkerKind; label: string; dot: string }> = [
  { kind: "session", label: "This session", dot: "bg-danger" },
  { kind: "pending", label: "Awaiting approval", dot: "bg-warning" },
  { kind: "existing", label: "Pre-existing", dot: "bg-info" },
  { kind: "repaired", label: "Repaired", dot: "bg-success" },
];

export function ZoneLegend({
  kinds,
  className,
}: {
  kinds?: MarkerKind[];
  className?: string | undefined;
}) {
  const items = kinds?.length ? legend.filter((item) => kinds.includes(item.kind)) : legend;
  if (!items.length) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-x-4 gap-y-1.5", className)}>
      {items.map((item) => (
        <li key={item.kind} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className={cn("h-2 w-2 rounded-full", item.dot)} aria-hidden />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
