"use client";

import { useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from "lucide-react";

export function TableBlockEditor({
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
  const headers = (useWatch({ control, name: `${prefix}.headers` }) as string[]) || [""];
  const rows = (useWatch({ control, name: `${prefix}.rows` }) as string[][]) || [[""]];

  const colCount = headers.length;

  const addColumn = () => {
    setValue(`${prefix}.headers`, [...headers, ""]);
    setValue(
      `${prefix}.rows`,
      rows.map((row) => [...row, ""])
    );
  };

  const removeColumn = (ci: number) => {
    if (colCount <= 1) return;
    setValue(
      `${prefix}.headers`,
      headers.filter((_, i) => i !== ci)
    );
    setValue(
      `${prefix}.rows`,
      rows.map((row) => row.filter((_, i) => i !== ci))
    );
  };

  const addRow = () => setValue(`${prefix}.rows`, [...rows, Array(colCount).fill("")]);

  const removeRow = (ri: number) => {
    if (rows.length <= 1) return;
    setValue(
      `${prefix}.rows`,
      rows.filter((_, i) => i !== ri)
    );
  };

  return (
    <div className="space-y-3">
      {/* Header inputs */}
      <div className="flex items-start gap-2">
        <div
          className="grid min-w-0 flex-1 gap-2"
          style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
        >
          {headers.map((_, ci) => (
            <div key={ci} className="flex min-w-0 items-center gap-1">
              <Input
                {...register(`${prefix}.headers.${ci}`)}
                placeholder={`Col ${ci + 1} header`}
                className="min-w-0 flex-1 text-sm font-semibold"
              />
              {colCount > 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => removeColumn(ci)}
                  className="flex-shrink-0 px-1.5"
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={addColumn}
          className="flex-shrink-0 self-start"
          title="Add column"
        >
          <PlusCircle className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Data rows */}
      <div className="space-y-2">
        {rows.map((row, ri) => (
          <div key={ri} className="flex items-center gap-2">
            <div
              className="grid min-w-0 flex-1 gap-2"
              style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: colCount }).map((_, ci) => (
                <Input
                  key={ci}
                  {...register(`${prefix}.rows.${ri}.${ci}`)}
                  placeholder={headers[ci] || `Col ${ci + 1}`}
                  className="min-w-0 text-sm"
                />
              ))}
            </div>
            {rows.length > 1 && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => removeRow(ri)}
                className="flex-shrink-0 px-1.5"
              >
                <Trash2 className="h-3 w-3 text-destructive" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button type="button" size="sm" variant="outline" onClick={addRow}>
        <PlusCircle className="mr-1 h-3.5 w-3.5" /> Add Row
      </Button>
    </div>
  );
}
