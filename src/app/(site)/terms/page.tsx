import type { Metadata } from "next";
import { renderLegalPage, legalPageMetadata } from "@/lib/content/render-legal";

export function generateMetadata(): Promise<Metadata> {
  return legalPageMetadata("/terms");
}

export default async function Page() {
  return renderLegalPage("/terms");
}
