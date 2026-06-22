"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const hireLinks = [
  { to: "/hire/cold-room", label: "Cold Room Hire" },
  { to: "/hire/freezer-room", label: "Freezer Room Hire" },
  { to: "/hire/dual-temp", label: "Dual Temp Room Hire" },
  { to: "/hire/long-term", label: "Long-Term Hire" },
] as const;

const buyLinks = [
  { to: "/buy/new", label: "New Cold Rooms" },
  { to: "/buy/ex-hire", label: "Ex-Hire Cold Rooms" },
  { to: "/buy/custom", label: "Custom Builds" },
] as const;

const navLinks = [
  { to: "/available-units", label: "Available Units" },
  { to: "/industries", label: "Industries" },
  // { to: "/service-areas", label: "Service Areas" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader({
  telephone = "1300 561 030",
  telephoneE164 = "1300561030",
}: {
  telephone?: string;
  telephoneE164?: string;
} = {}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-deep text-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-20">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/koolacube-logo.webp"
            alt="Koolacube"
            className="h-12 w-12 rounded-full bg-white p-0.5 lg:h-14 lg:w-14"
          />
          <div className="leading-tight">
            <div className="font-display text-xl font-bold tracking-wide">
              KOOLACUBE
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">
              Cold Room Hire & Sales
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Dropdown label="Hire" items={hireLinks} />
          <Dropdown label="Buy" items={buyLinks} />
          {navLinks.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              className={
                "rounded px-3 py-2 text-sm font-medium transition hover:bg-white/10 hover:text-white " +
                (pathname === l.to ? "bg-white/10 text-white" : "text-white/85")
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${telephoneE164}`}
            className="flex items-center gap-2 rounded border border-white/20 px-3 py-2 text-sm transition hover:border-white/40"
          >
            <Phone className="h-4 w-4 text-orange" />
            <span className="font-display text-base font-semibold tracking-wide">
              {telephone}
            </span>
            <span className="ml-1 rounded-sm bg-orange px-1.5 py-0.5 text-[10px] font-bold uppercase">
              Hire & Sales
            </span>
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 text-white"
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy-deep lg:hidden">
          <div className="space-y-1 px-4 py-3">
            <MobileGroup
              label="Hire"
              items={hireLinks}
              onNav={() => setOpen(false)}
            />
            <MobileGroup
              label="Buy"
              items={buyLinks}
              onNav={() => setOpen(false)}
            />
            {navLinks.map((l) => (
              <Link
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className="block rounded px-3 py-2 text-sm text-white/85 hover:bg-white/10"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={`tel:${telephoneE164}`}
              className="mt-2 flex items-center justify-center gap-2 rounded bg-orange px-3 py-3 text-sm font-semibold"
            >
              <Phone className="h-4 w-4" /> Call {telephone} — 24/7
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Dropdown({
  label,
  items,
}: {
  label: string;
  items: ReadonlyArray<{ to: string; label: string }>;
}) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 rounded px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white">
        {label}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      <div className="invisible absolute left-0 top-full w-60 translate-y-1 rounded-md border border-border bg-white p-1 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        {items.map((i) => (
          <Link
            key={i.to}
            href={i.to}
            className="block rounded px-3 py-2 text-sm text-foreground hover:bg-muted"
          >
            {i.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileGroup({
  label,
  items,
  onNav,
}: {
  label: string;
  items: ReadonlyArray<{ to: string; label: string }>;
  onNav: () => void;
}) {
  return (
    <div className="py-1">
      <div className="px-3 pb-1 text-xs uppercase tracking-wider text-white/40">
        {label}
      </div>
      {items.map((i) => (
        <Link
          key={i.to}
          href={i.to}
          onClick={onNav}
          className="block rounded px-3 py-2 text-sm text-white/85 hover:bg-white/10"
        >
          {i.label}
        </Link>
      ))}
    </div>
  );
}
