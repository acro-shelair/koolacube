import type { Metadata } from "next";
import { BuyContent, defaultAdvantages, type BuyData } from "@/components/site/BuyContent";

export const metadata: Metadata = {
  title: "Custom Cold Room Builds | Koolacube",
  description:
    "Custom cold rooms, freezer rooms and dual temp units built for unusual sites, sizes or temperature requirements. Engineered and supported by HVACR Group / ACRO Refrigeration.",
  openGraph: {
    title: "Custom Cold Room Builds | Koolacube",
    description:
      "Cold rooms engineered around your site — any size, specialty temperatures, multi-zone configurations.",
  },
};

const data: BuyData = {
  crumb: "Buy / Custom",
  title: "Custom Cold Room Builds",
  intro:
    "Custom cold rooms, freezer rooms and dual temp units built for unusual sites, sizes or temperature requirements. Engineered and supported by HVACR Group / ACRO Refrigeration.",
  optionsTitle: "What we can customise",
  options: [
    { title: "Size & layout", desc: "Any footprint, built to fit your space." },
    { title: "Temperature", desc: "Specialty chilled, frozen or multi-zone ranges." },
    { title: "Fit-out", desc: "Shelving, door placement, lighting and ramps." },
    { title: "Installation", desc: "Skid-mounted relocatable or fixed onsite." },
  ],
  overviewTitle: "Cold Rooms Engineered Around Your Site",
  overview: [
    "When a standard unit won't fit your space, stock or process, we design and build to suit. From specialty temperatures to multi-zone configurations and awkward sites, our refrigeration engineers spec a unit that performs — and keep supporting it after install.",
    "All builds use high-density insulated panels, food-grade interiors, heavy-duty refrigeration systems and digital temperature controllers.",
  ],
  advantages: defaultAdvantages,
  specsTitle: "Build Specifications",
  specs: [
    "Built to any footprint or layout",
    "Suitable for indoor or outdoor installation",
    "Single phase or 3-phase power options",
    "Specialty temperature ranges from -25°C to +15°C",
    "Multi-zone (chiller + freezer) configurations",
    "High-density insulated panels",
    "Internal lighting and secure locking",
    "Food-grade interiors and flooring",
    "Custom shelving and door placement",
    "Skid-mount relocatable or fixed install",
    "Beer python access, strip curtains and ramps available",
  ],
  sizesTitle: "Custom Build Sizes",
  sizesIntro: "Standard footprints make a starting point — we build beyond these to suit:",
  sizes: [
    { size: "3m Unit", suited: "Compact custom builds & tight sites", availability: "Custom-Built" },
    { size: "6m Unit", suited: "Mid-size custom builds & fit-outs", availability: "Custom-Built" },
    { size: "9m+ Unit", suited: "Large & specialty installations", availability: "Custom-Built" },
  ],
  sizesNote: "No standard size that fits? We build to any footprint — talk to us.",
  whyTitle: "Why Build Custom With Us?",
  why: [
    {
      title: "Designed by Refrigeration Engineers",
      desc: "Specced by qualified technicians from the HVACR Group, not off a generic catalogue.",
    },
    {
      title: "Built to Spec",
      desc: "Size, temperature, fit-out and install configured exactly for your site.",
    },
    {
      title: "Compliance-Ready",
      desc: "Manufactured to meet food safety standards, workplace regulations and temperature control requirements.",
    },
    {
      title: "Long-Term Service Support",
      desc: "Optional service plans, spare parts and maintenance to protect your investment.",
    },
  ],
};

export default function Page() {
  return <BuyContent data={data} />;
}
