import type { Metadata } from "next";
import { INTRO_DEFAULTS, type IntroPageData } from "@/lib/content/registry";
import { getPageContent } from "@/lib/content/page-content.server";

/** Effective data for an intro-template route (DB override over default). */
export async function getIntroPage(path: string): Promise<IntroPageData> {
  return getPageContent(path, INTRO_DEFAULTS[path]);
}

/** Shared <metadata> for an intro-template route. */
export async function introPageMetadata(path: string): Promise<Metadata> {
  const data = await getIntroPage(path);
  return {
    alternates: { canonical: path },
    title: data.metaTitle,
    description: data.metaDescription,
    openGraph: {
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
      title: data.metaTitle,
      description: data.metaDescription,
    },
  };
}
