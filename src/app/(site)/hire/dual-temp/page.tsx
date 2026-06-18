import type { Metadata } from "next";
import { renderHirePage, hirePageMetadata } from "@/lib/content/render-hire";

const PATH = "/hire/dual-temp";

export function generateMetadata(): Promise<Metadata> {
  return hirePageMetadata(PATH);
}

export default async function Page() {
  return renderHirePage(PATH);
}
