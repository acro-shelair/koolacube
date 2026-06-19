"use client";

import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { SectionEditor } from "./SectionEditor";

export { blockSchema, sectionSchema } from "@/lib/post-blocks";
export type { BlockData, SectionData } from "@/lib/post-blocks";

export default function ContentSectionsEditor({
  control,
  register,
  setValue,
  error,
}: {
  control: any;
  register: any;
  setValue: any;
  error?: string;
}) {
  const { fields, append, remove } = useFieldArray({ control, name: "sections" });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Content Sections</h2>
          <p className="text-sm text-muted-foreground">
            Rich content — paragraphs, headings, lists, tables, images, comparisons and more.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => append({ heading: "", blocks: [{ type: "paragraph", text: "" }] })}
        >
          <PlusCircle className="mr-1 h-4 w-4" /> Add Section
        </Button>
      </div>
      {error && <p className="mb-3 text-xs text-destructive">{error}</p>}
      <div className="space-y-4">
        {fields.map((section, si) => (
          <SectionEditor
            key={section.id}
            sectionIndex={si}
            control={control}
            register={register}
            setValue={setValue}
            onRemove={() => remove(si)}
            canRemove={fields.length > 0}
          />
        ))}
        {fields.length === 0 && (
          <p className="rounded-xl border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
            No content sections yet. Add one to get started.
          </p>
        )}
      </div>
    </div>
  );
}
