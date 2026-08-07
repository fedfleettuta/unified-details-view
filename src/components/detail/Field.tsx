import { cn } from "@/lib/utils";
import type { FieldKind } from "@/data/records";

export function FieldValue({
  value,
  kind,
  className,
}: {
  value?: string | null | undefined;
  kind?: FieldKind | undefined;
  className?: string | undefined;
}) {
  if (!value || value === "—") {
    return <span className="text-muted-foreground/60">—</span>;
  }

  return (
    <span
      className={cn(
        "text-foreground",
        (kind === "money" || kind === "number" || kind === "date") && "font-numeric",
        kind === "money" && "font-medium",
        kind === "mono" && "font-mono text-[0.9em] tracking-tight",
        className,
      )}
    >
      {value}
    </span>
  );
}

export function Field({
  label,
  value,
  kind,
}: {
  label: string;
  value?: string | null | undefined;
  kind?: FieldKind | undefined;
}) {
  return (
    <div className="min-w-0 space-y-1">
      <dt className="label-micro">{label}</dt>
      <dd className="text-sm leading-relaxed break-words">
        <FieldValue value={value} kind={kind} />
      </dd>
    </div>
  );
}