import type { Metadata } from "next";
import { ContentPage } from "@/components/site/ContentPage";
import { CONTENT_DEFAULTS, type ContentPageData } from "@/lib/content/registry";
import { getPageContent } from "@/lib/content/page-content.server";

/** Effective data for a content-template route (DB override over default). */
export async function getContentPage(path: string): Promise<ContentPageData> {
  return getPageContent(path, CONTENT_DEFAULTS[path]);
}

/** Shared <metadata> for a content-template route. */
export async function contentPageMetadata(path: string): Promise<Metadata> {
  const data = await getContentPage(path);
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

/** Shared render for a content-template route. */
export async function renderContentPage(path: string) {
  const data = await getContentPage(path);
  return (
    <ContentPage
      eyebrow={data.eyebrow}
      crumb={data.crumb}
      title={data.title}
      intro={data.intro}
      bullets={data.bullets}
    />
  );
}
