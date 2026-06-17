import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaStrip } from "@/components/site/PageHero";
import {
  Check,
  AlertTriangle,
  ChefHat,
  HeartPulse,
  GraduationCap,
  HardHat,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/industries" },
  title: "Industries We Serve | Koolacube",
  description:
    "Portable cooling solutions for hospitality, aged care, healthcare, education, construction and mining. Reliable temperature control, easy mobility and full compliance across Australia.",
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Industries We Serve | Koolacube",
    description:
      "Tailored portable cold room and freezer solutions for hospitality, aged care, education, construction and mining.",
  },
};

type Industry = {
  id: string;
  icon: LucideIcon;
  name: string;
  tagline: string;
  intro: string;
  challenges: string[];
  helps: string[];
};

const industries: Industry[] = [
  {
    id: "hospitality",
    icon: ChefHat,
    name: "Hospitality & Catering",
    tagline: "Portable Cool Rooms & Freezer Rooms for Restaurants, Cafés & Catering",
    intro:
      "In hospitality, consistent temperature control is critical. Koolacube offers reliable, food-safe refrigerated storage for kitchens of all sizes—whether you're running a café, restaurant, catering business or food truck.",
    challenges: [
      "Ongoing storage capacity as the business grows",
      "Need for reliable cold storage during upgrades or breakdowns",
      "Compliance with food safety standards",
      "Consistent, high-volume catering demand",
    ],
    helps: [
      "Portable Cool Rooms & Freezer Rooms for ongoing, long-term use",
      "Fast delivery and maintenance-backed reliability",
      "Food-grade interiors meeting all HACCP and safety guidelines",
      "Scalable solutions: from 3m units for small kitchens to 9m units for bulk storage",
    ],
  },
  {
    id: "aged-care",
    icon: HeartPulse,
    name: "Aged Care & Healthcare",
    tagline: "Compliant, Food-Safe & Medical-Grade Refrigeration Solutions",
    intro:
      "Aged-care kitchens and healthcare facilities require strict temperature stability and compliance. Koolacube delivers reliable, hygienic and regulation-ready cold room solutions for food, medication and specialised items.",
    challenges: [
      "Compliance with strict health & safety standards",
      "Need for reliable backup refrigeration",
      "Diverse temperature requirements for food and medical supplies",
      "Space limitations",
    ],
    helps: [
      "Cool Rooms, Freezer Rooms & Dual Temp Rooms suitable for food and medical storage",
      "Precise temperature control with digital thermostats",
      "Clean, food-grade interiors designed for hygiene and compliance",
      "Rapid deployment during refurbishments, emergencies or equipment failure",
    ],
  },
  {
    id: "education",
    icon: GraduationCap,
    name: "Education & Schools",
    tagline: "Portable Refrigeration for School Canteens & Catering",
    intro:
      "Schools need dependable cooling solutions for canteen operations, food technology labs and storage overflow. Koolacube provides safe, easy-to-use and reliable cold rooms for educational facilities on ongoing hire.",
    challenges: [
      "Additional storage for canteens and meal programs",
      "Canteen refrigeration breakdowns",
      "Growing storage requirements across the school year",
      "Limited kitchen space",
    ],
    helps: [
      "Portable cool rooms for canteen and catering support",
      "Freezer rooms for canteen and meal-prep support",
      "Safe, lockable units suitable for school environments",
      "Ongoing, long-term hire options to suit each facility",
    ],
  },
  {
    id: "construction",
    icon: HardHat,
    name: "Construction & Mining",
    tagline: "Heavy-Duty, Portable Cold Rooms for Remote & On-Site Operations",
    intro:
      "Construction and mining sites require rugged, reliable and easily transportable cold storage for food, hydration supplies, and temperature-sensitive materials. Koolacube provides industrial-grade cold rooms built for harsh environments.",
    challenges: [
      "Remote locations with limited infrastructure",
      "Extreme temperatures",
      "Need for durable, transportable solutions",
      "Storage for workforce food supplies and materials",
    ],
    helps: [
      "Robust Cool Rooms & Freezer Rooms built for tough site conditions",
      "Portable designs with forklift pockets and towable options",
      "Stable temperature performance in high-heat environments",
      "Ideal for camps, site kitchens, workforce hydration stations",
    ],
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        crumb="Industries"
        title="Industries We Serve"
        intro="Koolacube provides reliable, portable cooling solutions designed for the unique needs of multiple sectors—including hospitality, aged care, healthcare, education, construction and mining. Our cold rooms deliver consistent temperature control, easy mobility and full compliance, making them the preferred choice across Australia."
      />

      {/* Quick jump */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-5">
          <span className="mr-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Jump to:
          </span>
          {industries.map((i) => (
            <a
              key={i.id}
              href={`#${i.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-cold-blue hover:text-cold-blue"
            >
              <i.icon className="h-3.5 w-3.5" />
              {i.name}
            </a>
          ))}
        </div>
      </section>

      {/* Intro note */}
      <section className="bg-white pt-12">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-medium uppercase tracking-widest text-cold-blue">
            Below are tailored solutions for each industry.
          </p>
        </div>
      </section>

      {industries.map((industry, idx) => (
        <IndustrySection key={industry.id} industry={industry} alt={idx % 2 === 1} />
      ))}

      <CtaStrip />
    </>
  );
}

function IndustrySection({ industry, alt }: { industry: Industry; alt: boolean }) {
  const Icon = industry.icon;
  return (
    <section
      id={industry.id}
      className={"scroll-mt-24 py-16 md:py-20 " + (alt ? "bg-muted/40" : "bg-white")}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cold-blue/10 text-cold-blue">
              <Icon className="h-6 w-6" />
            </div>
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-orange">
              {industry.name}
            </div>
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold leading-tight md:text-3xl">
            {industry.tagline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/75 md:text-lg">
            {industry.intro}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-white p-7 shadow-sm">
            <div className="flex items-center gap-2 text-orange">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-widest">
                Industry Challenges
              </span>
            </div>
            <ul className="mt-5 space-y-3">
              {industry.challenges.map((c) => (
                <li key={c} className="flex gap-3 text-sm text-muted-foreground">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-cold-blue/30 bg-cold-blue/5 p-7 shadow-sm">
            <div className="flex items-center gap-2 text-cold-blue">
              <Check className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-widest">
                How Koolacube Helps
              </span>
            </div>
            <ul className="mt-5 space-y-3">
              {industry.helps.map((h) => (
                <li key={h} className="flex gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cold-blue" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded bg-orange px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-hover"
          >
            Enquire for {industry.name} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
