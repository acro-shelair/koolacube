"use client";

import { usePathname } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { productSchema } from "@/lib/jsonld";

/** Emits Product + Offer JSON-LD for the current buy/sales page. */
export function ProductJsonLd({
  name,
  description,
  image,
  availability,
  itemCondition,
}: {
  name: string;
  description: string;
  image?: string;
  availability?: string;
  itemCondition?: string;
}) {
  const pathname = usePathname() || "/";
  return (
    <JsonLd
      data={productSchema({
        name,
        description,
        path: pathname,
        image,
        availability,
        itemCondition,
      })}
    />
  );
}
