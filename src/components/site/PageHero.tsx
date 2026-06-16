import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumb,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumb?: string;
}) {
  return (
    <section className="border-b border-border bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="flex items-center gap-1 text-xs uppercase tracking-widest text-white/50">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          {crumb && (
            <>
              <ChevronRight className="h-3 w-3" />
              <span>{crumb}</span>
            </>
          )}
        </div>
        {eyebrow && (
          <div className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-orange">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

export function CtaStrip() {
  return (
    <section className="bg-navy py-14 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 text-center md:flex-row md:text-left">
        <div>
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Talk to Koolacube about your site.
          </h2>
          <p className="mt-1 text-sm text-white/70">
            Monthly hire from $440 + GST · Backed by ACRO Refrigeration.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="rounded bg-orange px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-hover"
          >
            Get a Quote
          </Link>
          <a
            href="tel:1300561030"
            className="rounded border border-white/25 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
          >
            Call 1300 561 030
          </a>
        </div>
      </div>
    </section>
  );
}
