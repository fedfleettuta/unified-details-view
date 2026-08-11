import { useState, type ReactNode } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UploadDropzone, type UploadItem } from "./UploadDropzone";

export function UploadDialog({
  trigger,
  title = "Upload documents",
  description = "Attach photos, invoices or receipts to this record.",
  categories = ["Photo evidence", "Invoice", "Receipt", "Licence / policy", "Other"],
}: {
  trigger: ReactNode;
  title?: string;
  description?: string;
  categories?: string[];
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<UploadItem[]>([]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display tracking-tight">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="label-micro">Document type</Label>
            <Select defaultValue={categories[0] ?? "Other"}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-sm">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <UploadDropzone onFilesChange={setItems} />

          <div className="space-y-1.5">
            <Label className="label-micro">Note</Label>
            <Textarea rows={2} placeholder="Optional context for reviewers" className="text-sm" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            disabled={!items.length}
            onClick={() => {
              setOpen(false);
              toast.success(
                `${items.length} file${items.length === 1 ? "" : "s"} attached`,
                { description: "Demo only — nothing is stored." },
              );
            }}
          >
            Attach {items.length ? `(${items.length})` : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
