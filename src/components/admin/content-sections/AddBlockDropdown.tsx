"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Type,
  Image as ImageIcon,
  Quote,
  List,
  ListOrdered,
  HelpCircle,
  LayoutGrid,
  Columns2,
  Columns3,
  ArrowLeftRight,
  ArrowRight,
  LayoutList,
  PanelLeftClose,
  Table,
} from "lucide-react";
import type { BlockData } from "@/lib/post-blocks";

export function AddBlockDropdown({
  onAdd,
  showColumns = true,
}: {
  onAdd: (block: BlockData) => void;
  showColumns?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const add = (block: BlockData) => {
    onAdd(block);
    setOpen(false);
  };

  const Item = ({
    icon: Icon,
    label,
    onClick,
  }: {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
    >
      <Icon className="h-4 w-4 shrink-0" /> {label}
    </button>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" size="sm" variant="outline">
          <PlusCircle className="mr-1 h-3.5 w-3.5" /> Add Block
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-72 w-56 overflow-y-auto p-1" align="start">
        <Item icon={Type} label="Paragraph" onClick={() => add({ type: "paragraph", text: "" })} />
        <Item
          icon={ImageIcon}
          label="Image"
          onClick={() => add({ type: "image", src: "", alt: "", caption: "" })}
        />
        <Item
          icon={Quote}
          label="Blockquote"
          onClick={() => add({ type: "blockquote", text: "", cite: "" })}
        />
        <Item
          icon={List}
          label="Bullet List"
          onClick={() => add({ type: "list", style: "bullet", items: [""] })}
        />
        <Item
          icon={ListOrdered}
          label="Numbered List"
          onClick={() => add({ type: "list", style: "number", items: [""] })}
        />
        <Item
          icon={ListOrdered}
          label="Letter List"
          onClick={() => add({ type: "list", style: "letter", items: [""] })}
        />
        <Item
          icon={HelpCircle}
          label="FAQ"
          onClick={() => add({ type: "faq", items: [{ question: "", answer: "" }] })}
        />
        <Item
          icon={LayoutGrid}
          label="Media Cards"
          onClick={() =>
            add({
              type: "media-cards",
              layout: "grid",
              items: [{ src: "", alt: "", title: "", description: "" }],
            })
          }
        />
        <Item
          icon={Columns2}
          label="Comparison"
          onClick={() =>
            add({
              type: "comparison",
              featureLabel: "",
              leftLabel: "",
              rightLabel: "",
              rows: [{ feature: "", left: "", right: "" }],
            })
          }
        />
        <Item
          icon={ArrowLeftRight}
          label="Before / After"
          onClick={() =>
            add({
              type: "before-after",
              panels: [
                { label: "", color: "red", steps: [{ icon: "phone-off", title: "", description: "" }] },
                { label: "", color: "green", steps: [{ icon: "phone", title: "", description: "" }] },
              ],
            })
          }
        />
        <Item
          icon={LayoutList}
          label="Timeline Rows"
          onClick={() =>
            add({ type: "timeline-rows", items: [{ label: "", description: "", subtitle: "" }] })
          }
        />
        <Item
          icon={Table}
          label="Table"
          onClick={() => add({ type: "table", headers: ["Column 1", "Column 2"], rows: [["", ""]] })}
        />
        <Item
          icon={ArrowRight}
          label="Process Flow"
          onClick={() =>
            add({
              type: "process-flow",
              steps: [
                { title: "", description: "" },
                { title: "", description: "" },
              ],
            })
          }
        />
        <Item
          icon={PanelLeftClose}
          label="Contrast Panels"
          onClick={() =>
            add({
              type: "contrast-panels",
              panels: [
                { icon: "warning", iconColor: "red", heading: "", items: [""] },
                { icon: "check", iconColor: "green", heading: "", items: [""] },
              ],
            })
          }
        />
        {showColumns && (
          <Item
            icon={Columns3}
            label="Columns"
            onClick={() =>
              add({
                type: "columns",
                columns: [
                  { blocks: [{ type: "paragraph", text: "" }] },
                  { blocks: [{ type: "paragraph", text: "" }] },
                ],
              })
            }
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
