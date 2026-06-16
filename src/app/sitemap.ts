import type { MetadataRoute } from "next";

// Update to the production domain when the site goes live.
const SITE_URL = "https://koolacube.com.au";

const paths = [
  "/",
  "/hire/cold-room",
  "/hire/freezer-room",
  "/hire/dual-temp",
  "/hire/long-term",
  "/buy/new",
  "/buy/ex-hire",
  "/buy/custom",
  "/available-units",
  "/industries",
  "/service-areas",
  "/about",
  "/contact",
  "/cold-room-hire-brisbane",
  "/freezer-room-hire-brisbane",
  "/cold-room-hire-gold-coast",
  "/cold-room-hire-sunshine-coast",
  "/cold-room-sales-queensland",
  "/ex-hire-cold-rooms-for-sale",
  "/cold-room-hire-for-butchers",
  "/cold-room-hire-for-restaurants",
  "/cold-room-hire-for-food-manufacturers",
  "/cold-room-hire-for-aged-care",
  "/emergency-cold-storage",
  "/cold-room-hire-during-renovations",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: `${SITE_URL}${p}`,
    changeFrequency: "weekly",
  }));
}
