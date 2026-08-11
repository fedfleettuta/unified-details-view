import { useState, type ReactNode } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UploadDropzone } from "./UploadDropzone";
import type { RecordFieldGroup } from "@/data/records";

function inputType(kind?: string) {
  if (kind === "money" || kind === "number") return "text";
  return "text";
}

/**
 * Generic edit form: every record type reuses it because the fields come from
 * the same grouped config the read view renders.
 */
export function EditRecordSheet({
  trigger,
  title,
  groups,
  withAttachments = true,
}: {
  trigger: ReactNode;
  title: string;
  groups: RecordFieldGroup[];
  withAttachments?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-xl">
        <SheetHeader className="border-b border-hairline px-6 py-5">
          <SheetTitle className="font-display tracking-tight">Edit {title}</SheetTitle>
          <SheetDescription>
            Same grouped structure as the read view, so fields never move around.
          </SheetDescription>
        </SheetHeader>

        <form
          id="edit-record-form"
          className="flex-1 space-y-7 overflow-y-auto px-6 py-6"
          onSubmit={(event) => {
            event.preventDefault();
            setSaving(true);
            setTimeout(() => {
              setSaving(false);
              setOpen(false);
              toast.success(`${title} updated`, { description: "Demo only — nothing is stored." });
            }, 600);
          }}
        >
          {groups.map((group) => (
            <fieldset key={group.title} className="space-y-4">
              <legend className="label-micro text-foreground/70">{group.title}</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {group.fields.map((field) => {
                  const long = /note|description|remark|comment/i.test(field.label);
                  return (
                    <div
                      key={field.label}
                      className={long ? "space-y-1.5 sm:col-span-2" : "space-y-1.5"}
                    >
                      <Label htmlFor={field.label} className="label-micro">
                        {field.label}
                      </Label>
                      {long ? (
                        <Textarea
                          id={field.label}
                          rows={3}
                          defaultValue={field.value ?? ""}
                          className="text-sm"
                        />
                      ) : (
                        <Input
                          id={field.label}
                          type={inputType(field.kind)}
                          defaultValue={field.value ?? ""}
                          placeholder="—"
                          className={
                            field.kind === "money" || field.kind === "number"
                              ? "font-numeric h-9 text-sm"
                              : "h-9 text-sm"
                          }
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </fieldset>
          ))}

          {withAttachments ? (
            <fieldset className="space-y-3">
              <legend className="label-micro text-foreground/70">Attachments</legend>
              <UploadDropzone label="Add or replace documents" />
            </fieldset>
          ) : null}
        </form>

        <SheetFooter className="flex-row justify-end gap-2 border-t border-hairline px-6 py-4">
          <Button variant="outline" size="sm" type="button" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" type="submit" form="edit-record-form" disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
