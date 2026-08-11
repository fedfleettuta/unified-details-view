import { useCallback, useRef, useState } from "react";
import { CheckCircle2, FileUp, Loader2, Paperclip, X } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface UploadItem {
  id: string;
  name: string;
  size: string;
  progress: number;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Presentation-only uploader: accepts drops and picks, then simulates progress
 * so the template can be reviewed without a backend.
 */
export function UploadDropzone({
  label = "Drop files here",
  hint = "PNG, JPG or PDF up to 10 MB",
  accept = "image/*,application/pdf",
  multiple = true,
  onFilesChange,
  className,
}: {
  label?: string;
  hint?: string;
  accept?: string;
  multiple?: boolean;
  onFilesChange?: (items: UploadItem[]) => void;
  className?: string | undefined;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [items, setItems] = useState<UploadItem[]>([]);

  const push = useCallback(
    (files: FileList | null) => {
      if (!files?.length) return;
      const added: UploadItem[] = Array.from(files).map((file, index) => ({
        id: `${Date.now()}-${index}-${file.name}`,
        name: file.name,
        size: formatSize(file.size),
        progress: 0,
      }));

      setItems((current) => {
        const next = multiple ? [...current, ...added] : added;
        onFilesChange?.(next);
        return next;
      });

      added.forEach((item) => {
        let value = 0;
        const timer = setInterval(() => {
          value = Math.min(100, value + 12 + Math.random() * 18);
          setItems((current) =>
            current.map((entry) =>
              entry.id === item.id ? { ...entry, progress: Math.round(value) } : entry,
            ),
          );
          if (value >= 100) clearInterval(timer);
        }, 220);
      });
    },
    [multiple, onFilesChange],
  );

  const remove = (id: string) =>
    setItems((current) => {
      const next = current.filter((item) => item.id !== id);
      onFilesChange?.(next);
      return next;
    });

  return (
    <div className={cn("space-y-3", className)}>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          push(event.dataTransfer.files);
        }}
        className={cn(
          "rounded-xl border border-dashed p-6 text-center transition-colors",
          dragging
            ? "border-primary bg-accent/60"
            : "border-hairline bg-surface-muted/40 hover:border-primary/40",
        )}
      >
        <FileUp className="mx-auto h-5 w-5 text-muted-foreground" aria-hidden />
        <p className="mt-2 font-display text-sm font-semibold tracking-tight">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface px-3 py-1.5 text-xs font-medium transition-colors hover:bg-surface-muted"
        >
          <Paperclip className="h-3.5 w-3.5" aria-hidden />
          Choose {multiple ? "files" : "a file"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(event) => push(event.target.files)}
        />
      </div>

      {items.length ? (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-lg border border-hairline bg-surface px-3 py-2.5 text-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="min-w-0">
                  <span className="block truncate font-medium">{item.name}</span>
                  <span className="font-numeric text-xs text-muted-foreground">{item.size}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  {item.progress >= 100 ? (
                    <CheckCircle2 className="h-4 w-4 text-success" aria-hidden />
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" aria-hidden />
                  )}
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-surface-muted hover:text-danger"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </span>
              </div>
              {item.progress < 100 ? <Progress value={item.progress} className="mt-2 h-1" /> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
