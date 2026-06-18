import type { NextConfig } from "next";

// Permanent (308) redirects from the legacy WordPress URLs to their closest
// equivalent on the new site. Sources are written without a trailing slash;
// Next.js normalises the trailing slash, so `/about-us/` and `/about-us` both
// match. Keeping these preserves SEO link equity from the old site.
const legacyRedirects = [
  { source: "/cold-room-hire-rental", destination: "/hire/cold-room" },
  { source: "/cold-room-sales", destination: "/buy/new" },
  { source: "/about-us", destination: "/about" },
  { source: "/faqs", destination: "/#faqs" },
  { source: "/industries-we-serve", destination: "/industries" },
  {
    source: "/cooler-room-mobile-refrigerated-storage",
    destination: "/hire/cold-room",
  },
  {
    source: "/freezer-room-low-temperature-cold-storage",
    destination: "/hire/freezer-room",
  },
  {
    source: "/dual-temp-room-cooler-freezer-in-one-unit",
    destination: "/hire/dual-temp",
  },
  { source: "/contact-us", destination: "/contact" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
