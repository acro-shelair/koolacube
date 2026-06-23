import { SITE } from "@/lib/site";

/**
 * Serves /llms.txt — a Markdown summary of the site for LLMs and AI agents,
 * following the https://llmstxt.org convention (H1 title, blockquote summary,
 * then link sections). Generated from SITE so it stays in sync with the site.
 */

export const dynamic = "force-static";

const link = (label: string, path: string, note?: string) =>
  `- [${label}](${SITE.url}${path})${note ? `: ${note}` : ""}`;

function buildLlmsTxt(): string {
  return `# ${SITE.name}

> ${SITE.description}

${SITE.name} (${SITE.tagline}) is part of ${SITE.parent}. Phone: ${SITE.telephone}. Email: ${SITE.email}. Based in ${SITE.address.addressLocality}, ${SITE.address.addressRegion}, serving ${SITE.areaServed.join(", ")}.

## Hire
${link("Cold room hire", "/hire/cold-room")}
${link("Freezer room hire", "/hire/freezer-room")}
${link("Dual-temp room hire", "/hire/dual-temp")}
${link("Long-term hire", "/hire/long-term", "monthly commercial hire")}
${link("Available units", "/available-units", "current stock available to hire")}

## Buy
${link("New cold rooms", "/buy/new")}
${link("Ex-hire cold rooms for sale", "/buy/ex-hire")}
${link("Custom builds", "/buy/custom")}

## Service areas
${link("Cold room hire Brisbane", "/cold-room-hire-brisbane")}
${link("Freezer room hire Brisbane", "/freezer-room-hire-brisbane")}
${link("Cold room hire Gold Coast", "/cold-room-hire-gold-coast")}
${link("Cold room hire Sunshine Coast", "/cold-room-hire-sunshine-coast")}
${link("All service areas", "/service-areas")}

## Industries
${link("Restaurants", "/cold-room-hire-for-restaurants")}
${link("Butchers", "/cold-room-hire-for-butchers")}
${link("Food manufacturers", "/cold-room-hire-for-food-manufacturers")}
${link("Aged care", "/cold-room-hire-for-aged-care")}
${link("Emergency cold storage", "/emergency-cold-storage")}

## Company
${link("About", "/about")}
${link("Contact / request a quote", "/contact")}
${link("Sitemap", "/sitemap.xml")}
`;
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
