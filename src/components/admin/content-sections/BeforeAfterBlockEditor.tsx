"use client";

import { useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { List, ListOrdered, Phone, PlusCircle, Search, Trash2 } from "lucide-react";
import { BEFORE_AFTER_ICON_OPTIONS, CONTRAST_COLORS, contrastStyles } from "./constants";

function RichTextEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyListFormat = (ordered: boolean) => {
    const el = textareaRef.current;
    if (!el) return;
    const text = el.value;
    const start = el.selectionStart;
    const end = el.selectionEnd;

    const lineStart = text.lastIndexOf("\n", start - 1) + 1;
    const lineEndIdx = text.indexOf("\n", end);
    const lineEnd = lineEndIdx === -1 ? text.length : lineEndIdx;

    let counter = 0;
    const formatted = text
      .slice(lineStart, lineEnd)
      .split("\n")
      .map((line) => {
        const clean = line.replace(/^(•\s*|\d+\.\s*)/, "");
        counter++;
        return ordered ? `${counter}. ${clean}` : `• ${clean}`;
      })
      .join("\n");

    onChange(text.slice(0, lineStart) + formatted + text.slice(lineEnd));
    setTimeout(() => el.focus(), 0);
  };

  return (
    <div>
      <div className="flex items-center gap-0.5 rounded-t-md border border-b-0 border-border bg-muted/40 px-1.5 py-1">
        <button
          type="button"
          onClick={() => applyListFormat(false)}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          title="Bullet list"
        >
          <List className="h-3 w-3" />
          <span>Bullet</span>
        </button>
        <div className="mx-0.5 h-3 w-px bg-border" />
        <button
          type="button"
          onClick={() => applyListFormat(true)}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          title="Numbered list"
        >
          <ListOrdered className="h-3 w-3" />
          <span>Numbered</span>
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none rounded-b-md rounded-t-none border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
      />
    </div>
  );
}

function BeforeAfterStepEditor({
  prefix,
  control,
  register,
  setValue,
  index,
  onRemove,
  canRemove,
  panelColor,
}: {
  prefix: string;
  control: any;
  register: any;
  setValue: any;
  index: number;
  onRemove: () => void;
  canRemove: boolean;
  panelColor: string;
}) {
  const iconValue = (useWatch({ control, name: `${prefix}.icon` }) as string | null) ?? "";
  const hasIcon = iconValue !== "" && iconValue !== null;
  const icon = hasIcon ? iconValue : "phone";
  const description = (useWatch({ control, name: `${prefix}.description` }) as string) || "";

  const selectedIconDef = BEFORE_AFTER_ICON_OPTIONS.find((ic) => ic.key === icon);
  const SelectedIcon = selectedIconDef?.Icon ?? Phone;
  const colors = contrastStyles(panelColor);
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [iconSearch, setIconSearch] = useState("");
  const filteredIcons = BEFORE_AFTER_ICON_OPTIONS.filter(({ key }) =>
    key.toLowerCase().includes(iconSearch.toLowerCase())
  );

  return (
    <div className="space-y-2.5 rounded-lg border border-border bg-background p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {hasIcon && (
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ ...colors.tintBg, ...colors.text500 }}
            >
              <SelectedIcon className="h-3.5 w-3.5" />
            </div>
          )}
          <span className="text-xs font-medium text-muted-foreground">Row {index + 1}</span>
        </div>
        {canRemove && (
          <Button type="button" size="sm" variant="ghost" onClick={onRemove}>
            <Trash2 className="h-3 w-3 text-destructive" />
          </Button>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Icon</span>
          <button
            type="button"
            onClick={() => setValue(`${prefix}.icon`, hasIcon ? "" : "phone")}
            className={`rounded px-1.5 py-0.5 text-xs transition-colors ${
              hasIcon
                ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                : "bg-primary/10 text-primary hover:bg-primary/20"
            }`}
          >
            {hasIcon ? "Remove" : "Add icon"}
          </button>
        </div>
        {hasIcon && (
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
                <SelectedIcon className="h-4 w-4 shrink-0" />
                <span className="flex-1 text-left text-xs text-muted-foreground">{icon}</span>
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
        )}
      </div>

      <Input
        {...register(`${prefix}.title`)}
        placeholder="Row title"
        className="text-sm font-semibold"
      />
      <RichTextEditor
        value={description}
        onChange={(val) => setValue(`${prefix}.description`, val)}
        placeholder="Row description — type freely or use Bullet / Numbered above"
      />
    </div>
  );
}

function BeforeAfterPanelEditor({
  prefix,
  panelIndex,
  control,
  register,
  setValue,
}: {
  prefix: string;
  panelIndex: number;
  control: any;
  register: any;
  setValue: any;
}) {
  const color = (useWatch({ control, name: `${prefix}.color` }) as string) || "red";
  const steps =
    (useWatch({ control, name: `${prefix}.steps` }) as {
      icon: string;
      title: string;
      description: string;
    }[]) || [];

  const addStep = () =>
    setValue(`${prefix}.steps`, [...steps, { icon: "", title: "", description: "" }]);
  const removeStep = (i: number) =>
    setValue(
      `${prefix}.steps`,
      steps.filter((_, idx) => idx !== i)
    );

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-center gap-2 px-4 py-2.5" style={contrastStyles(color).headerEditor}>
        <Input
          {...register(`${prefix}.label`)}
          placeholder={panelIndex === 0 ? "BEFORE — OLD WAY" : "AFTER — NEW WAY"}
          className="h-auto border-0 bg-transparent p-0 text-xs font-bold uppercase shadow-none placeholder:opacity-50 focus-visible:ring-0"
        />
      </div>
      <div className="space-y-3 p-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">Color:</span>
          {CONTRAST_COLORS.map(({ value }) => {
            const s = contrastStyles(value);
            return (
              <button
                key={value}
                type="button"
                onClick={() => setValue(`${prefix}.color`, value)}
                style={s.tintBg}
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                  color === value ? "scale-110 border-foreground" : "border-transparent"
                }`}
              >
                <span className="text-[8px] font-bold" style={s.text500}>
                  {value[0].toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          {steps.map((_, i) => (
            <BeforeAfterStepEditor
              key={i}
              prefix={`${prefix}.steps.${i}`}
              control={control}
              register={register}
              setValue={setValue}
              index={i}
              panelColor={color}
              onRemove={() => removeStep(i)}
              canRemove={steps.length > 1}
            />
          ))}
        </div>
        <Button type="button" size="sm" variant="outline" onClick={addStep}>
          <PlusCircle className="mr-1 h-3.5 w-3.5" /> Add Row
        </Button>
      </div>
    </div>
  );
}

export function BeforeAfterBlockEditor({
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
  return (
    <div className="grid grid-cols-2 gap-3">
      {[0, 1].map((pi) => (
        <BeforeAfterPanelEditor
          key={pi}
          prefix={`${prefix}.panels.${pi}`}
          panelIndex={pi}
          control={control}
          register={register}
          setValue={setValue}
        />
      ))}
    </div>
  );
}
