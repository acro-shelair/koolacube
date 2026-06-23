import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { LEGAL_DEFAULTS, type LegalPageData } from "@/lib/content/registry";
import { getPageContent } from "@/lib/content/page-content.server";

/** Effective data for a legal-template route (DB override over default). */
export async function getLegalPage(path: string): Promise<LegalPageData> {
  return getPageContent(path, LEGAL_DEFAULTS[path]);
}

/** Shared <metadata> for a legal-template route. */
export async function legalPageMetadata(path: string): Promise<Metadata> {
  const data = await getLegalPage(path);
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

/** Shared render for a legal-template route. */
export async function renderLegalPage(path: string) {
  const data = await getLegalPage(path);
  return (
    <>
      <PageHero eyebrow={data.eyebrow} crumb={data.crumb} title={data.title} intro={data.intro} />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          {(data.effectiveDate || data.abn) && (
            <div className="mb-10 flex flex-wrap gap-x-6 gap-y-1 border-b border-border pb-6 text-sm text-muted-foreground">
              {data.effectiveDate && (
                <span>
                  <strong className="text-foreground">Effective Date:</strong> {data.effectiveDate}
                </span>
              )}
              {data.abn && (
                <span>
                  <strong className="text-foreground">ABN:</strong> {data.abn}
                </span>
              )}
            </div>
          )}

          <div className="space-y-10 text-base leading-relaxed text-foreground/80">
            {data.sections.map((section, idx) => (
              <section key={idx}>
                {section.heading && (
                  <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
                    {section.heading}
                  </h2>
                )}
                <div className="space-y-4">
                  {section.body.split("\n\n").map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
