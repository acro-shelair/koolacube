import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaStrip } from "@/components/site/PageHero";
import { getPublishedIndustries, type Industry } from "@/lib/industries";
import { getIcon } from "@/lib/icons";
import { Check, AlertTriangle, ArrowRight } from "lucide-react";

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

export default async function Page() {
  const industries = await getPublishedIndustries();
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
          {industries.map((i) => {
            const Icon = getIcon(i.icon);
            return (
              <a
                key={i.slug}
                href={`#${i.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-cold-blue hover:text-cold-blue"
              >
                <Icon className="h-3.5 w-3.5" />
                {i.name}
              </a>
            );
          })}
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
        <IndustrySection key={industry.slug} industry={industry} alt={idx % 2 === 1} />
      ))}

      <CtaStrip />
    </>
  );
}

function IndustrySection({ industry, alt }: { industry: Industry; alt: boolean }) {
  const Icon = getIcon(industry.icon);
  return (
    <section
      id={industry.slug}
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
