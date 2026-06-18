"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/jsonld";
import type { FaqItem } from "@/lib/faqs";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="mt-10 divide-y divide-border overflow-hidden rounded-lg border border-border bg-white">
      <JsonLd data={faqSchema(items)} />
      {items.map((f, i) => (
        <FaqItem key={i} q={f.q} a={f.a} />
      ))}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-muted/40"
      >
        <span className="font-medium text-foreground">{q}</span>
        <ChevronDown
          className={"h-5 w-5 shrink-0 text-cold-blue transition " + (open ? "rotate-180" : "")}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{a}</div>
      )}
    </div>
  );
}
