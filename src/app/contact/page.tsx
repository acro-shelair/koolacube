import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Get a Cold Room Hire Quote | Koolacube",
  description:
    "Enquire about commercial cold room or freezer room hire and sales across SE Queensland. Minimum hire terms apply.",
  openGraph: {
    title: "Contact Koolacube — Cold Room Hire Enquiry",
    description: "Tell us about your site and we'll quote monthly hire or sale.",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Enquiry"
        crumb="Contact"
        title="Tell us about your cold storage need."
        intro="We'll come back with options, pricing and timing for your site. Minimum hire terms apply. Koolacube focuses on business, long-term hire and sales — not short-term party or event hire."
      />

      <section className="bg-muted/30 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-3">
          <aside className="space-y-6 lg:col-span-1">
            <div className="rounded-lg border border-border bg-white p-6">
              <h3 className="font-display text-lg font-semibold">Direct contact</h3>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-orange" />
                  <div>
                    <a href="tel:1300561030" className="font-semibold text-foreground hover:text-cold-blue">
                      1300 561 030
                    </a>
                    <div className="text-xs text-muted-foreground">Call 24/7</div>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-orange" />
                  <a
                    href="mailto:info@koolacube.com.au"
                    className="text-foreground hover:text-cold-blue"
                  >
                    info@koolacube.com.au
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-orange" />
                  <span>Unit 3, 9–11 Imboon Street, Deception Bay QLD 4508</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-navy p-6 text-white">
              <h3 className="font-display text-lg font-semibold">Service area</h3>
              <p className="mt-2 text-sm text-white/70">
                Maintenance & breakdown support included within 50km of depot. Outside 50km
                available by agreement.
              </p>
            </div>
          </aside>

          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
