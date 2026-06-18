/**
 * Defaults for the bespoke About and Contact pages. Client-safe (data + types).
 * Icons stored as name strings (resolved via getIcon at render).
 */
import { CONTACT_FORM_DEFAULT, type ContactFormConfig } from "@/lib/content/contact-form";

export type AboutStored = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  crumb: string;
  title: string;
  intro: string;
  introParagraphs: string[];
  groupEyebrow: string;
  groupHeading: string;
  groupIntro: string;
  partners: { kicker: string; name: string; body: string; linkLabel: string; linkUrl: string }[];
  complianceEyebrow: string;
  complianceHeading: string;
  complianceIntro: string;
  compliance: { icon: string; label: string }[];
  supportEyebrow: string;
  supportHeading: string;
  support: { icon: string; title: string }[];
  missionLabel: string;
  missionText: string;
  promiseLabel: string;
  promiseText: string;
  promiseTagline: string;
};

export type ContactStored = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  crumb: string;
  title: string;
  intro: string;
  directContactTitle: string;
  serviceAreaTitle: string;
  serviceAreaText: string;
  form: ContactFormConfig;
};

export const ABOUT_DEFAULT: AboutStored = {
  metaTitle: "About Koolacube | Koolacube",
  metaDescription:
    "Koolacube delivers portable cool rooms, freezer rooms and dual-temp units across Australia. Backed by HVACR Group, Acro Refrigeration and Shelair Air Conditioning.",
  eyebrow: "About Koolacube",
  crumb: "About",
  title: "Portable Cooling Solutions Backed by Industry Expertise",
  intro:
    "Koolacube is a specialist provider of portable cool rooms, freezer rooms and dual-temperature units, delivering reliable, compliant and fully supported refrigeration solutions across Australia.",
  introParagraphs: [
    "Built on decades of technical expertise and powered by the strength of the HVACR Group, our products are engineered to perform in real-world conditions — on worksites, in commercial kitchens, in food production and everywhere in between.",
    "From long-term hire to permanent installations, we offer smart, flexible and durable temperature-controlled storage designed to meet the needs of modern businesses.",
  ],
  groupEyebrow: "The HVACR Group",
  groupHeading: "Part of the HVACR Group",
  groupIntro:
    "Koolacube is proudly part of the HVACR Group — a collective of industry-leading specialists in heating, ventilation, air conditioning and refrigeration. This partnership lets us deliver a higher level of engineering, service and after-sales support than typical cold room suppliers.",
  partners: [
    {
      kicker: "Commercial Cooling Specialists",
      name: "Acro Refrigeration",
      body: "With decades of experience in refrigeration installation, service and maintenance, Acro ensures every Koolacube product is built on proven refrigeration engineering — efficient, stable, and designed for long-term performance under heavy use or extreme temperatures.",
      linkLabel: "Visit Acro Refrigeration →",
      linkUrl: "https://acrorefrigeration.com.au",
    },
    {
      kicker: "Climate Control Experts",
      name: "Shelair Air Conditioning",
      body: "Shelair's industry knowledge strengthens our ability to deliver climate-controlled solutions that meet strict regulatory, safety and food-handling requirements — ensuring consistent, accurate temperatures in all environments.",
      linkLabel: "Visit Shelair →",
      linkUrl: "https://shelair.com.au",
    },
  ],
  complianceEyebrow: "Engineered Right",
  complianceHeading: "Compliance, Reliability & Safety First",
  complianceIntro:
    "Whether you're in hospitality, healthcare, construction or food manufacturing, you can rely on Koolacube for stable temperatures, operational safety and continuous performance.",
  compliance: [
    { icon: "ClipboardCheck", label: "Food-safe, HACCP-ready interiors" },
    { icon: "Snowflake", label: "Commercial-grade refrigeration systems" },
    { icon: "ShieldCheck", label: "High-density insulated panels" },
    { icon: "Lock", label: "Secure, lockable doors & safe access" },
    { icon: "Cpu", label: "Digital temperature control" },
    { icon: "Thermometer", label: "Workplace safety & compliance options" },
  ],
  supportEyebrow: "Local Support You Can Trust",
  supportHeading: "We don't just deliver cold rooms — we deliver confidence.",
  support: [
    { icon: "Truck", title: "Fast delivery & onsite setup" },
    { icon: "Wrench", title: "24/7 support for hire customers" },
    { icon: "ShieldCheck", title: "Refrigeration specialist expertise" },
    { icon: "Snowflake", title: "Service, spare parts & maintenance" },
    { icon: "Cpu", title: "Custom builds & tailored solutions" },
    { icon: "Check", title: "Local, experienced team" },
  ],
  missionLabel: "Our Mission",
  missionText:
    "To provide dependable, compliant and scalable temperature-controlled storage solutions — backed by real refrigeration expertise and personalised service.",
  promiseLabel: "Our Promise",
  promiseText: "Reliable units. Compliant design. Local support.",
  promiseTagline: "That's the Koolacube difference.",
};

export const CONTACT_DEFAULT: ContactStored = {
  metaTitle: "Contact — Get a Cold Room Hire Quote | Koolacube",
  metaDescription:
    "Enquire about commercial cold room or freezer room hire and sales across SE Queensland. Minimum hire terms apply.",
  eyebrow: "Enquiry",
  crumb: "Contact",
  title: "Tell us about your cold storage need.",
  intro:
    "We'll come back with options, pricing and timing for your site. Minimum hire terms apply. Koolacube focuses on business, long-term hire and sales — not short-term party or event hire.",
  directContactTitle: "Direct contact",
  serviceAreaTitle: "Service area",
  serviceAreaText:
    "Maintenance & breakdown support included within 50km of depot. Outside 50km available by agreement.",
  form: CONTACT_FORM_DEFAULT,
};
