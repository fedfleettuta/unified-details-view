import { cn } from "@/lib/utils";
import type { StatusTone } from "@/data/records";

const toneClass: Record<StatusTone, string> = {
  active: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
  neutral: "bg-surface-muted text-muted-foreground",
};

export function StatusPill({
  label,
  tone = "neutral",
  size = "md",
  className,
}: {
  label: string;
  tone?: StatusTone;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full font-medium",
        size === "md" ? "px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[11px]",
        toneClass[tone],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}