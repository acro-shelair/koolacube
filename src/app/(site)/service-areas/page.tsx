import type { Metadata } from "next";
import {
  renderContentPage,
  contentPageMetadata,
} from "@/lib/content/render-content";

const PATH = "/service-areas";

export function generateMetadata(): Promise<Metadata> {
  return contentPageMetadata(PATH);
}

export default async function Page() {
  return renderContentPage(PATH);
}
