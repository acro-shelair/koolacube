"use client";

import { useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";
import {
  Type,
  Image as ImageIcon,
  Quote,
  List,
  ListOrdered,
  HelpCircle,
  LayoutGrid,
  Columns2,
  Columns3,
  ChevronUp,
  ChevronDown,
  Trash2,
  ArrowLeftRight,
  ArrowRight,
  LayoutList,
  PanelLeftClose,
  PlusCircle,
  Table,
} from "lucide-react";
import type { BlockData, LeafBlockData } from "@/lib/post-blocks";
import { AddBlockDropdown } from "./AddBlockDropdown";
import { ListBlockEditor } from "./ListBlockEditor";
import { FaqBlockEditor } from "./FaqBlockEditor";
import { MediaCardsBlockEditor } from "./MediaCardsBlockEditor";
import { ComparisonBlockEditor } from "./ComparisonBlockEditor";
import { BeforeAfterBlockEditor } from "./BeforeAfterBlockEditor";
import { ContrastPanelsBlockEditor } from "./ContrastPanelsBlockEditor";
import { TimelineRowsBlockEditor } from "./TimelineRowsBlockEditor";
import { TableBlockEditor } from "./TableBlockEditor";
import { ProcessFlowBlockEditor } from "./ProcessFlowBlockEditor";

// ─── Column editor (kept here to avoid circular imports with BlockEditor) ──────

function ColumnEditor({
  prefix,
  colIndex,
  control,
  register,
  setValue,
  onRemove,
  canRemove,
}: {
  prefix: string;
  colIndex: number;
  control: any;
  register: any;
  setValue: any;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const blocks =
    (useWatch({ control, name: `${prefix}.blocks` }) as LeafBlockData[]) || [
      { type: "paragraph", text: "" },
    ];

  const addBlock = (block: LeafBlockData) => setValue(`${prefix}.blocks`, [...blocks, block]);
  const removeBlock = (i: number) =>
    setValue(
      `${prefix}.blocks`,
      blocks.filter((_, idx) => idx !== i)
    );
  const moveBlock = (from: number, to: number) => {
    if (to < 0 || to >= blocks.length) return;
    const next = [...blocks];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setValue(`${prefix}.blocks`, next);
  };

  return (
    <div className="flex min-w-0 flex-col space-y-2.5 rounded-lg border border-border bg-secondary/20 p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground">Column {colIndex + 1}</span>
        {canRemove && (
          <Button type="button" size="sm" variant="ghost" onClick={onRemove}>
            <Trash2 className="h-3 w-3 text-destructive" />
          </Button>
        )}
      </div>
      <div className="flex-1 space-y-2">
        {blocks.map((_, bi) => (
          <BlockEditor
            key={bi}
            prefix={`${prefix}.blocks.${bi}`}
            control={control}
            register={register}
            setValue={setValue}
            onRemove={() => removeBlock(bi)}
            onMove={(dir) => moveBlock(bi, dir === "up" ? bi - 1 : bi + 1)}
            canMoveUp={bi > 0}
            canMoveDown={bi < blocks.length - 1}
            allowColumns={false}
          />
        ))}
      </div>
      <AddBlockDropdown onAdd={addBlock as (b: BlockData) => void} showColumns={false} />
    </div>
  );
}

function ColumnsBlockEditor({
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
  const columns =
    (useWatch({ control, name: `${prefix}.columns` }) as { blocks: LeafBlockData[] }[]) || [];

  const addColumn = () => {
    if (columns.length >= 4) return;
    setValue(`${prefix}.columns`, [...columns, { blocks: [{ type: "paragraph", text: "" }] }]);
  };

  const removeColumn = (ci: number) => {
    if (columns.length <= 2) return;
    setValue(
      `${prefix}.columns`,
      columns.filter((_, i) => i !== ci)
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">{columns.length} columns</span>
        {columns.length < 4 && (
          <Button type="button" size="sm" variant="outline" onClick={addColumn}>
            <PlusCircle className="mr-1 h-3.5 w-3.5" /> Add Column
          </Button>
        )}
      </div>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
      >
        {columns.map((_, ci) => (
          <ColumnEditor
            key={ci}
            prefix={`${prefix}.columns.${ci}`}
            colIndex={ci}
            control={control}
            register={register}
            setValue={setValue}
            onRemove={() => removeColumn(ci)}
            canRemove={columns.length > 2}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Block editor ──────────────────────────────────────────────────────────────

export function BlockEditor({
  prefix,
  control,
  register,
  setValue,
  onRemove,
  onMove,
  canMoveUp,
  canMoveDown,
  allowColumns = true,
}: {
  prefix: string;
  control: any;
  register: any;
  setValue: any;
  onRemove: () => void;
  onMove: (dir: "up" | "down") => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  allowColumns?: boolean;
}) {
  const block = useWatch({ control, name: prefix }) as BlockData;

  if (!block) return null;

  const blockLabel =
    block.type === "paragraph" && block.style === "h2"
      ? "Heading 2"
      : block.type === "paragraph" && block.style === "h3"
      ? "Heading 3"
      : block.type === "paragraph" && block.style === "h4"
      ? "Heading 4"
      : block.type === "paragraph"
      ? "Paragraph"
      : block.type === "image"
      ? "Image"
      : block.type === "blockquote"
      ? "Blockquote"
      : block.type === "faq"
      ? "FAQ"
      : block.type === "list" && block.style === "bullet"
      ? "Bullet List"
      : block.type === "list" && block.style === "number"
      ? "Numbered List"
      : block.type === "list" && block.style === "letter"
      ? "Letter List"
      : block.type === "media-cards"
      ? "Media Cards"
      : block.type === "comparison"
      ? "Comparison"
      : block.type === "contrast-panels"
      ? "Contrast Panels"
      : block.type === "before-after"
      ? "Before / After"
      : block.type === "timeline-rows"
      ? "Timeline Rows"
      : block.type === "table"
      ? "Table"
      : block.type === "process-flow"
      ? "Process Flow"
      : block.type === "columns"
      ? "Columns"
      : "Block";

  const blockIcon =
    block.type === "paragraph" ? (
      <Type className="h-3.5 w-3.5" />
    ) : block.type === "image" ? (
      <ImageIcon className="h-3.5 w-3.5" />
    ) : block.type === "blockquote" ? (
      <Quote className="h-3.5 w-3.5" />
    ) : block.type === "faq" ? (
      <HelpCircle className="h-3.5 w-3.5" />
    ) : block.type === "list" && block.style === "bullet" ? (
      <List className="h-3.5 w-3.5" />
    ) : block.type === "media-cards" ? (
      <LayoutGrid className="h-3.5 w-3.5" />
    ) : block.type === "comparison" ? (
      <Columns2 className="h-3.5 w-3.5" />
    ) : block.type === "contrast-panels" ? (
      <PanelLeftClose className="h-3.5 w-3.5" />
    ) : block.type === "before-after" ? (
      <ArrowLeftRight className="h-3.5 w-3.5" />
    ) : block.type === "timeline-rows" ? (
      <LayoutList className="h-3.5 w-3.5" />
    ) : block.type === "table" ? (
      <Table className="h-3.5 w-3.5" />
    ) : block.type === "process-flow" ? (
      <ArrowRight className="h-3.5 w-3.5" />
    ) : block.type === "columns" ? (
      <Columns3 className="h-3.5 w-3.5" />
    ) : (
      <ListOrdered className="h-3.5 w-3.5" />
    );

  return (
    <div className="space-y-3 rounded-lg border border-border bg-background p-4">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
          {blockIcon} {blockLabel}
        </span>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => onMove("up")}
          disabled={!canMoveUp}
          className="rounded p-1 transition-colors hover:bg-secondary disabled:opacity-20"
        >
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onMove("down")}
          disabled={!canMoveDown}
          className="rounded p-1 transition-colors hover:bg-secondary disabled:opacity-20"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <Button type="button" size="sm" variant="ghost" onClick={onRemove}>
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
        </Button>
      </div>

      {block.type === "paragraph" && (
        <div className="space-y-2">
          <div className="flex gap-1">
            {(["paragraph", "h2", "h3", "h4"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setValue(`${prefix}.style`, s)}
                className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                  (block.style ?? "paragraph") === s
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-secondary"
                }`}
              >
                {s === "paragraph" ? "¶ Text" : s.toUpperCase()}
              </button>
            ))}
          </div>
          <Textarea
            {...register(`${prefix}.text`)}
            rows={block.style && block.style !== "paragraph" ? 2 : 3}
            className={`resize-none ${
              block.style === "h2"
                ? "text-xl font-bold"
                : block.style === "h3"
                ? "text-lg font-semibold"
                : block.style === "h4"
                ? "text-base font-semibold"
                : ""
            }`}
            placeholder={
              block.style === "h2"
                ? "Heading 2…"
                : block.style === "h3"
                ? "Heading 3…"
                : block.style === "h4"
                ? "Heading 4…"
                : "Write your paragraph…"
            }
          />
        </div>
      )}

      {block.type === "blockquote" && (
        <div className="space-y-2">
          <Textarea
            {...register(`${prefix}.text`)}
            rows={3}
            className="resize-none border-l-4 border-primary/30 pl-4 italic"
            placeholder="Write the quote…"
          />
          <Input
            {...register(`${prefix}.cite`)}
            placeholder="Citation / source (optional)"
            className="text-sm"
          />
        </div>
      )}

      {block.type === "image" && (
        <div className="space-y-2">
          <ImageUploader
            value={block.src || ""}
            onChange={(url) => setValue(`${prefix}.src`, url)}
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              {...register(`${prefix}.alt`)}
              placeholder="Alt text (optional)"
              className="text-sm"
            />
            <Input
              {...register(`${prefix}.caption`)}
              placeholder="Caption (optional)"
              className="text-sm"
            />
          </div>
        </div>
      )}

      {block.type === "list" && (
        <ListBlockEditor prefix={prefix} control={control} register={register} setValue={setValue} />
      )}
      {block.type === "faq" && (
        <FaqBlockEditor prefix={prefix} control={control} register={register} setValue={setValue} />
      )}
      {block.type === "media-cards" && (
        <MediaCardsBlockEditor prefix={prefix} control={control} register={register} setValue={setValue} />
      )}
      {block.type === "comparison" && (
        <ComparisonBlockEditor prefix={prefix} control={control} register={register} setValue={setValue} />
      )}
      {block.type === "contrast-panels" && (
        <ContrastPanelsBlockEditor prefix={prefix} control={control} register={register} setValue={setValue} />
      )}
      {block.type === "before-after" && (
        <BeforeAfterBlockEditor prefix={prefix} control={control} register={register} setValue={setValue} />
      )}
      {block.type === "timeline-rows" && (
        <TimelineRowsBlockEditor prefix={prefix} control={control} register={register} setValue={setValue} />
      )}
      {block.type === "table" && (
        <TableBlockEditor prefix={prefix} control={control} register={register} setValue={setValue} />
      )}
      {block.type === "process-flow" && (
        <ProcessFlowBlockEditor prefix={prefix} control={control} register={register} setValue={setValue} />
      )}
      {block.type === "columns" && allowColumns && (
        <ColumnsBlockEditor prefix={prefix} control={control} register={register} setValue={setValue} />
      )}
    </div>
  );
}
