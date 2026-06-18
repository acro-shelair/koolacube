import { createClient } from "@/lib/supabase/server";

export type UnitCategory = "cooler" | "freezer" | "dual";
export type UnitSpec = { feature: string; value: string | string[] };

export type Unit = {
  id: string;
  slug: string;
  category: UnitCategory;
  icon: string;
  name: string;
  tagline: string;
  intro: string;
  img: string;
  specs: UnitSpec[];
  applications: string[];
  display_order: number;
  is_published: boolean;
};

/** Current hardcoded units — used as the fallback before any are saved in the CMS. */
export const DEFAULT_UNITS: Unit[] = [
  {
    id: "cooler-room",
    slug: "cooler-room",
    category: "cooler",
    icon: "Snowflake",
    name: "Cooler Room — Mobile Refrigerated Storage",
    tagline: "Reliable Chilled Storage for Food, Beverage & Commercial Use",
    intro:
      "Our Cooler Rooms are designed to maintain stable temperatures ideal for fresh produce, beverages, catering supplies and general chilled storage. Built using high-density insulation and commercial-grade refrigeration, these units deliver consistent cooling with low running costs.",
    img: "/unit-coldroom.jpg",
    specs: [
      { feature: "Available Sizes", value: "3m, 6m, 9m (custom sizes on request)" },
      { feature: "Temperature Range", value: "+2°C to +10°C" },
      { feature: "Construction", value: "Insulated panel walls, weather-resistant exterior" },
      { feature: "Power Requirement", value: "Standard 10A / 15A / 32A (varies by unit)" },
      { feature: "Door Type", value: "Lockable, heavy-duty hinged or sliding door" },
      { feature: "Flooring", value: "Non-slip food-grade flooring" },
      { feature: "Lighting", value: "Internal LED lighting" },
      { feature: "Shelving", value: "Optional food-grade adjustable shelving" },
      { feature: "Relocation", value: "Fully transportable, forklift pockets" },
    ],
    applications: [
      "Food manufacturing & processing",
      "Restaurants, cafés & catering",
      "Florists & fresh produce suppliers",
      "Aged-care & healthcare",
      "Construction and remote-site chilled storage",
      "Emergency backup refrigeration",
    ],
    display_order: 0,
    is_published: true,
  },
  {
    id: "freezer-room",
    slug: "freezer-room",
    category: "freezer",
    icon: "Thermometer",
    name: "Freezer Room — Low-Temperature Cold Storage",
    tagline: "Deep-Freezing Performance for Commercial & Industrial Use",
    intro:
      "Our Freezer Rooms deliver dependable low-temperature storage ideal for meat, seafood, frozen goods and long-term preservation. Engineered for stability and efficiency, each unit is built to operate in demanding environments.",
    img: "/unit-freezer.jpg",
    specs: [
      { feature: "Available Sizes", value: "3m, 6m, 9m (custom builds available)" },
      { feature: "Temperature Range", value: "–18°C to –25°C" },
      { feature: "Insulation", value: "Extra-thick panels for deep-freeze efficiency" },
      { feature: "Power Requirement", value: "15A / 32A depending on unit size" },
      { feature: "Door Type", value: "Heated door frame with emergency release" },
      { feature: "Flooring", value: "Anti-slip, reinforced freezer flooring" },
      { feature: "Lighting", value: "LED internal lighting" },
      { feature: "Safety", value: "Internal lighting switch & emergency release" },
      { feature: "Relocation", value: "Portable, truck-transportable design" },
    ],
    applications: [
      "Frozen meat & seafood storage",
      "Commercial kitchens & wholesalers",
      "Food manufacturing",
      "Long-term preservation of temperature-sensitive materials",
      "Seasonal storage overflow",
      "Industrial & mining sites",
    ],
    display_order: 1,
    is_published: true,
  },
  {
    id: "dual-temp-room",
    slug: "dual-temp-room",
    category: "dual",
    icon: "Layers",
    name: "Dual Temp Room — Cooler + Freezer in One Unit",
    tagline: "Two Independent Temperature Zones for Maximum Efficiency",
    intro:
      "A Dual Temp Room combines a cooler section and a freezer section in one portable unit—ideal for businesses needing flexible chilled and frozen storage simultaneously. Each zone has its own door, thermostat and refrigeration system.",
    img: "/unit-dual.jpg",
    specs: [
      { feature: "Available Sizes", value: "4m, 6m, 9m custom layouts" },
      {
        feature: "Temperature Zones",
        value: ["Chiller section: +2°C to +10°C", "Freezer section: –18°C to –25°C"],
      },
      { feature: "Controls", value: "Independent digital thermostats" },
      { feature: "Construction", value: "Multi-zone insulated panels with central divider" },
      { feature: "Power Requirement", value: "Dual-circuit power supply" },
      { feature: "Doors", value: "Separate access doors for each compartment" },
      { feature: "Flooring", value: "Food-grade, non-slip flooring" },
      { feature: "Shelving", value: "Optional custom-configured shelving in each zone" },
    ],
    applications: [
      "Catering & hospitality",
      "Supermarkets & food retailers",
      "Aged-care & healthcare kitchens",
      "Food manufacturers needing dual storage",
      "Industrial & remote camps",
      "Businesses managing both chilled and frozen stock",
    ],
    display_order: 2,
    is_published: true,
  },
];

/** Published units for the public site, ordered. Falls back to DEFAULT_UNITS. */
export async function getPublishedUnits(): Promise<Unit[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("units")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) return DEFAULT_UNITS;
    return data as Unit[];
  } catch {
    return DEFAULT_UNITS;
  }
}
