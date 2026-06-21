/**
 * Page registry for the "edit every text" CMS layer.
 *
 * `PAGES` lists every editable route grouped for the admin. Per-template default
 * data lives in the maps below; public pages render `getPageContent(path,
 * default)` (DB override merged over default) and the admin edits the same shape.
 */

export type PageTemplate = "content" | "hire" | "buy" | "home" | "simple" | "intro";

export type PageEntry = {
  key: string; // slug-safe id used in /admin/pages/[key]
  path: string; // public route
  label: string;
  group: string;
  template: PageTemplate;
};

/** Simple "ContentPage" template: hero + bullet list + SEO meta. */
export type ContentPageData = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  crumb: string;
  title: string;
  intro: string;
  bullets: string[];
};

/**
 * "Intro" template: hero (eyebrow/crumb/title/intro) + SEO meta only. Used by
 * pages whose body is rendered from a database collection (Units, Industries) —
 * the cards stay in their own admin managers; only the top copy is edited here.
 */
export type IntroPageData = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  crumb: string;
  title: string;
  intro: string;
};

/** Convert a route to its registry key: "/" -> "home", "/hire/cold-room" -> "hire-cold-room". */
export function pathToKey(path: string): string {
  return path.replace(/^\//, "").replace(/\//g, "-") || "home";
}

export const PAGES: PageEntry[] = [
  { key: "home", path: "/", label: "Home", group: "Main pages", template: "home" },
  { key: "about", path: "/about", label: "About", group: "Main pages", template: "simple" },
  { key: "contact", path: "/contact", label: "Contact", group: "Main pages", template: "simple" },

  { key: "available-units", path: "/available-units", label: "Available Units", group: "Collections", template: "intro" },
  { key: "industries", path: "/industries", label: "Industries", group: "Collections", template: "intro" },

  { key: "hire-cold-room", path: "/hire/cold-room", label: "Cold Room Hire", group: "Hire", template: "hire" },
  { key: "hire-freezer-room", path: "/hire/freezer-room", label: "Freezer Room Hire", group: "Hire", template: "hire" },
  { key: "hire-dual-temp", path: "/hire/dual-temp", label: "Dual Temp Hire", group: "Hire", template: "hire" },
  { key: "hire-long-term", path: "/hire/long-term", label: "Long-Term Hire", group: "Hire", template: "hire" },

  { key: "buy-new", path: "/buy/new", label: "Buy New", group: "Buy", template: "buy" },
  { key: "buy-ex-hire", path: "/buy/ex-hire", label: "Buy Ex-Hire", group: "Buy", template: "buy" },
  { key: "buy-custom", path: "/buy/custom", label: "Custom Builds", group: "Buy", template: "buy" },

  { key: "cold-room-hire-brisbane", path: "/cold-room-hire-brisbane", label: "Cold Room Hire Brisbane", group: "Locations", template: "content" },
  { key: "freezer-room-hire-brisbane", path: "/freezer-room-hire-brisbane", label: "Freezer Room Hire Brisbane", group: "Locations", template: "content" },
  { key: "cold-room-hire-gold-coast", path: "/cold-room-hire-gold-coast", label: "Cold Room Hire Gold Coast", group: "Locations", template: "content" },
  { key: "cold-room-hire-sunshine-coast", path: "/cold-room-hire-sunshine-coast", label: "Cold Room Hire Sunshine Coast", group: "Locations", template: "content" },
  { key: "service-areas", path: "/service-areas", label: "Service Areas", group: "Locations", template: "content" },

  { key: "cold-room-sales-queensland", path: "/cold-room-sales-queensland", label: "Cold Room Sales Queensland", group: "Sales", template: "content" },
  { key: "ex-hire-cold-rooms-for-sale", path: "/ex-hire-cold-rooms-for-sale", label: "Ex-Hire Cold Rooms for Sale", group: "Sales", template: "content" },

  { key: "cold-room-hire-for-butchers", path: "/cold-room-hire-for-butchers", label: "For Butchers", group: "Industry pages", template: "content" },
  { key: "cold-room-hire-for-restaurants", path: "/cold-room-hire-for-restaurants", label: "For Restaurants", group: "Industry pages", template: "content" },
  { key: "cold-room-hire-for-food-manufacturers", path: "/cold-room-hire-for-food-manufacturers", label: "For Food Manufacturers", group: "Industry pages", template: "content" },
  { key: "cold-room-hire-for-aged-care", path: "/cold-room-hire-for-aged-care", label: "For Aged Care", group: "Industry pages", template: "content" },

  { key: "emergency-cold-storage", path: "/emergency-cold-storage", label: "Emergency Cold Storage", group: "Solutions", template: "content" },
  { key: "cold-room-hire-during-renovations", path: "/cold-room-hire-during-renovations", label: "During Renovations", group: "Solutions", template: "content" },
];

export function pageByKey(key: string): PageEntry | undefined {
  return PAGES.find((p) => p.key === key);
}

const c = (
  metaTitle: string,
  crumb: string,
  title: string,
  intro: string,
  bullets: string[]
): ContentPageData => ({
  metaTitle,
  metaDescription: intro,
  eyebrow: "Koolacube",
  crumb,
  title,
  intro,
  bullets,
});

/** Defaults for every `content` template route, keyed by path. */
export const CONTENT_DEFAULTS: Record<string, ContentPageData> = {
  "/cold-room-hire-brisbane": c(
    "Cold Room Hire Brisbane | Koolacube",
    "Locations",
    "Cold Room Hire Brisbane",
    "Long-term commercial cold room hire across greater Brisbane. Monthly hire from $440 + GST, delivery and maintenance backed by ACRO Refrigeration.",
    ["Within 50km of Deception Bay depot", "Maintenance support included", "240V standard units available", "Suits CBD, north, west, south", "Delivery & setup quoted", "Monthly hire"]
  ),
  "/freezer-room-hire-brisbane": c(
    "Freezer Room Hire Brisbane | Koolacube",
    "Locations",
    "Freezer Room Hire Brisbane",
    "Commercial freezer room hire in Brisbane down to -22°C. Ideal for butchers, food manufacturers and caterers needing extra frozen capacity.",
    ["Monthly hire", "Down to -22°C", "Tested before delivery", "Brisbane metro coverage", "Maintenance backed", "Long-term focus"]
  ),
  "/cold-room-hire-gold-coast": c(
    "Cold Room Hire Gold Coast | Koolacube",
    "Locations",
    "Cold Room Hire Gold Coast",
    "Cold room hire across the Gold Coast for restaurants, kitchens, caterers and food businesses. Monthly hire with maintenance backed by ACRO Refrigeration.",
    ["Gold Coast wide", "Monthly hire", "Tested before delivery", "Delivery from Deception Bay", "Suitable for hospitality", "Hire or buy options"]
  ),
  "/cold-room-hire-sunshine-coast": c(
    "Cold Room Hire Sunshine Coast | Koolacube",
    "Locations",
    "Cold Room Hire Sunshine Coast",
    "Sunshine Coast cold room hire for businesses needing reliable cold storage. Talk to us about coverage outside the 50km zone.",
    ["Sunshine Coast region", "Monthly hire", "Travel may apply outside 50km", "Cold, freezer, dual temp", "Backed by refrigeration techs", "Long-term hire"]
  ),
  "/service-areas": c(
    "Service Areas | Koolacube",
    "Service Areas",
    "Service Areas",
    "Koolacube services SE Queensland from our Deception Bay depot. Maintenance and breakdown support included within 50km — outside 50km available by agreement.",
    ["Brisbane", "Gold Coast", "Sunshine Coast", "Moreton Bay", "Ipswich", "Logan", "Within 50km: support included", "Outside 50km: by agreement"]
  ),
  "/cold-room-sales-queensland": c(
    "Cold Room Sales Queensland | Koolacube",
    "Sales",
    "Cold Room Sales Queensland",
    "Buy new or ex-hire cold rooms across Queensland. Commercial grade, supported by ACRO Refrigeration.",
    ["New & ex-hire stock", "Cold, freezer, dual temp", "Custom builds available", "Delivery state-wide", "Commercial spec", "Optional service plans"]
  ),
  "/ex-hire-cold-rooms-for-sale": c(
    "Ex-Hire Cold Rooms for Sale | Koolacube",
    "Sales",
    "Ex-Hire Cold Rooms for Sale",
    "Refurbished ex-hire cold rooms available for sale. Tested before sale. Stock changes regularly.",
    ["Tested ex-hire units", "Refurbished as required", "Limited availability", "Cold & freezer units", "Cost-effective", "Inspection welcome"]
  ),
  "/cold-room-hire-for-butchers": c(
    "Cold Room Hire for Butchers | Koolacube",
    "Industries",
    "Cold Room Hire for Butchers",
    "Cold rooms and freezers built for butchers needing reliable temperature, extra capacity or cover during renovation.",
    ["Sub-zero freezer rooms", "Cold + freezer dual temp", "Renovation cover", "Maintenance support", "Skid mount on site", "Backed by ACRO Refrigeration"]
  ),
  "/cold-room-hire-for-restaurants": c(
    "Cold Room Hire for Restaurants | Koolacube",
    "Industries",
    "Cold Room Hire for Restaurants",
    "Restaurant cold room hire across SE QLD — for renovations, expansion, overflow stock and seasonal demand.",
    ["Cold or dual temp", "Tested before delivery", "Renovation cover", "Maintenance backed", "Long-term hire", "Suits hospitality"]
  ),
  "/cold-room-hire-for-food-manufacturers": c(
    "Cold Room Hire for Food Manufacturers | Koolacube",
    "Industries",
    "Cold Room Hire for Food Manufacturers",
    "Extra cold and freezer capacity for food manufacturers — production overflow, NPD trials, or extended downtime cover.",
    ["Skid-mount installs", "Freezer to -22°C", "Production overflow", "Multiple units possible", "Service-backed", "Long-term hire"]
  ),
  "/cold-room-hire-for-aged-care": c(
    "Cold Room Hire for Aged Care & Commercial Kitchens | Koolacube",
    "Industries",
    "Cold Room Hire for Aged Care & Commercial Kitchens",
    "Cold room and freezer hire for aged care kitchens, schools and large institutional kitchens. Reliable cold storage backed by qualified refrigeration technicians.",
    ["Institutional kitchens", "Aged care facilities", "Schools & clubs", "Maintenance included*", "Renovation cover", "Long-term hire"]
  ),
  "/emergency-cold-storage": c(
    "Emergency Cold Storage | Koolacube",
    "Solutions",
    "Emergency Cold Storage",
    "When your existing cold room fails, Koolacube can supply replacement cold storage. Subject to availability — call 1300 561 030 anytime.",
    ["Subject to availability", "Call 1300 561 030 24/7", "Depot in Deception Bay", "Tested unit before delivery", "Maintenance support 50km", "Hire continues monthly"]
  ),
  "/cold-room-hire-during-renovations": c(
    "Cold Room Hire During Renovations | Koolacube",
    "Solutions",
    "Cold Room Hire During Renovations",
    "Keep operating while you renovate. Hire a temporary cold room or freezer for the duration of your build.",
    ["Project-length hire", "Cold or freezer", "Skid mount on site", "Tested before delivery", "Monthly billing", "Reduces business interruption"]
  ),
};

/** Defaults for every `intro` template route (hero + SEO), keyed by path. */
export const INTRO_DEFAULTS: Record<string, IntroPageData> = {
  "/available-units": {
    metaTitle: "Available Units — Cooler, Freezer & Dual Temp Rooms | Koolacube",
    metaDescription:
      "Portable cooler rooms, freezer rooms and dual temp rooms in 3m, 6m and 9m sizes. Full specifications, temperature ranges and ideal applications. Custom builds available.",
    eyebrow: "Our Fleet",
    crumb: "Available Units",
    title: "Available Units",
    intro:
      "Portable cooler rooms, freezer rooms and dual temp rooms — available in 3m, 6m and 9m sizes with custom builds on request. Explore the specifications and ideal applications for each below.",
  },
  "/industries": {
    metaTitle: "Industries We Serve | Koolacube",
    metaDescription:
      "Portable cooling solutions for hospitality, aged care, healthcare, education, construction and mining. Reliable temperature control, easy mobility and full compliance across Australia.",
    eyebrow: "Industries",
    crumb: "Industries",
    title: "Industries We Serve",
    intro:
      "Koolacube provides reliable, portable cooling solutions designed for the unique needs of multiple sectors—including hospitality, aged care, healthcare, education, construction and mining. Our cold rooms deliver consistent temperature control, easy mobility and full compliance, making them the preferred choice across Australia.",
  },
};
