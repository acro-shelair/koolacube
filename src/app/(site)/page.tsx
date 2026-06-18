import type { Metadata } from "next";
import { renderHomePage, homeMetadata } from "@/lib/content/render-home";

export function generateMetadata(): Promise<Metadata> {
  return homeMetadata();
}

export default async function HomePage() {
  return renderHomePage();
}
