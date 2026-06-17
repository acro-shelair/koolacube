import type { Metadata } from "next";
import { BuyContent, defaultAdvantages, type BuyData } from "@/components/site/BuyContent";

export const metadata: Metadata = {
  title: "Cold Room Sales — Buy New & Ex-Hire | Koolacube",
  description:
    "Buy new, ex-hire and custom-built portable cold rooms. Built for easy relocation, low running costs and long-lasting commercial performance. Delivery & on-site setup available.",
  openGraph: {
    title: "Cold Room Sales | Koolacube",
    description:
      "New, ex-hire and custom portable cold rooms for sale. Commercial-grade build, relocatable, compliant.",
  },
};

const data: BuyData = {
  crumb: "Buy / New",
  title: "Cold Room Sales Options",
  intro:
    "We offer a full range of portable cold rooms for purchase, designed for easy relocation, low running costs and long-lasting operation.",
  optionsTitle: "Ways to buy",
  options: [
    {
      title: "Brand-new cold rooms",
      desc: "Built to order with a choice of sizes and specifications.",
    },
    {
      title: "Ex-hire cold rooms",
      desc: "Fully serviced, tested and ready for immediate use.",
    },
    {
      title: "Custom-built units",
      desc: "Tailored shelving, door placement, lighting and fit-outs.",
    },
    {
      title: "Delivery & on-site setup",
      desc: "Available Australia-wide.",
    },
  ],
  overviewTitle: "High-Quality New & Ex-Hire Portable Cold Rooms for Sale",
  overview: [
    "Looking to invest in your own temperature-controlled storage solution? We supply new and professionally refurbished ex-hire cold rooms built for durability, efficiency and long-term performance. Whether you need a compact unit for a café or a large refrigerated room for industrial use, our cold rooms provide reliable cooling and industry-standard compliance.",
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
  sizesIntro: "Below are common unit sizes we offer for sale:",
  sizes: [
    { size: "3m Unit", suited: "Cafés, retail, small kitchens", availability: "New & Ex-Hire" },
    { size: "6m Unit", suited: "Restaurants, florists, aged-care", availability: "New & Ex-Hire" },
    { size: "9m Unit", suited: "Large venues, industrial use", availability: "New & Custom-Built" },
  ],
  sizesNote: "Custom configurations and specialised builds available.",
  whyTitle: "Why Buy a Cold Room From Us?",
  why: [
    {
      title: "Durable Construction",
      desc: "Built with high-density insulated panels, commercial-grade hardware and reliable compressors for long-term performance.",
    },
    {
      title: "Relocatable",
      desc: "Portable designs that can be moved, expanded or reconfigured as your business grows.",
    },
    {
      title: "Engineered for Compliance",
      desc: "Manufactured to meet food safety standards, workplace regulations and temperature control requirements.",
    },
    {
      title: "Finance & Lease-to-Own Options",
      desc: "Flexible finance options are available, making ownership cost-effective and accessible for businesses of all sizes.",
    },
  ],
};

export default function Page() {
  return <BuyContent data={data} />;
}
