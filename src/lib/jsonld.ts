/**
 * JSON-LD structured data builders. Each returns a plain object that is
 * serialised into a <script type="application/ld+json"> tag via <JsonLd>.
 */
import { SITE, absoluteUrl } from "./site";

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

/** LocalBusiness / Organization — the core entity for local SEO. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: SITE.logo,
    image: absoluteUrl(SITE.ogImage),
    description: SITE.description,
    telephone: SITE.telephoneE164,
    email: SITE.email,
    priceRange: SITE.priceRange,
    parentOrganization: { "@type": "Organization", name: SITE.parent },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.streetAddress,
      addressLocality: SITE.address.addressLocality,
      addressRegion: SITE.address.addressRegion,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: SITE.areaServed.map((name) => ({
      "@type": "City",
      name,
    })),
  };
}

/** WebSite entity, linked to the organization. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-AU",
  };
}

/** BreadcrumbList from an ordered list of { name, path } crumbs. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** FAQPage from an array of { q, a }. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Product with an Offer (used on buy/sales pages). No price is published, so
 *  the Offer carries currency, availability and condition but omits a price. */
export function productSchema({
  name,
  description,
  path,
  image,
  availability = "https://schema.org/InStock",
  itemCondition = "https://schema.org/NewCondition",
}: {
  name: string;
  description: string;
  path: string;
  image?: string;
  availability?: string;
  itemCondition?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: absoluteUrl(image ?? SITE.ogImage),
    brand: { "@type": "Brand", name: SITE.name },
    category: "Commercial Refrigeration",
    offers: {
      "@type": "Offer",
      url: absoluteUrl(path),
      priceCurrency: "AUD",
      availability,
      itemCondition,
      seller: { "@id": ORG_ID },
      areaServed: SITE.areaServed.map((n) => ({ "@type": "City", name: n })),
    },
  };
}

/** Service offered by the business (used on hire pages). When a monthly "from"
 *  price is supplied, an Offer with a per-month UnitPriceSpecification is added
 *  (prices are quoted ex-GST, so valueAddedTaxIncluded is false). */
export function serviceSchema({
  name,
  description,
  path,
  serviceType,
  monthlyPriceFrom,
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  monthlyPriceFrom?: number;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: serviceType ?? name,
    url: absoluteUrl(path),
    provider: { "@id": ORG_ID },
    areaServed: SITE.areaServed.map((n) => ({ "@type": "City", name: n })),
  };
  if (typeof monthlyPriceFrom === "number") {
    schema.offers = {
      "@type": "Offer",
      url: absoluteUrl(path),
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: monthlyPriceFrom,
        priceCurrency: "AUD",
        unitCode: "MON",
        valueAddedTaxIncluded: false,
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: 1,
          unitCode: "MON",
        },
      },
    };
  }
  return schema;
}
