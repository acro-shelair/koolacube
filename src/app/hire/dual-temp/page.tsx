import type { Metadata } from "next";
import {
  HireContent,
  defaultAdvantages,
  defaultUseCases,
  type HireData,
} from "@/components/site/HireContent";

export const metadata: Metadata = {
  title: "Dual Temp Room Hire | Koolacube",
  description:
    "Hire one portable unit with two independent zones — a chiller (+2°C to +10°C) and a freezer (-18°C to -25°C). Separate doors, thermostats and refrigeration for chilled and frozen storage at once.",
  openGraph: {
    title: "Dual Temp Room Hire | Koolacube",
    description:
      "Chiller + freezer in one portable unit. Independent temperature zones for maximum efficiency.",
  },
};

const data: HireData = {
  crumb: "Hire / Dual Temp",
  title: "Dual Temp Room Hire Options",
  intro:
    "Hire one portable unit with two independent temperature zones — a chiller (+2°C to +10°C) and a freezer (-18°C to -25°C) — each with its own door, thermostat and refrigeration system. Ideal when you need chilled and frozen storage on site at the same time.",
  optionsTitle: "Chilled and frozen, one footprint",
  options: [
    {
      title: "Long-term hire",
      desc: "Ongoing flexible storage for hospitality, retail and healthcare kitchens.",
    },
    {
      title: "Monthly commercial hire",
      desc: "Simple monthly billing for ongoing chilled + frozen storage on site.",
    },
    {
      title: "Seasonal hire",
      desc: "Add both chilled and frozen capacity through peak demand.",
    },
    {
      title: "On-site delivery & setup",
      desc: "Quick installation of a single dual-zone unit anywhere you need it.",
    },
  ],
  rangeTitle: "Our Dual Temp Hire Range",
  rangeIntro:
    "When you need both chilled and frozen storage but only have room for one unit, our dual temp rooms deliver two fully independent zones in a single portable footprint. Fast delivery, easy setup and 24/7 support included.",
  range: [
    { title: "Mobile Dual Temp Rooms", desc: "Chiller + freezer in one portable unit." },
    { title: "Modular Dual Temp Rooms", desc: "Larger split-zone storage built onsite." },
    { title: "Emergency Dual Temp Hire", desc: "Cover chilled and frozen stock fast." },
    { title: "Retail Dual Storage", desc: "Beverages chilled, stock frozen — one footprint." },
    { title: "Long Term Dual Temp Hire", desc: "Flexible ongoing chilled + frozen capacity." },
  ],
  advantagesIntro:
    "Each dual temp room features two independent zones with their own digital thermostats and refrigeration systems, separate access doors, internal LED lighting, optional food-grade shelving and a central insulated divider to hold both temperatures reliably.",
  advantages: defaultAdvantages,
  specsTitle: "Dual Temp Room Specifications",
  specs: [
    "Suitable for indoor or outdoor use",
    "Can be installed on uneven ground (fields, gravel, car parks)",
    "Dual-circuit power supply",
    "Chiller zone: +2°C to +10°C",
    "Freezer zone: -18°C to -25°C",
    "Independent digital thermostats per zone",
    "Multi-zone insulated panels with central divider",
    "Separate access doors for each compartment",
    "Food-grade, non-slip flooring",
    "Internal LED lighting in both zones",
    "Optional custom-configured shelving in each zone",
  ],
  sizesTitle: "Standard Dual Temp Sizes",
  sizes: [
    { size: "4m Unit", desc: "Compact chilled + frozen for cafes and small kitchens." },
    { size: "6m Unit", desc: "Catering, restaurants, aged-care and retail." },
    { size: "9m Unit", desc: "Supermarkets, food manufacturing, industrial and remote camps." },
  ],
  sizesNote: "Custom layouts and zone splits available on request.",
  useCasesTitle: "Use Cases",
  useCasesIntro: "Our dual temp rooms are trusted across a wide range of industries:",
  useCases: defaultUseCases,
};

export default function Page() {
  return <HireContent data={data} />;
}
