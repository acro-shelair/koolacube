import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaStrip } from "@/components/site/PageHero";
import {
  Snowflake,
  Thermometer,
  Layers,
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Available Units — Cooler, Freezer & Dual Temp Rooms | Koolacube",
  description:
    "Portable cooler rooms, freezer rooms and dual temp rooms in 3m, 6m and 9m sizes. Full specifications, temperature ranges and ideal applications. Custom builds available.",
  openGraph: {
    title: "Available Units | Koolacube",
    description:
      "Portable cooler rooms, freezer rooms and dual temp rooms — full specifications and ideal applications.",
  },
};

type Spec = { feature: string; value: string | string[] };

type Unit = {
  id: string;
  icon: LucideIcon;
  name: string;
  tagline: string;
  intro: string;
  img: string;
  specs: Spec[];
  applications: string[];
};

const units: Unit[] = [
  {
    id: "cooler-room",
    icon: Snowflake,
    name: "Cooler Room — Mobile Refrigerated Storage",
    tagline: "Reliable Chilled Storage for Food, Beverage & Event Use",
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
      "Events & festivals",
      "Restaurants, cafés & catering",
      "Florists & fresh produce suppliers",
      "Aged-care & healthcare",
      "Construction and remote-site chilled storage",
      "Emergency backup refrigeration",
    ],
  },
  {
    id: "freezer-room",
    icon: Thermometer,
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
  },
  {
    id: "dual-temp-room",
    icon: Layers,
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
      "Event operators needing dual storage",
      "Industrial & remote camps",
      "Businesses managing both chilled and frozen stock",
    ],
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Fleet"
        crumb="Available Units"
        title="Available Units"
        intro="Portable cooler rooms, freezer rooms and dual temp rooms — available in 3m, 6m and 9m sizes with custom builds on request. Explore the specifications and ideal applications for each below."
      />

      {/* Quick jump */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-5">
          <span className="mr-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Jump to:
          </span>
          {units.map((u) => (
            <a
              key={u.id}
              href={`#${u.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-cold-blue hover:text-cold-blue"
            >
              <u.icon className="h-3.5 w-3.5" />
              {u.name.split(" — ")[0]}
            </a>
          ))}
        </div>
      </section>

      {units.map((unit, idx) => (
        <UnitSection key={unit.id} unit={unit} alt={idx % 2 === 1} />
      ))}

      <CtaStrip />
    </>
  );
}

function UnitSection({ unit, alt }: { unit: Unit; alt: boolean }) {
  const Icon = unit.icon;
  return (
    <section
      id={unit.id}
      className={"scroll-mt-24 py-16 md:py-20 " + (alt ? "bg-muted/40" : "bg-white")}
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cold-blue/10 text-cold-blue">
              <Icon className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl font-bold leading-tight md:text-3xl">
              {unit.name}
            </h2>
          </div>
          <p className="mt-4 text-base font-semibold text-cold-blue md:text-lg">
            {unit.tagline}
          </p>
          <p className="mt-3 text-base leading-relaxed text-foreground/75">{unit.intro}</p>
        </div>

        {/* Image + spec table */}
        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-lg border border-border bg-navy shadow-sm">
              <img
                src={unit.img}
                alt={unit.name}
                width={1024}
                height={768}
                loading="lazy"
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
              <div className="bg-navy px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white">
                Standard Dimensions & Specifications
              </div>
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-border">
                  {unit.specs.map((s) => (
                    <tr key={s.feature}>
                      <th
                        scope="row"
                        className="w-2/5 bg-muted/30 px-6 py-3.5 align-top font-semibold text-foreground"
                      >
                        {s.feature}
                      </th>
                      <td className="px-6 py-3.5 align-top text-muted-foreground">
                        {Array.isArray(s.value) ? (
                          <span className="flex flex-col gap-1">
                            {s.value.map((line) => (
                              <span key={line}>{line}</span>
                            ))}
                          </span>
                        ) : (
                          s.value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Ideal applications */}
        <div className="mt-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">
            Ideal Applications
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {unit.applications.map((a) => (
              <li
                key={a}
                className="flex items-start gap-3 rounded border border-border bg-white p-4 text-sm shadow-sm"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cold-blue" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded bg-orange px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-hover"
          >
            Request a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
