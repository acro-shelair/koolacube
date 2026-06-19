"use client";

import { useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from "lucide-react";

export function ListBlockEditor({
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
  const items = (useWatch({ control, name: `${prefix}.items` }) as string[]) || [""];
  const addItem = () => setValue(`${prefix}.items`, [...items, ""]);
  const removeItem = (index: number) =>
    setValue(
      `${prefix}.items`,
      items.filter((_, i) => i !== index)
    );

  return (
    <div className="space-y-2">
      {items.map((_, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="mt-2.5 w-5 flex-shrink-0 text-right text-xs text-muted-foreground">
            {i + 1}.
          </span>
          <Input
            {...register(`${prefix}.items.${i}`)}
            placeholder={`Item ${i + 1}`}
            className="flex-1 text-sm"
          />
          {items.length > 1 && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => removeItem(i)}
              className="flex-shrink-0"
            >
              <Trash2 className="h-3 w-3 text-destructive" />
            </Button>
          )}
        </div>
      ))}
      <Button type="button" size="sm" variant="outline" onClick={addItem}>
        <PlusCircle className="mr-1 h-3.5 w-3.5" /> Add Item
      </Button>
    </div>
  );
}
