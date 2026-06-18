import type { Metadata } from "next";
import { renderAboutPage, aboutMetadata } from "@/lib/content/render-simple";

export function generateMetadata(): Promise<Metadata> {
  return aboutMetadata();
}

export default async function Page() {
  return renderAboutPage();
}
