import type { Metadata } from "next";
import {
  renderContentPage,
  contentPageMetadata,
} from "@/lib/content/render-content";

const PATH = "/ex-hire-cold-rooms-for-sale";

export function generateMetadata(): Promise<Metadata> {
  return contentPageMetadata(PATH);
}

export default async function Page() {
  return renderContentPage(PATH);
}
