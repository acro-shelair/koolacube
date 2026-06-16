import type { Metadata } from "next";
import {
  HireContent,
  defaultAdvantages,
  defaultUseCases,
  type HireData,
} from "@/components/site/HireContent";

export const metadata: Metadata = {
  title: "Freezer Room Hire | Koolacube",
  description:
    "Mobile and modular freezer room hire down to -25°C for meat, seafood, frozen goods and long-term preservation. Short-term, long-term and seasonal hire with fast on-site delivery.",
  openGraph: {
    title: "Freezer Room Hire | Koolacube",
    description:
      "Deep-freeze room hire for commercial, industrial and event use. Fast delivery, easy setup and 24/7 support.",
  },
};

const data: HireData = {
  crumb: "Hire / Freezer Room",
  title: "Freezer Room Hire Options",
  intro:
    "We provide mobile and modular freezer room hire Australia-wide for deep-frozen storage down to -25°C. Reliable low-temperature units for meat, seafood, frozen goods and long-term preservation across commercial, industrial and event use.",
  optionsTitle: "Frozen storage on your terms",
  options: [
    {
      title: "Short-term hire",
      desc: "Frozen storage for events, pop-ups and emergency cover.",
    },
    {
      title: "Long-term hire",
      desc: "Ongoing frozen capacity for hospitality, food manufacturing and industrial use.",
    },
    {
      title: "Seasonal hire",
      desc: "Add freezer capacity through peak production and demand.",
    },
    {
      title: "On-site delivery & setup",
      desc: "Fast installation wherever you need frozen storage.",
    },
  ],
  rangeTitle: "Our Freezer Room Hire Range",
  rangeIntro:
    "Whether you need a single mobile freezer for an event or large-scale frozen capacity onsite, our freezer rooms deliver stable sub-zero temperatures, high efficiency and complete peace of mind. We provide fast delivery, easy setup and 24/7 support.",
  range: [
    { title: "Mobile Freezer Rooms", desc: "Portable deep-freeze for catering and events." },
    { title: "Modular Walk-In Freezer Rooms", desc: "Large-scale frozen storage, built onsite." },
    { title: "Emergency Freezer Hire", desc: "Urgent backup when a freezer fails." },
    { title: "Bulk Frozen Storage", desc: "High-volume frozen goods and stock overflow." },
    { title: "Long Term Freezer Hire", desc: "Cost-effective ongoing frozen storage." },
  ],
  advantagesIntro:
    "Every freezer room comes equipped with digital temperature control, internal LED lighting, heated door frames with emergency release, food-grade shelving (optional) and extra-thick insulation to hold stable sub-zero temperatures.",
  advantages: defaultAdvantages,
  specsTitle: "Modular Freezer Room Specifications",
  specs: [
    "Suitable for indoor or outdoor use",
    "Can be installed on uneven ground (fields, gravel, car parks)",
    "Single phase 15amp or 3-phase 32amp depending on unit size",
    "Temperature range: -18°C to -25°C",
    "Extra-thick insulated panels for deep-freeze efficiency",
    "Heated door frame with internal emergency release",
    "Anti-slip, reinforced freezer flooring",
    "Internal LED lighting included",
    "Secure locking system (no padlocks required)",
    "Shelving supplied",
    "Forklift pockets for safe relocation",
  ],
  sizesTitle: "Standard Freezer Room Sizes",
  sizes: [
    { size: "3m Unit", desc: "Small events, backup freezing, cafes." },
    { size: "6m Unit", desc: "Restaurants, butchers, caterers, wholesalers." },
    { size: "9m Unit", desc: "Food manufacturing, bulk frozen stock, large events." },
  ],
  sizesNote: "Custom configurations available on request.",
  useCasesTitle: "Use Cases",
  useCasesIntro: "Our portable freezer rooms are trusted across a wide range of industries:",
  useCases: defaultUseCases,
};

export default function Page() {
  return <HireContent data={data} />;
}
