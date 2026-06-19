"use client";

import { useState } from "react";
import { useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlusCircle, Search, Trash2 } from "lucide-react";
import { BEFORE_AFTER_ICON_OPTIONS, CONTRAST_COLORS, contrastStyles } from "./constants";

function ContrastPanelItemEditor({
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
  const icon = useWatch({ control, name: `${prefix}.icon` }) as string | undefined;
  const iconColor = (useWatch({ control, name: `${prefix}.iconColor` }) as string) || "red";
  const badgeColor = (useWatch({ control, name: `${prefix}.badgeColor` }) as string) || "red";
  const items = (useWatch({ control, name: `${prefix}.items` }) as string[]) || [""];
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [iconSearch, setIconSearch] = useState("");

  const addItem = () => setValue(`${prefix}.items`, [...items, ""]);
  const removeItem = (i: number) =>
    setValue(
      `${prefix}.items`,
      items.filter((_, idx) => idx !== i)
    );

  const selectedIconDef = BEFORE_AFTER_ICON_OPTIONS.find((ic) => ic.key === icon);
  const SelectedIcon = selectedIconDef?.Icon;
  const filteredIcons = BEFORE_AFTER_ICON_OPTIONS.filter(({ key }) =>
    key.toLowerCase().includes(iconSearch.toLowerCase())
  );

  return (
    <div className="space-y-3 rounded-lg border border-border bg-secondary/20 p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground">Panel {index + 1}</span>
        {canRemove && (
          <Button type="button" size="sm" variant="ghost" onClick={onRemove}>
            <Trash2 className="h-3 w-3 text-destructive" />
          </Button>
        )}
      </div>

      {/* Badge */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <span className="text-xs font-medium text-muted-foreground">Badge label (optional)</span>
          <Input
            {...register(`${prefix}.badge`)}
            placeholder="e.g. Most common"
            className="text-xs"
          />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-medium text-muted-foreground">Badge color</span>
          <div className="flex gap-1.5 pt-1">
            {CONTRAST_COLORS.map(({ value }) => {
              const s = contrastStyles(value);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setValue(`${prefix}.badgeColor`, value)}
                  style={s.tintBg}
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                    badgeColor === value ? "scale-110 border-foreground" : "border-transparent"
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
      </div>

      {/* Icon picker */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Icon (optional)</span>
          {icon && (
            <button
              type="button"
              onClick={() => setValue(`${prefix}.icon`, undefined)}
              className="text-xs text-muted-foreground transition-colors hover:text-destructive"
            >
              Remove
            </button>
          )}
        </div>
        <Popover
          open={iconPickerOpen}
          onOpenChange={(o) => {
            setIconPickerOpen(o);
            if (!o) setIconSearch("");
          }}
        >
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-secondary"
            >
              {SelectedIcon ? (
                <SelectedIcon className="h-4 w-4 shrink-0" />
              ) : (
                <span className="h-4 w-4 shrink-0" />
              )}
              <span className="flex-1 text-left text-xs text-muted-foreground">
                {icon || "No icon"}
              </span>
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-2" align="start">
            <div className="mb-2 flex items-center gap-1.5 rounded border border-border px-2 py-1">
              <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search icons…"
                value={iconSearch}
                onChange={(e) => setIconSearch(e.target.value)}
                className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="grid max-h-52 grid-cols-5 gap-1 overflow-y-auto">
              {filteredIcons.map(({ key, Icon }) => (
                <button
                  key={key}
                  type="button"
                  title={key}
                  onClick={() => {
                    setValue(`${prefix}.icon`, key);
                    setIconPickerOpen(false);
                    setIconSearch("");
                  }}
                  className={`flex flex-col items-center gap-0.5 rounded border p-1.5 transition-colors ${
                    icon === key
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="w-full truncate text-center text-[9px] leading-tight">{key}</span>
                </button>
              ))}
              {filteredIcons.length === 0 && (
                <p className="col-span-5 py-4 text-center text-xs text-muted-foreground">
                  No icons found
                </p>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Icon color */}
      <div className="space-y-1">
        <span className="text-xs font-medium text-muted-foreground">Icon color</span>
        <div className="flex gap-1.5">
          {CONTRAST_COLORS.map(({ value }) => {
            const s = contrastStyles(value);
            return (
              <button
                key={value}
                type="button"
                onClick={() => setValue(`${prefix}.iconColor`, value)}
                className={`flex items-center gap-1 rounded-lg border px-2 py-1 text-xs transition-colors ${
                  iconColor === value ? "border-primary ring-1 ring-primary" : "border-border hover:bg-secondary"
                }`}
              >
                <span
                  className="flex h-3 w-3 items-center justify-center rounded-full"
                  style={{ ...s.tintBg, ...s.text500 }}
                >
                  {SelectedIcon && <SelectedIcon className="h-2 w-2" />}
                </span>
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Heading */}
      <Input
        {...register(`${prefix}.heading`)}
        placeholder="Panel heading"
        className="text-sm font-semibold"
      />

      {/* Description */}
      <Textarea
        {...register(`${prefix}.description`)}
        placeholder="Description (optional)"
        rows={2}
        className="resize-none text-sm"
      />

      {/* Bullet items */}
      <div className="space-y-2">
        {items.map((_, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="mt-2.5 w-3 flex-shrink-0 text-xs text-muted-foreground">•</span>
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
    </div>
  );
}

export function ContrastPanelsBlockEditor({
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
  const panels =
    (useWatch({ control, name: `${prefix}.panels` }) as {
      icon: string;
      iconColor: string;
      heading: string;
      items: string[];
    }[]) || [];

  const addPanel = () => {
    if (panels.length >= 6) return;
    setValue(`${prefix}.panels`, [
      ...panels,
      { icon: "info", iconColor: "blue", badge: "", badgeColor: "blue", heading: "", items: [""] },
    ]);
  };

  const removePanel = (i: number) => {
    if (panels.length <= 2) return;
    setValue(
      `${prefix}.panels`,
      panels.filter((_, idx) => idx !== i)
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">{panels.length} panels</span>
        {panels.length < 6 && (
          <Button type="button" size="sm" variant="outline" onClick={addPanel}>
            <PlusCircle className="mr-1 h-3.5 w-3.5" /> Add Panel
          </Button>
        )}
      </div>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${Math.min(panels.length, 3)}, minmax(0, 1fr))` }}
      >
        {panels.map((_, i) => (
          <ContrastPanelItemEditor
            key={i}
            prefix={`${prefix}.panels.${i}`}
            control={control}
            register={register}
            setValue={setValue}
            index={i}
            onRemove={() => removePanel(i)}
            canRemove={panels.length > 2}
          />
        ))}
      </div>
    </div>
  );
}
