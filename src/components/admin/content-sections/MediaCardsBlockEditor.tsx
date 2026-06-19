"use client";

import { useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { PlusCircle, Trash2 } from "lucide-react";
import { CONTRAST_COLORS, contrastStyles } from "./constants";

const DEFAULT_SECTION = {
  label: "",
  labelColor: "red",
  contentType: "paragraph" as const,
  content: "",
};

function SectionEditor({
  prefix,
  control,
  register,
  setValue,
  index,
  onRemove,
  canRemove,
}: {
  prefix: string;
  control: any;
  register: any;
  setValue: any;
  index: number;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const labelColor =
    (useWatch({ control, name: `${prefix}.labelColor` }) as string) || "red";
  const contentType =
    (useWatch({ control, name: `${prefix}.contentType` }) as string) || "paragraph";

  return (
    <div className="space-y-2 rounded-md border border-border/50 p-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Section {index + 1}</span>
        {canRemove && (
          <Button type="button" size="sm" variant="ghost" onClick={onRemove}>
            <Trash2 className="h-3 w-3 text-destructive" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Input
          {...register(`${prefix}.label`)}
          placeholder="Label text"
          className="h-7 flex-1 text-xs"
        />
        <div className="flex shrink-0 gap-1">
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
      </div>

      <div className="flex gap-1">
        {(["paragraph", "bullets"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setValue(`${prefix}.contentType`, t)}
            className={`rounded border px-2 py-0.5 text-xs transition-colors ${
              contentType === t
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:bg-secondary"
            }`}
          >
            {t === "paragraph" ? "Paragraph" : "Bullets"}
          </button>
        ))}
      </div>

      <Textarea
        {...register(`${prefix}.content`)}
        placeholder={contentType === "bullets" ? "One bullet per line…" : "Paragraph text…"}
        rows={3}
        className="resize-none text-xs"
      />
    </div>
  );
}

function MediaCardsItemEditor({
  prefix,
  control,
  register,
  setValue,
  index,
  onRemove,
  canRemove,
}: {
  prefix: string;
  control: any;
  register: any;
  setValue: any;
  index: number;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const src = (useWatch({ control, name: `${prefix}.src` }) as string) || "";
  const rawSections = useWatch({ control, name: `${prefix}.sections` }) as any[];
  const legacyTitle = useWatch({ control, name: `${prefix}.title` }) as string;
  const legacyDescription = useWatch({ control, name: `${prefix}.description` }) as string;

  const sections: any[] = rawSections?.length
    ? rawSections
    : legacyTitle || legacyDescription
    ? [
        {
          label: legacyTitle || "",
          labelColor: "red",
          contentType: "paragraph",
          content: legacyDescription || "",
        },
      ]
    : [];

  const addSection = () =>
    setValue(`${prefix}.sections`, [...sections, { ...DEFAULT_SECTION }]);

  const removeSection = (i: number) =>
    setValue(
      `${prefix}.sections`,
      sections.filter((_, idx) => idx !== i)
    );

  return (
    <div className="space-y-2.5 rounded-lg border border-border bg-secondary/30 p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">Card {index + 1}</span>
        {canRemove && (
          <Button type="button" size="sm" variant="ghost" onClick={onRemove}>
            <Trash2 className="h-3 w-3 text-destructive" />
          </Button>
        )}
      </div>

      <ImageUploader
        value={src}
        onChange={(url) => setValue(`${prefix}.src`, url)}
        heightClass="h-28"
      />

      <Input
        {...register(`${prefix}.alt`)}
        placeholder="Image alt text (optional)"
        className="text-sm"
      />

      <div className="space-y-2">
        <span className="text-xs font-medium text-muted-foreground">Sections</span>
        {sections.map((_, i) => (
          <SectionEditor
            key={i}
            prefix={`${prefix}.sections.${i}`}
            control={control}
            register={register}
            setValue={setValue}
            index={i}
            onRemove={() => removeSection(i)}
            canRemove={sections.length > 1}
          />
        ))}
        <Button type="button" size="sm" variant="ghost" onClick={addSection}>
          <PlusCircle className="mr-1 h-3 w-3" /> Add Section
        </Button>
      </div>
    </div>
  );
}

export function MediaCardsBlockEditor({
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
  const items = (useWatch({ control, name: `${prefix}.items` }) as any[]) || [];
  const layout = (useWatch({ control, name: `${prefix}.layout` }) as string) || "grid";

  const addItem = () =>
    setValue(`${prefix}.items`, [
      ...items,
      { src: "", alt: "", sections: [{ ...DEFAULT_SECTION }] },
    ]);

  const removeItem = (i: number) =>
    setValue(
      `${prefix}.items`,
      items.filter((_, idx) => idx !== i)
    );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Layout:</span>
        {(["row", "grid", "stack"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setValue(`${prefix}.layout`, l)}
            className={`rounded-lg border px-3 py-1 text-xs transition-colors ${
              layout === l
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:bg-secondary"
            }`}
          >
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </button>
        ))}
      </div>

      {items.map((_, i) => (
        <MediaCardsItemEditor
          key={i}
          prefix={`${prefix}.items.${i}`}
          control={control}
          register={register}
          setValue={setValue}
          index={i}
          onRemove={() => removeItem(i)}
          canRemove={items.length > 1}
        />
      ))}

      <Button type="button" size="sm" variant="outline" onClick={addItem}>
        <PlusCircle className="mr-1 h-3.5 w-3.5" /> Add Card
      </Button>
    </div>
  );
}
