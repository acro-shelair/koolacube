import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Check,
  X,
  Snowflake,
  Thermometer,
  Layers,
  Wrench,
  Truck,
  ShieldCheck,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { FaqList } from "@/components/site/FaqList";

const heroImg = "/hero-coldroom.jpg";
const unitCold = "/unit-coldroom.jpg";
const unitFreezer = "/unit-freezer.jpg";
const unitDual = "/unit-dual.jpg";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Koolacube — Long-Term Commercial Cold Room Hire | SE QLD",
  description:
    "Relocatable cold rooms and freezer rooms for businesses across Brisbane, Gold Coast and SE QLD. Monthly hire from $440 + GST. Delivery, setup and maintenance backed by ACRO Refrigeration.",
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Koolacube — Commercial Cold Room Hire SE Queensland",
    description:
      "Monthly cold room, freezer and dual-temp hire for businesses. Backed by qualified refrigeration technicians.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductCards />
      <Positioning />
      <IncludedExcluded />
      <HireVsBuy />
      <AvailablePreview />
      <TrustSection />
      <ServiceArea />
      <Faq />
      <FinalCta />
    </>
  );
}

/* ------------------------------ HERO ------------------------------ */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <img
        src={heroImg}
        alt="Skid-mounted commercial cold room at a warehouse loading dock"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-white/70 backdrop-blur">
            <Snowflake className="h-3.5 w-3.5 text-orange" /> Commercial Cold Storage · SE QLD
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Long-Term Cold Room Hire
            <br />
            <span className="text-orange">Without the Capital Cost</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            Koolacube supplies relocatable cold rooms and freezer rooms for businesses across
            Brisbane, Gold Coast, Sunshine Coast and SE Queensland. Monthly hire, sales,
            delivery, setup and maintenance support included within 50km of depot.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded bg-orange px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-hover"
            >
              Get Monthly Hire Pricing <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/buy/new"
              className="inline-flex items-center gap-2 rounded border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              Buy a Cold Room
            </Link>
            <a
              href="tel:1300561030"
              className="inline-flex items-center gap-2 rounded border border-white/25 bg-transparent px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4 text-orange" /> Call 1300 561 030
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-wider text-white/55">
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-orange" /> Backed by ACRO Refrigeration</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-orange" /> Maintenance Included*</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-orange" /> Long-Term Hire Specialists</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- PRODUCT CARDS --------------------------- */
const products = [
  {
    icon: Snowflake,
    type: "Cold Room",
    price: 440,
    daily: "14.47",
    img: unitCold,
    blurb: "+2°C to +8°C — produce, dairy, beverages, packaged goods.",
  },
  {
    icon: Thermometer,
    type: "Freezer Room",
    price: 750,
    daily: "24.66",
    img: unitFreezer,
    blurb: "Down to -22°C — meat, seafood, frozen stock.",
  },
  {
    icon: Layers,
    type: "Dual Temp Room",
    price: 850,
    daily: "27.95",
    img: unitDual,
    blurb: "Independent cold + freezer compartments in one unit.",
  },
];

function ProductCards() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTag>Monthly Hire — Not Daily</SectionTag>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight md:text-4xl">
          Commercial cold storage, priced for the way businesses actually use it.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.type}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm transition hover:shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden bg-navy">
                <img
                  src={p.img}
                  alt={p.type}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-cold-blue">
                  <p.icon className="h-5 w-5" />
                  <span className="text-xs font-semibold uppercase tracking-widest">
                    {p.type}
                  </span>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold text-foreground">
                    ${p.price}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">/month + GST</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Equiv. approx. ${p.daily}/day on monthly hire
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{p.blurb}</p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded bg-navy px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-cold-blue"
                >
                  Get a Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Prices indicative — based on standard units on monthly hire. Delivery & setup quoted
          separately.
        </p>
      </div>
    </section>
  );
}

/* --------------------------- POSITIONING --------------------------- */
const industries = [
  "Butchers",
  "Bakeries",
  "Food Manufacturers",
  "Cafes & Restaurants",
  "Aged Care Kitchens",
  "Schools",
  "Clubs & Pubs",
  "Caterers",
  "Supermarkets",
  "Businesses Renovating Cold Rooms",
  "Overflow Stock Storage",
];

