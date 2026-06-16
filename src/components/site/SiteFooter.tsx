import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <img
              src="/koolacube-logo.webp"
              alt="Koolacube"
              className="h-12 w-12 rounded-full bg-white p-0.5"
            />
            <span className="font-display text-xl font-bold tracking-wide text-white">
              KOOLACUBE
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            Reliable commercial cold storage for SE Queensland businesses.
          </p>
          <div className="mt-5 inline-block rounded border border-white/15 px-3 py-2 text-xs">
            Backed by <span className="font-semibold text-white">HVACR Group</span> /{" "}
            <span className="font-semibold text-white">ACRO Refrigeration</span>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Hire
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <FooterLink to="/hire/cold-room">Cold Room Hire</FooterLink>
            <FooterLink to="/hire/freezer-room">Freezer Room Hire</FooterLink>
            <FooterLink to="/hire/dual-temp">Dual Temp Room Hire</FooterLink>
            <FooterLink to="/hire/long-term">Long-Term Hire</FooterLink>
            <FooterLink to="/available-units">Available Units</FooterLink>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Company
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <FooterLink to="/buy/new">Buy New</FooterLink>
            <FooterLink to="/buy/ex-hire">Ex-Hire Sales</FooterLink>
            <FooterLink to="/industries">Industries</FooterLink>
            <FooterLink to="/service-areas">Service Areas</FooterLink>
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
              <span>Unit 3, 9–11 Imboon Street, Deception Bay QLD 4508</span>
            </li>
            <li className="flex gap-3">
              <Phone className="h-4 w-4 shrink-0 text-orange" />
              <a href="tel:1300561030" className="hover:text-white">
                1300 561 030
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="h-4 w-4 shrink-0 text-orange" />
              <a href="mailto:info@koolacube.com.au" className="hover:text-white">
                info@koolacube.com.au
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 md:flex-row">
          <div>© {new Date().getFullYear()} Koolacube. All rights reserved.</div>
          <div>Commercial cold room hire & sales · SE Queensland</div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={to} className="text-white/70 transition hover:text-white">
        {children}
      </Link>
    </li>
  );
}
