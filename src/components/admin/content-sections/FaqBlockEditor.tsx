"use client";

import { useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";

export function FaqBlockEditor({
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
  const items = (useWatch({ control, name: `${prefix}.items` }) as {
    question: string;
    answer: string;
  }[]) || [{ question: "", answer: "" }];
  const addItem = () =>
    setValue(`${prefix}.items`, [...items, { question: "", answer: "" }]);
  const removeItem = (index: number) =>
    setValue(
      `${prefix}.items`,
      items.filter((_, i) => i !== index)
    );

  return (
    <div className="space-y-3">
      {items.map((_, i) => (
        <div key={i} className="space-y-2 rounded-lg border border-border bg-secondary/30 p-3">
          <div className="flex items-start gap-2">
            <span className="mt-2 flex-shrink-0 text-xs font-medium text-primary">Q{i + 1}</span>
            <Input
              {...register(`${prefix}.items.${i}.question`)}
              placeholder="Question"
              className="flex-1 text-sm font-medium"
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
          <div className="flex items-start gap-2">
            <span className="mt-2 flex-shrink-0 text-xs font-medium text-muted-foreground">
              A{i + 1}
            </span>
            <Textarea
              {...register(`${prefix}.items.${i}.answer`)}
              placeholder="Answer"
              rows={2}
              className="flex-1 resize-none text-sm"
            />
          </div>
        </div>
      ))}
      <Button type="button" size="sm" variant="outline" onClick={addItem}>
        <PlusCircle className="mr-1 h-3.5 w-3.5" /> Add FAQ Item
      </Button>
    </div>
  );
}
