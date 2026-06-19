"use client";

import { useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from "lucide-react";

export function ComparisonBlockEditor({
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
  const rows = (useWatch({ control, name: `${prefix}.rows` }) as {
    feature: string;
    left: string;
    right: string;
  }[]) || [{ feature: "", left: "", right: "" }];
  const addRow = () =>
    setValue(`${prefix}.rows`, [...rows, { feature: "", left: "", right: "" }]);
  const removeRow = (i: number) =>
    setValue(
      `${prefix}.rows`,
      rows.filter((_, idx) => idx !== i)
    );

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <Input
          {...register(`${prefix}.featureLabel`)}
          placeholder="Feature (col header)"
          className="text-sm font-semibold"
        />
        <Input
          {...register(`${prefix}.leftLabel`)}
          placeholder="Left column (e.g. Hire)"
          className="text-sm font-semibold"
        />
        <Input
          {...register(`${prefix}.rightLabel`)}
          placeholder="Right column (e.g. Buy)"
          className="text-sm font-semibold"
        />
      </div>
      <div className="space-y-2">
        {rows.map((_, i) => (
          <div key={i} className="grid grid-cols-3 items-center gap-2">
            <Input
              {...register(`${prefix}.rows.${i}.feature`)}
              placeholder={`Feature ${i + 1}`}
              className="text-sm"
            />
            <Input
              {...register(`${prefix}.rows.${i}.left`)}
              placeholder="Left value"
              className="text-sm"
            />
            <div className="flex gap-1">
              <Input
                {...register(`${prefix}.rows.${i}.right`)}
                placeholder="Right value"
                className="flex-1 text-sm"
              />
              {rows.length > 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => removeRow(i)}
                  className="flex-shrink-0 px-2"
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Button type="button" size="sm" variant="outline" onClick={addRow}>
        <PlusCircle className="mr-1 h-3.5 w-3.5" /> Add Row
      </Button>
    </div>
  );
}
