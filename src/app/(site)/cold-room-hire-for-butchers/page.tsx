import type { Metadata } from "next";
import {
  renderContentPage,
  contentPageMetadata,
} from "@/lib/content/render-content";

const PATH = "/cold-room-hire-for-butchers";

export function generateMetadata(): Promise<Metadata> {
  return contentPageMetadata(PATH);
}

export default async function Page() {
  return renderContentPage(PATH);
}
