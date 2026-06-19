"use client";

import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { BlockEditor } from "./BlockEditor";
import { AddBlockDropdown } from "./AddBlockDropdown";

export function SectionEditor({
  sectionIndex,
  control,
  register,
  setValue,
  onRemove,
  canRemove,
}: {
  sectionIndex: number;
  control: any;
  register: any;
  setValue: any;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.blocks`,
  });

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-1.5">
          <Label>Section Heading</Label>
          <Input
            {...register(`sections.${sectionIndex}.heading`)}
            placeholder="e.g. Why Cold Room Size Matters"
          />
        </div>
        {canRemove && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={onRemove}
            className="mt-6 flex-shrink-0"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <Label>Content Blocks</Label>
        {fields.map((field, bi) => (
          <BlockEditor
            key={field.id}
            prefix={`sections.${sectionIndex}.blocks.${bi}`}
            control={control}
            register={register}
            setValue={setValue}
            onRemove={() => remove(bi)}
            onMove={(dir) => {
              const target = dir === "up" ? bi - 1 : bi + 1;
              if (target >= 0 && target < fields.length) move(bi, target);
            }}
            canMoveUp={bi > 0}
            canMoveDown={bi < fields.length - 1}
          />
        ))}
        <AddBlockDropdown onAdd={(block) => append(block)} />
      </div>
    </div>
  );
}
