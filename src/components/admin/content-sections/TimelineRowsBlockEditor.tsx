"use client";

import { useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";
import { CONTRAST_COLORS, contrastStyles } from "./constants";

export function TimelineRowsBlockEditor({
  prefix,
  control,
  register,
  setValue,
}: {
  prefix: string;
  control: any;
  register: any;
  setValue: any;
}) {
  const items =
    (useWatch({ control, name: `${prefix}.items` }) as {
      label: string;
      description: string;
      subtitle?: string;
    }[]) || [];
  const labelColor =
    (useWatch({ control, name: `${prefix}.labelColor` }) as string) || "amber";

  const addItem = () =>
    setValue(`${prefix}.items`, [...items, { label: "", description: "", subtitle: "" }]);
  const removeItem = (i: number) =>
    setValue(
      `${prefix}.items`,
      items.filter((_, idx) => idx !== i)
    );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Label color:</span>
        {CONTRAST_COLORS.map(({ value }) => {
          const s = contrastStyles(value);
          return (
            <button
              key={value}
              type="button"
              onClick={() => setValue(`${prefix}.labelColor`, value)}
              style={s.tintBg}
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                labelColor === value ? "scale-110 border-foreground" : "border-transparent"
              }`}
            >
              <span className="text-[8px] font-bold" style={s.text500}>
                {value[0].toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>
      {items.map((_, i) => (
        <div key={i} className="space-y-2 rounded-lg border border-border bg-secondary/30 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Row {i + 1}</span>
            {items.length > 1 && (
              <Button type="button" size="sm" variant="ghost" onClick={() => removeItem(i)}>
                <Trash2 className="h-3 w-3 text-destructive" />
              </Button>
            )}
          </div>
          <Input
            {...register(`${prefix}.items.${i}.label`)}
            placeholder="Label (e.g. 0–2 hrs)"
            className="text-sm font-semibold"
          />
          <Textarea
            {...register(`${prefix}.items.${i}.description`)}
            placeholder="Description"
            rows={2}
            className="resize-none text-sm"
          />
          <Input
            {...register(`${prefix}.items.${i}.subtitle`)}
            placeholder="Subtitle / context (optional)"
            className="text-sm"
          />
        </div>
      ))}
      <Button type="button" size="sm" variant="outline" onClick={addItem}>
        <PlusCircle className="mr-1 h-3.5 w-3.5" /> Add Row
      </Button>
    </div>
  );
}
