import type { Metadata } from "next";
import { Wrench, Wallet, RefreshCw } from "lucide-react";
import { HireContent, type HireData } from "@/components/site/HireContent";

export const metadata: Metadata = {
  title: "Long-Term Cold Room Hire | Koolacube",
  description:
    "Long-term commercial cold room and freezer hire — weeks, months or ongoing. Monthly billing, maintenance-backed units and the option to convert to purchase. Not short-term party or event hire.",
  openGraph: {
    title: "Long-Term Cold Room Hire | Koolacube",
    description:
      "Ongoing commercial cold, freezer and dual temp hire. Monthly billing, maintenance included, hire-to-buy available.",
  },
};

const data: HireData = {
  crumb: "Hire / Long-Term",
  title: "Long-Term Cold Room Hire Options",
  intro:
    "Koolacube specialises in long-term commercial cold room and freezer hire — weeks, months or ongoing. Monthly billing, maintenance-backed units and the flexibility to scale or convert to purchase. We're not a short-term party or event hire business.",
  optionsTitle: "Built for ongoing commercial storage",
  options: [
    {
      title: "Monthly hire",
      desc: "Simple monthly billing with a minimum term confirmed in your quote.",
    },
    {
      title: "Multi-unit & multi-site",
      desc: "Cold, freezer or dual temp units across one or more locations.",
    },
    {
      title: "Renovation & project cover",
      desc: "Temporary capacity while you rebuild, relocate or expand.",
    },
    {
      title: "Hire-to-buy",
      desc: "Apply your hire toward purchase if it suits your business.",
    },
  ],
  rangeTitle: "What You Can Hire Long-Term",
  rangeIntro:
    "Every unit in our fleet is available on long-term hire — backed by qualified refrigeration technicians, commercial service systems and real breakdown capability. Monthly billing, maintenance included within 50km, and fast support.",
  range: [
    { title: "Cold Rooms", desc: "Ongoing chilled storage from +2°C." },
    { title: "Freezer Rooms", desc: "Ongoing frozen storage down to -25°C." },
    { title: "Dual Temp Rooms", desc: "Chilled + frozen in one unit." },
    { title: "Modular Walk-In Rooms", desc: "Large-scale storage built onsite." },
    { title: "Replacement Units", desc: "Cover ageing or failed built-in cold rooms." },
  ],
  advantagesIntro:
    "Long-term hire gives you commercial cold storage without the capital cost — backed by maintenance, breakdown support and the option to convert to purchase.",
  advantages: [
    {
      icon: Wrench,
      title: "Maintenance Included",
      desc: "Planned maintenance and breakdown support included within 50km of depot, so your operation keeps running.",
    },
    {
      icon: Wallet,
      title: "No Capital Outlay",
      desc: "Get reliable commercial cold storage without buying — preserve your capital and pay monthly.",
    },
    {
      icon: RefreshCw,
      title: "Scale or Convert",
      desc: "Add units as you grow, downsize when you don't, or apply your hire toward purchase.",
    },
  ],
  specsTitle: "Hire Inclusions & Specifications",
  specs: [
    "Monthly billing with minimum hire terms",
    "Maintenance & breakdown support within 50km of depot",
    "Tested unit before delivery",
    "Temperature range: -20°C to +15°C (model dependent)",
    "Single phase or 3-phase power options",
    "Digital temperature control & internal lighting",
    "Lockable doors and robust insulation",
    "Optional food-grade shelving",
    "Delivery, setup and relocation quoted separately",
    "Suitable for indoor or outdoor installation",
    "Convert-to-purchase available",
  ],
  sizesTitle: "Standard Sizes",
  sizes: [
    { size: "3m Unit", desc: "Backup storage, cafes and small kitchens." },
    { size: "6m Unit", desc: "Catering, restaurants, aged-care and florists." },
    { size: "9m Unit", desc: "Food manufacturing, bulk storage and large sites." },
  ],
  sizesNote: "Custom configurations available on request.",
  useCasesTitle: "Use Cases",
  useCasesIntro: "Long-term hire suits businesses that need reliable cold storage month after month:",
  useCases: [
    {
      title: "Hospitality",
      desc: "Restaurants, cafés and venues needing reliable extra cold storage all year round.",
    },
    {
      title: "Aged Care",
      desc: "Ongoing, hygienic temperature-controlled storage for aged-care kitchens and service areas.",
    },
    {
      title: "Healthcare & Medical",
      desc: "Stable long-term storage for medical supplies, pharmaceuticals and vaccines.",
    },
    {
      title: "Food Manufacturing",
      desc: "Permanent overflow and production capacity for processors and wholesalers.",
    },
    {
      title: "Construction & Industrial",
      desc: "Secure cold storage for long-running remote sites, camps and projects.",
    },
    {
      title: "Retail & Supermarkets",
      desc: "Extra chilled and frozen capacity to support trading through the year.",
    },
  ],
};

export default function Page() {
  return <HireContent data={data} />;
}
