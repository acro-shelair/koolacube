import type { Metadata } from "next";
import { PageHero, CtaStrip } from "@/components/site/PageHero";
import { Check, Snowflake, ShieldCheck, Truck, Wrench, Thermometer, Lock, ClipboardCheck, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "About Koolacube | Koolacube",
  description:
    "Koolacube delivers portable cool rooms, freezer rooms and dual-temp units across Australia. Backed by HVACR Group, Acro Refrigeration and Shelair Air Conditioning.",
  openGraph: {
    title: "About Koolacube | Koolacube",
    description:
      "Portable cooling solutions backed by HVACR Group industry expertise — compliant, reliable, locally supported.",
  },
};

const compliance = [
  { icon: ClipboardCheck, label: "Food-safe, HACCP-ready interiors" },
  { icon: Snowflake, label: "Commercial-grade refrigeration systems" },
  { icon: ShieldCheck, label: "High-density insulated panels" },
  { icon: Lock, label: "Secure, lockable doors & safe access" },
  { icon: Cpu, label: "Digital temperature control" },
  { icon: Thermometer, label: "Workplace safety & compliance options" },
];

const support = [
  { icon: Truck, title: "Fast delivery & onsite setup" },
  { icon: Wrench, title: "24/7 support for hire customers" },
  { icon: ShieldCheck, title: "Refrigeration specialist expertise" },
  { icon: Snowflake, title: "Service, spare parts & maintenance" },
  { icon: Cpu, title: "Custom builds & tailored solutions" },
  { icon: Check, title: "Local, experienced team" },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="About Koolacube"
        crumb="About"
        title="Portable Cooling Solutions Backed by Industry Expertise"
        intro="Koolacube is a specialist provider of portable cool rooms, freezer rooms and dual-temperature units, delivering reliable, compliant and fully supported refrigeration solutions across Australia."
      />

      {/* Intro */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 space-y-6 text-base leading-relaxed text-foreground/80 md:text-lg">
          <p>
            Built on decades of technical expertise and powered by the strength of the
            <strong className="text-foreground"> HVACR Group</strong>, our products are engineered to perform
            in real-world conditions — on worksites, in commercial kitchens, at major events
            and everywhere in between.
          </p>
          <p>
            From short-term hire to permanent installations, we offer smart, flexible and
            durable temperature-controlled storage designed to meet the needs of modern
            businesses.
          </p>
        </div>
      </section>

      {/* HVACR Group */}
      <section className="bg-muted/40 border-y border-border py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-orange">
              The HVACR Group
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Part of the HVACR Group
            </h2>
            <p className="mt-4 text-foreground/75 md:text-lg">
              Koolacube is proudly part of the HVACR Group — a collective of industry-leading
              specialists in heating, ventilation, air conditioning and refrigeration. This
              partnership lets us deliver a higher level of engineering, service and
              after-sales support than typical cold room suppliers.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-lg border border-border bg-white p-7 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-widest text-cold-blue">
                Commercial Cooling Specialists
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold">Acro Refrigeration</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                With decades of experience in refrigeration installation, service and
                maintenance, Acro ensures every Koolacube product is built on proven
                refrigeration engineering — efficient, stable, and designed for long-term
                performance under heavy use or extreme temperatures.
              </p>
              <a
                href="https://acrorefrigeration.com.au"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-semibold uppercase tracking-wide text-orange hover:text-orange-hover"
              >
                Visit Acro Refrigeration →
              </a>
            </article>

            <article className="rounded-lg border border-border bg-white p-7 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-widest text-cold-blue">
                Climate Control Experts
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold">Shelair Air Conditioning</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                Shelair's industry knowledge strengthens our ability to deliver
                climate-controlled solutions that meet strict regulatory, safety and
                food-handling requirements — ensuring consistent, accurate temperatures in
                all environments.
              </p>
              <a
                href="https://shelair.com.au"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-semibold uppercase tracking-wide text-orange hover:text-orange-hover"
              >
                Visit Shelair →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-orange">
              Engineered Right
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Compliance, Reliability &amp; Safety First
            </h2>
            <p className="mt-4 text-foreground/75 md:text-lg">
              Whether you're in hospitality, healthcare, construction or events, you can
              rely on Koolacube for stable temperatures, operational safety and continuous
              performance.
            </p>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {compliance.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-start gap-3 rounded border border-border bg-muted/30 p-5"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-cold-blue" />
                <span className="text-sm font-medium">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Local Support */}
      <section className="bg-navy py-16 md:py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-orange">
              Local Support You Can Trust
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              We don't just deliver cold rooms — we deliver confidence.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {support.map(({ icon: Icon, title }) => (
              <div
                key={title}
                className="rounded border border-white/10 bg-white/5 p-6 transition hover:border-cold-blue/60"
              >
                <Icon className="h-6 w-6 text-cold-blue" />
                <div className="mt-3 font-display text-lg font-semibold">{title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Promise */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          <div className="rounded-lg border-l-4 border-cold-blue bg-muted/30 p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-cold-blue">
              Our Mission
            </div>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">
              To provide dependable, compliant and scalable temperature-controlled storage
              solutions — backed by real refrigeration expertise and personalised service.
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-orange bg-muted/30 p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-orange">
              Our Promise
            </div>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">
              Reliable units. Compliant design. Local support.
            </p>
            <p className="mt-2 font-display text-xl font-bold">
              That's the Koolacube difference.
            </p>
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