function Positioning() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionTag dark>Who We Hire To</SectionTag>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
              Koolacube is{" "}
              <span className="text-orange">not a party-hire business</span>.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/75">
              We supply cold rooms and freezer rooms for businesses that need reliable extra
              cold storage for weeks, months or ongoing use. No weddings. No BBQs. Just
              commercial refrigeration that keeps your stock at temperature.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {industries.map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded border border-white/10 bg-white/5 px-3 py-3 text-sm"
                >
                  <Check className="h-4 w-4 shrink-0 text-orange" />
                  <span>{i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- INCLUDED / EXCLUDED --------------------------- */
const included = [
  "Monthly hire",
  "Delivery & setup (quoted separately if applicable)",
  "Maintenance & breakdown support within 50km of depot",
  "Tested unit before delivery",
  "Commercial refrigeration support from HVACR Group / ACRO Refrigeration",
  "Optional shelving, ramps, lighting",
];
const excluded = [
  "Stock loss",
  "Customer misuse",
  "Power supply issues",
  "Site access issues",
  "Travel outside 50km",
  "Damage by customer, contractors, weather, animals, vandalism or unauthorised relocation",
];

function IncludedExcluded() {
  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTag>What's Included</SectionTag>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold md:text-4xl">
          Clear scope. No surprises.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-white p-8">
            <div className="flex items-center gap-2 text-cold-blue">
              <Check className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-widest">Included</span>
            </div>
            <ul className="mt-6 space-y-3">
              {included.map((i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cold-blue" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-white p-8">
            <div className="flex items-center gap-2 text-orange">
              <X className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-widest">
                Excluded / Conditions
              </span>
            </div>
            <ul className="mt-6 space-y-3">
              {excluded.map((i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- HIRE VS BUY --------------------------- */
const decisions = [
  { need: "Temporary overflow storage", best: "Hire" },
  { need: "Renovation or project work", best: "Hire" },
  { need: "Trial site or new venue", best: "Hire" },
  { need: "Permanent storage requirement", best: "Buy" },
  { need: "No capital outlay", best: "Hire" },
  { need: "Full ownership", best: "Buy" },
];

function HireVsBuy() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTag>Decision Guide</SectionTag>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
          Hire or Buy — which fits your business?
        </h2>
        <div className="mt-10 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy text-white">
              <tr>
                <th className="px-6 py-4 font-display text-sm uppercase tracking-wider">
                  Need
                </th>
                <th className="px-6 py-4 font-display text-sm uppercase tracking-wider">
                  Best Option
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {decisions.map((d) => (
                <tr key={d.need}>
                  <td className="px-6 py-4">{d.need}</td>
                  <td className="px-6 py-4">
                    <span
                      className={
                        "inline-flex items-center rounded px-2.5 py-1 text-xs font-semibold uppercase tracking-wider " +
                        (d.best === "Hire"
                          ? "bg-cold-blue/10 text-cold-blue"
                          : "bg-orange/15 text-orange")
                      }
                    >
                      {d.best}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded bg-orange px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-hover"
          >
            Ask Us Which Option Makes Sense <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- AVAILABLE PREVIEW --------------------------- */
const units = [
  {
    type: "Cold Room — 3m x 2.4m",
    dims: "Internal 2.8 × 2.2 × 2.1 m",
    power: "240V / 15A",
    price: "$440 / mo + GST",
    status: "Available" as const,
    img: unitCold,
  },
  {
    type: "Freezer Room — 3m x 2.4m",
    dims: "Internal 2.8 × 2.2 × 2.1 m",
    power: "240V / 15A",
    price: "$750 / mo + GST",
    status: "On Hire" as const,
    img: unitFreezer,
  },
  {
    type: "Dual Temp — 4m x 2.4m",
    dims: "Cold + Freezer compartments",
    power: "415V 3-phase",
    price: "$850 / mo + GST",
    status: "Coming Soon" as const,
    img: unitDual,
  },
];

function AvailablePreview() {
  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionTag>Yard Listings</SectionTag>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Units currently in our fleet
            </h2>
          </div>
          <Link
            href="/available-units"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cold-blue hover:text-navy"
          >
            View all available units <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {units.map((u) => (
            <div
              key={u.type}
              className="overflow-hidden rounded-lg border border-border bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-navy">
                <img
                  src={u.img}
                  alt={u.type}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span
                  className={
                    "absolute left-3 top-3 rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider " +
                    (u.status === "Available"
                      ? "bg-emerald-500 text-white"
                      : u.status === "On Hire"
                        ? "bg-orange text-white"
                        : "bg-white text-navy")
                  }
                >
                  {u.status}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold">{u.type}</h3>
                <dl className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <dt>Internal</dt>
                    <dd className="text-foreground">{u.dims}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Power</dt>
                    <dd className="text-foreground">{u.power}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Hire</dt>
                    <dd className="font-semibold text-foreground">{u.price}</dd>
                  </div>
                </dl>
                <Link
                  href="/contact"
                  className="mt-5 block rounded border border-navy bg-white py-2.5 text-center text-sm font-semibold uppercase tracking-wide text-navy transition hover:bg-navy hover:text-white"
                >
                  Request This Unit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- TRUST --------------------------- */
const trust = [
  { icon: ShieldCheck, label: "Backed by ACRO Refrigeration" },
  { icon: Wrench, label: "Commercial Refrigeration Technicians" },
  { icon: MapPin, label: "SE Queensland Support" },
  { icon: Truck, label: "Maintenance-Backed Hire" },
  { icon: Snowflake, label: "Long-Term Hire Specialists" },
  { icon: Check, label: "Sales Available" },
];

function TrustSection() {
  return (
    <section className="bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTag dark>Backed By Refrigeration People</SectionTag>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
              You are not hiring a box from a party-hire operator.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/75">
              Backed by HVACR Group and ACRO Refrigeration, Koolacube is supported by qualified
              refrigeration technicians, commercial service systems and real breakdown
              capability. You are hiring commercial cold storage backed by refrigeration
              people.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {trust.map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-3 rounded border border-white/10 bg-white/5 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-orange/15 text-orange">
                  <t.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- SERVICE AREA --------------------------- */
function ServiceArea() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionTag>Where We Operate</SectionTag>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
          Service Area
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border-l-4 border-cold-blue bg-cold-blue/5 p-8">
            <div className="flex items-center gap-2 text-cold-blue">
              <Check className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-widest">
                Within 50km of Depot
              </span>
            </div>
            <p className="mt-4 text-lg font-medium">
              Maintenance & breakdown support included.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Depot located at Unit 3, 9–11 Imboon Street, Deception Bay QLD 4508.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-orange bg-orange/5 p-8">
            <div className="flex items-center gap-2 text-orange">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-widest">
                Outside 50km
              </span>
            </div>
            <p className="mt-4 text-lg font-medium">Available by agreement.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Travel and third-party costs may apply. Talk to us about your site.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            "Brisbane",
            "Gold Coast",
            "Sunshine Coast",
            "Moreton Bay",
            "Ipswich",
            "Logan",
          ].map((a) => (
            <span
              key={a}
              className="rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- FAQ --------------------------- */
function Faq() {
  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-4xl px-4">
        <SectionTag>FAQ</SectionTag>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
          Questions, answered.
        </h2>
        <FaqList />
      </div>
    </section>
  );
}

/* --------------------------- FINAL CTA --------------------------- */
function FinalCta() {
  return (
    <section className="bg-navy-deep py-20 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
          Need Cold Storage <span className="text-orange">for Your Business?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-white/75">
          Minimum hire terms apply. Koolacube specialises in long-term commercial hire — not
          short-term party or event hire.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded bg-orange px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-hover"
          >
            Get Monthly Hire Pricing <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="tel:1300561030"
            className="inline-flex items-center gap-2 rounded border border-white/25 px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
          >
            <Phone className="h-4 w-4 text-orange" /> Call 1300 561 030
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- SHARED --------------------------- */
function SectionTag({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={
        "inline-flex items-center gap-2 rounded-sm border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] " +
        (dark
          ? "border-white/15 bg-white/5 text-white/70"
          : "border-cold-blue/30 bg-cold-blue/5 text-cold-blue")
      }
    >
      <Snowflake className="h-3 w-3" />
      {children}
    </div>
  );
}
