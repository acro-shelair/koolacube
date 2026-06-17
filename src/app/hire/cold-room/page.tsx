import type { Metadata } from "next";
import {
  HireContent,
  defaultAdvantages,
  defaultUseCases,
  type HireData,
} from "@/components/site/HireContent";

export const metadata: Metadata = {
  title: "Cold Room Hire | Koolacube",
  description:
    "Mobile and modular cold room hire Australia-wide. Chillers (0°C to +5°C) and freezer rooms (-20°C) for long-term and seasonal commercial use. Fast on-site delivery & setup.",
  openGraph: {
    title: "Cold Room Hire | Koolacube",
    description:
      "Mobile and modular cold room hire for commercial and industrial use. Fast delivery, easy setup and 24/7 support.",
  },
};

const data: HireData = {
  crumb: "Hire / Cold Room",
  title: "Cold Room Hire Options",
  intro:
    "We provide mobile cold rooms and modular cold room hire Australia-wide for commercial and industrial use. Available as chillers (0°C to +5°C) and freezer rooms (-20°C).",
  optionsTitle: "Flexible hire to suit any project",
  options: [
    {
      title: "Long-term hire",
      desc: "Perfect for hospitality, healthcare, aged-care and industrial applications.",
    },
    {
      title: "Monthly commercial hire",
      desc: "Simple monthly billing for ongoing cold storage as your business grows.",
    },
    {
      title: "Seasonal hire",
      desc: "Increase your storage capacity during peak demand.",
    },
    {
      title: "On-site delivery & setup",
      desc: "Quick installation anywhere you need it.",
    },
  ],
  rangeTitle: "Our Cold Room Hire Range",
  rangeIntro:
    "Looking for long-term refrigerated storage? Our mobile cold rooms are designed to deliver consistent temperature control, high performance and complete peace of mind—no matter the industry or location. From small cafés to large-scale commercial operations, we provide fast delivery, easy setup and 24/7 support.",
  range: [
    { title: "Mobile Cold Rooms", desc: "Ideal for catering, hospitality & retail." },
    { title: "Modular Walk-In Cold Rooms", desc: "Large-scale storage, built onsite." },
    { title: "Emergency Cold Storage Hire", desc: "Urgent breakdown backup." },
    { title: "Freezer Room Hire", desc: "Perfect for frozen food storage." },
    { title: "Long Term Hire", desc: "Cost-effective commercial storage." },
  ],
  advantagesIntro:
    "We offer a full range of portable cold rooms to suit different storage needs. All units come equipped with digital temperature control, internal lighting, food-grade shelving (optional), lockable doors and robust insulation to maintain optimal temperature.",
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
  sizes: [
    { size: "3m Unit", desc: "Small kitchens, backup storage, cafes." },
    { size: "6m Unit", desc: "Catering, restaurants, aged-care, florists." },
    { size: "9m Unit", desc: "Food manufacturing, construction, bulk food storage." },
  ],
  sizesNote: "Custom configurations available on request.",
  useCasesTitle: "Use Cases",
  useCasesIntro: "Our portable cold rooms are trusted across a wide range of industries:",
  useCases: defaultUseCases,
};

export default function Page() {
  return <HireContent data={data} />;
}
