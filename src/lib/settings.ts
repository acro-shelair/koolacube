import { SITE } from "@/lib/site";

/**
 * Editable, site-wide settings (NAP details + shared copy). Defaults mirror the
 * static `SITE` constant so the site renders identically before anything is
 * saved. This module is client-safe — the server reader lives in
 * `settings.server.ts`.
 */
export type EffectiveSettings = {
  telephone: string;
  telephoneE164: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  tagline: string;
  description: string;
  footerBlurb: string;
  ctaTitle: string;
  ctaSubtitle: string;
};

export const SETTINGS_DEFAULTS: EffectiveSettings = {
  telephone: SITE.telephone,
  telephoneE164: SITE.telephoneE164,
  email: SITE.email,
  address: { ...SITE.address },
  tagline: SITE.tagline,
  description: SITE.description,
  footerBlurb: "Reliable commercial cold storage for SE Queensland businesses.",
  ctaTitle: "Talk to Koolacube about your site.",
  ctaSubtitle: "Monthly hire from $440 + GST · Backed by ACRO Refrigeration.",
};

/** Phone digits for tel: links, e.g. "1300 561 030" -> "1300561030". */
export function telHref(telephone: string): string {
  return telephone.replace(/[^\d+]/g, "");
}
