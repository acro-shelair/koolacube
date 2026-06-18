import { createClient } from "@/lib/supabase/server";

export type FaqItem = { q: string; a: string };

/** Current hardcoded FAQs — used as the fallback before any are saved in the CMS. */
export const DEFAULT_FAQS: FaqItem[] = [
  {
    q: "Do you offer short-term hire?",
    a: "Koolacube focuses on long-term commercial hire. Minimum hire terms apply — we are not a party or event hire business.",
  },
  {
    q: "What is the minimum hire term?",
    a: "Hire is structured on a monthly basis with a minimum term that we'll confirm in your quote.",
  },
  {
    q: "Is maintenance included?",
    a: "Yes — maintenance and breakdown support is included for sites within 50km of our Deception Bay depot.",
  },
  {
    q: "What happens if the unit breaks down?",
    a: "Our refrigeration technicians attend breakdowns. Within 50km support is included; outside that, travel may apply.",
  },
  {
    q: "Is stock loss covered?",
    a: "No. Customers are responsible for insuring their own stock. Refer to the Included / Excluded section above.",
  },
  {
    q: "What power supply is required?",
    a: "Cold rooms typically need 240V / 15A. Larger or dual temp units may require 415V three-phase. We'll confirm with you.",
  },
  {
    q: "Do you deliver and install?",
    a: "Yes. Delivery and setup are quoted separately based on site access and distance.",
  },
  {
    q: "Can I buy the unit instead?",
    a: "Yes — we offer new and ex-hire cold rooms for sale, plus custom builds.",
  },
  {
    q: "Do you sell ex-hire cold rooms?",
    a: "Yes. Ex-hire units are tested and refurbished before sale. Stock changes regularly.",
  },
  {
    q: "What areas do you service?",
    a: "Brisbane, Gold Coast, Sunshine Coast, Moreton Bay, Ipswich and Logan. Other areas by agreement.",
  },
  {
    q: "What happens if I'm outside 50km from depot?",
    a: "We can still hire to you, however travel and third-party service costs may apply for maintenance and breakdowns.",
  },
  {
    q: "Can I use the unit as a freezer?",
    a: "Only freezer-rated units can be run at freezer temperatures. Cold-room units are not designed for sub-zero operation.",
  },
  {
    q: "Can I move the unit myself?",
    a: "No. Unauthorised relocation voids the hire agreement and is excluded from cover.",
  },
  {
    q: "Is insurance required?",
    a: "Yes — customers should insure their own stock and any business interruption risk.",
  },
];

/**
 * Published FAQs for the public site, ordered. Falls back to DEFAULT_FAQS when
 * the table is empty or unavailable, so the home page always has content.
 */
export async function getPublishedFaqs(): Promise<FaqItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("question, answer")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) return DEFAULT_FAQS;
    return data.map((f) => ({ q: f.question, a: f.answer }));
  } catch {
    return DEFAULT_FAQS;
  }
}
