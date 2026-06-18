import type { Metadata } from "next";
import { renderContactPage, contactMetadata } from "@/lib/content/render-simple";

export function generateMetadata(): Promise<Metadata> {
  return contactMetadata();
}

export default async function Page() {
  return renderContactPage();
}
