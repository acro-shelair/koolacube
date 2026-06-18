import type { Metadata } from "next";
import { renderBuyPage, buyPageMetadata } from "@/lib/content/render-buy";

const PATH = "/buy/ex-hire";

export function generateMetadata(): Promise<Metadata> {
  return buyPageMetadata(PATH);
}

export default async function Page() {
  return renderBuyPage(PATH);
}
