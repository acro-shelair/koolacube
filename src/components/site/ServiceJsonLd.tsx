"use client";

import { usePathname } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/jsonld";

/** Emits Service JSON-LD for the current page using its pathname as the URL. */
export function ServiceJsonLd({
  name,
  description,
  monthlyPriceFrom,
}: {
  name: string;
  description: string;
  monthlyPriceFrom?: number;
}) {
  const pathname = usePathname() || "/";
  return (
    <JsonLd
      data={serviceSchema({ name, description, path: pathname, monthlyPriceFrom })}
    />
  );
}
