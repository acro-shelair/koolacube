// Client-safe helpers for post internal links. No server imports here so this
// can be pulled into client components (the admin editor) without leaking
// `next/headers` into the browser bundle.

export type RelatedLink = { label: string; href: string };

/** Suggested internal destinations, offered in the admin editor datalist. */
export const SITE_LINK_SUGGESTIONS: RelatedLink[] = [
  { label: "Cold Room Hire", href: "/hire/cold-room" },
  { label: "Freezer Room Hire", href: "/hire/freezer-room" },
  { label: "Dual Temp Room Hire", href: "/hire/dual-temp" },
  { label: "Long-Term Hire", href: "/hire/long-term" },
  { label: "Buy New Cold Rooms", href: "/buy/new" },
  { label: "Ex-Hire Cold Rooms", href: "/buy/ex-hire" },
  { label: "Custom Builds", href: "/buy/custom" },
  { label: "Available Units", href: "/available-units" },
  { label: "Industries We Serve", href: "/industries" },
  { label: "About Koolacube", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

/** Normalise raw jsonb related_links into a clean RelatedLink[]. */
export function normalizeRelatedLinks(raw: unknown): RelatedLink[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((l) => {
      const link = (l ?? {}) as Record<string, unknown>;
      return {
        label: typeof link.label === "string" ? link.label : "",
        href: typeof link.href === "string" ? link.href : "",
      };
    })
    .filter((l) => l.label && l.href);
}
