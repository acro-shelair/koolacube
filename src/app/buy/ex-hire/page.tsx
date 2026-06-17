import type { Metadata } from "next";
import { BuyContent, defaultAdvantages, type BuyData } from "@/components/site/BuyContent";

export const metadata: Metadata = {
  title: "Ex-Hire Cold Rooms for Sale | Koolacube",
  description:
    "Fully serviced and tested ex-hire cold rooms, freezer rooms and dual temp units for sale. A cost-effective way into commercial cold storage. Stock changes regularly — call to confirm.",
  openGraph: {
    title: "Ex-Hire Cold Rooms for Sale | Koolacube",
    description:
      "Professionally refurbished ex-hire cold rooms for sale. Commercial-grade, relocatable, cost-effective.",
  },
};

const data: BuyData = {
  crumb: "Buy / Ex-Hire",
  title: "Ex-Hire Cold Rooms for Sale",
  intro:
    "Fully serviced and tested ex-hire cold rooms, freezer rooms and dual temp units — a cost-effective way into commercial cold storage. Stock changes regularly, so get in touch for what's currently available.",
  optionsTitle: "Why buy ex-hire",
  options: [
    { title: "Cost-effective", desc: "A lower price point than buying brand-new." },
    { title: "Tested & refurbished", desc: "Inspected and serviced before sale." },
    { title: "Ready immediately", desc: "Available now, subject to current stock." },
    { title: "Inspection welcome", desc: "View the unit before you buy." },
  ],
  overviewTitle: "Professionally Refurbished Cold Rooms for Sale",
  overview: [
    "Our ex-hire cold rooms are returned from the field, fully inspected, serviced and refurbished as required before resale. You get commercial-grade refrigeration at a lower cost — ideal for cafés, restaurants and businesses wanting to own their cold storage without the price of new.",
    "All units include insulated panels, food-grade interiors, heavy-duty refrigeration systems and digital temperature controllers.",
  ],
  advantages: defaultAdvantages,
  specsTitle: "Modular Cold Room Specifications",
  specs: [
    "Suitable for indoor or outdoor use",
    "Can be installed on uneven ground (fields, gravel, car parks)",
    "Single phase power: 13amp or 16amp",
    "Temperature range: -20°C to +15°C",
    "Internal lighting included",
    "Secure locking system (no padlocks required)",
    "Shelving supplied",
    "Beer python access available",
    "Plastic strip curtains included",
    "Ramps available on request",
    "Pallet-width doors available",
  ],
  sizesTitle: "Standard Cold Room Sizes",
  sizesIntro: "Ex-hire availability changes regularly — common sizes include:",
  sizes: [
    { size: "3m Unit", suited: "Cafés, retail, small kitchens", availability: "Ex-Hire" },
    { size: "6m Unit", suited: "Restaurants, florists, aged-care", availability: "Ex-Hire" },
    { size: "9m Unit", suited: "Large venues, industrial use", availability: "Ex-Hire / New" },
  ],
  sizesNote: "Stock changes regularly — call to confirm current availability.",
  whyTitle: "Why Buy Ex-Hire From Us?",
  why: [
    {
      title: "Tested Before Sale",
      desc: "Every unit is inspected and serviced before it leaves our yard.",
    },
    {
      title: "Cost-Effective",
      desc: "Commercial-grade cold storage at a lower price than buying new.",
    },
    {
      title: "Relocatable",
      desc: "Portable designs that can be moved and reconfigured as your business grows.",
    },
    {
      title: "Backed by ACRO Refrigeration",
      desc: "Supported by qualified refrigeration technicians and the HVACR Group.",
    },
  ],
};

export default function Page() {
  return <BuyContent data={data} />;
}
