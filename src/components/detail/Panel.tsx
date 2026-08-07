import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  children,
  className,
  padded = true,
}: {
  children: ReactNode;
  className?: string | undefined;
  padded?: boolean;
}) {
  return (
    <section
      className={cn(
        "rise-in rounded-xl border border-hairline bg-surface shadow-panel",
        padded && "p-5 sm:p-6",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function PanelHeader({
  title,
  icon,
  action,
  className,
}: {
  title: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string | undefined;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-hairline pb-4",
        className,
      )}
    >
      <h2 className="flex min-w-0 items-center gap-2 font-display text-sm font-semibold tracking-tight">
        {icon ? <span className="shrink-0 text-muted-foreground">{icon}</span> : null}
        <span className="truncate">{title}</span>
      </h2>
      {action}
    </div>
  );
}