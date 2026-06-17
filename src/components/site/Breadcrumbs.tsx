"use client";

import { usePathname } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

/** Emits BreadcrumbList JSON-LD (Home › current page) for inner pages. */
export function BreadcrumbJsonLd({ title }: { title: string }) {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;
  return (
    <JsonLd
      data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: title, path: pathname },
      ])}
    />
  );
}
