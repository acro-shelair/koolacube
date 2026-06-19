"use client";

import { useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";

export function ProcessFlowBlockEditor({
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
  const steps =
    (useWatch({ control, name: `${prefix}.steps` }) as {
      title: string;
      description: string;
    }[]) || [];

  const addStep = () =>
    setValue(`${prefix}.steps`, [...steps, { title: "", description: "" }]);
  const removeStep = (i: number) =>
    setValue(
      `${prefix}.steps`,
      steps.filter((_, idx) => idx !== i)
    );

  return (
    <div className="space-y-3">
      {steps.map((_, i) => (
        <div key={i} className="space-y-2 rounded-lg border border-border bg-secondary/30 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Step {i + 1}</span>
            {steps.length > 2 && (
              <Button type="button" size="sm" variant="ghost" onClick={() => removeStep(i)}>
                <Trash2 className="h-3 w-3 text-destructive" />
              </Button>
            )}
          </div>
          <Input
            {...register(`${prefix}.steps.${i}.title`)}
            placeholder="Step title (e.g. Delivery)"
            className="text-sm font-semibold"
          />
          <Textarea
            {...register(`${prefix}.steps.${i}.description`)}
            placeholder="Description"
            rows={2}
            className="resize-none text-sm"
          />
        </div>
      ))}
      <Button type="button" size="sm" variant="outline" onClick={addStep}>
        <PlusCircle className="mr-1 h-3.5 w-3.5" /> Add Step
      </Button>
    </div>
  );
}
